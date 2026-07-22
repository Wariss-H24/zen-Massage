
import { Router } from 'express'
import * as appointment from '../controllers/appointmentController'
import { requireAuth } from '../middlewares/auth'
import { requireRole } from '../middlewares/roleCheck'

const router = Router()

// Routes publiques
router.get('/type-seances', appointment.getTypeSeances)
router.get('/public', appointment.getPublicAppointments)

// Routes utilisateur connecté
router.post('/', requireAuth, appointment.createAppointment)
router.get('/my', requireAuth, appointment.getMyAppointments)

router.patch('/:id/cancel', requireAuth, appointment.cancelAppointment)
router.put('/:id', requireAuth, appointment.updateAppointment)

// Routes admin
router.get('/all', requireAuth, requireRole('ADMIN', 'SUPER_ADMIN'), appointment.getAllAppointments)
router.put('/:id/status', requireAuth, requireRole('ADMIN', 'SUPER_ADMIN'), appointment.updateAppointmentStatus)

export default router
