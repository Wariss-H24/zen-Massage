import { useEffect, useState, useMemo } from 'react'
import { useAuth } from '../context/AuthContext'
import UserLayout from '../components/layout/UserLayout'
import { appointmentService, type RendezVous } from '../services/appointment.service'
import Toast from '../components/ui/Toast'

function toLibrevilleUTC(date: Date, timeStr: string): string {
  const [hours, minutes] = timeStr.split(':').map(Number)
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), hours - 1, minutes, 0, 0)).toISOString()
}

/* ── Helper functions ── */
// Fonction pour générer les initiales du service
const getServiceInitials = (serviceName: string): string => {
  const words = serviceName.split(/\s+/).filter(word => word.length > 0)
  if (words.length === 0) return '??'
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}

// Fonction pour formater la date en français (ex: "Jeudi, 12 Octobre")
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr)
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
  const dayName = days[date.getDay()]
  const dayNum = date.getDate()
  const monthName = months[date.getMonth()]
  return `${dayName}, ${dayNum} ${monthName}`
}

// Fonction pour formater l'heure + durée
const formatTime = (dateStr: string, durationMinutes: number): string => {
  const date = new Date(dateStr)
  const startHours = String(date.getHours()).padStart(2, '0')
  const startMinutes = String(date.getMinutes()).padStart(2, '0')
  const endDate = new Date(date.getTime() + durationMinutes * 60000)
  const endHours = String(endDate.getHours()).padStart(2, '0')
  const endMinutes = String(endDate.getMinutes()).padStart(2, '0')
  return `${startHours}:${startMinutes} - ${endHours}:${endMinutes}`
}

// Fonction pour obtenir le statut et la couleur associée
const getStatusInfo = (statut: RendezVous['statut']) => {
  switch (statut) {
    case 'CONFIRMED':
      return { label: 'Confirmé', color: 'bg-primary-fixed/50 text-primary border-primary/10' }
    case 'PENDING':
      return { label: 'En attente', color: 'bg-surface-variant text-on-surface-variant border-outline-variant/30' }
    case 'COMPLETED':
      return { label: 'Terminé', color: 'bg-green-100 text-green-800 border-green-200' }
    case 'CANCELLED':
      return { label: 'Annulé', color: 'bg-red-100 text-red-800 border-red-200' }
  }
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
]
const DAYS_SHORT = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
const MONTHS_FR = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']

