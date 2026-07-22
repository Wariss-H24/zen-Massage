import { useEffect, useState, useMemo } from 'react'
import MainLayout from '../components/layout/MainLayout'
import { appointmentService, type PublicRendezVous } from '../services/appointment.service'
import { useAuth } from '../context/AuthContext'

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
const DAYS_SHORT = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
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

/* ── Mini Calendar ── */
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

  const today = new Date();
  today.setHours(0,0,0,0);

  const prevMonth = () => {
    const prev = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    if (prev >= new Date(today.getFullYear(), today.getMonth(), 1)) setCurrentMonth(prev);
  };
  const nextMonth = () => setCurrentMonth(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  return (
    <div className="p-4 bg-white rounded-lg border border-outline-variant/30">
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
  const [appointments, setAppointments] = useState<PublicRendezVous[]>([])
  const { user } = useAuth()

  // Calculer les créneaux disponibles en fonction des rendez-vous existants
  const slots: Slot[] = useMemo(() => {
    if (!selectedDate) {
      // Si pas de jour sélectionné, tous les créneaux sont "disponibles" mais désactivés
      return BASE_SLOTS.map(s => ({ ...s, available: true }))
    }

    // Pour chaque créneau, vérifier s'il est pris
    return BASE_SLOTS.map(baseSlot => {
      // Construire la date+heure du créneau
      const [hours, minutes] = baseSlot.time.split(':').map(Number)
      const slotDateTime = new Date(selectedDate)
      slotDateTime.setHours(hours, minutes, 0, 0)

      // Vérifier si ce créneau est déjà pris par un rendez-vous non annulé
      const isTaken = appointments.some(apt => {
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
  }, [selectedDate, appointments])

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
      alert(err instanceof Error ? err.message : 'Erreur lors de la réservation')
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
            <p className="font-caption text-caption text-on-surface-variant">
              Un email de confirmation vous sera envoyé à <strong>{form.email}</strong>
            </p>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
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
                <div className="flex justify-center py-12">
                  <span className="text-sage-deep">Chargement des services...</span>
                </div>
              ) : error ? (
                <div className="text-center py-12 text-red-500">
                  <p>{error}</p>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
                  >
                    Réessayer
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((s) => {
                    const isSelected = selectedService?.id === s.id
                    return (
                      <button
                        key={s.id}
                        onClick={() => { setService(s); setStep(s2 => Math.max(s2, 2)) }}
                        className={`group text-left border rounded-xl p-4 transition-all relative ${
                          isSelected
                            ? 'border-primary bg-primary-container/5'
                            : 'border-outline-variant bg-white hover:border-primary'
                        }`}
                      >
                        {/* Check icon */}
                        <span className={`absolute top-4 right-4 text-primary transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                          <span className="material-symbols-outlined" style={{ fontVariationSettings: isSelected ? "'FILL' 1" : "'FILL' 0" }}>
                            check_circle
                          </span>
                        </span>
                        <h3 className="font-headline-sm text-base text-on-surface mb-1">{s.name}</h3>
                        <p className="font-caption text-caption text-on-surface-variant mb-4">{s.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="flex items-center gap-1 font-label-md text-label-md text-sage-deep">
                            <span className="material-symbols-outlined text-[18px]">schedule</span>
                            {s.duration}
                          </span>
                          <span className="font-display-lg text-[20px] text-primary">{s.price}</span>
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
                <MiniCalendar selectedDate={selectedDate} onSelect={(d) => { setSelectedDate(d); setSlot(null) }} />

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
