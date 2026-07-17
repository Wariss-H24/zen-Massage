import { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'

/* ── Calendar data ── */
const PREV_DAYS = [25, 26, 27, 28, 29, 30]

type CalEvent = { time: string; label: string; color: string; dot: string }
const CAL_EVENTS: Record<number, CalEvent[]> = {
  1: [{ time: '10:00', label: 'Massage...', color: 'bg-status-confirmed/10 text-status-confirmed border-status-confirmed', dot: '' }],
  2: [
    { time: '09:15', label: 'Soin Vis...', color: 'bg-status-completed/10 text-status-completed border-status-completed', dot: '' },
    { time: '14:00', label: 'Massage...', color: 'bg-status-confirmed/10 text-status-confirmed border-status-confirmed', dot: '' },
  ],
  4: [{ time: '11:30', label: 'Detox...', color: 'bg-status-pending/20 text-secondary border-status-pending', dot: '' }],
  5: [{ time: '16:45', label: 'Rituel...', color: 'bg-status-cancelled/10 text-status-cancelled border-status-cancelled', dot: '' }],
  6: [
    { time: '10:00', label: 'Pierres...', color: 'bg-primary text-white border-primary', dot: 'today' },
    { time: '12:30', label: 'Soin...', color: 'bg-status-pending/20 text-secondary border-status-pending', dot: '' },
  ],
}

const TODAY_APTS = [
  { id: 1, name: 'Marie Dupont',    service: 'Soin Signature Ben',      time: '10:00 - 11:30', practitioner: 'Sarah J.', status: 'Confirmé',  statusStyle: 'bg-status-confirmed/10 text-status-confirmed', variant: 'default' as const, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCw9tIUWcnjmPiIiPAeCCYp-0oIz9dx7Kt0sf79I3KZrhBdc-FNW6G7yzR-aynY4xD74WFtPIZdKmsUEUDyXg62cg5Fk-UZV9FsiINJiDvUt_PFDDqaL1uYamDPm_hCNEf8f_J9XRlTDr59ic83-CP1Yo4y3waTrjuDxIbv6nkBKlIm2Od01nT6wr93G-RqfD3RF2ekIk3anmqgckct0XUQDM_Ax8Y7lzimyT_nrtnrfwUeLGX5hJR7eg' },
  { id: 2, name: 'Jean-Marc Leroy', service: 'Massage Pierres Chaudes', time: '12:30 - 14:00', practitioner: 'Marc A.',  status: 'En cours',  statusStyle: 'bg-primary text-white',                        variant: 'active'  as const, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcOe0q5XOhvhxsPAj6R6JRyLricN6_7bnZ8jUlmasDugSdZb8N4-Zj0Z4ji-Fcnbb0FDDWC8of3UbRV8fAOKD-31LnyruJoLHVD3Zbo6GqaBg2CQNBf48hKuVYr4vEXdocGWwNrXuNtP0Mm7qTi0S5KZt6i7TfjhaIVT62dt9fq7hr878oQo4zFsWOarpR0_zcmXW7tQitCwF64zsIr5yds2FZnP5oxAcptfDiWHxn9YlWmVH_85taRQ' },
  { id: 3, name: 'Sophie Laurent',  service: 'Réflexologie Plantaire',  time: '15:30 - 16:30', practitioner: 'Léa M.',   status: 'En attente', statusStyle: 'bg-status-pending/20 text-secondary',          variant: 'pending' as const, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ-whtNur3cv81bLxJ2MWpKXcZPdSXEML84tALTnA_fbYQExQLDxTesLcrUVX-9OOVDVSgSSwMUu1kk5i8lEita9njW1UaJuVGRJIPgkY98fGnXx3Rse8rZLxIyp_fTvuoNot10h7vBAUmDVWmJUlQnnAuFFk48aJ0Hy1zwWvYEHFOV4JKDUTd-IpzlRo4eylVLEwz4LvD3CrQRW7GRmXV0uAMWhu_OITyMkVkl1w' },
]

const WEEK_ROWS = [
  { initials: 'CD', bg: 'bg-secondary-container', color: 'text-secondary', name: 'Claire Dubois',    service: 'Drainage Lymphatique', practitioner: 'Sarah Jones',  date: '12 Oct. 2023', time: '09:00 - 10:00', status: 'Confirmé',   dot: 'bg-status-confirmed' },
  { initials: 'PL', bg: 'bg-tertiary-fixed',       color: 'text-tertiary',  name: 'Pierre Lefebvre', service: 'Massage Sportif',       practitioner: 'Marc Antoine', date: '12 Oct. 2023', time: '11:15 - 12:45', status: 'Terminé',    dot: 'bg-status-completed' },
  { initials: 'ML', bg: 'bg-primary-fixed',        color: 'text-primary',   name: 'Marie Laurent',   service: 'Soin Signature Ben',    practitioner: 'Sarah Jones',  date: '13 Oct. 2023', time: '14:00 - 15:30', status: 'En attente', dot: 'bg-status-pending' },
  { initials: 'OD', bg: 'bg-sand-light',           color: 'text-secondary', name: 'Omar Diallo',     service: 'Hot Stone Therapy',     practitioner: 'Léa Martin',   date: '14 Oct. 2023', time: '10:00 - 11:15', status: 'Confirmé',   dot: 'bg-status-confirmed' },
]

export default function Bookings() {
  const [modal, setModal] = useState(false)
  const [view, setView] = useState<'calendar' | 'list'>('calendar')

  useEffect(() => { document.title = 'Appointments | Admin Ben Massage' }, [])

  return (
    <AdminLayout title="Gestion des Rendez-vous">
      <div className="p-6 max-w-[1280px] mx-auto space-y-6">

        {/* Filters */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-surface-container-high p-1 rounded-xl flex">
              {(['calendar', 'list'] as const).map(v => (
                <button key={v} onClick={() => setView(v)}
                  className={`px-4 py-2 rounded-lg font-label-md text-label-md transition-colors ${view === v ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant hover:bg-surface-variant/50'}`}>
                  {v === 'calendar' ? 'Calendrier' : 'Liste'}
                </button>
              ))}
            </div>
            <div className="h-8 w-px bg-outline-variant" />
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-2 border border-outline-variant rounded-xl hover:bg-white transition-colors font-label-md text-label-md">
                <span className="material-symbols-outlined text-sm">filter_list</span>Filtres
              </button>
              <button className="flex items-center gap-2 px-3 py-2 border border-outline-variant rounded-xl hover:bg-white transition-colors font-label-md text-label-md">
                <span className="material-symbols-outlined text-sm">person</span>Praticien
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <h3 className="font-headline-sm text-headline-sm">Octobre 2023</h3>
            <button className="p-2 rounded-full hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
            <button className="px-4 py-2 border border-primary text-primary rounded-xl font-label-md text-label-md hover:bg-primary-fixed transition-colors">
              Aujourd'hui
            </button>
          </div>
        </section>

        {/* Calendar + Today sidebar */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <section className="xl:col-span-8 bg-white rounded-xl border border-outline-variant overflow-hidden shadow-sm">
            <div className="grid grid-cols-7 bg-surface-container-low border-b border-outline-variant">
              {['LUN','MAR','MER','JEU','VEN','SAM','DIM'].map((d, i) => (
                <div key={d} className={`py-4 text-center font-label-md text-label-md text-on-surface-variant opacity-60 ${i >= 5 ? 'text-primary' : ''}`}>{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {PREV_DAYS.map(d => (
                <div key={`prev-${d}`} className="border-r border-b border-outline-variant/30 p-2 opacity-30 bg-surface-container-low min-h-[100px]">
                  <span className="font-label-md text-label-md px-1">{d}</span>
                </div>
              ))}
              {Array.from({ length: 15 }, (_, i) => i + 1).map(day => {
                const events = CAL_EVENTS[day] || []
                const isToday = day === 6
                const isWeekend = [7, 8, 14, 15].includes(day)
                return (
                  <div key={day} className={`border-r border-b border-outline-variant/30 p-1 flex flex-col gap-1 min-h-[100px] ${isWeekend ? 'bg-surface-container' : ''} ${day === 4 ? 'bg-sand-light/30' : ''}`}>
                    {isToday
                      ? <span className="font-label-md text-label-md font-bold text-primary bg-primary-fixed rounded-full w-6 h-6 flex items-center justify-center mx-auto mb-1">{day}</span>
                      : <span className="font-label-md text-label-md px-1 mb-1">{day}</span>
                    }
                    {events.map((ev, i) => (
                      <button key={i} onClick={() => ev.dot === 'today' && setModal(true)}
                        className={`${ev.color} p-1 rounded text-[10px] truncate border-l-2 text-left w-full ${ev.dot === 'today' ? 'cursor-pointer shadow-md' : ''}`}>
                        {ev.time} {ev.label}
                      </button>
                    ))}
                  </div>
                )
              })}
            </div>
          </section>

          <section className="xl:col-span-4">
            <div className="bg-white border border-outline-variant rounded-xl p-4 shadow-sm flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h4 className="font-headline-sm text-headline-sm text-primary">Aujourd'hui</h4>
                <span className="bg-primary-fixed text-primary px-3 py-1 rounded-full text-xs font-bold">{TODAY_APTS.length} RDV</span>
              </div>
              <div className="space-y-3 overflow-y-auto max-h-[480px] pr-1">
                {TODAY_APTS.map(apt => (
                  <div key={apt.id} className={`group p-4 rounded-xl border transition-all duration-300 relative overflow-hidden ${apt.variant === 'active' ? 'bg-primary-fixed/30 border-primary/20' : 'bg-white border-outline-variant/50 hover:border-primary'}`}>
                    {apt.variant === 'active' && (
                      <div className="absolute top-2 right-2">
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-sand-light">
                          <img src={apt.avatar} alt={apt.name} className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                        </div>
                        <div>
                          <p className="font-label-md text-label-md text-on-surface">{apt.name}</p>
                          <p className="text-xs text-on-surface-variant">{apt.service}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${apt.statusStyle}`}>{apt.status}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-on-surface-variant mb-3">
                      <div className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span>{apt.time}</div>
                      <div className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">person_outline</span>{apt.practitioner}</div>
                    </div>
                    {apt.variant === 'active' ? (
                      <button onClick={() => setModal(true)} className="w-full py-2 bg-white text-primary text-xs rounded-lg hover:shadow-sm transition-all font-label-md">Détails</button>
                    ) : apt.variant === 'pending' ? (
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 bg-status-confirmed text-white text-xs rounded-lg font-label-md">Confirmer</button>
                        <button className="flex-1 py-2 bg-surface-container text-on-surface-variant text-xs rounded-lg font-label-md">Reporter</button>
                      </div>
                    ) : (
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="flex-1 py-2 bg-surface-container text-on-surface-variant text-xs rounded-lg font-label-md">Modifier</button>
                        <button className="flex-1 py-2 bg-error-container text-error text-xs rounded-lg font-label-md">Annuler</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button className="w-full py-3 bg-primary text-white rounded-xl font-label-md text-label-md hover:opacity-90 transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">add</span>Nouveau Rendez-vous
              </button>
            </div>
          </section>
        </div>

        {/* Week table */}
        <section className="bg-white border border-outline-variant rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-outline-variant flex justify-between items-center">
            <h4 className="font-headline-sm text-headline-sm">Tous les rendez-vous de la semaine</h4>
            <button className="text-primary font-label-md text-label-md flex items-center gap-1 hover:underline">
              <span className="material-symbols-outlined text-lg">download</span>Exporter (CSV)
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container-low text-on-surface-variant font-label-md text-[10px] uppercase tracking-widest">
                <tr>{['Client', 'Soin', 'Praticien', 'Date & Heure', 'Statut', ''].map(h => <th key={h} className="px-6 py-4">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {WEEK_ROWS.map(row => (
                  <tr key={row.name} className="hover:bg-surface-container-high/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${row.bg} ${row.color}`}>{row.initials}</div>
                        <span className="font-label-md text-label-md">{row.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant font-body-md">{row.service}</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-surface-container-high rounded-full text-xs">{row.practitioner}</span></td>
                    <td className="px-6 py-4">
                      <span className="font-label-md text-label-md block">{row.date}</span>
                      <span className="text-xs text-on-surface-variant">{row.time}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${row.dot}`} />
                        <span className="text-xs font-label-md">{row.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-surface-container-high rounded-full text-on-surface-variant transition-colors">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={e => e.target === e.currentTarget && setModal(false)}>
          <div className="bg-surface rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden">
            <div className="p-6 text-white flex justify-between items-center bg-primary">
              <h3 className="font-headline-sm text-headline-sm">Détails du Rendez-vous</h3>
              <button onClick={() => setModal(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold text-2xl">MD</div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm">Marie Dupont</h4>
                  <p className="text-on-surface-variant font-body-md">Client depuis Janvier 2023</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {[{ label: 'Service', value: 'Soin Signature Ben (90 min)' }, { label: 'Praticien', value: 'Sarah Jones' }, { label: 'Date', value: 'Vendredi 6 Octobre' }, { label: 'Heure', value: '10:00 - 11:30' }].map(f => (
                  <div key={f.label} className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-outline font-bold">{f.label}</label>
                    <p className="font-label-md text-label-md">{f.value}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-outline font-bold">Notes</label>
                <div className="bg-surface-container-low p-4 rounded-xl italic text-on-surface-variant text-sm">
                  "Privilégier une pression modérée sur les cervicales. Marie préfère l'huile de massage à la lavande."
                </div>
              </div>
              <div className="pt-6 flex gap-4 border-t border-outline-variant">
                <button className="flex-1 py-3 bg-status-confirmed text-white rounded-xl font-label-md text-label-md hover:brightness-95 active:scale-95 transition-all">Valider la séance</button>
                <button onClick={() => setModal(false)} className="flex-1 py-3 border border-outline text-on-surface rounded-xl font-label-md text-label-md hover:bg-surface-variant active:scale-95 transition-all">Reprogrammer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
