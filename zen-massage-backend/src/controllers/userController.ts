import type { Request, Response, NextFunction } from 'express'
import * as userService from '../services/userService'
import * as authService from '../services/authService'

export async function list(_req: Request, res: Response, next: NextFunction) {
  try {
    const users = await userService.getUsers()
    res.json({ success: true, data: users })
  } catch (err) {
    next(err)
  }
}

export async function stats(_req: Request, res: Response, next: NextFunction) {
  try {
    const s = await userService.getUserStats()
    res.json({ success: true, data: s })
  } catch (err) {
    next(err)
  }
}

export async function updateRole(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.params.userId as string
    const { role } = req.body

    if (!role || !['SUPER_ADMIN', 'ADMIN', 'USER'].includes(role)) {
      res.status(400).json({ success: false, message: 'Rôle invalide' })
      return
    }

    const user = await userService.updateUserRole(userId, role)
    res.json({ success: true, data: user, message: 'Rôle mis à jour' })
  } catch (err) {
    next(err)
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { firstName, lastName, email, password, phone, role } = req.body

    if (!firstName || !lastName || !email || !password) {
      res.status(400).json({ success: false, message: 'Champs obligatoires : firstName, lastName, email, password' })
      return
    }

    const user = await authService.register({
      firstName,
      lastName,
      email,
      password,
      phone,
    })

    // Si un rôle différent de USER est demandé, l'appliquer
    if (role && role !== 'USER') {
      const updated = await userService.updateUserRole(user.id, role)
      res.status(201).json({ success: true, data: updated, message: 'Utilisateur créé avec succès' })
      return
    }

    res.status(201).json({ success: true, data: user, message: 'Utilisateur créé avec succès' })
  } catch (err) {
    next(err)
  }
}

export async function toggleActive(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.params.userId as string
    const user = await userService.toggleUserActive(userId)
    res.json({ success: true, data: user, message: 'Statut utilisateur modifié' })
  } catch (err) {
    next(err)
  }
}
