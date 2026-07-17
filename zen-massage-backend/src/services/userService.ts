import { prisma } from '../prisma'

export interface UserListItem {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'SUPER_ADMIN' | 'ADMIN' | 'USER'
  active: boolean
  avatar: string | null
  createdAt: Date
}

function toListItem(user: {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'SUPER_ADMIN' | 'ADMIN' | 'USER'
  deletedAt: Date | null
  avatar: string | null
  createdAt: Date
}): UserListItem {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    active: user.deletedAt === null,
    avatar: user.avatar,
    createdAt: user.createdAt,
  }
}

export async function getUsers() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return users.map(toListItem)
}

export async function getUserStats() {
  const [totalUsers, superAdmins, admins] = await Promise.all([
    prisma.user.count({ where: { deletedAt: null } }),
    prisma.user.count({ where: { role: 'SUPER_ADMIN', deletedAt: null } }),
    prisma.user.count({ where: { role: 'ADMIN', deletedAt: null } }),
  ])

  return {
    totalUsers,
    superAdmins,
    admins,
    regularUsers: totalUsers - superAdmins - admins,
  }
}

export async function updateUserRole(userId: string, role: 'SUPER_ADMIN' | 'ADMIN' | 'USER') {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) {
    const err = new Error('Utilisateur introuvable') as any
    err.status = 404
    throw err
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data: { role },
  })

  return toListItem(updated)
}

export async function toggleUserActive(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) {
    const err = new Error('Utilisateur introuvable') as any
    err.status = 404
    throw err
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data: { deletedAt: user.deletedAt ? null : new Date() },
  })

  return toListItem(updated)
}
