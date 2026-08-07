import { prisma } from '../prisma'
import { hashPassword, comparePassword } from '../utils/bcrypt'
import { randomBytes } from 'crypto'
import { sendResetPasswordEmail } from './emailService'
import type { RegisterBody, LoginBody } from '../types/requests'

export async function register(body: RegisterBody) {
  const exists = await prisma.user.findUnique({ where: { email: body.email } })
  if (exists) {
    const err = new Error('Un compte existe déjà avec cet email') as any
    err.status = 409
    throw err
  }

  const hashed = await hashPassword(body.password)
  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: hashed,
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
    },
    select: { id: true, email: true, firstName: true, lastName: true, role: true, avatar: true },
  })

  return user
}

export async function login(body: LoginBody) {
  const user = await prisma.user.findUnique({ where: { email: body.email } })
  if (!user) {
    const err = new Error('Email ou mot de passe incorrect') as any
    err.status = 401
    throw err
  }

  const valid = await comparePassword(body.password, user.password)
  if (!valid) {
    const err = new Error('Email ou mot de passe incorrect') as any
    err.status = 401
    throw err
  }

  if (user.deletedAt) {
    const err = new Error('Compte désactivé') as any
    err.status = 403
    throw err
  }

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    avatar: user.avatar,
  }
}

export async function getMe(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, firstName: true, lastName: true, role: true, avatar: true, phone: true },
  })
  if (!user) {
    const err = new Error('Utilisateur introuvable') as any
    err.status = 404
    throw err
  }
  return user
}

export async function forgotPassword(email: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  // On ne révèle pas si l'email existe ou non
  if (!user || user.deletedAt) return

  const token = randomBytes(32).toString('hex')
  const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 heure

  await prisma.user.update({
    where: { id: user.id },
    data: { reset_token: token, reset_token_expires: expires },
  })

  await sendResetPasswordEmail(email, token)
}

export async function resetPassword(token: string, newPassword: string) {
  const user = await prisma.user.findUnique({ where: { reset_token: token } })

  if (!user || !user.reset_token_expires || user.reset_token_expires < new Date()) {
    const err = new Error('Lien invalide ou expiré') as any
    err.status = 400
    throw err
  }

  const hashed = await hashPassword(newPassword)
  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashed, reset_token: null, reset_token_expires: null },
  })
}

export async function updateProfile(
  id: string,
  data: {
    firstName?: string
    lastName?: string
    phone?: string
    password?: string
  }
) {
  // Préparer les données à mettre à jour
  const updateData: any = {}

  if (data.firstName) updateData.firstName = data.firstName
  if (data.lastName) updateData.lastName = data.lastName
  if (data.phone !== undefined) updateData.phone = data.phone
  if (data.password) {
    // Hasher le mot de passe
    updateData.password = await hashPassword(data.password)
  }

  // Mettre à jour l'utilisateur
  const user = await prisma.user.update({
    where: { id },
    data: updateData,
    select: { id: true, email: true, firstName: true, lastName: true, role: true, avatar: true, phone: true },
  })

  return user
}
