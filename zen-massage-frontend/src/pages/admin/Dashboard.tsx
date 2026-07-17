import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout'
import { useAuth } from '../../context/AuthContext'

const APPOINTMENTS = [
  { id: 1, name: 'Julianne V.',    service: 'Thérapie Tissu Profond',   duration: '90 min', time: "Aujourd'hui, 16h30", avatar: 'JV', bg: 'bg-sand-light',      color: 'text-secondary' },
  { id: 2, name: 'Marcus Thorne', service: 'Massage Signature Ben',    duration: '60 min', time: 'Demain, 10h00',      avatar: 'MT', bg: 'bg-primary-fixed',   color: 'text-primary' },
  { id: 3, name: 'Léa Fontaine',  service: 'Séance Aromathérapie',     duration: '45 min', time: 'Demain, 14h00',      avatar: 'LF', bg: 'bg-surface-variant', color: 'text-on-surface-variant' },
  { id: 4, name: 'Omar Diallo',   service: 'Thérapie Pierres Chaudes', duration: '75 min', time: 'Jeu, 11h00',         avatar: 'OD', bg: 'bg-sand-light',      color: 'text-secondary' },
]

const PRODUCTS = [
  { name: 'Huile Sérénité',      price: '48 000 FCFA', units: 24,  status: 'En stock',     statusColor: 'bg-status-confirmed/90' },
  { name: 'Kit Sel Himalaya',    price: '32 500 FCFA', units: 3,   status: 'Stock faible', statusColor: 'bg-error/90' },
  { name: 'Bougie Ben Arôme',    price: '18 000 FCFA', units: 112, status: 'En stock',     statusColor: 'bg-status-confirmed/90' },
  { name: 'Parure Lin Texturé',  price: '65 000 FCFA', units: 18,  status: 'En stock',     statusColor: 'bg-status-confirmed/90' },
]

const PRODUCT_IMGS = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDaPeEHe9JfNgQEZ4zDC1dUKd-yHJ0syJS-os0KXVrNcYnfo-0ZjgCVE_RUBLJYjJHEJh4mwnoURE26aIa4o2PyC1fY_-aM2MqbBSq0biaFizVhkwSrH-ENIgVNCvMKfOE0T5RK8uNMNVmQhcGdfK8VxOZ-rxKDe2SaLyo435hLIszJgRWofUPsh7yG8XcgI3ZcsM7UUCjT2p0U6Xj9dIJ6cskHFWv37jipVQjKs0C1ClQyA3q54gZjYTEGDI_MpWclFRZLvx-gUD0D',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBS0YQ0nmY-IPQGgHo3VTDIKC1iY7Y1R5gcoKuI6-F401Pb7jl1uxDDptocrZvRmZhf9JdxiTWmmWyFn0A0wCXmUMCW4oWTk20ay0vEqTAaSZI0aN9k3uvKg9GvVlLxRNnOm8iLEh5dZFykZfQObSEgNuJ5FObeYPpfGEs2Vunc6VOUa5kSWuA3T5olJ4bcMImm6On6Fbo8XrtpSQ_lDqhGZMTiumbzLjsOrX435a6awSMtV8hrYvLo8Yi2AkhklM-sHf7oMuxYpgIT',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA-ye3xa524TPHZnlvs1s-ul5nO5c3aavleFxcdJyuOZr1aE1F39fsjVPk1lLzJk0oph4JPiackWK9GOKdazmchmEAaz2ZWYQSxpf4i39rksg5q1Uxcfu76pcZe2OxNXiLpEWEb0XJ6ZJnJO5py98xtSNtKAfEvT2bKRZiI5GyzRsOqbzHQqlZpuh75MHe47GgouLkkGOE8S8ptIthmwFsufv--jMKdO9mEE8PPc23ApQCVQMWsu713znu8w0D9h2nk4BC0w6gWRxNT',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCsvJb8FFFaCvbGWaVWcFbSmtV971LKHk7u45OFuCBS3DcFnLvK8oMYvtvJf2IHr1P0l9nSTnJGS4cMdlEhY7qpI7Zdbk5_m526JCwoUPrJobpVVx2lBlB7us4vrkoSVVhB5En3Bzl_F-c4ygJc_KFo8pW7mePtJp0vmhCP_cdVPMApaO_gCWeCt0bYXMuttg2bJnpICpTEWZ6W-f9BFMZ5P-bC6ofQNmlFqcmkhuHH-ObgdXEdaO1ERgrHeqeKzHtf5p0Z1D3JsgD6',
]

