
import { api } from './api'

// Type pour TypeSeance
export interface TypeSeance {
  id: string
  nom: string
  description: string
  duree: number
  prix: number
  actif: boolean
  createdAt: string
  updatedAt: string
}

// Type pour RendezVous
export interface RendezVous {
  id: string
  utilisateur_id: string
  date_heure: string
  duree: number
  type_seance_id: string
  notes?: string
  statut: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
  raison_refus?: string
  createdAt: string
  updatedAt: string
  type_seance: TypeSeance
}

export interface PublicRendezVous {
  id: string
  date_heure: string
  duree: number
  statut: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
  type_seance_id: string
}

interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export const appointmentService = {
  // Récupérer tous les types de séance
  getTypeSeances: () =>
    api.get<ApiResponse<TypeSeance[]>>('/appointments/type-seances'),

  // Créer un rendez-vous
  createAppointment: (body: {
    date_heure: string
    duree: number
    type_seance_id: string
    notes?: string
  }) =>
    api.post<ApiResponse<RendezVous>>('/appointments', body),

  // Récupérer mes rendez-vous
  getMyAppointments: () =>
    api.get<ApiResponse<RendezVous[]>>('/appointments/my'),

  // Récupérer les rendez-vous publics pour calculer les disponibilites
  getPublicAppointments: () =>
    api.get<ApiResponse<PublicRendezVous[]>>('/appointments/public'),

  // Modifier un rendez-vous
  updateAppointment: (
    id: string,
    body: {
      date_heure?: string
      duree?: number
      type_seance_id?: string
      notes?: string
    }
  ) => api.put<ApiResponse<RendezVous>>(`/appointments/${id}`, body),

  // Annuler un rendez-vous
  cancelAppointment: (id: string) =>
    api.patch<ApiResponse<RendezVous>>(`/appointments/${id}/cancel`),
}
