"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNotesAdminSchema = exports.updateAppointmentStatusSchema = exports.updateAppointmentSchema = exports.createAppointmentSchema = exports.updateTypeSeanceSchema = exports.createTypeSeanceSchema = void 0;
const zod_1 = require("zod");
const timeRegex = /^\d{2}:\d{2}$/;
/* ── TypeSeance ── */
exports.createTypeSeanceSchema = zod_1.z.object({
    nom: zod_1.z.string().min(1, 'Le nom est requis').max(100),
    description: zod_1.z.string().min(1, 'La description est requise').max(1000),
    duree: zod_1.z.number({ invalid_type_error: 'La durée doit être un nombre' }).int().min(15, 'Durée minimum 15 min').max(480, 'Durée maximum 8h'),
    prix: zod_1.z.number({ invalid_type_error: 'Le prix doit être un nombre' }).min(0, 'Le prix ne peut pas être négatif'),
    actif: zod_1.z.boolean().optional().default(true),
});
exports.updateTypeSeanceSchema = exports.createTypeSeanceSchema.partial();
/* ── RendezVous ── */
exports.createAppointmentSchema = zod_1.z.object({
    date_heure: zod_1.z.string({ required_error: 'La date est requise' }).datetime({ message: 'Format de date invalide (ISO 8601 attendu)' }),
    duree: zod_1.z.number({ invalid_type_error: 'La durée doit être un nombre' }).int().min(15).max(480),
    type_seance_id: zod_1.z.string({ required_error: 'Le type de séance est requis' }).uuid('ID de séance invalide'),
    notes: zod_1.z.string().max(500).optional(),
});
exports.updateAppointmentSchema = exports.createAppointmentSchema.partial();
exports.updateAppointmentStatusSchema = zod_1.z.object({
    statut: zod_1.z.enum(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'], {
        errorMap: () => ({ message: 'Statut invalide' }),
    }),
    raison_refus: zod_1.z.string().max(500).optional(),
});
exports.updateNotesAdminSchema = zod_1.z.object({
    notes_admin: zod_1.z.string().max(1000).nullable(),
});
