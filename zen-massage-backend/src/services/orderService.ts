import { prisma } from '../prisma'
import type { OrderStatus } from '../generated/prisma'

/* ── Génère le prochain numéro BEN-CMD-XXX ── */
async function generateNumero(): Promise<string> {
  const last = await prisma.commande.findFirst({
    orderBy: { createdAt: 'desc' },
    select: { numero: true },
  })
  if (!last) return 'BEN-CMD-001'
  const match = last.numero.match(/BEN-CMD-(\d+)$/)
  const n = match ? parseInt(match[1], 10) + 1 : 1
  return `BEN-CMD-${String(n).padStart(3, '0')}`
}

/* ── Créer une commande ── */
export async function createCommande(data: {
  utilisateur_id: string
  items: Array<{
    produit_id: string
    nom_produit: string
    image?: string
    prix_unitaire: number
    quantite: number
  }>
  ville: string
  adresse: string
  telephone: string
  mode_paiement: string
  frais_livraison?: number
  notes?: string
}) {
  // Valider que tous les produits existent et ont assez de stock
  for (const item of data.items) {
    const produit = await prisma.produit.findUnique({ where: { id: item.produit_id } })
    if (!produit) {
      const err = new Error(`Produit introuvable : ${item.nom_produit}`) as any
      err.status = 404; throw err
    }
    if (produit.stock < item.quantite) {
      const err = new Error(`Stock insuffisant pour "${produit.nom}" (disponible: ${produit.stock})`) as any
      err.status = 409; throw err
    }
  }

  const frais = data.frais_livraison ?? 0
  const sousTotal = data.items.reduce((s, i) => s + i.prix_unitaire * i.quantite, 0)
  const total = sousTotal + frais
  const numero = await generateNumero()

  // Créer la commande + lignes + décrémenter le stock dans une transaction
  const commande = await prisma.$transaction(async (tx) => {
    const cmd = await tx.commande.create({
      data: {
        numero,
        utilisateur_id: data.utilisateur_id,
        ville: data.ville,
        adresse: data.adresse,
        telephone: data.telephone,
        mode_paiement: data.mode_paiement,
        frais_livraison: frais,
        total,
        notes: data.notes,
        lignes: {
          create: data.items.map(item => ({
            produit_id:   item.produit_id,
            nom_produit:  item.nom_produit,
            image:        item.image,
            prix_unitaire: item.prix_unitaire,
            quantite:     item.quantite,
            sous_total:   item.prix_unitaire * item.quantite,
          })),
        },
      },
      include: {
        lignes: true,
        utilisateur: { select: { id: true, firstName: true, lastName: true, email: true } },
      },
    })

    // Décrémenter le stock de chaque produit
    for (const item of data.items) {
      await tx.produit.update({
        where: { id: item.produit_id },
        data: { stock: { decrement: item.quantite } },
      })
    }

    return cmd
  })

  return commande
}

/* ── Commandes d'un utilisateur ── */
export async function getCommandesUtilisateur(userId: string) {
  return prisma.commande.findMany({
    where: { utilisateur_id: userId },
    include: {
      lignes: {
        include: { produit: { select: { id: true, nom: true, images: true } } },
      },
    },
    orderBy: { createdAt: 'desc' },
  })
}

/* ── Une commande par ID (vérifie ownership) ── */
export async function getCommandeById(id: string, userId: string, role: string) {
  const commande = await prisma.commande.findUnique({
    where: { id },
    include: {
      lignes: {
        include: { produit: { select: { id: true, nom: true, images: true } } },
      },
      utilisateur: { select: { id: true, firstName: true, lastName: true, email: true, phone: true } },
    },
  })
  if (!commande) {
    const err = new Error('Commande introuvable') as any; err.status = 404; throw err
  }
  if (commande.utilisateur_id !== userId && role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
    const err = new Error('Accès refusé') as any; err.status = 403; throw err
  }
  return commande
}

/* ── Toutes les commandes (admin) ── */
export async function getAllCommandes(filters?: { statut?: OrderStatus; page?: number; limite?: number }) {
  const page  = filters?.page  ?? 1
  const limit = filters?.limite ?? 20
  const skip  = (page - 1) * limit

  const where = filters?.statut ? { statut: filters.statut } : {}
  const [commandes, total] = await Promise.all([
    prisma.commande.findMany({
      where,
      include: {
        lignes: true,
        utilisateur: { select: { id: true, firstName: true, lastName: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.commande.count({ where }),
  ])
  return { commandes, total, page, pages: Math.ceil(total / limit) }
}

/* ── Mettre à jour le statut (admin) ── */
export async function updateStatutCommande(id: string, statut: OrderStatus) {
  const commande = await prisma.commande.findUnique({ where: { id } })
  if (!commande) {
    const err = new Error('Commande introuvable') as any; err.status = 404; throw err
  }
  return prisma.commande.update({
    where: { id },
    data: { statut },
    include: {
      lignes: true,
      utilisateur: { select: { id: true, firstName: true, lastName: true, email: true } },
    },
  })
}

/* ── Annuler une commande (client) ── */
export async function cancelCommande(id: string, userId: string) {
  const commande = await prisma.commande.findUnique({
    where: { id },
    include: { lignes: true },
  })
  if (!commande) {
    const err = new Error('Commande introuvable') as any; err.status = 404; throw err
  }
  if (commande.utilisateur_id !== userId) {
    const err = new Error('Accès refusé') as any; err.status = 403; throw err
  }
  if (commande.statut !== 'PENDING' && commande.statut !== 'CONFIRMED') {
    const err = new Error('Cette commande ne peut plus être annulée') as any; err.status = 400; throw err
  }

  // Réapprovisionner le stock
  return prisma.$transaction(async (tx) => {
    for (const ligne of commande.lignes) {
      await tx.produit.update({
        where: { id: ligne.produit_id },
        data: { stock: { increment: ligne.quantite } },
      })
    }
    return tx.commande.update({
      where: { id },
      data: { statut: 'CANCELLED' },
      include: { lignes: true },
    })
  })
}
