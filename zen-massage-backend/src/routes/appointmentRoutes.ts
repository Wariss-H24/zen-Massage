
import { Router } from 'express'
import * as appointment from '../controllers/appointmentController'
import { requireAuth } from '../middlewares/auth'
import { requireRole } from '../middlewares/roleCheck'

const router = Router()

// Routes publiques
router.get('/type-seances', appointment.getTypeSeances)
router.get('/public', appointment.getPublicAppointments)
router.get('/config', appointment.getScheduleConfig)

// Routes admin — gestion des types de séance
router.get('/type-seances/all',    requireAuth, requireRole('ADMIN', 'SUPER_ADMIN'), appointment.getAllTypeSeancesAdmin)
router.post('/type-seances',       requireAuth, requireRole('ADMIN', 'SUPER_ADMIN'), appointment.createTypeSeance)
router.put('/type-seances/:id',    requireAuth, requireRole('ADMIN', 'SUPER_ADMIN'), appointment.updateTypeSeance)
router.delete('/type-seances/:id', requireAuth, requireRole('ADMIN', 'SUPER_ADMIN'), appointment.deleteTypeSeance)

// Routes utilisateur connecté
router.post('/', requireAuth, appointment.createAppointment)
router.get('/my', requireAuth, appointment.getMyAppointments)

router.put('/config', requireAuth, requireRole('ADMIN', 'SUPER_ADMIN'), appointment.updateScheduleConfig)

router.patch('/:id/cancel', requireAuth, appointment.cancelAppointment)
router.put('/:id', requireAuth, appointment.updateAppointment)

// Routes admin
router.get('/all', requireAuth, requireRole('ADMIN', 'SUPER_ADMIN'), appointment.getAllAppointments)
router.put('/:id/status', requireAuth, requireRole('ADMIN', 'SUPER_ADMIN'), appointment.updateAppointmentStatus)
router.patch('/:id/notes-admin', requireAuth, requireRole('ADMIN', 'SUPER_ADMIN'), appointment.updateNotesAdmin)

export default router
