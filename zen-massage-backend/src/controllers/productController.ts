import type { Request, Response, NextFunction } from 'express'
import * as productService from '../services/productService'
import type { ProduitFilters } from '../types/product'

/* ============================================================
   CATÉGORIES
   ============================================================ */

export async function createCategorie(req: Request, res: Response, next: NextFunction) {
  try {
    const categorie = await productService.createCategorie(req.body)
    res.status(201).json({ success: true, message: 'Catégorie créée', data: categorie })
  } catch (err) { next(err) }
}

export async function updateCategorie(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string
    const categorie = await productService.updateCategorie(id, req.body)
    res.json({ success: true, message: 'Catégorie mise à jour', data: categorie })
  } catch (err) { next(err) }
}

export async function deleteCategorie(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string
    await productService.deleteCategorie(id)
    res.json({ success: true, message: 'Catégorie supprimée' })
  } catch (err) { next(err) }
}

export async function listCategories(_req: Request, res: Response, next: NextFunction) {
  try {
    const categories = await productService.getAllCategories()
    res.json({ success: true, data: categories })
  } catch (err) { next(err) }
}

export async function getCategorie(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string
    const categorie = await productService.getCategorieById(id)
    res.json({ success: true, data: categorie })
  } catch (err) { next(err) }
}

/* ============================================================
   PRODUITS
   ============================================================ */

function parseFilters(query: any): ProduitFilters {
  const filters: ProduitFilters = {}
  if (query.categorie_id) filters.categorie_id = String(query.categorie_id)
  if (query.recherche) filters.recherche = String(query.recherche)
  if (query.tri) filters.tri = query.tri as ProduitFilters['tri']
  if (query.page) filters.page = parseInt(String(query.page), 10) || 1
  if (query.limite) filters.limite = parseInt(String(query.limite), 10) || 20
  if (query.publie !== undefined) {
    const v = String(query.publie).toLowerCase()
    if (v === 'true' || v === '1') filters.publie = true
    if (v === 'false' || v === '0') filters.publie = false
  }
  return filters
}

export async function createProduit(req: Request, res: Response, next: NextFunction) {
  try {
    const produit = await productService.createProduit(req.body)
    res.status(201).json({ success: true, message: 'Produit créé', data: produit })
  } catch (err) { next(err) }
}

export async function updateProduit(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string
    const produit = await productService.updateProduit(id, req.body)
    res.json({ success: true, message: 'Produit mis à jour', data: produit })
  } catch (err) { next(err) }
}

export async function deleteProduit(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string
    await productService.deleteProduit(id)
    res.json({ success: true, message: 'Produit supprimé' })
  } catch (err) { next(err) }
}

export async function listProduits(req: Request, res: Response, next: NextFunction) {
  try {
    const filters = parseFilters(req.query)
    const result = await productService.listProduits(filters)
    res.json({ success: true, data: result })
  } catch (err) { next(err) }
}

export async function listProduitsAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const filters = parseFilters(req.query)
    const result = await productService.listProduits(filters, true)
    res.json({ success: true, data: result })
  } catch (err) { next(err) }
}

export async function getProduit(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string
    const { produit, moyenne } = await productService.getProduitById(id)
    res.json({ success: true, data: { produit, moyenne } })
  } catch (err) { next(err) }
}

/* ============================================================
   LIKES
   ============================================================ */

export async function toggleLike(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string
    const userId = res.locals.user.id
    const result = await productService.toggleLike(id, userId)
    res.json({ success: true, data: result })
  } catch (err) { next(err) }
}

export async function getLikesCount(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string
    const count = await productService.getLikesCount(id)
    res.json({ success: true, data: { count } })
  } catch (err) { next(err) }
}

export async function getLikeStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string
    const userId = res.locals.user.id
    const liked = await productService.getLikeStatus(id, userId)
    res.json({ success: true, data: { liked } })
  } catch (err) { next(err) }
}
