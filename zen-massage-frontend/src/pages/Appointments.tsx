import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import MiniCalendar from '../components/MiniCalendar'
import { appointmentService, type AppointmentScheduleConfig, type DayKey, type PublicRendezVous } from '../services/appointment.service'
import { useAuth } from '../context/AuthContext'
import Toast from '../components/ui/Toast'

/* ── Types ── */
interface Service {
  id: string
  name: string
  description: string
  duration: string
  price: string
  priceNum: number
}

/* ── Types pour les créneaux ── */
interface Slot {
  time: string
  available: boolean
}

/* ── Helper functions ── */
function formatDuration(minutes: number): string {
  return `${minutes} min`
}

function formatPrice(price: number): string {
  // Formater en FCFA avec séparateur de milliers
  return new Intl.NumberFormat('fr-FR').format(price) + ' F'
}

function parseDurationMinutes(value: string) {
  const m = /(\d+)/.exec(value)
  const n = m ? Number(m[1]) : 0
  return Number.isFinite(n) && n > 0 ? n : 0
}

function dayKeyFromDate(d: Date): DayKey {
  const js = d.getDay()
  if (js === 0) return 'sun'
  if (js === 1) return 'mon'
  if (js === 2) return 'tue'
  if (js === 3) return 'wed'
  if (js === 4) return 'thu'
  if (js === 5) return 'fri'
  return 'sat'
}

function timeToMinutes(value: string) {
  const m = /^(\d{2}):(\d{2})$/.exec(value)
  if (!m) return null
  const hh = Number(m[1])
  const mm = Number(m[2])
  if (!Number.isFinite(hh) || !Number.isFinite(mm)) return null
  if (hh < 0 || hh > 23 || mm < 0 || mm > 59) return null
  return hh * 60 + mm
}

function rangesOverlap(aStart: number, aEnd: number, bStart: number, bEnd: number) {
  return aStart < bEnd && bStart < aEnd
}

// Créneaux de base (tous disponibles initialement)
const BASE_SLOTS = [
  { time: '09:00' },
  { time: '09:30' },
  { time: '10:00' },
  { time: '10:30' },
  { time: '11:00' },
  { time: '11:30' },
  { time: '12:00' },
  { time: '12:30' },
  { time: '13:00' },
  { time: '13:30' },
  { time: '14:00' },
  { time: '14:30' },
  { time: '15:00' },
  { time: '15:30' },
  { time: '16:00' },
  { time: '16:30' },
  { time: '17:00' },
  { time: '17:30' },
  { time: '18:00' },
];
const MONTHS_FR = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']

