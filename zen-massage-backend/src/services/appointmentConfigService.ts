import { prisma } from '../prisma'

export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

export type TimeRange = {
  start: string
  end: string
}

export type DaySchedule = {
  active: boolean
  start: string
  end: string
}

export type AppointmentScheduleConfig = {
  version: 1
  slotStepMinutes: 30
  days: Record<DayKey, DaySchedule>
  pause?: TimeRange
  blocked?: Partial<Record<DayKey, TimeRange[]>>
}

const CONFIG_KEY = 'appointments_schedule'

function parseTimeToMinutes(value: string) {
  const m = /^(\d{2}):(\d{2})$/.exec(value)
  if (!m) return null
  const hh = Number(m[1])
  const mm = Number(m[2])
  if (Number.isNaN(hh) || Number.isNaN(mm)) return null
  if (hh < 0 || hh > 23) return null
  if (mm < 0 || mm > 59) return null
  return hh * 60 + mm
}

function isValidRange(r: TimeRange) {
  const s = parseTimeToMinutes(r.start)
  const e = parseTimeToMinutes(r.end)
  return s !== null && e !== null && s < e
}

function ensureValidConfig(cfg: AppointmentScheduleConfig) {
  if (!cfg || cfg.version !== 1) {
    const err = new Error('Configuration invalide') as any
    err.status = 400
    throw err
  }
  if (cfg.slotStepMinutes !== 30) {
    const err = new Error('slotStepMinutes invalide') as any
    err.status = 400
    throw err
  }
  const days = cfg.days
  const keys: DayKey[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
  for (const k of keys) {
    const d = days?.[k]
    if (!d || typeof d.active !== 'boolean') {
      const err = new Error('Configuration invalide (jours)') as any
      err.status = 400
      throw err
    }
    if (d.active) {
      if (!isValidRange({ start: d.start, end: d.end })) {
        const err = new Error('Horaires invalides') as any
        err.status = 400
        throw err
      }
    }
  }
  if (cfg.pause) {
    if (!isValidRange(cfg.pause)) {
      const err = new Error('Pause invalide') as any
      err.status = 400
      throw err
    }
  }
  if (cfg.blocked) {
    for (const [k, ranges] of Object.entries(cfg.blocked)) {
      if (!ranges) continue
      if (!Array.isArray(ranges)) {
        const err = new Error('Indisponibilités invalides') as any
        err.status = 400
        throw err
      }
      for (const r of ranges) {
        if (!isValidRange(r)) {
          const err = new Error('Indisponibilités invalides') as any
          err.status = 400
          throw err
        }
      }
    }
  }
}

export function getDefaultAppointmentScheduleConfig(): AppointmentScheduleConfig {
  return {
    version: 1,
    slotStepMinutes: 30,
    days: {
      mon: { active: true, start: '09:00', end: '18:00' },
      tue: { active: true, start: '09:00', end: '18:00' },
      wed: { active: true, start: '09:00', end: '18:00' },
      thu: { active: true, start: '09:00', end: '18:00' },
      fri: { active: true, start: '09:00', end: '18:00' },
      sat: { active: true, start: '09:00', end: '18:00' },
      sun: { active: false, start: '09:00', end: '18:00' },
    },
    pause: { start: '13:00', end: '14:00' },
    blocked: {
      sat: [{ start: '16:00', end: '18:00' }],
    },
  }
}

export async function getAppointmentScheduleConfig(): Promise<AppointmentScheduleConfig> {
  const row = await prisma.configuration.findUnique({ where: { cle: CONFIG_KEY } })
  if (!row) {
    const def = getDefaultAppointmentScheduleConfig()
    await prisma.configuration.create({
      data: {
        cle: CONFIG_KEY,
        valeur: JSON.stringify(def),
        description: 'Configuration des horaires et disponibilités des rendez-vous',
      },
    })
    return def
  }

  try {
    const parsed = JSON.parse(row.valeur) as AppointmentScheduleConfig
    ensureValidConfig(parsed)
    return parsed
  } catch {
    const def = getDefaultAppointmentScheduleConfig()
    await prisma.configuration.update({
      where: { cle: CONFIG_KEY },
      data: { valeur: JSON.stringify(def) },
    })
    return def
  }
}

export async function updateAppointmentScheduleConfig(next: AppointmentScheduleConfig) {
  ensureValidConfig(next)
  await prisma.configuration.upsert({
    where: { cle: CONFIG_KEY },
    update: { valeur: JSON.stringify(next) },
    create: {
      cle: CONFIG_KEY,
      valeur: JSON.stringify(next),
      description: 'Configuration des horaires et disponibilités des rendez-vous',
    },
  })
  return next
}

export function dayKeyFromDate(d: Date): DayKey {
  const js = d.getDay()
  if (js === 0) return 'sun'
  if (js === 1) return 'mon'
  if (js === 2) return 'tue'
  if (js === 3) return 'wed'
  if (js === 4) return 'thu'
  if (js === 5) return 'fri'
  return 'sat'
}

export function timeStringFromDate(d: Date) {
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${hh}:${mm}`
}

export function minutesFromTimeString(value: string) {
  return parseTimeToMinutes(value)
}

export function rangeOverlaps(aStart: number, aEnd: number, bStart: number, bEnd: number) {
  return aStart < bEnd && bStart < aEnd
}
