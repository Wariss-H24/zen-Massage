import type { Request, Response, NextFunction } from 'express'
import * as reviewService from '../services/reviewService'
import type { ReviewFilters } from '../types/review'

function parseFilters(query: any): ReviewFilters {
  const filters: ReviewFilters = {}
  if (query.produit_id) filters.produit_id = String(query.produit_id)
  if (query.tri) filters.tri = query.tri as ReviewFilters['tri']
  if (query.page) filters.page = parseInt(String(query.page), 10) || 1
  if (query.limite) filters.limite = parseInt(String(query.limite), 10) || 20
  return filters
}

export async function createReview(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = res.locals.user.id
    const avis = await reviewService.createReview({
      ...req.body,
      utilisateur_id: userId,
    })
    res.status(201).json({ success: true, message: 'Avis créé', data: avis })
  } catch (err) { next(err) }
}

export async function updateReview(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string
    const userId = res.locals.user.id
    const userRole = res.locals.user.role
    const avis = await reviewService.updateReview(id, userId, userRole, req.body)
    res.json({ success: true, message: 'Avis mis à jour', data: avis })
  } catch (err) { next(err) }
}

export async function deleteReview(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string
    const userId = res.locals.user.id
    const userRole = res.locals.user.role
    await reviewService.deleteReview(id, userId, userRole)
    res.json({ success: true, message: 'Avis supprimé' })
  } catch (err) { next(err) }
}

export async function listReviews(req: Request, res: Response, next: NextFunction) {
  try {
    const filters = parseFilters(req.query)
    const userId = res.locals.user?.id
    const result = await reviewService.listReviewsEnhanced(filters, userId)
    res.json({ success: true, data: result })
  } catch (err) { next(err) }
}

export async function getReview(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string
    const userId = res.locals.user?.id
    const avis = await reviewService.getReviewByIdEnhanced(id, userId)
    res.json({ success: true, data: avis })
  } catch (err) { next(err) }
}

export async function listProductReviews(req: Request, res: Response, next: NextFunction) {
  try {
    const produit_id = req.params.productId as string
    const filters = parseFilters(req.query)
    filters.produit_id = produit_id
    const userId = res.locals.user?.id
    const result = await reviewService.listReviewsEnhanced(filters, userId)
    res.json({ success: true, data: result })
  } catch (err) { next(err) }
}

/* ── Voter Utile / Pas utile sur un avis ── */
export async function voteUtile(req: Request, res: Response, next: NextFunction) {
  try {
    const avis_id = req.params.id as string
    const utilisateur_id = res.locals.user.id
    const { utile } = req.body
    if (typeof utile !== 'boolean') {
      const err = new Error('Paramètre "utile" booléen attendu') as any; err.status = 400; throw err
    }
    const result = await reviewService.toggleVoteUtile(avis_id, utilisateur_id, utile)
    res.json({ success: true, message: 'Vote enregistré', data: result })
  } catch (err) { next(err) }
}

/* ── Répondre à un avis (ADMIN uniquement) ── */
export async function repondreAvis(req: Request, res: Response, next: NextFunction) {
  try {
    const avis_id = req.params.id as string
    const admin_id = res.locals.user.id
    const { reponse } = req.body
    const reponseClean = typeof reponse === 'string' ? reponse.trim() : null
    const finalReponse = reponseClean && reponseClean.length > 0 ? reponseClean : null
    if (finalReponse && finalReponse.length > 1000) {
      const err = new Error('La réponse admin est trop longue (max 1000 caractères)') as any; err.status = 400; throw err
    }
    const result = await reviewService.repondreAvis(avis_id, admin_id, finalReponse)
    res.json({
      success: true,
      message: finalReponse ? 'Réponse publiée' : 'Réponse supprimée',
      data: result,
    })
  } catch (err) { next(err) }
}

export async function getProductStats(req: Request, res: Response, next: NextFunction) {
  try {
    const produit_id = req.params.productId as string
    const stats = await reviewService.getProductReviewStats(produit_id)
    res.json({ success: true, data: stats })
  } catch (err) { next(err) }
}
