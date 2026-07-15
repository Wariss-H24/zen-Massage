import type { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt'
import { COOKIE_NAME } from '../utils/constants'

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.[COOKIE_NAME]
  if (!token) {
    res.status(401).json({ success: false, message: 'Non authentifié' })
    return
  }
  try {
    res.locals.user = verifyToken(token)
    next()
  } catch {
    res.status(401).json({ success: false, message: 'Token invalide ou expiré' })
  }
}
