import { api } from './api'
import type {
  Review,
  ListReviewsResponse,
  ReviewStats,
  ReviewCreateInput,
  ReviewUpdateInput,
  ReviewFilters,
  ReviewVoteResult,
} from '../types/review'

interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export const reviewService = {
  listReviews: (filters?: ReviewFilters) => {
    const params = new URLSearchParams()
    if (filters?.produit_id) params.set('produit_id', filters.produit_id)
    if (filters?.tri)        params.set('tri', filters.tri)
    if (filters?.page)       params.set('page', String(filters.page))
    if (filters?.limite)     params.set('limite', String(filters.limite))
    const qs = params.toString()
    return api.get<ApiResponse<ListReviewsResponse>>(`/reviews${qs ? `?${qs}` : ''}`)
  },

  getReview: (id: string) =>
    api.get<ApiResponse<Review>>(`/reviews/${id}`),

  listProductReviews: (productId: string, filters?: Omit<ReviewFilters, 'produit_id'>) => {
    const params = new URLSearchParams()
    if (filters?.tri)    params.set('tri', filters.tri)
    if (filters?.page)   params.set('page', String(filters.page))
    if (filters?.limite) params.set('limite', String(filters.limite))
    const qs = params.toString()
    return api.get<ApiResponse<ListReviewsResponse>>(`/reviews/product/${productId}${qs ? `?${qs}` : ''}`)
  },

  getProductStats: (productId: string) =>
    api.get<ApiResponse<ReviewStats>>(`/reviews/product/${productId}/stats`),

  createReview: (body: ReviewCreateInput) =>
    api.post<ApiResponse<Review>>('/reviews', body),

  updateReview: (id: string, body: ReviewUpdateInput) =>
    api.put<ApiResponse<Review>>(`/reviews/${id}`, body),

  deleteReview: (id: string) =>
    api.delete<ApiResponse<null>>(`/reviews/${id}`),

  voteUtile: (reviewId: string, utile: boolean) =>
    api.post<ApiResponse<ReviewVoteResult>>(`/reviews/${reviewId}/vote-utile`, { utile }),

  repondreAdmin: (reviewId: string, reponse: string | null) =>
    api.patch<ApiResponse<Review>>(`/reviews/${reviewId}/reponse-admin`, { reponse }),
}
