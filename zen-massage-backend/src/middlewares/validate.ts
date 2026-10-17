import type { Request, Response, NextFunction } from 'express'
import { ZodSchema, ZodError } from 'zod'

/**
 * Middleware générique de validation Zod.
 * Valide `req.body` contre le schéma fourni.
 * En cas d'échec, renvoie un 400 avec le détail des erreurs.
 */
export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      const errors = (result.error as ZodError).errors.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      }))
      return res.status(400).json({
        success: false,
        message: errors[0]?.message ?? 'Données invalides',
        errors,
      })
    }
    // Remplace req.body par les données parsées et assainies par Zod
    req.body = result.data
    next()
  }
}
