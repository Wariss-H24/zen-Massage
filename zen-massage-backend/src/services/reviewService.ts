import { prisma } from '../prisma'
import type { ReviewCreate, ReviewUpdate, ReviewFilters } from '../types/review'

/* ============================================================
   VALIDATIONS
   ============================================================ */

async function validateReviewInput(note: number, titre: string, contenu: string) {
  if (!Number.isInteger(note) || note < 1 || note > 5) {
    const err = new Error('La note doit être un entier entre 1 et 5') as any
    err.status = 400
    throw err
  }
  if (!titre || titre.length > 100) {
    const err = new Error('Le titre est obligatoire (max 100 caractères)') as any
    err.status = 400
    throw err
  }
  if (!contenu || contenu.length > 500) {
    const err = new Error('Le contenu est obligatoire (max 500 caractères)') as any
    err.status = 400
    throw err
  }
}

/* ============================================================
   CRUD
   ============================================================ */

export async function createReview(data: ReviewCreate) {
  await validateReviewInput(data.note, data.titre, data.contenu)

  await prisma.produit.findUniqueOrThrow({
    where: { id: data.produit_id },
  }).catch(() => {
    const err = new Error('Produit introuvable') as any
    err.status = 404
    throw err
  })

  const existing = await prisma.avis.findUnique({
    where: { utilisateur_id_produit_id: {
      utilisateur_id: data.utilisateur_id,
      produit_id: data.produit_id,
    }},
  })
  if (existing) {
    const err = new Error('Vous avez déjà donné un avis sur ce produit') as any
    err.status = 409
    throw err
  }

  return prisma.avis.create({
    data,
    include: {
      utilisateur: { select: { id: true, firstName: true, lastName: true, avatar: true } },
    },
  })
}

export async function updateReview(id: string, userId: string, userRole: string, data: ReviewUpdate) {
  const review = await prisma.avis.findUnique({ where: { id } })
  if (!review) {
    const err = new Error('Avis introuvable') as any
    err.status = 404
    throw err
  }
  if (review.utilisateur_id !== userId && userRole !== 'SUPER_ADMIN') {
    const err = new Error('Non autorisé') as any
    err.status = 403
    throw err
  }
  if (data.note !== undefined && (data.note < 1 || data.note > 5)) {
    const err = new Error('La note doit être entre 1 et 5') as any
    err.status = 400
    throw err
  }
  return prisma.avis.update({
    where: { id },
    data,
    include: {
      utilisateur: { select: { id: true, firstName: true, lastName: true, avatar: true } },
    },
  })
}

export async function deleteReview(id: string, userId: string, userRole: string) {
  const review = await prisma.avis.findUnique({ where: { id } })
  if (!review) {
    const err = new Error('Avis introuvable') as any
    err.status = 404
    throw err
  }
  if (review.utilisateur_id !== userId && userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN') {
    const err = new Error('Non autorisé') as any
    err.status = 403
    throw err
  }
  return prisma.avis.delete({ where: { id } })
}

export async function listReviews(filters: ReviewFilters = {}) {
  const where: any = {}
  if (filters.produit_id) where.produit_id = filters.produit_id

  let orderBy: any = { createdAt: 'desc' as const }
  switch (filters.tri) {
    case 'note_desc': orderBy = { note: 'desc' as const }; break
    case 'note_asc':  orderBy = { note: 'asc' as const }; break
    case 'recent':
    default: orderBy = { createdAt: 'desc' as const }
  }

  const page = Math.max(1, filters.page ?? 1)
  const limite = Math.min(100, Math.max(1, filters.limite ?? 20))
  const skip = (page - 1) * limite

  const [avis, total] = await Promise.all([
    prisma.avis.findMany({
      where,
      include: {
        utilisateur: { select: { id: true, firstName: true, lastName: true, avatar: true } },
      },
      orderBy,
      skip,
      take: limite,
    }),
    prisma.avis.count({ where }),
  ])

  return { avis, total, page, pages: Math.ceil(total / limite) }
}

export async function getReviewById(id: string) {
  const review = await prisma.avis.findUnique({
    where: { id },
    include: {
      utilisateur: { select: { id: true, firstName: true, lastName: true, avatar: true } },
    },
  })
  if (!review) {
    const err = new Error('Avis introuvable') as any
    err.status = 404
    throw err
  }
  return review
}

/* ============================================================
   STATISTIQUES
   ============================================================ */

export async function getProductReviewStats(produit_id: string) {
  const total = await prisma.avis.count({ where: { produit_id } })
  const agg = await prisma.avis.aggregate({
    where: { produit_id },
    _avg: { note: true },
  })
  const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  if (total > 0) {
    const notes = await prisma.avis.groupBy({
      by: ['note'],
      where: { produit_id },
      _count: { note: true },
    })
    for (const n of notes) distribution[n.note] = n._count.note
  }
  return {
    moyenne: agg._avg.note ?? 0,
    total,
    distribution,
  }
}

