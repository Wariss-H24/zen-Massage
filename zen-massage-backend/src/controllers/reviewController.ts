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
    const result = await reviewService.listReviews(filters)
    res.json({ success: true, data: result })
  } catch (err) { next(err) }
}

export async function getReview(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string
    const avis = await reviewService.getReviewById(id)
    res.json({ success: true, data: avis })
  } catch (err) { next(err) }
}

export async function listProductReviews(req: Request, res: Response, next: NextFunction) {
  try {
    const produit_id = req.params.productId as string
    const filters = parseFilters(req.query)
    filters.produit_id = produit_id
    const result = await reviewService.listReviews(filters)
    res.json({ success: true, data: result })
  } catch (err) { next(err) }
}

export async function getProductStats(req: Request, res: Response, next: NextFunction) {
  try {
    const produit_id = req.params.productId as string
    const stats = await reviewService.getProductReviewStats(produit_id)
    res.json({ success: true, data: stats })
  } catch (err) { next(err) }
}
