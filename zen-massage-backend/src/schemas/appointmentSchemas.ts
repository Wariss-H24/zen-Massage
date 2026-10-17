import { z } from 'zod'

const timeRegex = /^\d{2}:\d{2}$/

/* ── TypeSeance ── */
export const createTypeSeanceSchema = z.object({
  nom:         z.string().min(1, 'Le nom est requis').max(100),
  description: z.string().min(1, 'La description est requise').max(1000),
  duree:       z.number({ invalid_type_error: 'La durée doit être un nombre' }).int().min(15, 'Durée minimum 15 min').max(480, 'Durée maximum 8h'),
  prix:        z.number({ invalid_type_error: 'Le prix doit être un nombre' }).min(0, 'Le prix ne peut pas être négatif'),
  actif:       z.boolean().optional().default(true),
})

export const updateTypeSeanceSchema = createTypeSeanceSchema.partial()

/* ── RendezVous ── */
export const createAppointmentSchema = z.object({
  date_heure:     z.string({ required_error: 'La date est requise' }).datetime({ message: 'Format de date invalide (ISO 8601 attendu)' }),
  duree:          z.number({ invalid_type_error: 'La durée doit être un nombre' }).int().min(15).max(480),
  type_seance_id: z.string({ required_error: 'Le type de séance est requis' }).min(1, 'ID de séance invalide'),
  notes:          z.string().max(500).optional(),
})

export const updateAppointmentSchema = createAppointmentSchema.partial()

export const updateAppointmentStatusSchema = z.object({
  statut:       z.enum(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'], {
    errorMap: () => ({ message: 'Statut invalide' }),
  }),
  raison_refus: z.string().max(500).optional(),
})

export const updateNotesAdminSchema = z.object({
  notes_admin: z.string().max(1000).nullable(),
})