/* ============================================================
   INCLUDES COMMUNS (utilisateur, réponse admin, votes)
   ============================================================ */

const reviewInclude = (utilisateur_id?: string) => ({
  utilisateur: { select: { id: true, firstName: true, lastName: true, avatar: true } },
  admin_repondant: { select: { id: true, firstName: true, lastName: true, avatar: true, role: true } },
  _count: {
    select: {
      votes_utiles: {
        where: { utile: true },
      },
    },
  },
  votes_utiles: utilisateur_id
    ? { where: { utilisateur_id }, take: 1, select: { utile: true } }
    : false,
}) as const

/* ── Helper pour mapper un avis avec compteurs et vote utilisateur ── */
function mapAvis(avis: any, userId?: string) {
  const utiles = Number(avis._count?.votes_utiles ?? 0)
  const monVote = (userId && avis.votes_utiles?.length ? avis.votes_utiles[0].utile : undefined) as boolean | undefined
  const { votes_utiles, _count, ...rest } = avis
  return { ...rest, utiles, mon_vote: monVote ?? null }
}

export async function listReviewsEnhanced(filters: ReviewFilters = {}, userId?: string) {
  const where: any = {}
  if (filters.produit_id) where.produit_id = filters.produit_id

  let orderBy: any = { createdAt: 'desc' as const }
  switch (filters.tri) {
    case 'note_desc': orderBy = { note: 'desc' as const }; break
    case 'note_asc':  orderBy = { note: 'asc' as const }; break
    case 'recent':
    default: orderBy = { createdAt: 'desc' as const }
  }

  const page = Math.max(1, filters.page ?? 1)
  const limite = Math.min(100, Math.max(1, filters.limite ?? 20))
  const skip = (page - 1) * limite

  const [raw, total] = await Promise.all([
    prisma.avis.findMany({
      where,
      include: reviewInclude(userId),
      orderBy,
      skip,
      take: limite,
    }),
    prisma.avis.count({ where }),
  ])

  const avis = raw.map(a => mapAvis(a, userId))
  return { avis, total, page, pages: Math.ceil(total / limite) }
}

export async function getReviewByIdEnhanced(id: string, userId?: string) {
  const raw = await prisma.avis.findUnique({
    where: { id },
    include: reviewInclude(userId),
  })
  if (!raw) {
    const err = new Error('Avis introuvable') as any; err.status = 404; throw err
  }
  return mapAvis(raw, userId)
}

/* ============================================================
   VOTE UTILE / PAS UTILE
   ============================================================ */

export async function toggleVoteUtile(avis_id: string, utilisateur_id: string, utile: boolean) {
  const avis = await prisma.avis.findUnique({ where: { id: avis_id } })
  if (!avis) {
    const err = new Error('Avis introuvable') as any; err.status = 404; throw err
  }
  const existing = await prisma.avisUtile.findUnique({
    where: { avis_id_utilisateur_id: { avis_id, utilisateur_id } },
  })

  let result: { utiles: number; mon_vote: boolean | null }

  if (existing) {
    if (existing.utile === utile) {
      // Annuler le vote
      await prisma.avisUtile.delete({ where: { avis_id_utilisateur_id: { avis_id, utilisateur_id } } })
      const utiles = await prisma.avisUtile.count({ where: { avis_id, utile: true } })
      result = { utiles, mon_vote: null }
    } else {
      // Changer le vote
      await prisma.avisUtile.update({
        where: { avis_id_utilisateur_id: { avis_id, utilisateur_id } },
        data: { utile },
      })
      const utiles = await prisma.avisUtile.count({ where: { avis_id, utile: true } })
      result = { utiles, mon_vote: utile }
    }
  } else {
    await prisma.avisUtile.create({ data: { avis_id, utilisateur_id, utile } })
    const utiles = await prisma.avisUtile.count({ where: { avis_id, utile: true } })
    result = { utiles, mon_vote: utile }
  }
  return result
}

/* ============================================================
   RÉPONSE ADMIN À UN AVIS
   ============================================================ */

export async function repondreAvis(
  avis_id: string,
  admin_id: string,
  reponse: string | null,
) {
  const avis = await prisma.avis.findUnique({ where: { id: avis_id } })
  if (!avis) {
    const err = new Error('Avis introuvable') as any; err.status = 404; throw err
  }
  const updated = await prisma.avis.update({
    where: { id: avis_id },
    data: {
      reponse_admin: reponse,
      reponse_admin_at: reponse ? new Date() : null,
      reponse_admin_id: reponse ? admin_id : null,
    },
    include: reviewInclude(),
  })
  return mapAvis(updated)
}
