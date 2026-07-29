export interface Categorie {
  id: string
  nom: string
  description?: string
  icone?: string
  ordre: number
  createdAt: string
}

export interface Produit {
  id: string
  nom: string
  description: string
  prix: number
  stock: number
  categorie_id: string
  images: string[]
  sku?: string
  publie: boolean
  createdAt: string
  updatedAt: string
  categorie?: Categorie
  _count?: { avis: number; likes: number }
}

export interface ProduitDetail {
  produit: Produit
  moyenne: number
}

export interface ListProduitsResponse {
  produits: Produit[]
  total: number
  page: number
  pages: number
}

export interface ProduitFilters {
  categorie_id?: string
  recherche?: string
  tri?: 'prix_asc' | 'prix_desc' | 'recent' | 'populaire' | 'avis_desc'
  page?: number
  limite?: number
  publie?: boolean
}

export interface ProduitCreateInput {
  nom: string
  description: string
  prix: number
  stock: number
  categorie_id: string
  images?: string[]
  sku?: string
  publie?: boolean
}

export interface ProduitUpdateInput {
  nom?: string
  description?: string
  prix?: number
  stock?: number
  categorie_id?: string
  images?: string[]
  sku?: string
  publie?: boolean
}

export interface LikeResult {
  count: number
  liked: boolean
}
