import { api } from './api'

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'

export interface LigneCommande {
  id: string
  produit_id: string
  nom_produit: string
  image?: string
  prix_unitaire: number
  quantite: number
  sous_total: number
  produit?: { id: string; nom: string; images: string[] }
}

export interface Commande {
  id: string
  numero: string
  utilisateur_id: string
  statut: OrderStatus
  total: number
  frais_livraison: number
  ville: string
  adresse: string
  telephone: string
  mode_paiement: string
  notes?: string
  createdAt: string
  updatedAt: string
  lignes: LigneCommande[]
  utilisateur?: { id: string; firstName: string; lastName: string; email: string }
}

interface ApiResponse<T> {
  success: boolean
  message?: string
  data: T
}

export interface CreateCommandeInput {
  items: Array<{
    produit_id: string
    nom_produit: string
    image?: string
    prix_unitaire: number
    quantite: number
  }>
  ville: string
  adresse: string
  telephone: string
  mode_paiement: string
  frais_livraison?: number
  notes?: string
}

export const orderService = {
  // Créer une commande
  createCommande: (body: CreateCommandeInput) =>
    api.post<ApiResponse<Commande>>('/orders', body),

  // Mes commandes
  getMyCommandes: () =>
    api.get<ApiResponse<Commande[]>>('/orders/my'),

  // Détail d'une commande
  getCommande: (id: string) =>
    api.get<ApiResponse<Commande>>(`/orders/${id}`),

  // Annuler une commande
  cancelCommande: (id: string) =>
    api.patch<ApiResponse<Commande>>(`/orders/${id}/cancel`),

  // Admin — toutes les commandes
  getAllCommandes: (params?: { statut?: OrderStatus; page?: number; limite?: number }) => {
    const qs = new URLSearchParams()
    if (params?.statut) qs.set('statut', params.statut)
    if (params?.page)   qs.set('page',   String(params.page))
    if (params?.limite) qs.set('limite', String(params.limite))
    const q = qs.toString()
    return api.get<ApiResponse<{ commandes: Commande[]; total: number; page: number; pages: number }>>(`/orders${q ? `?${q}` : ''}`)
  },

  // Admin — changer le statut
  updateStatut: (id: string, statut: OrderStatus) =>
    api.patch<ApiResponse<Commande>>(`/orders/${id}/status`, { statut }),
}
