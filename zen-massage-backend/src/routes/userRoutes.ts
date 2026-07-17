import { Router } from 'express'
import { requireAuth } from '../middlewares/auth'
import { requireRole } from '../middlewares/roleCheck'
import * as userController from '../controllers/userController'

const router = Router()

// Toutes les routes nécessitent auth + rôle SUPER_ADMIN
router.use(requireAuth)
router.use(requireRole('SUPER_ADMIN'))

router.get('/', userController.list)
router.get('/stats', userController.stats)
router.post('/', userController.create)
router.patch('/:userId/role', userController.updateRole)
router.patch('/:userId/toggle-active', userController.toggleActive)

export default router
