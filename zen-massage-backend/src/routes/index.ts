import { Router } from 'express'
import authRoutes from './authRoutes'
import userRoutes from './userRoutes'
import appointmentRoutes from './appointmentRoutes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/appointments', appointmentRoutes)

export default router
