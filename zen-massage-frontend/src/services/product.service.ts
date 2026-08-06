import { api } from './api'
import type {
  Categorie,
  Produit,
  ProduitDetail,
  ListProduitsResponse,
  ProduitFilters,
  ProduitCreateInput,
  ProduitUpdateInput,
  LikeResult,
} from '../types/product'

interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface BatchStockItem {
  id: string
  exists: boolean
  publie: boolean
  nom: string | null
  stock: number
}

export const productService = {
  /* ---- CATÉGORIES ---- */
  getCategories: () =>
    api.get<ApiResponse<Categorie[]>>('/products/categories'),

  getCategorie: (id: string) =>
    api.get<ApiResponse<Categorie>>(`/products/categories/${id}`),

  createCategorie: (body: Partial<Categorie>) =>
    api.post<ApiResponse<Categorie>>('/products/categories', body),

  updateCategorie: (id: string, body: Partial<Categorie>) =>
    api.put<ApiResponse<Categorie>>(`/products/categories/${id}`, body),

  deleteCategorie: (id: string) =>
    api.delete<ApiResponse<null>>(`/products/categories/${id}`),

  /* ---- PRODUITS ---- */
  listProduits: (filters?: ProduitFilters) => {
    const params = new URLSearchParams()
    if (filters?.categorie_id) params.set('categorie_id', filters.categorie_id)
    if (filters?.recherche)    params.set('recherche', filters.recherche)
    if (filters?.tri)          params.set('tri', filters.tri)
    if (filters?.page)         params.set('page', String(filters.page))
    if (filters?.limite)       params.set('limite', String(filters.limite))
    if (filters?.publie !== undefined) params.set('publie', String(filters.publie))
    const qs = params.toString()
    return api.get<ApiResponse<ListProduitsResponse>>(`/products${qs ? `?${qs}` : ''}`)
  },

  listProduitsAdmin: (filters?: ProduitFilters) => {
    const params = new URLSearchParams()
    if (filters?.categorie_id) params.set('categorie_id', filters.categorie_id)
    if (filters?.recherche)    params.set('recherche', filters.recherche)
    if (filters?.tri)          params.set('tri', filters.tri)
    if (filters?.page)         params.set('page', String(filters.page))
    if (filters?.limite)       params.set('limite', String(filters.limite))
    if (filters?.publie !== undefined) params.set('publie', String(filters.publie))
    const qs = params.toString()
    return api.get<ApiResponse<ListProduitsResponse>>(`/products/admin${qs ? `?${qs}` : ''}`)
  },

  getProduit: (id: string) =>
    api.get<ApiResponse<ProduitDetail>>(`/products/${id}`),

  createProduit: (body: ProduitCreateInput) =>
    api.post<ApiResponse<Produit>>('/products', body),

  updateProduit: (id: string, body: ProduitUpdateInput) =>
    api.put<ApiResponse<Produit>>(`/products/${id}`, body),

  deleteProduit: (id: string) =>
    api.delete<ApiResponse<null>>(`/products/${id}`),

  batchStocks: (ids: string[]) =>
    api.post<ApiResponse<BatchStockItem[]>>('/products/batch-stocks', { ids }),

  /* ---- LIKES ---- */
  toggleLike: (id: string) =>
    api.post<ApiResponse<LikeResult>>(`/products/${id}/like`),

  getLikesCount: (id: string) =>
    api.get<ApiResponse<{ count: number }>>(`/products/${id}/likes/count`),

  getLikeStatus: (id: string) =>
    api.get<ApiResponse<{ liked: boolean }>>(`/products/${id}/likes/status`),

  uploadProductImages: (files: File[]) => {
    const formData = new FormData()
    for (const f of files) formData.append('images', f)
    return api.post<ApiResponse<{ urls: string[] }>>('/products/images/upload', formData)
  },
}
