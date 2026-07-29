export interface CategorieCreate {
  nom: string
  description?: string
  icone?: string
  ordre?: number
}

export interface CategorieUpdate {
  nom?: string
  description?: string
  icone?: string
  ordre?: number
}

export interface ProduitCreate {
  nom: string
  description: string
  prix: number
  stock: number
  categorie_id: string
  images?: string[]
  sku?: string
  publie?: boolean
}

export interface ProduitUpdate {
  nom?: string
  description?: string
  prix?: number
  stock?: number
  categorie_id?: string
  images?: string[]
  sku?: string
  publie?: boolean
}

export interface ProduitFilters {
  categorie_id?: string
  recherche?: string
  tri?: 'prix_asc' | 'prix_desc' | 'recent' | 'populaire' | 'avis_desc'
  page?: number
  limite?: number
  publie?: boolean
}
