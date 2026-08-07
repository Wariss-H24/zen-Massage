import type { Request, Response, NextFunction } from 'express'
import * as authService from '../services/authService'
import { signToken } from '../utils/jwt'
import { COOKIE_NAME, COOKIE_OPTIONS } from '../utils/constants'

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await authService.register(req.body)
    const token = signToken({ id: user.id, role: user.role })
    res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS)
    res.status(201).json({ success: true, message: 'Compte créé avec succès', data: user })
  } catch (err) {
    next(err)
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await authService.login(req.body)
    const token = signToken({ id: user.id, role: user.role })
    res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS)
    res.json({ success: true, message: 'Connexion réussie', data: user })
  } catch (err) {
    next(err)
  }
}

export async function logout(_req: Request, res: Response) {
  res.clearCookie(COOKIE_NAME, { path: '/' })
  res.json({ success: true, message: 'Déconnexion réussie' })
}

export async function me(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await authService.getMe(res.locals.user.id)
    res.json({ success: true, message: 'OK', data: user })
  } catch (err) {
    next(err)
  }
}

export async function forgotPassword(req: Request, res: Response, next: NextFunction) {
  try {
    await authService.forgotPassword(req.body.email)
    res.json({ success: true, message: 'Si cet email existe, un lien a été envoyé.' })
  } catch (err) {
    next(err)
  }
}

export async function resetPassword(req: Request, res: Response, next: NextFunction) {
  try {
    await authService.resetPassword(req.body.token, req.body.password)
    res.json({ success: true, message: 'Mot de passe réinitialisé avec succès.' })
  } catch (err) {
    next(err)
  }
}

export async function updateProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await authService.updateProfile(
      res.locals.user.id,
      req.body
    )
    res.json({ success: true, message: 'Profil mis à jour avec succès', data: user })
  } catch (err) {
    next(err)
  }
}
