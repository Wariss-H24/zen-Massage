import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout'
import MiniCalendar from '../../components/MiniCalendar'
import { useAuth } from '../../context/AuthContext'
import { appointmentService, type AppointmentScheduleConfig, type DayKey, type RendezVousWithUser, type PublicRendezVous } from '../../services/appointment.service'
import { productService } from '../../services/product.service'
import { reviewService } from '../../services/review.service'
import { orderService, type Commande, type OrderStatus } from '../../services/order.service'
import type { Review } from '../../types/review'
import type { Produit } from '../../types/product'
import Toast from '../../components/ui/Toast'

// Fonction pour formater la date en français (ex: "Aujourd'hui, 16h30")
const formatAppointmentTime = (dateStr: string): string => {
  const date = new Date(dateStr)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  const dateOnly = new Date(date)
  dateOnly.setHours(0, 0, 0, 0)
  
  let dateLabel: string
  if (dateOnly.getTime() === today.getTime()) {
    dateLabel = "Aujourd'hui"
  } else if (dateOnly.getTime() === tomorrow.getTime()) {
    dateLabel = "Demain"
  } else {
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
    dateLabel = days[date.getDay()]
  }
  
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${dateLabel}, ${hours}h${minutes}`
}

// Fonction pour générer les initiales du client
const getClientInitials = (firstName: string, lastName: string): string => {
  return `${firstName[0]}${lastName[0]}`.toUpperCase()
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

/* ── Types pour les créneaux ── */
interface Slot {
  time: string
  available: boolean
}

function formatPriceFCFA(value: number) {
  return `${Math.round(value).toLocaleString('fr-FR')} FCFA`
}

const SALES_STATUS_FR: Record<OrderStatus, string> = {
  PENDING:   'En attente',
  CONFIRMED: 'Confirmée',
  SHIPPED:   'Expédiée',
  DELIVERED: 'Livrée',
  CANCELLED: 'Annulée',
}

const SALES_STATUS_STYLE: Record<OrderStatus, string> = {
  PENDING:   'bg-amber-50  text-amber-700  border border-amber-200',
  CONFIRMED: 'bg-sage-deep/10 text-sage-deep border border-sage-deep/20',
  SHIPPED:   'bg-purple-50 text-purple-700 border border-purple-200',
  DELIVERED: 'bg-green-50  text-green-700  border border-green-200',
  CANCELLED: 'bg-red-50    text-red-700    border border-red-200',
}

/* ── Formate une date en temps relatif ── */
function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const minutes = Math.floor(diff / 60_000)
  if (minutes < 1)  return "À l'instant"
  if (minutes < 60) return `Il y a ${minutes} min`
  const hours = Math.floor(minutes / 60)
  if (hours < 24)   return `Il y a ${hours}h`
  const days = Math.floor(hours / 24)
  if (days === 1)   return 'Hier'
  if (days < 7)     return `Il y a ${days} jours`
  return new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

/* ── Initiales d'un reviewer ── */
function getReviewerInitials(firstName: string, lastName: string): string {
  return `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase()
}

const DAY_LABELS: { key: DayKey; label: string }[] = [
  { key: 'mon', label: 'Lun' },
  { key: 'tue', label: 'Mar' },
  { key: 'wed', label: 'Mer' },
  { key: 'thu', label: 'Jeu' },
  { key: 'fri', label: 'Ven' },
  { key: 'sat', label: 'Sam' },
  { key: 'sun', label: 'Dim' },
]

