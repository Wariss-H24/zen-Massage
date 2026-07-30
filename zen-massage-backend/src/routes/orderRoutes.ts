import { Router } from 'express'
import * as order from '../controllers/orderController'
import { requireAuth } from '../middlewares/auth'
import { requireRole } from '../middlewares/roleCheck'

const router = Router()

// Utilisateur connecté
router.post('/',              requireAuth, order.createCommande)
router.get('/my',             requireAuth, order.getMyCommandes)
router.get('/:id',            requireAuth, order.getCommande)
router.patch('/:id/cancel',   requireAuth, order.cancelCommande)

// Admin
router.get('/',               requireAuth, requireRole('ADMIN', 'SUPER_ADMIN'), order.getAllCommandes)
router.patch('/:id/status',   requireAuth, requireRole('ADMIN', 'SUPER_ADMIN'), order.updateStatut)

export default router
