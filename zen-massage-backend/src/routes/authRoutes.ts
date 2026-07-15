import { Router } from 'express'
import * as auth from '../controllers/authController'
import { requireAuth } from '../middlewares/auth'
import { validateBody } from '../middlewares/validation'

const router = Router()

router.post('/register', validateBody(['firstName', 'lastName', 'email', 'password']), auth.register)
router.post('/login',    validateBody(['email', 'password']), auth.login)
router.post('/logout',   auth.logout)
router.get('/me',        requireAuth, auth.me)

export default router
