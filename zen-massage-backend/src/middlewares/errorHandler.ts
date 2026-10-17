import type { Request, Response, NextFunction } from 'express'
import { AppError } from '../utils/AppError'

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.status).json({ success: false, message: err.message })
  }
  // Erreurs inattendues : on log le stack complet mais on ne l'expose pas
  console.error(err)
  const status = (err as any).status ?? 500
  res.status(status).json({ success: false, message: err.message || 'Erreur serveur' })
}
