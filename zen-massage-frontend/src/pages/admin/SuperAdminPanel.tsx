import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

/* ── Nav ── */
const NAV = [
  { icon: 'dashboard',      label: 'Dashboard',   to: '/admin',              active: true },
  { icon: 'calendar_today', label: 'Bookings',     to: '/admin/bookings'           },
  { icon: 'inventory_2',    label: 'Produits',     to: '/admin/products/add'       },
  { icon: 'history_edu',    label: 'Historique',   to: '/admin/orders'             },
  { icon: 'analytics',      label: 'Analytics',    to: '/admin/analytics'          },
  { icon: 'settings',       label: 'Paramètres',   to: '/admin/settings'           },
]

/* ── Data ── */
const STATS = [
  { icon: 'group',            iconBg: 'bg-primary/10',           iconColor: 'text-primary',           label: 'Total Utilisateurs',    value: '12 842', trend: '+12%',  up: true  },
  { icon: 'medical_services', iconBg: 'bg-secondary/10',         iconColor: 'text-secondary',         label: 'Praticiens Actifs',     value: '42',     trend: 'Stable', up: null },
  { icon: 'bolt',             iconBg: 'bg-status-confirmed/10',  iconColor: 'text-status-confirmed',  label: 'Disponibilité Système', value: '99.98%', trend: 'Live',   up: true  },
  { icon: 'payments',         iconBg: 'bg-primary-container/10', iconColor: 'text-primary-container', label: 'Revenu Total',          value: '142.5k €', trend: '+24%', up: true },
]

type Role = 'SUPER_ADMIN' | 'ADMIN' | 'USER'

interface UserRow {
  initials: string
  bg: string
  textColor: string
  name: string
  email: string
  role: Role
  active: boolean
}

const USERS: UserRow[] = [
  { initials: 'AJ', bg: 'bg-secondary-fixed',      textColor: 'text-on-secondary-fixed',  name: 'Alex Johnson',  email: 'alex.j@zenwellness.com',   role: 'SUPER_ADMIN', active: true  },
  { initials: 'SM', bg: 'bg-primary-fixed-dim',     textColor: 'text-on-primary-fixed',    name: 'Sarah Miller',  email: 'sarah.m@zenwellness.com',  role: 'ADMIN',       active: true  },
  { initials: 'RK', bg: 'bg-tertiary-fixed-dim',    textColor: 'text-on-tertiary-fixed',   name: 'Robert King',   email: 'robert.k@external.com',    role: 'USER',        active: false },
]

const ORDERS = [
  { id: '#92842', label: 'Deep Tissue Massage (90min)', client: 'Elena Rossi',  time: 'Il y a 12 min', amount: '185 €', paid: true  },
  { id: '#92841', label: 'Swedish Relaxation (60min)',  client: 'James T.',     time: 'Il y a 45 min', amount: '120 €', paid: false },
  { id: '#92840', label: 'Hot Stone Therapy',           client: 'Martha S.',    time: 'Il y a 1h',     amount: '210 €', paid: true  },
]

const ROLE_LABELS: Record<Role, { label: string; cls: string }> = {
  SUPER_ADMIN: { label: 'Super Admin', cls: 'bg-primary-fixed text-on-primary-fixed' },
  ADMIN:       { label: 'Admin',       cls: 'bg-secondary-fixed text-on-secondary-container' },
  USER:        { label: 'Utilisateur', cls: 'bg-surface-variant text-on-surface-variant' },
}

