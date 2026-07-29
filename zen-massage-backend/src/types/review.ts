export interface ReviewCreate {
  note: number
  titre: string
  contenu: string
  produit_id: string
  utilisateur_id: string
}

export interface ReviewUpdate {
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