/* ── Stepper ── */
function Stepper({ step }: { step: number }) {
  const steps = [
    { n: 1, label: 'Service' },
    { n: 2, label: 'Date & Heure' },
    { n: 3, label: 'Détails' },
  ]
  return (
    <div className="flex items-center justify-center gap-4 md:gap-8 mb-16">
      {steps.map((s, i) => {
        const active = step === s.n
        const done   = step > s.n
        return (
          <div key={s.n} className="flex items-center gap-2">
            <div className={`flex items-center gap-2 ${active ? 'text-primary font-bold' : done ? 'text-primary' : 'text-on-surface-variant'}`}>
              <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-label-md text-label-md transition-all ${
                active ? 'border-primary text-primary' : done ? 'border-primary bg-primary text-white' : 'border-outline-variant'
              }`}>
                {done ? <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span> : s.n}
              </span>
              <span className="hidden md:inline font-label-md text-label-md">{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-[1px] w-8 md:w-16 transition-colors ${step > s.n ? 'bg-primary' : 'bg-outline-variant'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ── Page ── */
export default function Appointments() {
  const [step, setStep]               = useState(1)
  const [selectedService, setService] = useState<Service | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedSlot, setSlot]       = useState<string | null>(null)
  const [form, setForm]               = useState({ name: '', email: '', notes: '' })
  const [confirmed, setConfirmed]     = useState(false)
  const [services, setServices]       = useState<Service[]>([])
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState<string | null>(null)
  const [toast, setToast]             = useState<{ type: 'error'; msg: string } | null>(null)
  const [appointments, setAppointments] = useState<PublicRendezVous[]>([])
  const [schedule, setSchedule] = useState<AppointmentScheduleConfig | null>(null)
  const { user } = useAuth()

  // Calculer les créneaux disponibles en fonction des rendez-vous existants et de l'heure actuelle
  const slots: Slot[] = useMemo(() => {
    if (!selectedDate) {
      // Si pas de jour sélectionné, tous les créneaux sont "disponibles" mais désactivés
      return BASE_SLOTS.map(s => ({ ...s, available: true }))
    }

    const now = new Date()

    const duration = selectedService ? parseDurationMinutes(selectedService.duration) : 0
    const scheduleDayKey = schedule ? dayKeyFromDate(selectedDate) : null
    const scheduleDay = schedule && scheduleDayKey ? schedule.days[scheduleDayKey] : null
    const openMin = scheduleDay?.active ? timeToMinutes(scheduleDay.start) : null
    const closeMin = scheduleDay?.active ? timeToMinutes(scheduleDay.end) : null
    const pauseStart = schedule?.pause ? timeToMinutes(schedule.pause.start) : null
    const pauseEnd = schedule?.pause ? timeToMinutes(schedule.pause.end) : null
    const blocked = scheduleDayKey && schedule?.blocked?.[scheduleDayKey] ? schedule.blocked[scheduleDayKey]! : []

    // Pour chaque créneau, vérifier s'il est pris, passé, ou hors horaires
    return BASE_SLOTS.map(baseSlot => {
      // Construire la date+heure du créneau
      const [hours, minutes] = baseSlot.time.split(':').map(Number)
      const slotDateTime = new Date(selectedDate)
      slotDateTime.setHours(hours, minutes, 0, 0)

      // Vérifier si la date est aujourd'hui et si l'heure est déjà passée
      const isToday = 
        slotDateTime.getFullYear() === now.getFullYear() &&
        slotDateTime.getMonth() === now.getMonth() &&
        slotDateTime.getDate() === now.getDate()

      const isPast = isToday && slotDateTime < now

      const slotStartMin = slotDateTime.getHours() * 60 + slotDateTime.getMinutes()
      const slotEndMin = duration > 0 ? slotStartMin + duration : slotStartMin + 1

      const isClosedDay = Boolean(schedule && (!scheduleDay || !scheduleDay.active))
      const isOutsideHours =
        Boolean(schedule && scheduleDay?.active && (openMin === null || closeMin === null || slotStartMin < openMin || slotEndMin > closeMin))

      const isInPause =
        Boolean(schedule?.pause && pauseStart !== null && pauseEnd !== null && rangesOverlap(slotStartMin, slotEndMin, pauseStart, pauseEnd))

      const isInBlocked = blocked.some((r) => {
        const bStart = timeToMinutes(r.start)
        const bEnd = timeToMinutes(r.end)
        if (bStart === null || bEnd === null) return false
        return rangesOverlap(slotStartMin, slotEndMin, bStart, bEnd)
      })

      const slotStart = slotDateTime
      const slotEnd = new Date(slotDateTime.getTime() + duration * 60_000)

      const isTaken = appointments.some((apt) => {
        if (apt.statut === 'CANCELLED') return false
        const aptStart = new Date(apt.date_heure)
        const aptEnd = new Date(aptStart.getTime() + apt.duree * 60_000)
        return slotStart < aptEnd && aptStart < slotEnd
      })

      return {
        ...baseSlot,
        available: !isTaken && !isPast && !isClosedDay && !isOutsideHours && !isInPause && !isInBlocked
      }
    })
  }, [appointments, schedule, selectedDate, selectedService])

  useEffect(() => {
    document.title = 'Prendre rendez-vous | Ben Massage & Wellness Gabon'
  }, [])

  // Charger les services depuis l'API
  useEffect(() => {
    async function loadServices() {
      try {
        setLoading(true)
        setError(null)
        const response = await appointmentService.getTypeSeances()
        // Convertir TypeSeance en Service pour le composant
        const mappedServices: Service[] = response.data.map(ts => ({
          id: ts.id,
          name: ts.nom,
          description: ts.description,
          duration: formatDuration(ts.duree),
          price: formatPrice(ts.prix),
          priceNum: ts.prix
        }))
        setServices(mappedServices)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des services')
      } finally {
        setLoading(false)
      }
    }
    loadServices()
  }, [])

  // Charger les rendez-vous existants (pour vérifier les disponibilites)
  useEffect(() => {
    async function loadAppointments() {
      try {
        const response = await appointmentService.getPublicAppointments()
        setAppointments(response.data)
      } catch (err) {
        console.error('Erreur chargement rendez-vous', err)
      }
    }
    loadAppointments()
  }, [])

  useEffect(() => {
    async function loadSchedule() {
      try {
        const res = await appointmentService.getScheduleConfig()
        setSchedule(res.data)
      } catch {
        setSchedule(null)
      }
    }
    loadSchedule()
  }, [])

  const canGoStep2 = !!selectedService
  const canGoStep3 = canGoStep2 && !!selectedDate && !!selectedSlot
  const canConfirm = canGoStep3 && form.name.trim() !== '' && form.email.trim() !== ''

  // Pré-remplir le formulaire si l'utilisateur est connecté
  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email
      }))
    }
  }, [user])

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canConfirm || !selectedService || !selectedDate || !selectedSlot) return

    try {
      // Construire la date complète
      const appointmentDate = new Date(selectedDate)
      // Ajouter l'heure
      const [hours, minutes] = selectedSlot.split(':').map(Number)
      appointmentDate.setHours(hours, minutes, 0, 0)

      // Trouver le type de séance original pour la durée
      const typeSeance = services.find(s => s.id === selectedService.id)
      if (!typeSeance) return

      // Convertir la durée en minutes (enlever ' min' et parser)
      const durationMinutes = parseInt(typeSeance.duration.replace(' min', ''), 10)

      await appointmentService.createAppointment({
        date_heure: appointmentDate.toISOString(),
        duree: durationMinutes,
        type_seance_id: selectedService.id,
        notes: form.notes
      })

      setConfirmed(true)
    } catch (err) {
      setToast({ type: 'error', msg: err instanceof Error ? err.message : 'Erreur lors de la réservation' })
    }
  }

  if (confirmed) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <span className="material-symbols-outlined text-6xl text-primary mb-6 block" style={{ fontVariationSettings: "'FILL' 1" }}>
              check_circle
            </span>
            <h1 className="font-display-lg text-display-lg-mobile text-sage-deep mb-4">
              Réservation confirmée !
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-2">
              {selectedService?.name}
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant mb-8">
              Le {selectedDate?.getDate()} {MONTHS_FR[selectedDate?.getMonth() || 0]} {selectedDate?.getFullYear()} — à {selectedSlot}
            </p>
            <p className="font-caption text-caption text-on-surface-variant mb-8">
              Un email de confirmation vous sera envoyé à <strong>{form.email}</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/account"
                className="px-8 py-3 bg-primary text-white rounded-full font-label-md hover:bg-sage-deep transition-colors"
              >
                Voir mes rendez-vous
              </Link>
              <Link
                to="/"
                className="px-8 py-3 border border-outline-variant text-on-surface-variant rounded-full font-label-md hover:bg-surface-container transition-colors"
              >
                Retour à l’accueil
              </Link>
            </div>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      {toast && <Toast type={toast.type} message={toast.msg} onClose={() => setToast(null)} />}
      <main className="pt-32 pb-section-gap px-6 md:px-margin-desktop max-w-container-max mx-auto">

        {/* ── Header ── */}
        <header className="text-center mb-stack-lg">
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-sage-deep mb-4">
            Réservez votre instant de sérénité
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto mb-12">
            Personnalisez votre expérience bien-être en quelques étapes simples.
          </p>
          <Stepper step={step} />
        </header>

        {/* ── 2-col layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">

          {/* ── Left col ── */}
          <div className="lg:col-span-8 space-y-gutter">

            {/* Step 1 — Service */}
            <section className="bg-surface-container-lowest p-stack-lg rounded-xl shadow-sm border border-surface-variant/30">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-headline-sm text-headline-sm text-sage-deep">1. Choisissez votre massage</h2>
                {step === 1 && (
                  <span className="font-label-md text-caption text-primary uppercase tracking-widest font-semibold">
                    Étape active
                  </span>
                )}
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="rounded-2xl border border-outline-variant/30 p-5 animate-pulse space-y-3">
                      <div className="h-5 bg-outline-variant/20 rounded w-2/3" />
                      <div className="h-3 bg-outline-variant/20 rounded w-full" />
                      <div className="h-3 bg-outline-variant/20 rounded w-4/5" />
                      <div className="flex justify-between mt-4">
                        <div className="h-4 bg-outline-variant/20 rounded w-16" />
                        <div className="h-5 bg-outline-variant/20 rounded w-24" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <span className="material-symbols-outlined text-4xl text-error mb-3 block">error_outline</span>
                  <p className="text-error font-body-md mb-4">{error}</p>
                  <button onClick={() => window.location.reload()} className="px-5 py-2.5 bg-primary text-white rounded-full font-label-md text-sm hover:bg-sage-deep transition-colors">
                    Réessayer
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((s, idx) => {
                    const isSelected = selectedService?.id === s.id
                    // Initiales pour l'avatar
                    const initials = s.name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase()
                    // Couleurs cycliques douces
                    const palettes = [
                      { bg: 'bg-sage-deep/10',   text: 'text-sage-deep'   },
                      { bg: 'bg-amber-100',       text: 'text-amber-800'   },
                      { bg: 'bg-rose-100',        text: 'text-rose-800'    },
                      { bg: 'bg-sky-100',         text: 'text-sky-800'     },
                      { bg: 'bg-violet-100',      text: 'text-violet-800'  },
                      { bg: 'bg-teal-100',        text: 'text-teal-800'    },
                    ]
                    const pal = palettes[idx % palettes.length]

                    return (
                      <button
                        key={s.id}
                        onClick={() => { setService(s); setStep(s2 => Math.max(s2, 2)) }}
                        className={`group text-left rounded-2xl p-5 transition-all duration-300 relative overflow-hidden border-2 ${
                          isSelected
                            ? 'border-primary bg-primary/5 shadow-md'
                            : 'border-transparent bg-white hover:border-primary/40 hover:shadow-md shadow-sm'
                        }`}
                      >
                        {/* Indicateur sélection */}
                        <div className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                          isSelected ? 'bg-primary scale-100' : 'bg-outline-variant/20 scale-75 group-hover:scale-90'
                        }`}>
                          <span className="material-symbols-outlined text-[14px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
                            {isSelected ? 'check' : 'add'}
                          </span>
                        </div>

                        {/* Avatar initiales */}
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-base mb-4 ${pal.bg} ${pal.text}`}>
                          {initials}
                        </div>

                        {/* Nom */}
                        <h3 className={`font-semibold text-sm leading-snug mb-1.5 pr-8 transition-colors ${isSelected ? 'text-primary' : 'text-on-surface group-hover:text-primary'}`}>
                          {s.name}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-on-surface-variant line-clamp-2 mb-4 leading-relaxed">
                          {s.description}
                        </p>

                        {/* Footer : durée + prix */}
                        <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20">
                          <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                            isSelected ? 'bg-primary/10 text-primary' : 'bg-surface-container text-on-surface-variant'
                          }`}>
                            <span className="material-symbols-outlined text-[13px]">schedule</span>
                            {s.duration}
                          </span>
                          <span className={`font-bold text-base ${isSelected ? 'text-primary' : 'text-sage-deep'}`}>
                            {s.price}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}


            </section>

            {/* Step 2 — Date & Heure */}
            <section className="bg-surface-container-lowest p-stack-lg rounded-xl shadow-sm border border-surface-variant/30">
              <h2 className="font-headline-sm text-headline-sm text-sage-deep mb-6">2. Choisissez la date &amp; l'heure</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                {/* Calendar */}
                <MiniCalendar
                  selectedDate={selectedDate}
                  onSelect={(d) => { setSelectedDate(d); setSlot(null) }}
                  isDayDisabled={(d) => {
                    if (!schedule) return false
                    const key = dayKeyFromDate(d)
                    return !schedule.days[key]?.active
                  }}
                />

                {/* Time slots */}
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-sage-deep mb-4 block">
                    {selectedDate ? `Disponibilités pour le ${selectedDate.getDate()} ${MONTHS_FR[selectedDate.getMonth()]} ${selectedDate.getFullYear()}` : 'Sélectionnez une date'}
                  </span>
                  <div className="grid grid-cols-2 gap-3 max-h-[220px] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#c3c8c1 transparent' }}>
                    {slots.map((slot) => (
                      <button
                        key={slot.time}
                        disabled={!slot.available || !selectedDate}
                        onClick={() => { setSlot(slot.time); setStep(s => Math.max(s, 3)) }}
                        className={`py-3 px-4 rounded-lg font-caption text-caption text-center transition-all border ${
                          !slot.available
                            ? 'opacity-40 border-outline-variant cursor-not-allowed line-through'
                            : selectedSlot === slot.time
                            ? 'border-primary shadow-md'
                            : !selectedDate
                            ? 'border-outline-variant opacity-40 cursor-not-allowed'
                            : 'border-outline-variant hover:border-primary'
                        }`}
                        style={selectedSlot === slot.time ? { backgroundColor: '#425646', color: '#ffffff' } : {}}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>


            </section>

            {/* Step 3 — Coordonnées */}
            <section className={`bg-surface-container-lowest p-stack-lg rounded-xl shadow-sm border border-surface-variant/30 transition-opacity duration-300 ${step >= 3 ? '' : 'opacity-60 pointer-events-none'}`}>
              <h2 className="font-headline-sm text-headline-sm text-sage-deep mb-6">3. Vos coordonnées</h2>

              <form onSubmit={handleConfirm}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-caption text-caption font-semibold">Nom complet</label>
                    <input
                      type="text"
                      required
                      disabled={step < 3}
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Votre nom"
                      className="bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary transition-colors py-2 font-body-md text-body-md outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-caption text-caption font-semibold">Email</label>
                    <input
                      type="email"
                      required
                      disabled={step < 3}
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="exemple@mail.com"
                      className="bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary transition-colors py-2 font-body-md text-body-md outline-none"
                    />
                  </div>
                  <div className="md:col-span-2 flex flex-col gap-1 mt-4">
                    <label className="font-caption text-caption font-semibold">Notes particulières</label>
                    <textarea
                      rows={2}
                      disabled={step < 3}
                      value={form.notes}
                      onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                      placeholder="Allergies, zones de tension..."
                      className="bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary transition-colors py-2 resize-none font-body-md text-body-md outline-none"
                    />
                  </div>
                </div>

                {/* {step >= 3 && (
                  <button
                    type="submit"
                    disabled={!canConfirm}
                    className="mt-8 w-full py-4 bg-primary text-white font-label-md text-label-md rounded-full hover:bg-sage-deep transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
                  >
                    Confirmer la réservation
                  </button>
                )} */}
              </form>
            </section>
          </div>

          {/* ── Right col — Aside sticky ── */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28">

              {/* Summary card */}
              <div className="bg-sage-deep text-surface p-stack-lg rounded-xl shadow-xl">
                <h3 className="font-headline-sm text-headline-sm mb-6 border-b border-surface-variant/20 pb-4">
                  Résumé de la séance
                </h3>

                <div className="space-y-6">
                  {/* Service */}
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg bg-surface/10 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-3xl">spa</span>
                    </div>
                    <div>
                      <p className="font-caption text-caption opacity-70">Service choisi</p>
                      <p className="font-label-md text-label-md">
                        {selectedService ? selectedService.name : <span className="opacity-40 italic">Non sélectionné</span>}
                      </p>
                      {selectedService && (
                        <p className="font-caption text-caption">{selectedService.duration}</p>
                      )}
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg bg-surface/10 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-3xl">event</span>
                    </div>
                    <div>
                      <p className="font-caption text-caption opacity-70">Date et Heure</p>
                      <p className="font-label-md text-label-md">
                        {selectedDate
                          ? `${selectedDate.getDate()} ${MONTHS_FR[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`
                          : <span className="opacity-40 italic">Non sélectionnée</span>}
                      </p>
                      {selectedSlot && (
                        <p className="font-caption text-caption">À partir de {selectedSlot}</p>
                      )}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="pt-6 border-t border-surface-variant/20 flex justify-between items-center">
                    <span className="font-body-lg text-body-lg">Total</span>
                    <span className="font-display-lg text-3xl">
                      {selectedService ? selectedService.price : '—'}
                    </span>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => {
                      const formElement = document.querySelector('form')
                      formElement?.requestSubmit()
                    }}
                    disabled={!canConfirm}
                    className="w-full py-4 bg-primary-fixed text-on-primary-fixed font-label-md text-label-md rounded-full hover:bg-white transition-colors duration-300 shadow-lg"
                  >
                    Confirmer la réservation
                  </button>

                  <p className="text-[10px] text-center opacity-60 px-4">
                    En confirmant, vous acceptez nos conditions générales de vente et notre
                    politique d'annulation de 24h.
                  </p>
                </div>
              </div>

              {/* Atmosphere image */}
              <div className="mt-stack-lg rounded-xl overflow-hidden h-48 md:h-64 shadow-sm border border-surface-variant/20">
                <div
                  className="bg-cover bg-center w-full h-full"
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBP3IE1RweDA0ruXu9EOxdaDjx4kZfBqTyJGQ7bWoQu6xismkRbBdHf5T6NtsGjR8Dkj1tsSNRB-iGrAJscruCV8TCfxH4i2chGdNLn-LCmesUJomsdCAlyX1Is1aqSUPyVJDJlXetwPTt2vejrj5Jt9JlDNonnsxEn09SbiMn2h4OJ7xByZywSiooaCtmyrn_28v8Bj54kNSVivLD4b7V3F9SpXC4OcelJGKSUrI-xekKCTyFKiTzzgVgmX3bawAPSrq4lbs6YC2Xd')" }}
                />
              </div>

            </div>
          </aside>
        </div>
      </main>
    </MainLayout>
  )
}
