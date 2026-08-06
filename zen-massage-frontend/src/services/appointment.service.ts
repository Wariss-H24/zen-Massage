
import { api } from './api'

export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

export interface TimeRange {
  start: string
  end: string
}

export interface DaySchedule {
  active: boolean
  start: string
  end: string
}

export interface AppointmentScheduleConfig {
  version: 1
  slotStepMinutes: 30
  days: Record<DayKey, DaySchedule>
  pause?: TimeRange
  blocked?: Partial<Record<DayKey, TimeRange[]>>
}

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

// Type pour RendezVous avec utilisateur (admin view)
export interface RendezVousWithUser extends RendezVous {
  notes_admin?: string | null
  utilisateur: {
    id: string
    email: string
    firstName: string
    lastName: string
  }
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
  // Récupérer tous les types de séance (public — actifs uniquement)
  getTypeSeances: () =>
    api.get<ApiResponse<TypeSeance[]>>('/appointments/type-seances'),

  // Récupérer tous les types de séance (admin — actifs + inactifs)
  getAllTypeSeancesAdmin: () =>
    api.get<ApiResponse<TypeSeance[]>>('/appointments/type-seances/all'),

  // Créer un type de séance (admin)
  createTypeSeance: (body: {
    nom: string
    description: string
    duree: number
    prix: number
    actif?: boolean
  }) => api.post<ApiResponse<TypeSeance>>('/appointments/type-seances', body),

  // Modifier un type de séance (admin)
  updateTypeSeance: (id: string, body: {
    nom?: string
    description?: string
    duree?: number
    prix?: number
    actif?: boolean
  }) => api.put<ApiResponse<TypeSeance>>(`/appointments/type-seances/${id}`, body),

  // Supprimer un type de séance (admin)
  deleteTypeSeance: (id: string) =>
    api.delete<ApiResponse<null>>(`/appointments/type-seances/${id}`),

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
  ) => api.put<ApiResponse<RendezVousWithUser>>(`/appointments/${id}`, body),

  // Annuler un rendez-vous
  cancelAppointment: (id: string) =>
    api.patch<ApiResponse<RendezVous>>(`/appointments/${id}/cancel`),

  // --- Admin methods ---
  // Récupérer TOUS les rendez-vous
  getAllAppointments: () =>
    api.get<ApiResponse<RendezVousWithUser[]>>('/appointments/all'),

  // Mettre à jour le statut d'un rendez-vous
  updateAppointmentStatus: (
    id: string,
    body: {
      statut: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
      raison_refus?: string
    }
  ) => api.put<ApiResponse<RendezVousWithUser>>(`/appointments/${id}/status`, body),

  // Mettre à jour les notes admin privées d'un rendez-vous
  updateNotesAdmin: (id: string, notes_admin: string | null) =>
    api.patch<ApiResponse<RendezVousWithUser>>(`/appointments/${id}/notes-admin`, { notes_admin }),

  getScheduleConfig: () =>
    api.get<ApiResponse<AppointmentScheduleConfig>>('/appointments/config'),

  updateScheduleConfig: (body: AppointmentScheduleConfig) =>
    api.put<ApiResponse<AppointmentScheduleConfig>>('/appointments/config', body),
}