/* ── Modal rôle ── */
function RoleModal({ user, onClose, onSave }: {
  user: UserRow
  onClose: () => void
  onSave: (role: Role) => void
}) {
  const [selected, setSelected] = useState<Role>(user.role)

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-charcoal-muted/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-5 border-b border-outline-variant/30 flex justify-between items-center">
          <h3 className="font-headline-sm text-headline-sm text-sage-deep">Modifier le rôle</h3>
          <button onClick={onClose} className="text-outline hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4 bg-surface-container-low p-4 rounded-xl">
            <div className={`w-12 h-12 rounded-full ${user.bg} flex items-center justify-center font-bold ${user.textColor}`}>
              {user.initials}
            </div>
            <div>
              <p className="font-label-md text-label-md text-on-surface">{user.name}</p>
              <p className="font-caption text-caption text-outline">{user.email}</p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="font-label-md text-label-md text-on-surface-variant">Sélectionner un rôle</p>
            {(['SUPER_ADMIN', 'ADMIN', 'USER'] as Role[]).map(r => (
              <label
                key={r}
                className="flex items-center p-4 rounded-xl border border-outline-variant/40 cursor-pointer hover:bg-primary/5 transition-colors"
              >
                <input
                  type="radio"
                  name="role"
                  checked={selected === r}
                  onChange={() => setSelected(r)}
                  className="w-4 h-4 text-primary focus:ring-primary border-outline-variant"
                />
                <div className="ml-4">
                  <p className="font-label-md text-label-md text-on-surface">{ROLE_LABELS[r].label}</p>
                  <p className="text-[11px] text-outline">
                    {r === 'SUPER_ADMIN' && 'Accès complet au système, facturation et journaux.'}
                    {r === 'ADMIN'       && 'Gérer les praticiens et les rendez-vous.'}
                    {r === 'USER'        && 'Accès standard aux réservations et à l\'historique.'}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="px-6 py-5 bg-surface-container-low border-t border-outline-variant/30 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full font-label-md text-label-md text-on-surface-variant hover:bg-surface-variant transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={() => { onSave(selected); onClose() }}
            className="px-5 py-2 rounded-full font-label-md text-label-md bg-primary text-white hover:bg-sage-deep shadow-md active:scale-95 transition-all"
          >
            Appliquer
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Page ── */
export default function SuperAdminPanel() {
  const [users, setUsers] = useState<UserRow[]>(USERS)
  const [editUser, setEditUser] = useState<UserRow | null>(null)

  useEffect(() => {
    document.title = 'Super Admin | Zen Massage & Wellness'
  }, [])

  const toggleActive = (name: string) =>
    setUsers(u => u.map(x => x.name === name ? { ...x, active: !x.active } : x))

  const saveRole = (name: string, role: Role) =>
    setUsers(u => u.map(x => x.name === name ? { ...x, role } : x))

  return (
    <div className="flex min-h-screen bg-surface text-on-surface font-body-md">

      {/* ── Sidebar ── */}
      <aside className="h-screen w-64 fixed left-0 top-0 flex flex-col py-stack-lg border-r border-outline-variant bg-surface-container-low z-[60]">
        <div className="px-6 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sage-deep flex items-center justify-center text-white shadow-sm">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
            </div>
            <div>
              <h1 className="font-headline-sm text-headline-sm text-sage-deep leading-none">Zen Admin</h1>
              <p className="font-label-md text-[10px] tracking-widest uppercase text-outline mt-1">Practitioner Suite</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {NAV.map(n => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `flex items-center px-6 py-3 gap-3 transition-all duration-200 font-label-md text-label-md ${
                  isActive || n.active
                    ? 'text-primary font-semibold border-r-4 border-primary bg-primary-fixed'
                    : 'text-on-surface-variant hover:bg-surface-variant'
                }`
              }
            >
              <span className="material-symbols-outlined">{n.icon}</span>
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-6 mt-auto pt-6 border-t border-outline-variant space-y-2">
          <a href="#" className="flex items-center gap-3 py-2 text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md">
            <span className="material-symbols-outlined">help</span>Support
          </a>
          <a href="#" className="flex items-center gap-3 py-2 text-on-surface-variant hover:text-error transition-colors font-label-md text-label-md">
            <span className="material-symbols-outlined">logout</span>Sign Out
          </a>
        </div>
      </aside>

      {/* ── Top bar ── */}
      <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 bg-surface/90 backdrop-blur-md z-50 flex justify-between items-center px-gutter shadow-sm">
        <h2 className="font-headline-sm text-headline-sm text-primary">System Overview</h2>
        <div className="flex items-center gap-6">
          <div className="relative hidden lg:flex items-center bg-surface-container-lowest border border-outline-variant/30 rounded-full px-4 py-1.5">
            <span className="material-symbols-outlined text-outline text-lg">search</span>
            <input
              className="bg-transparent border-none focus:outline-none text-sm font-body-md w-52 placeholder:text-outline/50 ml-2"
              placeholder="Global search..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-variant transition-colors relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface" />
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCb379I06t0SaHj-qvwonT2qxfyvP2z9JQl-CjjWG-bSlVqT1xVf0id_a5zNIxLML0wjALjdT8caSNZ9kAAfJowui_CPjtJMlJEEE8NMT4aQmBOtDO0eaAYxsqvT1OpOsw1MozVUGJTWg78cl_-BaV4v0Zr5Twp2IGd-hzoK7RTUPSMzVYM7Rnyfk7EYcGwj7uMFA0jxFv4grPrg92ZnqBUi-ftRzjrOWe8oKuerN2c12uyX5uc31DLuj2wUyt8rm0fxgYMIw9PWkzt"
                alt="Admin"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="ml-64 pt-16 min-h-screen px-gutter pb-section-gap">
        <div className="max-w-container-max mx-auto pt-stack-lg space-y-stack-lg">

          {/* ── KPI Cards ── */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {STATS.map(s => (
              <div
                key={s.label}
                className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 rounded-lg ${s.iconBg} flex items-center justify-center ${s.iconColor}`}>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
                  </div>
                  <span className={`font-label-md text-label-md flex items-center gap-1 ${s.up === true ? 'text-status-confirmed' : 'text-outline'}`}>
                    {s.up === true && <span className="material-symbols-outlined text-sm">trending_up</span>}
                    {s.trend}
                  </span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface-variant mb-1">{s.label}</p>
                  <h3 className="font-headline-md text-headline-md text-sage-deep">{s.value}</h3>
                </div>
              </div>
            ))}
          </section>

          {/* ── Table + Orders ── */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-gutter">

            {/* User Management */}
            <section className="xl:col-span-2">
              <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 overflow-hidden">
                <div className="px-6 py-5 border-b border-outline-variant/30 flex justify-between items-center bg-white/50">
                  <h4 className="font-headline-sm text-headline-sm text-sage-deep">Gestion des Utilisateurs</h4>
                  <button className="px-4 py-2 bg-primary text-white rounded-full font-label-md text-label-md hover:bg-sage-deep transition-colors">
                    + Ajouter
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-surface-container-low text-on-surface-variant font-label-md text-label-md border-b border-outline-variant/30">
                      <tr>
                        <th className="px-6 py-4">Identité</th>
                        <th className="px-6 py-4">Rôle</th>
                        <th className="px-6 py-4">Statut</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/20">
                      {users.map(u => (
                        <tr key={u.name} className="hover:bg-surface-container/30 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full ${u.bg} flex items-center justify-center font-bold text-xs ${u.textColor}`}>
                                {u.initials}
                              </div>
                              <div>
                                <p className="font-label-md text-label-md text-on-surface">{u.name}</p>
                                <p className="font-caption text-caption text-outline">{u.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${ROLE_LABELS[u.role].cls}`}>
                              {ROLE_LABELS[u.role].label}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`flex items-center gap-1.5 font-label-md text-sm ${u.active ? 'text-status-confirmed' : 'text-outline'}`}>
                              <span className={`w-2 h-2 rounded-full ${u.active ? 'bg-status-confirmed' : 'bg-outline'}`} />
                              {u.active ? 'Actif' : 'Inactif'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => setEditUser(u)}
                              className="p-1.5 text-outline hover:text-primary transition-colors rounded-full hover:bg-primary/5"
                              title="Modifier le rôle"
                            >
                              <span className="material-symbols-outlined">edit_square</span>
                            </button>
                            <button
                              onClick={() => toggleActive(u.name)}
                              className={`p-1.5 ml-2 transition-colors rounded-full ${
                                u.active
                                  ? 'text-outline hover:text-error hover:bg-error/5'
                                  : 'text-status-confirmed hover:text-primary hover:bg-status-confirmed/5'
                              }`}
                              title={u.active ? 'Désactiver' : 'Activer'}
                            >
                              <span className="material-symbols-outlined">{u.active ? 'person_off' : 'person_check'}</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Latest Orders */}
            <aside>
              <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 overflow-hidden flex flex-col h-full">
                <div className="px-6 py-5 border-b border-outline-variant/30 bg-white/50">
                  <h4 className="font-headline-sm text-headline-sm text-sage-deep">Dernières Commandes</h4>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[480px]">
                  {ORDERS.map(o => (
                    <div
                      key={o.id}
                      className="p-4 rounded-lg bg-surface hover:bg-surface-container transition-colors border border-outline-variant/20 cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-label-md text-label-md text-on-surface">{o.id}</span>
                        <span className="font-caption text-caption text-outline">{o.time}</span>
                      </div>
                      <h5 className="font-body-md text-body-md font-semibold text-primary mb-1">{o.label}</h5>
                      <p className="font-caption text-caption text-outline mb-3">Client : {o.client}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sage-deep">{o.amount}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          o.paid
                            ? 'bg-status-confirmed/10 text-status-confirmed'
                            : 'bg-status-pending/20 text-on-secondary-fixed-variant'
                        }`}>
                          {o.paid ? 'Payé' : 'En attente'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-outline-variant/30 bg-surface-container-low text-center">
                  <Link to="/admin/orders" className="text-primary font-label-md text-label-md hover:underline">
                    Voir toutes les commandes
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <footer className="py-stack-lg border-t border-outline-variant mt-section-gap opacity-30 text-center">
          <p className="font-label-md text-label-md">© 2024 Zen Massage &amp; Wellness Admin Suite • Tranquility in Every Pixel</p>
        </footer>
      </main>

      {/* ── Modal ── */}
      {editUser && (
        <RoleModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onSave={role => saveRole(editUser.name, role)}
        />
      )}
    </div>
  )
}