export default function Dashboard() {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState<RendezVousWithUser[]>([])
  const [publicAppointments, setPublicAppointments] = useState<PublicRendezVous[]>([])
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Produit[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loadingReviews, setLoadingReviews] = useState(true)
  const [orders, setOrders] = useState<Commande[]>([])
  const [loadingOrders, setLoadingOrders] = useState(true)
  const [schedule, setSchedule] = useState<AppointmentScheduleConfig | null>(null)
  const [scheduleDraft, setScheduleDraft] = useState<AppointmentScheduleConfig | null>(null)
  const [savingSchedule, setSavingSchedule] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; msg: string } | null>(null)
  const [statusModalOpen, setStatusModalOpen] = useState(false)
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false)
  const [selectedAppt, setSelectedAppt] = useState<RendezVousWithUser | null>(null)
  const [newStatus, setNewStatus] = useState<RendezVousWithUser['statut']>('PENDING')
  const [raisonRefus, setRaisonRefus] = useState('')
  const [processingStatus, setProcessingStatus] = useState(false)
  // États pour la reprogrammation
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [processingReschedule, setProcessingReschedule] = useState(false)
  // États pour la réponse admin aux avis
  const [replyModalOpen, setReplyModalOpen] = useState(false)
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [replyText, setReplyText] = useState('')
  const [processingReply, setProcessingReply] = useState(false)
  // États pour les notes admin RDV
  const [notesModalOpen, setNotesModalOpen] = useState(false)
  const [notesAppt, setNotesAppt] = useState<RendezVousWithUser | null>(null)
  const [notesText, setNotesText] = useState('')
  const [processingNotes, setProcessingNotes] = useState(false)
  const firstName = user?.firstName || ''
  const lastName = user?.lastName || ''

  useEffect(() => { document.title = 'Espace Praticien | Ben Massage' }, [])

  useEffect(() => {
    let mounted = true
    async function loadSchedule() {
      try {
        const res = await appointmentService.getScheduleConfig()
        if (!mounted) return
        setSchedule(res.data)
        setScheduleDraft(res.data)
      } catch (err: any) {
        if (!mounted) return
        setSchedule(null)
        setScheduleDraft(null)
        setToast({ type: 'error', msg: err.message || 'Erreur chargement planning' })
      }
    }
    loadSchedule()
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    let mounted = true
    async function loadProducts() {
      setLoadingProducts(true)
      try {
        const res = await productService.listProduitsAdmin({ page: 1, limite: 4, tri: 'recent' })
        if (mounted) setProducts(res.data.produits)
      } catch {
        if (mounted) setProducts([])
      }
      if (mounted) setLoadingProducts(false)
    }
    loadProducts()
    return () => { mounted = false }
  }, [])

  useEffect(() => {
    let mounted = true
    async function loadReviews() {
      setLoadingReviews(true)
      try {
        const res = await reviewService.listReviews({ tri: 'recent', limite: 5 })
        if (mounted) setReviews(res.data.avis ?? [])
      } catch {
        if (mounted) setReviews([])
      }
      if (mounted) setLoadingReviews(false)
    }
    loadReviews()
    return () => { mounted = false }
  }, [])

  // Charger les commandes récentes
  useEffect(() => {
    let mounted = true
    async function loadOrders() {
      setLoadingOrders(true)
      try {
        const res = await orderService.getAllCommandes({ limite: 5 })
        if (mounted) setOrders(res.data.commandes ?? [])
      } catch {
        if (mounted) setOrders([])
      }
      if (mounted) setLoadingOrders(false)
    }
    loadOrders()
    return () => { mounted = false }
  }, [])
  useEffect(() => {
    async function loadAppointments() {
      try {
        setLoading(true)
        const [allResponse, publicResponse] = await Promise.all([
          appointmentService.getAllAppointments(),
          appointmentService.getPublicAppointments()
        ])
        setAppointments(allResponse.data)
        setPublicAppointments(publicResponse.data)
      } catch (err) {
        console.error('Erreur lors du chargement des rendez-vous:', err)
        setToast({ type: 'error', msg: 'Erreur lors du chargement des rendez-vous: ' + (err as Error).message })
      } finally {
        setLoading(false)
      }
    }
    loadAppointments()
  }, [])

  // Calculer les créneaux disponibles en fonction des rendez-vous existants et de l'heure actuelle
  const slots: Slot[] = useMemo(() => {
    if (!selectedDate) {
      // Si pas de jour sélectionné, tous les créneaux sont "disponibles" mais désactivés
      return BASE_SLOTS.map(s => ({ ...s, available: true }))
    }

    const now = new Date()
    const duration = selectedAppt?.duree ?? 0

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
      const slotEndMin = (duration > 0 ? slotStartMin + duration : slotStartMin + 1)

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

      const isTaken = publicAppointments.some((apt) => {
        if (apt.statut === 'CANCELLED') return false
        if (selectedAppt && apt.id === selectedAppt.id) return false
        const aptStart = new Date(apt.date_heure)
        const aptEnd = new Date(aptStart.getTime() + apt.duree * 60_000)
        return slotStart < aptEnd && aptStart < slotEnd
      })

      return {
        ...baseSlot,
        available: !isTaken && !isPast && !isClosedDay && !isOutsideHours && !isInPause && !isInBlocked
      }
    })
  }, [publicAppointments, schedule, selectedAppt, selectedDate])

  // Filtrer les rendez-vous en attente
  const pendingAppointments = useMemo(() => {
    return appointments.filter(appt => appt.statut === 'PENDING')
  }, [appointments])

  const updateDay = (key: DayKey, patch: Partial<AppointmentScheduleConfig['days'][DayKey]>) => {
    setScheduleDraft((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        days: {
          ...prev.days,
          [key]: { ...prev.days[key], ...patch },
        },
      }
    })
  }

  const updatePause = (patch: Partial<NonNullable<AppointmentScheduleConfig['pause']>>) => {
    setScheduleDraft((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        pause: { ...(prev.pause ?? { start: '13:00', end: '14:00' }), ...patch },
      }
    })
  }

  const handleUpdateSchedule = async () => {
    if (!scheduleDraft) return
    try {
      setSavingSchedule(true)
      const res = await appointmentService.updateScheduleConfig(scheduleDraft)
      setSchedule(res.data)
      setScheduleDraft(res.data)
      setToast({ type: 'success', msg: 'Planning mis à jour' })
    } catch (err: any) {
      setToast({ type: 'error', msg: err.message || 'Mise à jour impossible' })
    } finally {
      setSavingSchedule(false)
    }
  }

  // Gérer la mise à jour du statut
  const handleUpdateStatus = async () => {
    if (!selectedAppt) return
    try {
      setProcessingStatus(true)
      const updatedAppt = await appointmentService.updateAppointmentStatus(selectedAppt.id, {
        statut: newStatus,
        raison_refus: newStatus === 'CANCELLED' ? raisonRefus : undefined
      })
      setAppointments(prev => prev.map(a => a.id === selectedAppt.id ? updatedAppt.data : a))
      setPublicAppointments(prev => prev.map(a => a.id === selectedAppt.id ? { ...a, statut: newStatus } : a))
      setStatusModalOpen(false)
    } catch (err) {
      setToast({ type: 'error', msg: err instanceof Error ? err.message : 'Erreur lors de la mise à jour' })
    } finally {
      setProcessingStatus(false)
    }
  }

  // Gérer la reprogrammation
  const handleNotes = async () => {
    if (!notesAppt) return
    setProcessingNotes(true)
    try {
      const updated = await appointmentService.updateNotesAdmin(notesAppt.id, notesText.trim() || null)
      setAppointments(prev => prev.map(a => a.id === notesAppt.id ? { ...a, notes_admin: updated.data.notes_admin } : a))
      setNotesModalOpen(false)
      setToast({ type: 'success', msg: 'Notes enregistrées' })
    } catch (err: any) {
      setToast({ type: 'error', msg: err.message || 'Erreur' })
    } finally {
      setProcessingNotes(false)
    }
  }

  const handleReply = async () => {
    if (!selectedReview) return
    setProcessingReply(true)
    try {
      await reviewService.repondreAdmin(selectedReview.id, replyText.trim() || null)
      setReviews(prev => prev.map(r =>
        r.id === selectedReview.id
          ? { ...r, reponse_admin: replyText.trim() || null }
          : r
      ))
      setReplyModalOpen(false)
      setToast({ type: 'success', msg: replyText.trim() ? 'Réponse publiée' : 'Réponse supprimée' })
    } catch (err: any) {
      setToast({ type: 'error', msg: err.message || 'Erreur lors de la réponse' })
    } finally {
      setProcessingReply(false)
    }
  }

  const handleReschedule = async () => {
    if (!selectedAppt || !selectedDate || !selectedSlot) return
    try {
      setProcessingReschedule(true)
      // Construire la date complète
      const appointmentDate = new Date(selectedDate)
      // Ajouter l'heure
      const [hours, minutes] = selectedSlot.split(':').map(Number)
      appointmentDate.setHours(hours, minutes, 0, 0)

      const updatedAppt = await appointmentService.updateAppointment(selectedAppt.id, {
        date_heure: appointmentDate.toISOString(),
        duree: selectedAppt.duree,
        type_seance_id: selectedAppt.type_seance_id,
        notes: selectedAppt.notes
      })
      setAppointments(prev => prev.map(a => a.id === selectedAppt.id ? updatedAppt.data : a))
      setPublicAppointments(prev => prev.map(a => a.id === selectedAppt.id ? { ...a, date_heure: appointmentDate.toISOString() } : a))
      setRescheduleModalOpen(false)
      setSelectedDate(null)
      setSelectedSlot(null)
    } catch (err) {
      setToast({ type: 'error', msg: err instanceof Error ? err.message : 'Erreur lors de la reprogrammation' })
    } finally {
      setProcessingReschedule(false)
    }
  }

  return (
    <AdminLayout title="Espace Praticien">
      {toast && <Toast type={toast.type} message={toast.msg} onClose={() => setToast(null)} />}
      <div className="px-6 pb-20 pt-8 max-w-[1280px] mx-auto space-y-8">

        {/* Page header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between py-4 border-b border-outline-variant">
          <div>
            <h2 className="font-headline-md text-headline-md text-sage-deep">Espace Praticien</h2>
            <p className="font-body-md text-on-surface-variant">Bienvenue, {firstName} {lastName}. Voici l'aperçu de votre activité du jour.</p>
          </div>
          <Link to="/appointments" className="mt-4 md:mt-0 px-6 py-2.5 border border-primary text-primary font-label-md text-label-md rounded-full hover:bg-primary hover:text-white transition-all duration-300">
            Réserver une séance
          </Link>
        </div>

        <div className="grid grid-cols-12 gap-6">

          {/* Rendez-vous en attente */}
          <section className="col-span-12 lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm text-charcoal-muted">Rendez-vous en attente</h3>
              <span className="bg-status-pending px-3 py-1 rounded-full text-[10px] font-bold text-on-secondary-fixed uppercase tracking-wider">
                {pendingAppointments.length} demande{pendingAppointments.length > 1 ? 's' : ''}
              </span>
            </div>
            <div className="space-y-3">
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-on-surface-variant">Chargement des rendez-vous...</p>
                </div>
              ) : pendingAppointments.length === 0 ? (
                <div className="text-center py-8">
                  <span className="material-symbols-outlined text-4xl text-outline block mb-4">event</span>
                  <p className="font-body-md text-body-md text-on-surface-variant">Aucun rendez-vous en attente</p>
                </div>
              ) : (
                pendingAppointments.map(apt => (
                  <div key={apt.id} className="bg-white/70 backdrop-blur-sm border border-white/30 p-4 rounded-xl flex items-center justify-between hover:scale-[1.01] transition-transform shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 bg-sand-light text-secondary">
                        {getClientInitials(apt.utilisateur.firstName, apt.utilisateur.lastName)}
                      </div>
                      <div>
                        <h4 className="font-label-md text-label-md text-primary">{apt.utilisateur.firstName} {apt.utilisateur.lastName}</h4>
                        <p className="font-caption text-on-surface-variant">{apt.type_seance.nom} • {apt.duree} min</p>
                        <p className="font-caption text-on-surface-variant">{formatAppointmentTime(apt.date_heure)}</p>
                        {apt.notes && (
                          <p className="font-caption text-on-surface-variant mt-1 italic">"{apt.notes}"</p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button 
                        className="p-2 text-status-confirmed hover:bg-status-confirmed/10 rounded-full transition-colors" 
                        title="Accepter"
                        onClick={() => {
                          setSelectedAppt(apt)
                          setNewStatus('CONFIRMED')
                          setRaisonRefus('')
                          setStatusModalOpen(true)
                        }}
                      >
                        <span className="material-symbols-outlined">check_circle</span>
                      </button>
                      <button 
                        className="p-2 text-on-surface-variant hover:bg-surface-variant rounded-full transition-colors" 
                        title="Notes privées"
                        onClick={() => {
                          setNotesAppt(apt)
                          setNotesText(apt.notes_admin ?? '')
                          setNotesModalOpen(true)
                        }}
                      >
                        <span className="material-symbols-outlined">sticky_note_2</span>
                      </button>
                      <button 
                        className="p-2 text-on-surface-variant hover:bg-surface-variant rounded-full transition-colors" 
                        title="Reprogrammer"
                        onClick={() => {
                          setSelectedAppt(apt)
                          // Initialiser la date sélectionnée avec la date actuelle du rendez-vous
                          const currentDate = new Date(apt.date_heure)
                          setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()))
                          setSelectedSlot(`${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}`)
                          setRescheduleModalOpen(true)
                        }}
                      >
                        <span className="material-symbols-outlined">calendar_clock</span>
                      </button>
                      <button 
                        className="p-2 text-error hover:bg-error/10 rounded-full transition-colors" 
                        title="Refuser"
                        onClick={() => {
                          setSelectedAppt(apt)
                          setNewStatus('CANCELLED')
                          setRaisonRefus('')
                          setStatusModalOpen(true)
                        }}
                      >
                        <span className="material-symbols-outlined">cancel</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Planning hebdomadaire */}
          <section className="col-span-12 lg:col-span-4 bg-sand-light/30 p-6 rounded-xl border border-outline-variant/30">
            <h3 className="font-headline-sm text-headline-sm text-charcoal-muted mb-4">Planning hebdomadaire</h3>
            {!scheduleDraft ? (
              <div className="text-on-surface-variant">Chargement du planning…</div>
            ) : (
              <div className="space-y-3">
                {DAY_LABELS.map(({ key, label }) => {
                  const day = scheduleDraft.days[key]
                  const active = Boolean(day?.active)
                  const start = day?.start ?? '09:00'
                  const end = day?.end ?? '18:00'
                  return (
                    <div key={key} className={`flex items-center justify-between ${!active ? 'opacity-50' : ''}`}>
                      <span className="font-label-md text-label-md w-10">{label}</span>
                      <div className="flex-1 mx-3 flex gap-2">
                        {active ? (
                          <>
                            <input
                              value={start}
                              onChange={(e) => updateDay(key, { start: e.target.value })}
                              className="w-full bg-white border-none rounded-lg text-xs py-1 px-2 focus:ring-1 focus:ring-primary"
                              disabled={savingSchedule}
                            />
                            <span className="text-on-surface-variant self-center">-</span>
                            <input
                              value={end}
                              onChange={(e) => updateDay(key, { end: e.target.value })}
                              className="w-full bg-white border-none rounded-lg text-xs py-1 px-2 focus:ring-1 focus:ring-primary"
                              disabled={savingSchedule}
                            />
                          </>
                        ) : (
                          <span className="text-xs text-error italic">Fermé</span>
                        )}
                      </div>
                      <input
                        type="checkbox"
                        checked={active}
                        onChange={() => {
                          if (!active && (!day.start || !day.end)) {
                            updateDay(key, { active: true, start: '09:00', end: '18:00' })
                          } else {
                            updateDay(key, { active: !active })
                          }
                        }}
                        className="rounded text-primary focus:ring-primary"
                        disabled={savingSchedule}
                      />
                    </div>
                  )
                })}
                <div className="pt-4">
                  <h4 className="font-label-md text-label-md mb-2">Pause par défaut</h4>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-on-surface-variant text-sm">coffee</span>
                    <input
                      value={scheduleDraft.pause?.start ?? '13:00'}
                      onChange={(e) => updatePause({ start: e.target.value })}
                      className="w-full bg-white border-none rounded-lg text-xs py-1.5 px-3 focus:ring-1 focus:ring-primary"
                      disabled={savingSchedule}
                    />
                    <span className="text-on-surface-variant self-center">-</span>
                    <input
                      value={scheduleDraft.pause?.end ?? '14:00'}
                      onChange={(e) => updatePause({ end: e.target.value })}
                      className="w-full bg-white border-none rounded-lg text-xs py-1.5 px-3 focus:ring-1 focus:ring-primary"
                      disabled={savingSchedule}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleUpdateSchedule}
                  disabled={savingSchedule}
                  className={`w-full mt-2 py-2 text-white font-label-md text-label-md rounded-lg hover:opacity-90 transition-opacity bg-primary ${
                    savingSchedule ? 'opacity-60 cursor-not-allowed' : ''
                  }`}
                >
                  {savingSchedule ? 'Mise à jour…' : 'Mettre à jour'}
                </button>
              </div>
            )}
          </section>

          {/* Inventaire produits */}
          <section className="col-span-12 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm text-charcoal-muted">Inventaire produits</h3>
              <div className="flex items-center gap-2">
                <Link to="/admin/products" className="px-4 py-2 rounded-full font-label-md text-label-md border border-outline-variant/40 hover:bg-surface-variant transition-colors">
                  Voir tout
                </Link>
                <Link to="/admin/products/add" className="flex items-center gap-2 bg-surface-container-highest px-4 py-2 rounded-full font-label-md text-label-md hover:bg-secondary-container transition-colors">
                  <span className="material-symbols-outlined text-[20px]">add</span>
                  Ajouter un produit
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {loadingProducts ? (
                <div className="col-span-12 text-on-surface-variant">Chargement…</div>
              ) : products.length === 0 ? (
                <div className="col-span-12 text-on-surface-variant">Aucun produit.</div>
              ) : (
                products.map((p) => {
                  const status =
                    p.stock <= 0 ? 'Rupture' : p.stock <= 3 ? 'Stock faible' : 'En stock'
                  const statusColor =
                    p.stock <= 0 ? 'bg-error/90' : p.stock <= 3 ? 'bg-status-pending/80' : 'bg-status-confirmed/90'
                  return (
                    <div key={p.id} className="bg-white rounded-xl overflow-hidden border border-outline-variant/30 flex flex-col group">
                      <div className="h-48 relative overflow-hidden bg-surface-variant">
                        {p.images?.[0] ? (
                          <img src={p.images[0]} alt={p.nom} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : null}
                        <span className={`absolute top-3 right-3 ${statusColor} backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter`}>
                          {status}
                        </span>
                      </div>
                      <div className="p-4 space-y-2">
                        <h4 className="font-label-md text-label-md text-primary">{p.nom}</h4>
                        <div className="flex justify-between items-center">
                          <p className="font-headline-sm text-[18px] text-sage-deep">{formatPriceFCFA(p.prix)}</p>
                          <span className="font-caption text-on-surface-variant">{p.stock} unité(s)</span>
                        </div>
                        <div className="flex gap-2 pt-1">
                          <Link to={`/admin/products/${p.id}/edit`} className="flex-1 text-center py-1.5 border cursor-pointer border-outline-variant rounded-lg font-caption hover:bg-surface-variant transition-colors">
                            Modifier
                          </Link>
                          <Link to="/admin/products" className="p-1.5 text-on-surface-variant hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">visibility</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </section>

          {/* Avis récents */}
          <section className="col-span-12 lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm text-charcoal-muted">Avis récents</h3>
              <span className="font-caption text-on-surface-variant">{reviews.length} avis</span>
            </div>
            <div className="space-y-4">
              {loadingReviews ? (
                /* Skeletons */
                Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="bg-white/50 p-4 rounded-xl border-l-4 border-outline-variant animate-pulse">
                    <div className="flex justify-between mb-2">
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <div key={j} className="w-4 h-4 bg-outline-variant/30 rounded" />
                        ))}
                      </div>
                      <div className="w-16 h-3 bg-outline-variant/20 rounded" />
                    </div>
                    <div className="space-y-1 mb-3">
                      <div className="h-3 bg-outline-variant/20 rounded w-full" />
                      <div className="h-3 bg-outline-variant/20 rounded w-4/5" />
                    </div>
                    <div className="h-3 bg-outline-variant/20 rounded w-24" />
                  </div>
                ))
              ) : reviews.length === 0 ? (
                <div className="text-center py-8">
                  <span className="material-symbols-outlined text-4xl text-outline block mb-4">rate_review</span>
                  <p className="font-body-md text-body-md text-on-surface-variant">Aucun avis pour le moment</p>
                </div>
              ) : (
                reviews.map((r) => (
                  <div key={r.id} className="bg-white/50 p-4 rounded-xl border-l-4 border-status-confirmed shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      {/* Étoiles */}
                      <div className="flex gap-0.5 text-[#D4AF37]">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <span
                            key={j}
                            className="material-symbols-outlined text-[16px]"
                            style={{ fontVariationSettings: j < r.note ? "'FILL' 1" : "'FILL' 0" }}
                          >
                            star
                          </span>
                        ))}
                      </div>
                      <span className="font-caption text-on-surface-variant">{timeAgo(r.createdAt)}</span>
                    </div>

                    {/* Titre */}
                    {r.titre && (
                      <p className="font-label-md text-label-md text-sage-deep mb-1">{r.titre}</p>
                    )}

                    {/* Contenu */}
                    <p className="font-body-md italic text-primary mb-2 line-clamp-2">"{r.contenu}"</p>

                    {/* Auteur avec initiales */}
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-sage-deep/10 text-sage-deep flex items-center justify-center text-[10px] font-bold shrink-0">
                        {getReviewerInitials(r.utilisateur.firstName, r.utilisateur.lastName)}
                      </div>
                      <span className="font-label-md text-label-md opacity-60">
                        {r.utilisateur.firstName} {r.utilisateur.lastName[0]}.
                      </span>
                    </div>

                    {/* Bouton répondre + masquer */}
                    <div className="pl-4 border-l border-outline-variant pt-2 mt-3 flex items-center gap-4">
                      <button
                        onClick={() => {
                          setSelectedReview(r)
                          setReplyText(r.reponse_admin ?? '')
                          setReplyModalOpen(true)
                        }}
                        className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline"
                      >
                        <span className="material-symbols-outlined text-sm">reply</span>
                        {r.reponse_admin ? 'Modifier la réponse' : 'Répondre au client'}
                      </button>
                      <button
                        onClick={async () => {
                          try {
                            const res = await reviewService.toggleMasque(r.id)
                            setReviews(prev => prev.map(x => x.id === r.id ? { ...x, masque: res.data.masque } : x))
                            setToast({ type: 'info', msg: res.data.masque ? 'Avis masqué' : 'Avis visible' })
                          } catch (err: any) {
                            setToast({ type: 'error', msg: err.message })
                          }
                        }}
                        className="text-xs text-on-surface-variant font-semibold flex items-center gap-1 hover:underline"
                      >
                        <span className="material-symbols-outlined text-sm">{r.masque ? 'visibility' : 'visibility_off'}</span>
                        {r.masque ? 'Réafficher' : 'Masquer'}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Ventes récentes */}
          <section className="col-span-12 lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm text-charcoal-muted">Ventes récentes</h3>
              <Link to="/admin/orders" className="text-primary font-label-md text-label-md hover:underline">Voir tout</Link>
            </div>

            {loadingOrders ? (
              /* Skeletons */
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-12 bg-outline-variant/10 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-4xl text-outline block mb-2">shopping_bag</span>
                <p className="font-body-md text-body-md text-on-surface-variant">Aucune commande pour le moment</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left font-body-md">
                  <thead>
                    <tr className="border-b border-outline-variant">
                      {['N° Commande', 'Client', 'Total', 'Statut'].map(h => (
                        <th key={h} className="pb-3 font-label-md text-label-md text-on-surface-variant">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/30">
                    {orders.map(o => (
                      <tr key={o.id} className="hover:bg-surface-container-low transition-colors">
                        <td className="py-3 text-xs font-mono text-sage-deep font-semibold">{o.numero}</td>
                        <td className="py-3 font-semibold text-sm truncate max-w-[120px]">
                          {o.utilisateur
                            ? `${o.utilisateur.firstName} ${o.utilisateur.lastName}`
                            : '—'}
                        </td>
                        <td className="py-3 text-sm whitespace-nowrap">
                          {o.total.toLocaleString('fr-FR')} FCFA
                        </td>
                        <td className="py-3">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${SALES_STATUS_STYLE[o.statut]}`}>
                            {SALES_STATUS_FR[o.statut]}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>

        <footer className="py-8 border-t border-outline-variant text-center opacity-30">
          <p className="font-label-md text-label-md">© 2024 Ben Massage & Wellness</p>
        </footer>
      </div>

      {/* Modal de mise à jour de statut */}
      {statusModalOpen && selectedAppt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl">edit_calendar</span>
                <h3 className="font-headline-md text-sage-deep">Mettre à jour le rendez-vous</h3>
              </div>
              <button 
                className="p-1 hover:bg-sand-light rounded-full transition-colors"
                onClick={() => setStatusModalOpen(false)}
              >
                <span className="material-symbols-outlined text-on-surface-variant">close</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="font-label-md text-label-md text-sage-deep block mb-2">Nouveau statut</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as any)}
                  className="w-full p-3 rounded-lg border border-outline-variant/30 bg-surface-container-lowest"
                >
                  <option value="PENDING">En attente</option>
                  <option value="CONFIRMED">Confirmé</option>
                  <option value="COMPLETED">Terminé</option>
                  <option value="CANCELLED">Annulé</option>
                </select>
              </div>

              {newStatus === 'CANCELLED' && (
                <div>
                  <label className="font-label-md text-label-md text-sage-deep block mb-2">Raison de l'annulation</label>
                  <textarea
                    value={raisonRefus}
                    onChange={(e) => setRaisonRefus(e.target.value)}
                    className="w-full p-3 rounded-lg border border-outline-variant/30 bg-surface-container-lowest min-h-[100px]"
                    placeholder="Entrez la raison..."
                  />
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-outline-variant/20">
                <button 
                  className="flex-1 py-2 font-label-md text-label-md text-on-surface-variant border border-outline-variant/30 rounded-lg hover:bg-surface-variant transition-colors"
                  onClick={() => setStatusModalOpen(false)}
                  disabled={processingStatus}
                >
                  Annuler
                </button>
                <button 
                  className="flex-1 py-2 font-label-md text-label-md bg-primary text-white rounded-lg hover:bg-sage-deep transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleUpdateStatus}
                  disabled={processingStatus}
                  style={{ backgroundColor: '#425646' }}
                >
                  {processingStatus ? 'Mise à jour...' : 'Enregistrer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de reprogrammation */}
      {rescheduleModalOpen && selectedAppt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl">schedule</span>
                <h3 className="font-headline-md text-sage-deep">Reprogrammer le rendez-vous</h3>
              </div>
              <button 
                className="p-1 hover:bg-sand-light rounded-full transition-colors"
                onClick={() => {
                  setRescheduleModalOpen(false)
                  setSelectedDate(null)
                  setSelectedSlot(null)
                }}
              >
                <span className="material-symbols-outlined text-on-surface-variant">close</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Calendar */}
              <MiniCalendar 
                selectedDate={selectedDate} 
                onSelect={(date) => {
                  setSelectedDate(date)
                  setSelectedSlot(null)
                }} 
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
                <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#c3c8c1 transparent' }}>
                  {slots.map((slot) => (
                    <button
                      key={slot.time}
                      disabled={!slot.available || !selectedDate}
                      onClick={() => setSelectedSlot(slot.time)}
                      className={`py-3 px-4 rounded-lg font-caption text-caption text-center transition-all border ${
                        !slot.available
                          ? 'opacity-40 border-outline-variant cursor-not-allowed line-through'
                          : selectedSlot === slot.time
                          ? 'border-primary bg-primary text-white shadow-md'
                          : !selectedDate
                          ? 'border-outline-variant opacity-40 cursor-not-allowed'
                          : 'border-outline-variant hover:border-primary hover:bg-sand-light'
                      }`}
                      style={selectedSlot === slot.time ? { backgroundColor: '#425646', color: '#ffffff' } : {}}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-outline-variant/20">
              <button 
                className="flex-1 py-2 font-label-md text-label-md text-on-surface-variant border border-outline-variant/30 rounded-lg hover:bg-surface-variant transition-colors"
                onClick={() => {
                  setRescheduleModalOpen(false)
                  setSelectedDate(null)
                  setSelectedSlot(null)
                }}
                disabled={processingReschedule}
              >
                Annuler
              </button>
              <button 
                className="flex-1 py-2 font-label-md text-label-md bg-primary text-white rounded-lg hover:bg-sage-deep transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleReschedule}
                disabled={processingReschedule || !selectedDate || !selectedSlot}
                style={{ backgroundColor: '#425646' }}
              >
                {processingReschedule ? 'Reprogrammation...' : 'Enregistrer'}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal notes admin RDV */}
      {notesModalOpen && notesAppt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-2xl">sticky_note_2</span>
                <h3 className="font-headline-sm text-sage-deep">Notes privées</h3>
              </div>
              <button onClick={() => setNotesModalOpen(false)} className="p-1 hover:bg-sand-light rounded-full">
                <span className="material-symbols-outlined text-on-surface-variant">close</span>
              </button>
            </div>
            <div className="bg-surface-container-low rounded-lg p-3 mb-4 text-sm">
              <p className="font-semibold text-sage-deep">{notesAppt.utilisateur.firstName} {notesAppt.utilisateur.lastName}</p>
              <p className="text-on-surface-variant">{notesAppt.type_seance.nom} · {notesAppt.duree} min · {formatAppointmentTime(notesAppt.date_heure)}</p>
            </div>
            <textarea
              value={notesText}
              onChange={e => setNotesText(e.target.value)}
              rows={4}
              maxLength={500}
              className="w-full p-3 rounded-lg border border-outline-variant/30 bg-surface-container-lowest resize-none text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Notes internes (non visibles par le client)…"
            />
            <p className="text-xs text-on-surface-variant text-right mb-4">{notesText.length}/500</p>
            <div className="flex gap-3">
              <button onClick={() => setNotesModalOpen(false)} disabled={processingNotes}
                className="flex-1 py-2 font-label-md text-on-surface-variant border border-outline-variant/30 rounded-lg hover:bg-surface-variant transition-colors">
                Annuler
              </button>
              <button onClick={handleNotes} disabled={processingNotes}
                className="flex-1 py-2 font-label-md bg-primary text-white rounded-lg hover:bg-sage-deep transition-colors disabled:opacity-50">
                {processingNotes ? 'Enregistrement…' : 'Enregistrer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal réponse admin à un avis */}
      {replyModalOpen && selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-2xl">support_agent</span>
                <h3 className="font-headline-sm text-sage-deep">
                  {selectedReview.reponse_admin ? 'Modifier la réponse' : 'Répondre au client'}
                </h3>
              </div>
              <button onClick={() => setReplyModalOpen(false)} className="p-1 hover:bg-sand-light rounded-full">
                <span className="material-symbols-outlined text-on-surface-variant">close</span>
              </button>
            </div>

            {/* Avis original */}
            <div className="bg-surface-container-low rounded-lg p-3 mb-4">
              <div className="flex gap-0.5 text-[#D4AF37] mb-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: j < selectedReview.note ? "'FILL' 1" : "'FILL' 0" }}>star</span>
                ))}
              </div>
              <p className="text-sm font-semibold text-sage-deep mb-1">{selectedReview.titre}</p>
              <p className="text-xs text-on-surface-variant line-clamp-3">{selectedReview.contenu}</p>
              <p className="text-xs text-outline mt-1">
                — {selectedReview.utilisateur.firstName} {selectedReview.utilisateur.lastName}
              </p>
            </div>

            <div className="space-y-3">
              <label className="font-label-md text-label-md text-sage-deep block">Votre réponse</label>
              <textarea
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                rows={4}
                maxLength={1000}
                className="w-full p-3 rounded-lg border border-outline-variant/30 bg-surface-container-lowest resize-none text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Écrivez votre réponse... (laisser vide pour supprimer)"
              />
              <p className="text-xs text-on-surface-variant text-right">{replyText.length}/1000</p>
            </div>

            <div className="flex gap-3 pt-4 border-t border-outline-variant/20 mt-4">
              <button
                onClick={() => setReplyModalOpen(false)}
                disabled={processingReply}
                className="flex-1 py-2 font-label-md text-on-surface-variant border border-outline-variant/30 rounded-lg hover:bg-surface-variant transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleReply}
                disabled={processingReply}
                className="flex-1 py-2 font-label-md bg-primary text-white rounded-lg hover:bg-sage-deep transition-colors disabled:opacity-50"
              >
                {processingReply ? 'Publication...' : replyText.trim() ? 'Publier la réponse' : 'Supprimer la réponse'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
