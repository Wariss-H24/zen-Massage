import { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'

type Status = 'Tous' | 'Livré' | 'En cours' | 'Annulé'

const ORDERS = [
  { id: '#ZN-94821', initials: 'EJ', bg: 'bg-sand-light',     color: 'text-secondary',          name: 'Elena Joli',      email: 'elena.j@email.com',       date: '24 Oct, 2023', status: 'Livré',    amount: '185 000 FCFA' },
  { id: '#ZN-94820', initials: 'ML', bg: 'bg-primary-fixed',  color: 'text-primary',            name: 'Marc Leclerc',    email: 'm.leclerc@pro.fr',        date: '23 Oct, 2023', status: 'En cours', amount: '95 000 FCFA'  },
  { id: '#ZN-94819', initials: 'SD', bg: 'bg-surface-variant', color: 'text-on-surface-variant', name: 'Sophie Durand',   email: 'sophie.d@gmail.com',      date: '22 Oct, 2023', status: 'Annulé',   amount: '210 000 FCFA' },
  { id: '#ZN-94818', initials: 'AB', bg: 'bg-sand-light',     color: 'text-secondary',          name: 'Amélie Bertrand', email: 'a.bertrand@mail.com',     date: '21 Oct, 2023', status: 'Livré',    amount: '125 000 FCFA' },
  { id: '#ZN-94817', initials: 'JV', bg: 'bg-primary-fixed',  color: 'text-primary',            name: 'Jean Valjean',    email: 'j.valjean@history.com',   date: '20 Oct, 2023', status: 'Livré',    amount: '340 000 FCFA' },
]

const STATUS_STYLE: Record<string, string> = {
  'Livré':    'bg-status-confirmed/10 text-status-confirmed',
  'En cours': 'bg-status-pending/10 text-secondary',
  'Annulé':   'bg-status-cancelled/10 text-status-cancelled',
}
const STATUS_DOT: Record<string, string> = {
  'Livré':    'bg-status-confirmed',
  'En cours': 'bg-status-pending',
  'Annulé':   'bg-status-cancelled',
}

export default function OrderHistory() {
  const [filter, setFilter] = useState<Status>('Tous')
  const [page, setPage] = useState(1)

  useEffect(() => { document.title = 'Order History | Admin Zen Massage' }, [])

  const filtered = filter === 'Tous' ? ORDERS : ORDERS.filter(o => o.status === filter)
  const FILTERS: Status[] = ['Tous', 'Livré', 'En cours', 'Annulé']

  return (
    <AdminLayout title="Commandes">
      <div className="pt-8 px-6 pb-20">

          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { label: 'Volume Total',      value: '42 850 000 FCFA', trend: '+12.5% ce mois', icon: 'trending_up' },
              { label: 'Panier Moyen',      value: '115 000 FCFA',    trend: '+4.2% vs 2023',  icon: 'trending_up' },
              { label: 'Taux Satisfaction', value: '98.4%',           trend: 'Excellent (4.9/5)', icon: 'stars' },
            ].map(kpi => (
              <div key={kpi.label} className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant/30 flex flex-col justify-between hover:border-primary/30 transition-colors">
                <div>
                  <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-1">{kpi.label}</p>
                  <h3 className="font-headline-md text-headline-md text-primary">{kpi.value}</h3>
                </div>
                <div className="flex items-center mt-4 text-status-confirmed">
                  <span className="material-symbols-outlined text-sm mr-1">{kpi.icon}</span>
                  <span className="font-caption font-label-md">{kpi.trend}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Table card */}
          <div className="bg-white rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">

            {/* Controls */}
            <div className="p-6 border-b border-outline-variant/20 flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="font-label-md text-label-md text-on-surface-variant mr-2">Filtrer par :</span>
                {FILTERS.map(f => (
                  <button
                    key={f}
                    onClick={() => { setFilter(f); setPage(1) }}
                    className={`px-4 py-2 rounded-full font-label-md text-label-md transition-all ${
                      filter === f
                        ? 'bg-primary-fixed text-primary border border-primary'
                        : 'bg-surface-container-low text-on-surface-variant hover:bg-primary-fixed/50'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg font-label-md text-label-md border border-outline-variant hover:bg-surface-container-low transition-all">
                  <span className="material-symbols-outlined text-base">download</span>Export CSV
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg font-label-md text-label-md border border-outline-variant hover:bg-surface-container-low transition-all">
                  <span className="material-symbols-outlined text-base">picture_as_pdf</span>PDF
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low/50">
                  <tr>
                    {['Commande', 'Client', 'Date', 'Statut', 'Montant', ''].map(h => (
                      <th key={h} className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {filtered.map(o => (
                    <tr key={o.id} className="hover:bg-surface-container-lowest transition-colors group">
                      <td className="px-6 py-5">
                        <span className="font-label-md text-label-md text-primary font-bold">{o.id}</span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${o.bg} ${o.color}`}>
                            {o.initials}
                          </div>
                          <div>
                            <p className="font-body-md font-medium">{o.name}</p>
                            <p className="font-caption text-on-surface-variant opacity-60">{o.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 font-body-md">{o.date}</td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLE[o.status]}`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-2 ${STATUS_DOT[o.status]}`} />
                          {o.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 font-headline-sm text-[18px] text-on-surface">{o.amount}</td>
                      <td className="px-6 py-5 text-right">
                        <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                          more_vert
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-6 border-t border-outline-variant/10 flex items-center justify-between">
              <p className="font-label-md text-label-md text-on-surface-variant">
                Affichage 1-{filtered.length} sur {filtered.length} commandes
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                {[1, 2, 3].map(n => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg font-label-md transition-all ${
                      page === n ? 'text-white' : 'border border-outline-variant text-on-surface-variant hover:bg-surface-container-low'
                    }`}
                    style={page === n ? { backgroundColor: '#425646' } : {}}
                  >
                    {n}
                  </button>
                ))}
                <button
                  onClick={() => setPage(p => Math.min(3, p + 1))}
                  disabled={page === 3}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="mt-16 flex flex-col md:flex-row items-center justify-between p-8 rounded-2xl border" style={{ backgroundColor: 'rgba(74,89,77,0.05)', borderColor: 'rgba(74,89,77,0.1)' }}>
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h4 className="font-headline-sm text-headline-sm text-sage-deep mb-2">Besoin d'un rapport détaillé ?</h4>
              <p className="font-body-md text-on-surface-variant">Générez un récapitulatif complet de vos ventes pour votre comptabilité en un clic.</p>
            </div>
            <button className="px-8 py-3 rounded-full text-white font-label-md text-label-md hover:opacity-90 transition-all shadow-md active:scale-95" style={{ backgroundColor: '#4A594D' }}>
              Générer Rapport Annuel
            </button>
          </div>
      </div>
    </AdminLayout>
  )
}
