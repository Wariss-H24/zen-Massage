import { Router } from 'express'
import authRoutes from './authRoutes'
import userRoutes from './userRoutes'
import appointmentRoutes from './appointmentRoutes'
import productRoutes from './productRoutes'
import reviewRoutes from './reviewRoutes'
import orderRoutes from './orderRoutes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/appointments', appointmentRoutes)
router.use('/products', productRoutes)
router.use('/reviews', reviewRoutes)
router.use('/orders', orderRoutes)

export default router
