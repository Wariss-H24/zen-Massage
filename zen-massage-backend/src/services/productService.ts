import { prisma } from '../prisma'
import type {
  CategorieCreate,
  CategorieUpdate,
  ProduitCreate,
  ProduitUpdate,
  ProduitFilters,
} from '../types/product'

/* ============================================================
   CATÉGORIES
   ============================================================ */

export async function createCategorie(data: CategorieCreate) {
  const exists = await prisma.categorie.findUnique({ where: { nom: data.nom } })
  if (exists) {
    const err = new Error('Une catégorie avec ce nom existe déjà') as any
    err.status = 409
    throw err
  }
  return prisma.categorie.create({ data })
}

export async function updateCategorie(id: string, data: CategorieUpdate) {
  const cat = await prisma.categorie.findUnique({ where: { id } })
  if (!cat) {
    const err = new Error('Catégorie introuvable') as any
    err.status = 404
    throw err
  }
  return prisma.categorie.update({ where: { id }, data })
}

export async function deleteCategorie(id: string) {
  const cat = await prisma.categorie.findUnique({ where: { id } })
  if (!cat) {
    const err = new Error('Catégorie introuvable') as any
    err.status = 404
    throw err
  }
  const linkedProducts = await prisma.produit.count({ where: { categorie_id: id } })
  if (linkedProducts > 0) {
    const err = new Error('Impossible de supprimer : des produits sont liés à cette catégorie') as any
    err.status = 400
    throw err
  }
  return prisma.categorie.delete({ where: { id } })
}

export async function getAllCategories() {
  return prisma.categorie.findMany({
    orderBy: [{ ordre: 'asc' }, { createdAt: 'asc' }],
  })
}

export async function getCategorieById(id: string) {
  const cat = await prisma.categorie.findUnique({
    where: { id },
    include: { produits: true },
  })
  if (!cat) {
    const err = new Error('Catégorie introuvable') as any
    err.status = 404
    throw err
  }
  return cat
}

/* ============================================================
   PRODUITS
   ============================================================ */

function applyOrderBy(tri?: ProduitFilters['tri']) {
  switch (tri) {
    case 'prix_asc':
      return { prix: 'asc' as const }
    case 'prix_desc':
      return { prix: 'desc' as const }
    case 'populaire':
      return { likes: { _count: 'desc' as const } }
    case 'avis_desc':
      return { avis: { _count: 'desc' as const } }
    case 'recent':
    default:
      return { createdAt: 'desc' as const }
  }
}

function formatSku(skuNumber: number) {
  return `ZEN-PROD-${String(skuNumber).padStart(3, '0')}`
}

export async function createProduit(data: ProduitCreate) {
  await getCategorieById(data.categorie_id)
  if (data.sku) {
    const exists = await prisma.produit.findUnique({ where: { sku: data.sku } })
    if (exists) {
      const err = new Error('Un produit avec ce SKU existe déjà') as any
      err.status = 409
      throw err
    }
  }
  return prisma.$transaction(async (tx) => {
    const created = await tx.produit.create({
      data,
      select: { id: true, sku: true, sku_number: true },
    })

    if (created.sku) {
      return tx.produit.findUnique({
        where: { id: created.id },
        include: { categorie: true },
      })
    }

    const skuNumber =
      created.sku_number ??
      (await tx.produit.findUnique({
        where: { id: created.id },
        select: { sku_number: true },
      }))?.sku_number

    if (!skuNumber) {
      const err = new Error('Erreur génération SKU (sku_number manquant)') as any
      err.status = 500
      throw err
    }

    const sku = formatSku(skuNumber)
    await tx.produit.update({
      where: { id: created.id },
      data: { sku },
    })
    return tx.produit.findUnique({
      where: { id: created.id },
      include: { categorie: true },
    })
  })
}

export async function updateProduit(id: string, data: ProduitUpdate) {
  const prod = await prisma.produit.findUnique({ where: { id } })
  if (!prod) {
    const err = new Error('Produit introuvable') as any
    err.status = 404
    throw err
  }
  if (data.categorie_id) await getCategorieById(data.categorie_id)
  if (data.sku && data.sku !== prod.sku) {
    const exists = await prisma.produit.findUnique({ where: { sku: data.sku } })
    if (exists) {
      const err = new Error('Un produit avec ce SKU existe déjà') as any
      err.status = 409
      throw err
    }
  }
  return prisma.produit.update({
    where: { id },
    data,
    include: { categorie: true },
  })
}

export async function deleteProduit(id: string) {
  const prod = await prisma.produit.findUnique({ where: { id } })
  if (!prod) {
    const err = new Error('Produit introuvable') as any
    err.status = 404
    throw err
  }
  return prisma.produit.delete({ where: { id } })
}

export async function listProduits(filters: ProduitFilters = {}, isAdmin = false) {
  const where: any = {}
  if (filters.categorie_id) where.categorie_id = filters.categorie_id
  if (filters.publie !== undefined) {
    where.publie = filters.publie
  } else if (!isAdmin) {
    where.publie = true
  }
  if (filters.recherche) {
    where.OR = [
      { nom: { contains: filters.recherche, mode: 'insensitive' } },
      { description: { contains: filters.recherche, mode: 'insensitive' } },
    ]
  }
  const page = Math.max(1, filters.page ?? 1)
  const limite = Math.min(100, Math.max(1, filters.limite ?? 20))
  const skip = (page - 1) * limite
  const orderBy = applyOrderBy(filters.tri)
  const [produits, total] = await Promise.all([
    prisma.produit.findMany({
      where,
      include: {
        categorie: true,
        _count: { select: { avis: true, likes: true } },
      },
      orderBy,
      skip,
      take: limite,
    }),
    prisma.produit.count({ where }),
  ])
  return { produits, total, page, pages: Math.ceil(total / limite) }
}

export async function getProduitById(id: string) {
  const prod = await prisma.produit.findUnique({
    where: { id },
    include: {
      categorie: true,
      avis: {
        include: {
          utilisateur: { select: { id: true, firstName: true, lastName: true, avatar: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
      _count: { select: { avis: true, likes: true } },
    },
  })
  if (!prod) {
    const err = new Error('Produit introuvable') as any
    err.status = 404
    throw err
  }
  const avg = await prisma.avis.aggregate({
    where: { produit_id: id },
    _avg: { note: true },
  })
  return { produit: prod, moyenne: avg._avg.note ?? 0 }
}

/* ============================================================
   LIKES
   ============================================================ */

export async function toggleLike(produit_id: string, utilisateur_id: string) {
  const existing = await prisma.like.findUnique({
    where: { utilisateur_id_produit_id: { utilisateur_id, produit_id } },
  })
  if (existing) {
    await prisma.like.delete({
      where: { utilisateur_id_produit_id: { utilisateur_id, produit_id } },
    })
  } else {
    await prisma.like.create({ data: { produit_id, utilisateur_id } })
  }
  const count = await prisma.like.count({ where: { produit_id } })
  const liked = !existing
  return { count, liked }
}

export async function getLikesCount(produit_id: string) {
  return prisma.like.count({ where: { produit_id } })
}

export async function getLikeStatus(produit_id: string, utilisateur_id: string) {
  const like = await prisma.like.findUnique({
    where: { utilisateur_id_produit_id: { utilisateur_id, produit_id } },
  })
  return !!like
}
