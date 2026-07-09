import { useEffect, useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'

/* ── Nav ── */
const NAV = [
  { icon: 'dashboard',     label: 'Dashboard',     to: '/admin/panel'        },
  { icon: 'calendar_today',label: 'Appointments',  to: '/admin/bookings'     },
  { icon: 'inventory_2',   label: 'Products',      to: '/admin/products/add' },
  { icon: 'history_edu',   label: 'Order History', to: '/admin/orders',      active: true },
  { icon: 'analytics',     label: 'Analytics',     to: '/admin/analytics'    },
  { icon: 'settings',      label: 'Settings',      to: '/admin/settings'     },
]

/* ── Types ── */
type Status = 'Livré' | 'En cours' | 'Annulé'
type Filter = 'Tous' | Status

interface Order {
  id: string
  initials: string
  bg: string
  textColor: string
  name: string
  email: string
  date: string
  status: Status
  amount: string
}

/* ── Data ── */
const ORDERS: Order[] = [
  { id: '#ZN-94821', initials: 'EJ', bg: 'bg-sand-light',      textColor: 'text-secondary',    name: 'Elena Joli',      email: 'elena.j@email.com',      date: '24 Oct, 2023', status: 'Livré',    amount: '185.000 FCFA' },
  { id: '#ZN-94820', initials: 'ML', bg: 'bg-primary-fixed',   textColor: 'text-primary',      name: 'Marc Leclerc',    email: 'm.leclerc@pro.fr',       date: '23 Oct, 2023', status: 'En cours', amount: '95.000 FCFA'  },
  { id: '#ZN-94819', initials: 'SD', bg: 'bg-surface-variant', textColor: 'text-on-surface-variant', name: 'Sophie Durand', email: 'sophie.d@gmail.com', date: '22 Oct, 2023', status: 'Annulé',   amount: '210.000 FCFA' },
  { id: '#ZN-94818', initials: 'AB', bg: 'bg-sand-light',      textColor: 'text-secondary',    name: 'Amélie Bertrand', email: 'a.bertrand@mail.com',    date: '21 Oct, 2023', status: 'Livré',    amount: '125.000 FCFA' },
  { id: '#ZN-94817', initials: 'JV', bg: 'bg-primary-fixed',   textColor: 'text-primary',      name: 'Jean Valjean',    email: 'j.valjean@history.com',  date: '20 Oct, 2023', status: 'Livré',    amount: '340.000 FCFA' },
  { id: '#ZN-94816', initials: 'KN', bg: 'bg-secondary-fixed', textColor: 'text-on-secondary-fixed', name: 'Kofi Ndong', email: 'k.ndong@gabon.com',   date: '19 Oct, 2023', status: 'En cours', amount: '78.000 FCFA'  },
  { id: '#ZN-94815', initials: 'MO', bg: 'bg-primary-fixed',   textColor: 'text-primary',      name: 'Marie Obame',     email: 'm.obame@zen.com',        date: '18 Oct, 2023', status: 'Livré',    amount: '450.000 FCFA' },
]

const STATUS_STYLE: Record<Status, string> = {
  'Livré':    'bg-status-confirmed/10 text-status-confirmed',
  'En cours': 'bg-status-pending/20 text-secondary',
  'Annulé':   'bg-status-cancelled/10 text-status-cancelled',
}

const FILTERS: Filter[] = ['Tous', 'Livré', 'En cours', 'Annulé']
const PER_PAGE = 5

export default function ActivityLog() {
  const [filter, setFilter]   = useState<Filter>('Tous')
  const [search, setSearch]   = useState('')
  const [page, setPage]       = useState(1)

  useEffect(() => {
    document.title = 'Historique Commandes | Admin Zen Massage'
  }, [])

  /* reset page on filter/search change */
  useEffect(() => { setPage(1) }, [filter, search])

  const filtered = useMemo(() =>
    ORDERS.filter(o => {
      const matchFilter = filter === 'Tous' || o.status === filter
      const matchSearch = o.name.toLowerCase().includes(search.toLowerCase()) ||
        o.id.toLowerCase().includes(search.toLowerCase())
      return matchFilter && matchSearch
    }),
    [filter, search]
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div className="flex min-h-screen bg-background text-on-surface font-body-md">

      {/* ── Sidebar ── */}
      <aside className="h-screen w-64 fixed left-0 top-0 flex flex-col py-stack-lg border-r border-outline-variant bg-surface z-50">
        <div className="px-6 mb-10">
          <h1 className="font-headline-sm text-headline-sm text-sage-deep">Zen Admin</h1>
          <p className="font-label-md text-label-md text-on-surface-variant opacity-70">Practitioner Suite</p>
        </div>

        <nav className="flex-1 space-y-1">
          {NAV.map(n => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `flex items-center px-6 py-3 gap-3 transition-colors duration-200 font-label-md text-label-md ${
                  isActive || n.active
                    ? 'text-primary font-semibold border-r-4 border-primary bg-primary-fixed'
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`
              }
            >
              <span className="material-symbols-outlined">{n.icon}</span>
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-6 mt-auto pt-6 space-y-1">
          <a href="#" className="flex items-center gap-3 py-2 text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md">
            <span className="material-symbols-outlined">help</span>Support
          </a>
          <a href="#" className="flex items-center gap-3 py-2 text-on-surface-variant hover:text-error transition-colors font-label-md text-label-md">
            <span className="material-symbols-outlined">logout</span>Sign Out
          </a>
        </div>
      </aside>

      {/* ── Top bar ── */}
      <header className="fixed top-0 right-0 w-[calc(100%-16rem)] z-40 bg-surface/90 backdrop-blur-md flex justify-between items-center h-16 px-gutter shadow-sm">
        <h2 className="font-headline-sm text-headline-sm text-primary">Order History</h2>
        <div className="flex items-center gap-6">
          <div className="relative hidden lg:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50">search</span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher..."
              className="bg-surface-container-low border-none rounded-full pl-10 pr-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary w-64 transition-all"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">notifications</button>
            <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">account_circle</button>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="ml-64 pt-24 px-gutter pb-section-gap min-h-screen">

        {/* ── KPI Cards ── */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: 'Volume Total',      value: '42.850 €', trend: '+12.5% ce mois', icon: 'trending_up' },
            { label: 'Panier Moyen',      value: '115 €',    trend: '+4.2% vs 2023',  icon: 'trending_up' },
            { label: 'Taux Satisfaction', value: '98.4%',    trend: 'Excellent (4.9/5)', icon: 'stars'    },
          ].map(k => (
            <div
              key={k.label}
              className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant/30 flex flex-col justify-between hover:border-primary/30 transition-colors"
            >
              <div>
                <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-1">{k.label}</p>
                <h3 className="font-display-lg text-display-lg-mobile text-primary">{k.value}</h3>
              </div>
              <div className="flex items-center mt-4 text-status-confirmed gap-1">
                <span className="material-symbols-outlined text-sm">{k.icon}</span>
                <span className="font-caption text-caption">{k.trend}</span>
              </div>
            </div>
          ))}
        </section>

        {/* ── Table ── */}
        <div className="bg-white rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">

          {/* Controls */}
          <div className="p-6 border-b border-outline-variant/20 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="font-label-md text-label-md text-on-surface-variant mr-2">Filtrer par :</span>
              {FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
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
                <span className="material-symbols-outlined text-base">download</span>
                Export CSV
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg font-label-md text-label-md border border-outline-variant hover:bg-surface-container-low transition-all">
                <span className="material-symbols-outlined text-base">picture_as_pdf</span>
                PDF
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container-low/50">
                <tr>
                  {['Commande', 'Client', 'Date', 'Statut', 'Montant', ''].map((h, i) => (
                    <th
                      key={i}
                      className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {paginated.length > 0 ? paginated.map(o => (
                  <tr key={o.id} className="hover:bg-surface-container-lowest transition-colors group">
                    <td className="px-6 py-5">
                      <span className="font-label-md text-label-md text-primary font-bold">{o.id}</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${o.bg} flex items-center justify-center font-bold text-xs ${o.textColor} flex-shrink-0`}>
                          {o.initials}
                        </div>
                        <div>
                          <p className="font-body-md text-body-md font-medium">{o.name}</p>
                          <p className="font-caption text-caption text-on-surface-variant opacity-60">{o.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 font-body-md text-body-md">{o.date}</td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLE[o.status]}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          o.status === 'Livré' ? 'bg-status-confirmed' :
                          o.status === 'En cours' ? 'bg-status-pending' : 'bg-status-cancelled'
                        }`} />
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
                )) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <span className="material-symbols-outlined text-4xl text-outline-variant block mb-2">search_off</span>
                      <p className="font-body-md text-body-md text-on-surface-variant">Aucune commande trouvée</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-6 border-t border-outline-variant/10 flex items-center justify-between">
            <p className="font-label-md text-label-md text-on-surface-variant">
              Affichage {filtered.length === 0 ? 0 : (page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} sur {filtered.length} commandes
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg font-label-md text-label-md transition-all ${
                    page === p
                      ? 'bg-primary text-white'
                      : 'border border-outline-variant text-on-surface-variant hover:bg-surface-container-low'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── Footer CTA ── */}
        <div className="mt-section-gap flex flex-col md:flex-row items-center justify-between p-8 bg-sage-deep/5 rounded-2xl border border-sage-deep/10 gap-6">
          <div className="text-center md:text-left">
            <h4 className="font-headline-sm text-headline-sm text-sage-deep mb-2">Besoin d'un rapport détaillé ?</h4>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Générez un récapitulatif complet de vos ventes pour votre comptabilité en un clic.
            </p>
          </div>
          <button className="px-8 py-3 rounded-full bg-sage-deep text-white font-label-md text-label-md hover:opacity-90 transition-all shadow-md active:scale-95 whitespace-nowrap">
            Générer Rapport Annuel
          </button>
        </div>
      </main>
    </div>
  )
}
