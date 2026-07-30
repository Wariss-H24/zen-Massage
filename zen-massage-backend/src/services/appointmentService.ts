
import { prisma } from '../prisma'
import {
  dayKeyFromDate,
  getAppointmentScheduleConfig,
  minutesFromTimeString,
  rangeOverlaps,
  type AppointmentScheduleConfig,
  type DayKey,
} from './appointmentConfigService'

function addMinutes(d: Date, minutes: number) {
  return new Date(d.getTime() + minutes * 60_000)
}

function startOfDay(d: Date) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

function endOfDay(d: Date) {
  const x = startOfDay(d)
  x.setDate(x.getDate() + 1)
  return x
}

function assertScheduleAllows(config: AppointmentScheduleConfig, start: Date, durationMinutes: number) {
  const dayKey: DayKey = dayKeyFromDate(start)
  const day = config.days[dayKey]
  if (!day.active) {
    const err = new Error('Aucun rendez-vous possible ce jour-là') as any
    err.status = 400
    throw err
  }

  const startMin = start.getHours() * 60 + start.getMinutes()
  const endMin = startMin + durationMinutes

  const openMin = minutesFromTimeString(day.start)
  const closeMin = minutesFromTimeString(day.end)
  if (openMin === null || closeMin === null) {
    const err = new Error('Configuration horaires invalide') as any
    err.status = 500
    throw err
  }

  if (startMin < openMin || endMin > closeMin) {
    const err = new Error('Créneau en dehors des heures de travail') as any
    err.status = 400
    throw err
  }

  if (config.pause) {
    const pStart = minutesFromTimeString(config.pause.start)
    const pEnd = minutesFromTimeString(config.pause.end)
    if (pStart !== null && pEnd !== null) {
      if (rangeOverlaps(startMin, endMin, pStart, pEnd)) {
        const err = new Error('Créneau indisponible (pause)') as any
        err.status = 400
        throw err
      }
    }
  }

  const blocked = config.blocked?.[dayKey] ?? []
  for (const r of blocked) {
    const bStart = minutesFromTimeString(r.start)
    const bEnd = minutesFromTimeString(r.end)
    if (bStart === null || bEnd === null) continue
    if (rangeOverlaps(startMin, endMin, bStart, bEnd)) {
      const err = new Error('Créneau indisponible') as any
      err.status = 400
      throw err
    }
  }
}

async function assertNoOverlappingAppointment(start: Date, durationMinutes: number, excludeId?: string) {
  const end = addMinutes(start, durationMinutes)

  const dayStart = startOfDay(start)
  const dayEnd = endOfDay(start)

  const candidates = await prisma.rendezVous.findMany({
    where: {
      id: excludeId ? { not: excludeId } : undefined,
      statut: { notIn: ['CANCELLED'] },
      date_heure: { gte: dayStart, lt: dayEnd },
    },
    select: { id: true, date_heure: true, duree: true },
  })

  for (const appt of candidates) {
    const apptStart = appt.date_heure
    const apptEnd = addMinutes(apptStart, appt.duree)
    if (start < apptEnd && apptStart < end) {
      const err = new Error('Ce créneau est déjà réservé') as any
      err.status = 409
      throw err
    }
  }
}

// Récupérer tous les types de séance actifs
export async function getTypeSeances() {
  return await prisma.typeSeance.findMany({
    where: { actif: true },
    orderBy: { createdAt: 'asc' }
  })
}

// Récupérer TOUS les types de séance (admin — actifs et inactifs)
export async function getAllTypeSeances() {
  return await prisma.typeSeance.findMany({
    orderBy: { createdAt: 'asc' }
  })
}

// Créer un type de séance
export async function createTypeSeance(data: {
  nom: string
  description: string
  duree: number
  prix: number
  actif?: boolean
}) {
  const existing = await prisma.typeSeance.findUnique({ where: { nom: data.nom } })
  if (existing) {
    const err = new Error('Un service avec ce nom existe déjà') as any
    err.status = 409
    throw err
  }
  return await prisma.typeSeance.create({ data })
}

// Modifier un type de séance
export async function updateTypeSeance(id: string, data: {
  nom?: string
  description?: string
  duree?: number
  prix?: number
  actif?: boolean
}) {
  const existing = await prisma.typeSeance.findUnique({ where: { id } })
  if (!existing) {
    const err = new Error('Service introuvable') as any
    err.status = 404
    throw err
  }
  if (data.nom && data.nom !== existing.nom) {
    const nameConflict = await prisma.typeSeance.findUnique({ where: { nom: data.nom } })
    if (nameConflict) {
      const err = new Error('Un service avec ce nom existe déjà') as any
      err.status = 409
      throw err
    }
  }
  return await prisma.typeSeance.update({ where: { id }, data })
}

// Supprimer un type de séance (vérifie qu'il n'y a pas de RDV liés)
export async function deleteTypeSeance(id: string) {
  const existing = await prisma.typeSeance.findUnique({ where: { id } })
  if (!existing) {
    const err = new Error('Service introuvable') as any
    err.status = 404
    throw err
  }
  const rdvCount = await prisma.rendezVous.count({ where: { type_seance_id: id } })
  if (rdvCount > 0) {
    const err = new Error(`Impossible de supprimer : ${rdvCount} rendez-vous utilisent ce service`) as any
    err.status = 409
    throw err
  }
  return await prisma.typeSeance.delete({ where: { id } })
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
  date_heure: Date | string
  duree: number
  type_seance_id: string
  notes?: string
}) {
  // Vérifier que le type de séance existe
  await getTypeSeanceById(data.type_seance_id)

  const date = data.date_heure instanceof Date ? data.date_heure : new Date(data.date_heure)
  const config = await getAppointmentScheduleConfig()
  assertScheduleAllows(config, date, data.duree)
  await assertNoOverlappingAppointment(date, data.duree)

  return await prisma.rendezVous.create({
    data: { ...data, date_heure: date },
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
  if (userRole === 'USER' && appointment.statut !== 'PENDING') {
    const err = new Error('Impossible de modifier un rendez-vous non en attente') as any
    err.status = 400
    throw err
  }
  // Si on change la date/heure, vérifier que le créneau est disponible
  const nextDate = data.date_heure ?? appointment.date_heure
  const nextDuree = data.duree ?? appointment.duree
  if (data.date_heure || data.duree) {
    const config = await getAppointmentScheduleConfig()
    assertScheduleAllows(config, nextDate, nextDuree)
    await assertNoOverlappingAppointment(nextDate, nextDuree, id)
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
