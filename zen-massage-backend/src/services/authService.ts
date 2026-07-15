import { prisma } from '../prisma'
import { hashPassword, comparePassword } from '../utils/bcrypt'
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
