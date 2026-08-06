import { useEffect, useMemo, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { appointmentService, type RendezVousWithUser } from '../../services/appointment.service'

type Statut = RendezVousWithUser['statut']

const STATUT_FR: Record<Statut, string> = {
  PENDING:   'En attente',
  CONFIRMED: 'Confirmé',
  COMPLETED: 'Terminé',
  CANCELLED: 'Annulé',
}

const STATUT_STYLE: Record<Statut, string> = {
  PENDING:   'bg-status-pending/20 text-secondary',
  CONFIRMED: 'bg-status-confirmed/10 text-status-confirmed',
  COMPLETED: 'bg-outline-variant/40 text-on-surface-variant',
  CANCELLED: 'bg-status-cancelled/10 text-status-cancelled',
}

const STATUT_DOT: Record<Statut, string> = {
  PENDING:   'bg-status-pending',
  CONFIRMED: 'bg-status-confirmed',
  COMPLETED: 'bg-outline-variant',
  CANCELLED: 'bg-status-cancelled',
}

const STATUT_CAL: Record<Statut, string> = {
  PENDING:   'bg-status-pending/20 text-secondary border-status-pending',
  CONFIRMED: 'bg-status-confirmed/10 text-status-confirmed border-status-confirmed',
  COMPLETED: 'bg-outline-variant/30 text-on-surface-variant border-outline-variant',
  CANCELLED: 'bg-status-cancelled/10 text-status-cancelled border-status-cancelled',
}

const DAYS_FR = ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM']
const MONTHS_FR = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']

function fmtTime(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

function fmtDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
}

function fmtTimeRange(dateStr: string, duree: number) {
  const start = new Date(dateStr)
  const end = new Date(start.getTime() + duree * 60000)
  return `${fmtTime(dateStr)} - ${end.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`
}

function initials(rdv: RendezVousWithUser) {
  return `${rdv.utilisateur.firstName[0]}${rdv.utilisateur.lastName[0]}`.toUpperCase()
}

function fullName(rdv: RendezVousWithUser) {
  return `${rdv.utilisateur.firstName} ${rdv.utilisateur.lastName}`
}

export default function Bookings() {
  const [rdvs, setRdvs] = useState<RendezVousWithUser[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<'calendar' | 'list'>('calendar')
  const [currentDate, setCurrentDate] = useState(() => {
    const d = new Date(); d.setDate(1); return d
  })
  const [selected, setSelected] = useState<RendezVousWithUser | null>(null)

  useEffect(() => {
    document.title = 'Rendez-vous | Admin Ben Massage'
    appointmentService.getAllAppointments()
      .then(res => setRdvs(res.data ?? []))
      .catch(() => setRdvs([]))
      .finally(() => setLoading(false))
  }, [])

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  function prevMonth() { setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1)) }
  function nextMonth() { setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1)) }
  function goToday()   { setCurrentDate(() => { const d = new Date(); d.setDate(1); return d }) }

  // Jours du mois courant
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  // Décalage : lundi = 0
  const firstDayOfWeek = (new Date(year, month, 1).getDay() + 6) % 7
  // Jours du mois précédent pour remplir
  const prevMonthDays = new Date(year, month, 0).getDate()

  // RDV indexés par jour du mois courant
  const rdvByDay = useMemo(() => {
    const map: Record<number, RendezVousWithUser[]> = {}
    for (const rdv of rdvs) {
      const d = new Date(rdv.date_heure)
      if (d.getFullYear() === year && d.getMonth() === month) {
        const day = d.getDate()
        if (!map[day]) map[day] = []
        map[day].push(rdv)
      }
    }
    return map
  }, [rdvs, year, month])

  // RDV d'aujourd'hui
  const today = new Date()
  const todayRdvs = useMemo(() =>
    rdvs.filter(r => {
      const d = new Date(r.date_heure)
      return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear()
    }).sort((a, b) => new Date(a.date_heure).getTime() - new Date(b.date_heure).getTime()),
    [rdvs]
  )

  const isToday = (day: number) =>
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear()

  // Cellules calendrier : prev + current
  const calCells: { day: number; current: boolean }[] = []
  for (let i = 0; i < firstDayOfWeek; i++) {
    calCells.push({ day: prevMonthDays - firstDayOfWeek + 1 + i, current: false })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calCells.push({ day: d, current: true })
  }
  // Compléter jusqu'à multiple de 7
  while (calCells.length % 7 !== 0) {
    calCells.push({ day: calCells.length - firstDayOfWeek - daysInMonth + 1, current: false })
  }

  return (
    <AdminLayout title="Gestion des Rendez-vous">
      <div className="p-6 max-w-[1280px] mx-auto space-y-6">

        {/* Toolbar */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="bg-surface-container-high p-1 rounded-xl flex">
            {(['calendar', 'list'] as const).map(v => (
              <button key={v} onClick={() => setView(v)}
                className={`px-4 py-2 rounded-lg font-label-md text-label-md transition-colors ${view === v ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant hover:bg-surface-variant/50'}`}>
                {v === 'calendar' ? 'Calendrier' : 'Liste'}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={prevMonth} className="p-2 rounded-full hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <h3 className="font-headline-sm text-headline-sm min-w-[180px] text-center">
              {MONTHS_FR[month]} {year}
            </h3>
            <button onClick={nextMonth} className="p-2 rounded-full hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
            <button onClick={goToday} className="px-4 py-2 border border-primary text-primary rounded-xl font-label-md text-label-md hover:bg-primary-fixed transition-colors">
              Aujourd'hui
            </button>
          </div>
        </section>

        {view === 'calendar' ? (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">

            {/* Calendrier */}
            <section className="xl:col-span-8 bg-white rounded-xl border border-outline-variant overflow-hidden shadow-sm">
              <div className="grid grid-cols-7 bg-surface-container-low border-b border-outline-variant">
                {DAYS_FR.map((d, i) => (
                  <div key={d} className={`py-4 text-center font-label-md text-label-md text-on-surface-variant opacity-60 ${i >= 5 ? 'text-primary' : ''}`}>{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7">
                {calCells.map((cell, idx) => {
                  const events = cell.current ? (rdvByDay[cell.day] ?? []) : []
                  const todayCell = cell.current && isToday(cell.day)
                  return (
                    <div key={idx} className={`border-r border-b border-outline-variant/30 p-1 flex flex-col gap-1 min-h-[90px] ${!cell.current ? 'opacity-30 bg-surface-container-low' : ''}`}>
                      {todayCell
                        ? <span className="font-label-md text-label-md font-bold text-primary bg-primary-fixed rounded-full w-6 h-6 flex items-center justify-center mx-auto mb-1">{cell.day}</span>
                        : <span className="font-label-md text-label-md px-1 mb-1">{cell.day}</span>
                      }
                      {events.slice(0, 2).map((rdv, i) => (
                        <button key={i} onClick={() => setSelected(rdv)}
                          className={`${STATUT_CAL[rdv.statut]} p-1 rounded text-[10px] truncate border-l-2 text-left w-full`}>
                          {fmtTime(rdv.date_heure)} {rdv.type_seance.nom}
                        </button>
                      ))}
                      {events.length > 2 && (
                        <span className="text-[10px] text-on-surface-variant px-1">+{events.length - 2}</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </section>

            {/* Aujourd'hui */}
            <section className="xl:col-span-4">
              <div className="bg-white border border-outline-variant rounded-xl p-4 shadow-sm flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-headline-sm text-headline-sm text-primary">Aujourd'hui</h4>
                  <span className="bg-primary-fixed text-primary px-3 py-1 rounded-full text-xs font-bold">{todayRdvs.length} RDV</span>
                </div>
                {loading ? (
                  <div className="py-8 text-center text-on-surface-variant text-sm">Chargement…</div>
                ) : todayRdvs.length === 0 ? (
                  <div className="py-8 text-center text-on-surface-variant text-sm">Aucun rendez-vous aujourd'hui</div>
                ) : (
                  <div className="space-y-3 overflow-y-auto max-h-[480px] pr-1">
                    {todayRdvs.map(rdv => (
                      <div key={rdv.id} className="p-4 rounded-xl border border-outline-variant/50 bg-white hover:border-primary transition-all">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center font-bold text-xs text-primary flex-shrink-0">
                              {initials(rdv)}
                            </div>
                            <div>
                              <p className="font-label-md text-label-md text-on-surface">{fullName(rdv)}</p>
                              <p className="text-xs text-on-surface-variant">{rdv.type_seance.nom}</p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${STATUT_STYLE[rdv.statut]}`}>
                            {STATUT_FR[rdv.statut]}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-on-surface-variant">
                          <span className="material-symbols-outlined text-sm">schedule</span>
                          {fmtTimeRange(rdv.date_heure, rdv.duree)}
                        </div>
                        <button onClick={() => setSelected(rdv)} className="mt-3 w-full py-2 bg-surface-container text-on-surface-variant text-xs rounded-lg hover:bg-surface-container-high transition-colors font-label-md">
                          Voir détails
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        ) : (
          /* Vue liste */
          <section className="bg-white border border-outline-variant rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-outline-variant">
              <h4 className="font-headline-sm text-headline-sm">Tous les rendez-vous</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low text-on-surface-variant font-label-md text-[10px] uppercase tracking-widest">
                  <tr>{['Client', 'Soin', 'Date & Heure', 'Durée', 'Statut', ''].map(h => <th key={h} className="px-6 py-4">{h}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  {loading ? (
                    <tr><td colSpan={6} className="px-6 py-8 text-center text-on-surface-variant">Chargement…</td></tr>
                  ) : rdvs.length === 0 ? (
                    <tr><td colSpan={6} className="px-6 py-8 text-center text-on-surface-variant">Aucun rendez-vous</td></tr>
                  ) : (
                    rdvs.map(rdv => (
                      <tr key={rdv.id} className="hover:bg-surface-container-high/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center font-bold text-xs text-primary">{initials(rdv)}</div>
                            <span className="font-label-md text-label-md">{fullName(rdv)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-on-surface-variant font-body-md">{rdv.type_seance.nom}</td>
                        <td className="px-6 py-4">
                          <span className="font-label-md text-label-md block">{fmtDate(rdv.date_heure)}</span>
                          <span className="text-xs text-on-surface-variant">{fmtTime(rdv.date_heure)}</span>
                        </td>
                        <td className="px-6 py-4 text-on-surface-variant text-sm">{rdv.duree} min</td>
                        <td className="px-6 py-4">
                          <span className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${STATUT_DOT[rdv.statut]}`} />
                            <span className="text-xs font-label-md">{STATUT_FR[rdv.statut]}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => setSelected(rdv)} className="p-2 hover:bg-surface-container-high rounded-full text-on-surface-variant transition-colors">
                            <span className="material-symbols-outlined">more_vert</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>

      {/* Modal détail */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={e => e.target === e.currentTarget && setSelected(null)}>
          <div className="bg-surface rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden">
            <div className="p-6 text-white flex justify-between items-center bg-primary">
              <h3 className="font-headline-sm text-headline-sm">Détails du Rendez-vous</h3>
              <button onClick={() => setSelected(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold text-2xl">
                  {initials(selected)}
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm">{fullName(selected)}</h4>
                  <p className="text-on-surface-variant font-body-md text-sm">{selected.utilisateur.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'Service',  value: `${selected.type_seance.nom} (${selected.duree} min)` },
                  { label: 'Date',     value: fmtDate(selected.date_heure) },
                  { label: 'Heure',    value: fmtTimeRange(selected.date_heure, selected.duree) },
                  { label: 'Statut',   value: STATUT_FR[selected.statut] },
                ].map(f => (
                  <div key={f.label} className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-outline font-bold">{f.label}</label>
                    <p className="font-label-md text-label-md">{f.value}</p>
                  </div>
                ))}
              </div>
              {selected.notes && (
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-outline font-bold">Notes client</label>
                  <div className="bg-surface-container-low p-4 rounded-xl italic text-on-surface-variant text-sm">
                    "{selected.notes}"
                  </div>
                </div>
              )}
              {selected.notes_admin && (
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-outline font-bold">Notes privées</label>
                  <div className="bg-surface-container-low p-4 rounded-xl text-on-surface-variant text-sm">
                    {selected.notes_admin}
                  </div>
                </div>
              )}
              {selected.raison_refus && (
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-outline font-bold">Raison du refus</label>
                  <div className="bg-error-container p-4 rounded-xl text-on-error-container text-sm">
                    {selected.raison_refus}
                  </div>
                </div>
              )}
              <div className="pt-4 border-t border-outline-variant">
                <button onClick={() => setSelected(null)} className="w-full py-3 border border-outline text-on-surface rounded-xl font-label-md text-label-md hover:bg-surface-variant transition-all">
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
