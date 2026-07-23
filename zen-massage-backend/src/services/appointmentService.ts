
import { prisma } from '../prisma'

// Récupérer tous les types de séance actifs
export async function getTypeSeances() {
  return await prisma.typeSeance.findMany({
    where: { actif: true },
    orderBy: { createdAt: 'asc' }
  })
}

// Récupérer TOUS les rendez-vous (version publique, sans données sensibles)
export async function getAllAppointmentsPublic() {
  return await prisma.rendezVous.findMany({
    select: {
      id: true,
      date_heure: true,
      duree: true,
      statut: true,
      type_seance_id: true
    },
    orderBy: { date_heure: 'desc' }
  })
}

// Récupérer un type de séance par ID
export async function getTypeSeanceById(id: string) {
  const typeSeance = await prisma.typeSeance.findUnique({
    where: { id }
  })
  if (!typeSeance) {
    const err = new Error('Type de séance introuvable') as any
    err.status = 404
    throw err
  }
  return typeSeance
}

// Créer un rendez-vous
export async function createAppointment(data: {
  utilisateur_id: string
  date_heure: Date
  duree: number
  type_seance_id: string
  notes?: string
}) {
  // Vérifier que le type de séance existe
  await getTypeSeanceById(data.type_seance_id)

  // Vérifier que le créneau n'est pas déjà pris
  const existingAppointment = await prisma.rendezVous.findFirst({
    where: {
      date_heure: data.date_heure,
      statut: { notIn: ['CANCELLED'] }
    }
  })
  if (existingAppointment) {
    const err = new Error('Ce créneau est déjà réservé') as any
    err.status = 409
    throw err
  }

  return await prisma.rendezVous.create({
    data,
    include: {
      type_seance: true,
      utilisateur: { select: { id: true, email: true, firstName: true, lastName: true } }
    }
  })
}

// Récupérer les rendez-vous d'un utilisateur
export async function getUserAppointments(userId: string) {
  return await prisma.rendezVous.findMany({
    where: { utilisateur_id: userId },
    include: { type_seance: true },
    orderBy: { date_heure: 'desc' }
  })
}

// Récupérer tous les rendez-vous (admin)
export async function getAllAppointments() {
  return await prisma.rendezVous.findMany({
    include: {
      type_seance: true,
      utilisateur: { select: { id: true, email: true, firstName: true, lastName: true } }
    },
    orderBy: { date_heure: 'desc' }
  })
}

// Mettre à jour le statut d'un rendez-vous (admin)
export async function updateAppointmentStatus(id: string, statut: string, raison_refus?: string) {
  return await prisma.rendezVous.update({
    where: { id },
    data: { statut: statut as any, raison_refus },
    include: {
      type_seance: true,
      utilisateur: { select: { id: true, email: true, firstName: true, lastName: true } }
    }
  })
}

// Supprimer un rendez-vous
export async function deleteAppointment(id: string, userId: string) {
  const appointment = await prisma.rendezVous.findUnique({ where: { id } })
  if (!appointment) {
    const err = new Error('Rendez-vous introuvable') as any
    err.status = 404
    throw err
  }
  // Vérifier que l'utilisateur est le propriétaire
  if (appointment.utilisateur_id !== userId) {
    const err = new Error('Non autorisé') as any
    err.status = 403
    throw err
  }
  return await prisma.rendezVous.delete({ where: { id } })
}

// Modifier un rendez-vous
export async function updateAppointment(id: string, userId: string, userRole: string, data: {
  date_heure?: Date
  duree?: number
  type_seance_id?: string
  notes?: string
}) {
  const appointment = await prisma.rendezVous.findUnique({ where: { id } })
  if (!appointment) {
    const err = new Error('Rendez-vous introuvable') as any
    err.status = 404
    throw err
  }
  // Vérifier que l'utilisateur est propriétaire OU admin
  if (appointment.utilisateur_id !== userId && userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN') {
    const err = new Error('Non autorisé') as any
    err.status = 403
    throw err
  }
  // Seulement les clients ne peuvent pas modifier des rendez-vous non en attente
  if (userRole === 'CLIENT' && appointment.statut !== 'PENDING') {
    const err = new Error('Impossible de modifier un rendez-vous non en attente') as any
    err.status = 400
    throw err
  }
  // Si on change la date/heure, vérifier que le créneau est disponible
  if (data.date_heure) {
    const existingAppointment = await prisma.rendezVous.findFirst({
      where: {
        date_heure: data.date_heure,
        id: { not: id },
        statut: { notIn: ['CANCELLED'] }
      }
    })
    if (existingAppointment) {
      const err = new Error('Ce créneau est déjà réservé') as any
      err.status = 409
      throw err
    }
  }
  return await prisma.rendezVous.update({
    where: { id },
    data,
    include: {
      type_seance: true,
      utilisateur: { select: { id: true, email: true, firstName: true, lastName: true } }
    }
  })
}

export async function cancelAppointment(id: string, userId: string, userRole: string) {
  const appointment = await prisma.rendezVous.findUnique({ where: { id } })
  if (!appointment) {
    const err = new Error('Rendez-vous introuvable') as any
    err.status = 404
    throw err
  }
  // Vérifier que l'utilisateur est propriétaire OU admin
  if (appointment.utilisateur_id !== userId && userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN') {
    const err = new Error('Non autorisé') as any
    err.status = 403
    throw err
  }
  // Seulement les clients ne peuvent pas annuler des rendez-vous non en attente
  if (userRole === 'CLIENT' && appointment.statut !== 'PENDING') {
    const err = new Error('Impossible d annuler un rendez-vous non en attente') as any
    err.status = 400
    throw err
  }

  return await prisma.rendezVous.update({
    where: { id },
    data: { statut: 'CANCELLED' },
    include: {
      type_seance: true,
      utilisateur: { select: { id: true, email: true, firstName: true, lastName: true } }
    }
  })
}
