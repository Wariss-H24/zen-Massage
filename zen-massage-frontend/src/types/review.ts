export interface ReviewUser {
  id: string
  firstName: string
  lastName: string
  avatar?: string
}

export interface Review {
  id: string
  note: number
  titre: string
  contenu: string
  produit_id: string
  utilisateur_id: string
  createdAt: string
  updatedAt: string
  utilisateur: ReviewUser
}

export interface ListReviewsResponse {
  avis: Review[]
  total: number
  page: number
  pages: number
}

export interface ReviewStats {
  moyenne: number
  total: number
  distribution: Record<number, number>
}

export interface ReviewCreateInput {
  note: number
  titre: string
  contenu: string
  produit_id: string
}

export interface ReviewUpdateInput {
  note?: number
  titre?: string
  contenu?: string
}

export interface ReviewFilters {
  produit_id?: string
  tri?: 'recent' | 'note_desc' | 'note_asc'
  page?: number
  limite?: number
}
