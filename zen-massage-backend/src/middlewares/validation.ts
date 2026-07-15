import type { Request, Response, NextFunction } from 'express'

export function validateBody(fields: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const missing = fields.filter(f => !req.body[f])
    if (missing.length) {
      res.status(400).json({ success: false, message: `Champs manquants : ${missing.join(', ')}` })
      return
    }
    next()
  }
}