const SALES = [
  { id: '#ZN-9821', customer: 'Robert Chen',   total: '112 500 FCFA', status: 'Expédié',   statusStyle: 'bg-status-confirmed/10 text-status-confirmed' },
  { id: '#ZN-9744', customer: 'Elena Rossi',   total: '48 000 FCFA',  status: 'En cours',  statusStyle: 'bg-status-pending/20 text-secondary' },
  { id: '#ZN-9740', customer: 'Thomas Wright', total: '215 000 FCFA', status: 'Livré',     statusStyle: 'bg-status-completed/10 text-status-completed' },
  { id: '#ZN-9732', customer: 'Sophia Lane',   total: '32 500 FCFA',  status: 'Retourné',  statusStyle: 'bg-status-cancelled/10 text-status-cancelled' },
]

const DAYS_INIT = [
  { label: 'Lun', start: '09:00', end: '18:00', active: true },
  { label: 'Mar', start: '09:00', end: '18:00', active: true },
  { label: 'Mer', start: '',      end: '',       active: false },
  { label: 'Jeu', start: '09:00', end: '18:00', active: true },
  { label: 'Ven', start: '09:00', end: '17:00', active: true },
]

export default function Dashboard() {
  const { user } = useAuth()
  const [days, setDays] = useState(DAYS_INIT)
  const firstName = user?.firstName || ''
  const lastName = user?.lastName || ''

  useEffect(() => { document.title = 'Espace Praticien | Ben Massage' }, [])

  const toggleDay = (i: number) =>
    setDays(d => d.map((day, idx) => idx === i ? { ...day, active: !day.active } : day))

  return (
    <AdminLayout title="Espace Praticien">
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
                {APPOINTMENTS.length} demandes
              </span>
            </div>
            <div className="space-y-3">
              {APPOINTMENTS.map(apt => (
                <div key={apt.id} className="bg-white/70 backdrop-blur-sm border border-white/30 p-4 rounded-xl flex items-center justify-between hover:scale-[1.01] transition-transform shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${apt.bg} ${apt.color}`}>
                      {apt.avatar}
                    </div>
                    <div>
                      <h4 className="font-label-md text-label-md text-primary">{apt.name}</h4>
                      <p className="font-caption text-on-surface-variant">{apt.service} • {apt.duration}</p>
                      <p className="font-caption text-on-surface-variant">{apt.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-2 text-status-confirmed hover:bg-status-confirmed/10 rounded-full transition-colors" title="Accepter">
                      <span className="material-symbols-outlined">check_circle</span>
                    </button>
                    <button className="p-2 text-on-surface-variant hover:bg-surface-variant rounded-full transition-colors" title="Reprogrammer">
                      <span className="material-symbols-outlined">calendar_clock</span>
                    </button>
                    <button className="p-2 text-error hover:bg-error/10 rounded-full transition-colors" title="Refuser">
                      <span className="material-symbols-outlined">cancel</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Planning hebdomadaire */}
          <section className="col-span-12 lg:col-span-4 bg-sand-light/30 p-6 rounded-xl border border-outline-variant/30">
            <h3 className="font-headline-sm text-headline-sm text-charcoal-muted mb-4">Planning hebdomadaire</h3>
            <div className="space-y-3">
              {days.map((day, i) => (
                <div key={day.label} className={`flex items-center justify-between ${!day.active ? 'opacity-50' : ''}`}>
                  <span className="font-label-md text-label-md w-10">{day.label}</span>
                  <div className="flex-1 mx-3 flex gap-2">
                    {day.active ? (
                      <>
                        <input defaultValue={day.start} className="w-full bg-white border-none rounded-lg text-xs py-1 px-2 focus:ring-1 focus:ring-primary" />
                        <span className="text-on-surface-variant self-center">-</span>
                        <input defaultValue={day.end} className="w-full bg-white border-none rounded-lg text-xs py-1 px-2 focus:ring-1 focus:ring-primary" />
                      </>
                    ) : (
                      <span className="text-xs text-error italic">Fermé</span>
                    )}
                  </div>
                  <input type="checkbox" checked={day.active} onChange={() => toggleDay(i)} className="rounded text-primary focus:ring-primary" />
                </div>
              ))}
              <div className="pt-4">
                <h4 className="font-label-md text-label-md mb-2">Pause par défaut</h4>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant text-sm">coffee</span>
                  <input defaultValue="13:00 - 14:00" className="w-full bg-white border-none rounded-lg text-xs py-1.5 px-3 focus:ring-1 focus:ring-primary" />
                </div>
              </div>
              <button className="w-full mt-2 py-2 text-white font-label-md text-label-md rounded-lg hover:opacity-90 transition-opacity bg-primary">
                Mettre à jour
              </button>
            </div>
          </section>

          {/* Inventaire produits */}
          <section className="col-span-12 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm text-charcoal-muted">Inventaire produits</h3>
              <Link to="/admin/products/add" className="flex items-center gap-2 bg-surface-container-highest px-4 py-2 rounded-full font-label-md text-label-md hover:bg-secondary-container transition-colors">
                <span className="material-symbols-outlined text-[20px]">add</span>
                Ajouter un produit
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRODUCTS.map((p, i) => (
                <div key={p.name} className="bg-white rounded-xl overflow-hidden border border-outline-variant/30 flex flex-col group">
                  <div className="h-48 relative overflow-hidden">
                    <img src={PRODUCT_IMGS[i]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className={`absolute top-3 right-3 ${p.statusColor} backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter`}>
                      {p.status}
                    </span>
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="font-label-md text-label-md text-primary">{p.name}</h4>
                    <div className="flex justify-between items-center">
                      <p className="font-headline-sm text-[18px] text-sage-deep">{p.price}</p>
                      <span className="font-caption text-on-surface-variant">{p.units} unités</span>
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button className="flex-1 py-1.5 border border-outline-variant rounded-lg font-caption hover:bg-surface-variant transition-colors">Modifier</button>
                      <button className="p-1.5 text-on-surface-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">visibility</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Avis récents */}
          <section className="col-span-12 lg:col-span-6 space-y-4">
            <h3 className="font-headline-sm text-headline-sm text-charcoal-muted">Avis récents</h3>
            <div className="space-y-4">
              {[
                { stars: 5, text: '"L\'Huile Sérénité est un vrai changement. Le parfum est incroyablement apaisant. Parfait pour mon rituel du soir."', name: 'Sarah M.', time: 'Il y a 2h', reply: null },
                { stars: 4, text: '"Excellente séance de massage aujourd\'hui. Elena a un toucher très intuitif. La salle était un peu fraîche cependant."', name: 'David L.', time: 'Hier', reply: '"Merci pour votre retour, David ! Je veillerai à ajuster la température pour votre prochaine visite."' },
              ].map((r, i) => (
                <div key={i} className="bg-white/50 p-4 rounded-xl border-l-4 border-status-confirmed shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-1 text-[#D4AF37]">
                      {[...Array(r.stars)].map((_, j) => (
                        <span key={j} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      ))}
                      {r.stars < 5 && <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 0" }}>star</span>}
                    </div>
                    <span className="font-caption text-on-surface-variant">{r.time}</span>
                  </div>
                  <p className="font-body-md italic text-primary mb-2">{r.text}</p>
                  <span className="font-label-md opacity-60">— {r.name}</span>
                  {r.reply ? (
                    <div className="mt-3 pl-4 border-l border-outline-variant pt-2">
                      <div className="text-xs text-on-surface-variant bg-surface-variant/50 p-2 rounded-lg">
                        <p className="font-semibold mb-1">Votre réponse :</p>{r.reply}
                      </div>
                    </div>
                  ) : (
                    <div className="pl-4 border-l border-outline-variant pt-2 mt-3">
                      <button className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline">
                        <span className="material-symbols-outlined text-sm">reply</span>Répondre au client
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Ventes récentes */}
          <section className="col-span-12 lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm text-charcoal-muted">Ventes récentes</h3>
              <Link to="/admin/orders" className="text-primary font-label-md text-label-md hover:underline">Voir tout</Link>
            </div>
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
                  {SALES.map(s => (
                    <tr key={s.id} className="hover:bg-surface-container-low transition-colors">
                      <td className="py-4 text-xs font-mono">{s.id}</td>
                      <td className="py-4 font-semibold">{s.customer}</td>
                      <td className="py-4">{s.total}</td>
                      <td className="py-4">
                        <span className={`${s.statusStyle} text-[10px] px-2 py-0.5 rounded-full font-bold`}>{s.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <footer className="py-8 border-t border-outline-variant text-center opacity-30">
          <p className="font-label-md text-label-md">© 2024 Ben Massage & Wellness</p>
        </footer>
      </div>
    </AdminLayout>
  )
}
