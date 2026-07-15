import type { Request, Response, NextFunction } from 'express'
import type { UserRole } from '../types/user'

export function requireRole(...roles: UserRole[]) {
  return (_req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user
    if (!user || !roles.includes(user.role)) {
      res.status(403).json({ success: false, message: 'Accès refusé' })
      return
    }
    next()
  }
}