/* ── Mini Calendar réutilisé ── */
function MiniCalendar({ 
  selectedDate, 
  onSelect 
}: { 
  selectedDate: Date | null; 
  onSelect: (d: Date) => void 
}) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (selectedDate) {
      return new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    }
    return new Date();
  });

  useEffect(() => {
    if (selectedDate) {
      setCurrentMonth(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
    }
  }, [selectedDate]);

  const { daysInMonth, prevDays } = useMemo(() => {
    const y = currentMonth.getFullYear(), m = currentMonth.getMonth();
    const first = new Date(y, m, 1);
    // Monday-based: 0=Mon … 6=Sun
    const dow = (first.getDay() + 6) % 7;
    return {
      daysInMonth: new Date(y, m + 1, 0).getDate(),
      prevDays: dow,
    };
  }, [currentMonth]);

  const today = new Date()
  today.setHours(0,0,0,0);

  const prevMonth = () => {
    const prev = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    if (prev >= new Date(today.getFullYear(), today.getMonth(), 1)) setCurrentMonth(prev);
  };
  const nextMonth = () => setCurrentMonth(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  return (
    <div className="p-4 bg-white rounded-xl border border-outline-variant/30 w-full max-w-sm mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-1 hover:bg-sand-light rounded-full transition-colors">
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <span className="font-label-md text-label-md text-sage-deep uppercase tracking-wider">
          {MONTHS_FR[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </span>
        <button onClick={nextMonth} className="p-1 hover:bg-sand-light rounded-full transition-colors">
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {DAYS_SHORT.map((d, i) => (
          <span key={i} className="text-[10px] text-outline font-bold">{d}</span>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {/* Filler prev month */}
        {Array.from({ length: prevDays }).map((_, i) => (
          <span key={`p${i}`} className="font-caption text-caption text-outline/30 py-2">
            {new Date(currentMonth.getFullYear(), currentMonth.getMonth(), -prevDays + i + 1).getDate()}
          </span>
        ))}
        {/* Current month days */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const thisDayDate = new Date(
            currentMonth.getFullYear(), 
            currentMonth.getMonth(), 
            day
          );
          thisDayDate.setHours(0,0,0,0);
          
          const isPast = thisDayDate < today;
          
          let isSelected = false;
          if (selectedDate) {
            isSelected = 
              thisDayDate.getFullYear() === selectedDate.getFullYear() &&
              thisDayDate.getMonth() === selectedDate.getMonth() &&
              thisDayDate.getDate() === selectedDate.getDate();
          }

          return (
            <button
              key={day}
              disabled={isPast}
              onClick={() => !isPast && onSelect(thisDayDate)}
              className={`font-caption text-caption py-2 rounded-lg transition-colors ${
                isSelected
                  ? 'bg-primary text-white font-bold shadow-md'
                  : isPast
                  ? 'text-outline/30 cursor-not-allowed'
                  : 'cursor-pointer hover:bg-sand-light'
              }`}
              style={isSelected ? { backgroundColor: '#425646', color: '#ffffff' } : {}}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}


/* ── Page ── */
export default function Account() {
  useEffect(() => {
    document.title = 'Mon Compte | Ben Massage & Wellness Gabon'
  }, [])

  const { user } = useAuth()
  const firstName = user?.firstName || ''
  const [appointments, setAppointments] = useState<RendezVous[]>([])
  const [loading, setLoading] = useState(true)

  // États pour les Modals
  const [cancelModalOpen, setCancelModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedAppt, setSelectedAppt] = useState<RendezVous | null>(null)
  const [processingCancel, setProcessingCancel] = useState(false)
  const [processingEdit, setProcessingEdit] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)
  const [editSelectedDate, setEditSelectedDate] = useState<Date | null>(null)
  const [editSelectedSlot, setEditSelectedSlot] = useState<string | null>(null)

  // Calculer le prochain rendez-vous
  const nextAppointment = useMemo(() => {
    const now = new Date()
    const futureAppts = appointments
      .filter(appt => {
        const apptDate = new Date(appt.date_heure)
        return apptDate > now && appt.statut !== 'CANCELLED'
      })
      .sort((a, b) => new Date(a.date_heure).getTime() - new Date(b.date_heure).getTime())
    return futureAppts[0] || null
  }, [appointments])

  // Charger les rendez-vous de l'utilisateur
  useEffect(() => {
    async function loadAppointments() {
      try {
        setLoading(true)
        const response = await appointmentService.getMyAppointments()
        setAppointments(response.data)
      } catch (err) {
        console.error('Erreur lors du chargement des rendez-vous:', err)
      } finally {
        setLoading(false)
      }
    }
    loadAppointments()
  }, [])

  // Calculer les créneaux disponibles en fonction des rendez-vous existants
  const slots: { time: string; available: boolean }[] = useMemo(() => {
    if (!editSelectedDate) {
      return BASE_SLOTS.map(s => ({ ...s, available: true }))
    }

    // Pour chaque créneau, vérifier s'il est pris
    return BASE_SLOTS.map(baseSlot => {
      // Construire la date+heure du créneau
      const [hours, minutes] = baseSlot.time.split(':').map(Number)
      const slotDateTime = new Date(editSelectedDate)
      slotDateTime.setHours(hours, minutes, 0, 0)

      // Vérifier si ce créneau est déjà pris par un rendez-vous non annulé (sauf le rendez-vous qu'on est en train de modifier)
      const isTaken = appointments.some(apt => {
        if (selectedAppt && apt.id === selectedAppt.id) return false
        const aptDate = new Date(apt.date_heure)
        return (
          aptDate.getFullYear() === slotDateTime.getFullYear() &&
          aptDate.getMonth() === slotDateTime.getMonth() &&
          aptDate.getDate() === slotDateTime.getDate() &&
          aptDate.getHours() === slotDateTime.getHours() &&
          aptDate.getMinutes() === slotDateTime.getMinutes() &&
          apt.statut !== 'CANCELLED'
        )
      })

      return {
        ...baseSlot,
        available: !isTaken
      }
    })
  }, [editSelectedDate, appointments, selectedAppt])

  const handleCancelAppointment = async () => {
    if (!selectedAppt) return
    try {
      setProcessingCancel(true)
      await appointmentService.cancelAppointment(selectedAppt.id)
      // Mettre à jour la liste localement
      setAppointments(prev => prev.map(a => a.id === selectedAppt.id ? { ...a, statut: 'CANCELLED' } : a))
      setCancelModalOpen(false)
    } catch (err) {
      setToast({ type: 'error', msg: err instanceof Error ? err.message : "Erreur lors de l'annulation" })
    } finally {
      setProcessingCancel(false)
    }
  }

  const handleEditAppointment = async () => {
    if (!selectedAppt || !editSelectedDate || !editSelectedSlot) return
    try {
      setProcessingEdit(true)
      const newDateTime = toLibrevilleUTC(editSelectedDate, editSelectedSlot)
      
      const updatedAppt = await appointmentService.updateAppointment(selectedAppt.id, {
        date_heure: newDateTime,
        duree: selectedAppt.duree,
        type_seance_id: selectedAppt.type_seance_id,
        notes: selectedAppt.notes
      })
      setAppointments(prev => prev.map(a => a.id === selectedAppt.id ? updatedAppt.data : a))
      setEditModalOpen(false)
    } catch (err) {
      setToast({ type: 'error', msg: err instanceof Error ? err.message : 'Erreur lors de la modification' })
    } finally {
      setProcessingEdit(false)
    }
  }

  return (
    <UserLayout title="Tableau de bord"
      headerRight={
        <div className="flex items-center gap-6">
          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="h-8 w-px bg-outline-variant/30" />
          <div className="text-right hidden sm:block">
            <p className="font-caption text-caption text-on-surface-variant">Statut du compte</p>
            <p className="font-label-md text-label-md text-status-confirmed">Actif • Premium</p>
          </div>
        </div>
      }
    >
      {toast && <Toast type={toast.type} message={toast.msg} onClose={() => setToast(null)} />}

      <div className="p-6 md:p-margin-desktop space-y-section-gap max-w-container-max mx-auto w-full">

          {/* ── Hero welcome ── */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
            {/* Welcome card */}
            <div className="lg:col-span-2 p-stack-lg bg-surface-container-lowest rounded-xl border border-outline-variant/10 relative overflow-hidden"
              style={{ boxShadow: '0 20px 40px -15px rgba(44,46,48,0.05)' }}>
              <div className="relative z-10">
                <h3 className="font-headline-md text-headline-md text-sage-deep mb-2">Bonjour, {firstName}.</h3>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mb-6">
                  Votre sanctuaire vous attend. Vous avez {appointments.filter(appt => {
                    const now = new Date()
                    const apptDate = new Date(appt.date_heure)
                    return apptDate.getMonth() === now.getMonth() && apptDate.getFullYear() === now.getFullYear() && appt.statut !== 'CANCELLED'
                  }).length} sessions prévues ce mois-ci et 0 points de fidélité Ben cumulés.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="px-6 py-4 bg-sand-light rounded-xl">
                    <span className="block font-caption text-caption text-on-surface-variant uppercase tracking-widest mb-1">Prochaine séance</span>
                    {nextAppointment ? (
                      <span className="block font-headline-sm text-headline-sm text-sage-deep">
                        {new Date(nextAppointment.date_heure).toLocaleDateString('fr-FR', { month: 'long', day: 'numeric' })} à {new Date(nextAppointment.date_heure).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    ) : (
                      <span className="block font-headline-sm text-headline-sm text-on-surface-variant">Aucune séance prévue</span>
                    )}
                  </div>
                  <div className="px-6 py-4 bg-primary-fixed/30 rounded-xl">
                    <span className="block font-caption text-caption text-on-surface-variant uppercase tracking-widest mb-1">Points Ben</span>
                    <span className="block font-headline-sm text-headline-sm text-primary">0 pts</span>
                  </div>
                </div>
              </div>
              {/* Decorative bg */}
              <div className="absolute right-0 top-0 h-full w-1/3 opacity-10 pointer-events-none">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDf8oOe1c5I_o-0GeBJBD8FvHgWv6rmkhNSLbBa4R3I7R1PmZRDVNAqdqT9r6AgdKjdPbmGPVtuZ3DvL0SpEJF7ke8do3D2tQg7y5kX0rfSialdY2u2GoFO7tVCSJXMnmwv192A-6giw9dNfo3oTyGCM9VL8o7Btzd3x0zrt7wlM4ODDQVhFrJhR7xJT3haYmV63gyblKZNN2sQghC9cl4wBTSxm-HU3xUR7DrgxINuofCzZIgfb3B7lH6E97K-GXPFk_15r0Yl3FdQ"
                  alt="" className="w-full h-full object-cover grayscale"
                />
              </div>
            </div>

            {/* Promo card */}
            {/* <div className="bg-sage-deep text-surface p-stack-lg rounded-xl flex flex-col justify-between"
              style={{ boxShadow: '0 20px 40px -15px rgba(44,46,48,0.05)' }}>
              <div>
                <span className="material-symbols-outlined text-4xl mb-4 block">spa</span>
                <h4 className="font-headline-sm text-headline-sm mb-2">Offre Exclusive</h4>
                <p className="font-body-md text-body-md opacity-80">
                  -20% sur les soins aux huiles de forêt équatoriale ce weekend.
                </p>
              </div>
              <button className="w-full py-3 bg-surface text-sage-deep rounded-lg font-label-md text-label-md hover:bg-sand-light transition-colors mt-6">
                Profiter maintenant
              </button>
            </div> */}
          </section>

          {/* ── Appointments ── */}
          <section>
              <div className="flex justify-between items-end mb-stack-md">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-sage-deep">Mes prochains rendez-vous</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">Gérez vos moments de détente</p>
                </div>
                <button className="font-label-md text-label-md text-primary border-b border-primary hover:opacity-70 transition-opacity">
                  Voir tout l'historique
                </button>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <p className="text-on-surface-variant">Chargement de vos rendez-vous...</p>
                </div>
              ) : appointments.length === 0 ? (
                <div className="text-center py-12">
                  <span className="material-symbols-outlined text-4xl text-outline block mb-4">calendar_today</span>
                  <p className="font-body-md text-body-md text-on-surface-variant">Aucun rendez-vous prévu</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                  {appointments.map(appt => {
                    const statusInfo = getStatusInfo(appt.statut)
                    const initials = getServiceInitials(appt.type_seance.nom)
                    return (
                      <div
                        key={appt.id}
                        className={`bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant/20 hover:border-primary/30 transition-all duration-300 ${appt.statut === 'CANCELLED' ? 'opacity-80' : ''}`}
                        style={{ boxShadow: '0 20px 40px -15px rgba(44,46,48,0.05)' }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex gap-4">
                            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-sage-deep flex items-center justify-center">
                              <span className="font-display-lg text-surface">{initials}</span>
                            </div>
                            <div>
                              <h4 className="font-label-md text-label-md text-sage-deep">{appt.type_seance.nom}</h4>
                              <p className="font-caption text-caption text-on-surface-variant flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">schedule</span>
                                {appt.duree} Minutes
                              </p>
                            </div>
                          </div>
                          {statusInfo && (
                            <span className={`px-3 py-1 text-caption font-bold rounded-full border ${statusInfo.color}`}>
                              {statusInfo.label}
                            </span>
                          )}
                        </div>

                        <div className="bg-surface-container-low rounded-lg p-3 mb-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-sage-deep">calendar_month</span>
                            <div>
                              <p className="font-label-md text-label-md text-sage-deep">{formatDate(appt.date_heure)}</p>
                              <p className="font-caption text-caption text-on-surface-variant">{formatTime(appt.date_heure, appt.duree)}</p>
                            </div>
                          </div>
                          <p className="font-label-md text-label-md text-sage-deep">Libreville</p>
                        </div>

                        {appt.statut === 'PENDING' && (
                          <div className="flex gap-3">
                            <button 
                              className="flex-1 py-2 font-label-md text-label-md text-on-surface-variant cursor-pointer hover:bg-surface-variant rounded-lg transition-colors border border-outline-variant/30"
                              onClick={() => {
                                const currentDate = new Date(appt.date_heure)
                                const currentHours = String(currentDate.getHours()).padStart(2, '0')
                                const currentMinutes = String(currentDate.getMinutes()).padStart(2, '0')
                                setSelectedAppt(appt)
                                setEditSelectedDate(currentDate)
                                setEditSelectedSlot(`${currentHours}:${currentMinutes}`)
                                setEditModalOpen(true)
                              }}
                            >
                              Modifier
                            </button>
                            <button 
                              className="flex-1 py-2 font-label-md text-label-md text-error hover:bg-error-container/20 rounded-lg transition-colors border border-error/20"
                              onClick={() => {
                                setSelectedAppt(appt)
                                setCancelModalOpen(true)
                              }}
                            >
                              Annuler
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
          </section>

      </div>

      {/* ── Modal d'annulation ── */}
      {cancelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-error text-3xl">error</span>
              <h3 className="font-headline-md text-sage-deep">Confirmer l'annulation</h3>
            </div>
            <p className="text-on-surface-variant mb-6">
              Êtes-vous sûr de vouloir annuler votre rendez-vous ?
            </p>
            <div className="flex gap-3">
              <button 
                className="flex-1 py-2 font-label-md text-label-md text-on-surface-variant border border-outline-variant/30 rounded-lg hover:bg-surface-variant transition-colors"
                onClick={() => setCancelModalOpen(false)}
                disabled={processingCancel}
              >
                Non
              </button>
              <button 
                className="flex-1 py-2 font-label-md text-label-md bg-error text-white rounded-lg hover:bg-error/90 transition-colors"
                onClick={handleCancelAppointment}
                disabled={processingCancel}
              >
                {processingCancel ? 'Annulation...' : 'Oui, annuler'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal de modification ── */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full shadow-2xl my-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl">edit_calendar</span>
                <h3 className="font-headline-md text-sage-deep">Modifier le rendez-vous</h3>
              </div>
              <button 
                className="p-1 hover:bg-sand-light rounded-full transition-colors"
                onClick={() => setEditModalOpen(false)}
              >
                <span className="material-symbols-outlined text-on-surface-variant">close</span>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-label-md text-label-md text-sage-deep mb-3">Sélectionnez une date</h4>
                <MiniCalendar selectedDate={editSelectedDate} onSelect={(d) => {
                  setEditSelectedDate(d)
                  setEditSelectedSlot(null)
                }} />
              </div>

              {editSelectedDate && (
                <div>
                  <h4 className="font-label-md text-label-md text-sage-deep mb-3">Sélectionnez un horaire</h4>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3 max-h-[300px] overflow-y-auto pr-2">
                    {slots.map((slot) => (
                      <button
                        key={slot.time}
                        disabled={!slot.available}
                        onClick={() => slot.available && setEditSelectedSlot(slot.time)}
                        className={`py-3 px-4 rounded-lg font-caption text-caption text-center transition-all border ${
                          !slot.available
                            ? 'opacity-40 border-outline-variant cursor-not-allowed line-through'
                            : editSelectedSlot === slot.time
                            ? 'border-primary shadow-md bg-primary text-white'
                            : 'border-outline-variant hover:border-primary'
                        }`}
                        style={editSelectedSlot === slot.time ? { backgroundColor: '#425646', color: '#ffffff' } : {}}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-outline-variant/20">
                <button 
                  className="flex-1 py-2 font-label-md text-label-md text-on-surface-variant border border-outline-variant/30 rounded-lg hover:bg-surface-variant transition-colors"
                  onClick={() => setEditModalOpen(false)}
                  disabled={processingEdit}
                >
                  Annuler
                </button>
                <button 
                  className="flex-1 py-2 font-label-md text-label-md bg-primary text-white rounded-lg hover:bg-sage-deep transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleEditAppointment}
                  disabled={!editSelectedSlot || processingEdit}
                >
                  {processingEdit ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </UserLayout>
  )
}
