import { useState, type ReactNode } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const NAV = [
  { icon: 'dashboard',      label: 'Espace Praticien', to: '/admin'               },
  { icon: 'calendar_today', label: 'Réservations',      to: '/admin/bookings'      },
  { icon: 'inventory_2',    label: 'Produits',           to: '/admin/products/add'  },
  { icon: 'history_edu',    label: 'Commandes',          to: '/admin/orders'        },
  { icon: 'analytics',      label: 'Analytiques',        to: '/admin/analytics'     },
  { icon: 'settings',       label: 'Paramètres',         to: '/admin/settings'      },
]

interface Props {
  children: ReactNode
  title: string
  topbarRight?: ReactNode
}

export default function AdminLayout({ children, title, topbarRight }: Props) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  async function handleLogout() {
    setSidebarOpen(false)
    await logout()
    navigate('/', { replace: true })
  }

  return (
    <div className="flex min-h-screen bg-background text-on-background font-body-md">

      {/* Overlay mobile quand sidebar ouverte */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 flex flex-col py-6 border-r border-outline-variant bg-surface-container-low transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:z-auto`}
      >
        <div className="px-6 mb-8 flex items-center justify-between">
          <Link to="/admin" onClick={() => setSidebarOpen(false)}>
            <h1 className="font-headline-sm text-headline-sm text-sage-deep">Ben Admin</h1>
            <p className="font-label-md text-label-md text-on-surface-variant opacity-70">Practitioner Suite</p>
          </Link>
          <button
            className="lg:hidden p-1 text-on-surface-variant hover:text-primary"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav className="flex-1 space-y-1">
          {NAV.map(n => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === '/admin'}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 font-label-md text-label-md transition-colors ${
                  isActive
                    ? 'text-primary font-semibold border-r-4 border-primary bg-primary-fixed'
                    : 'text-on-surface-variant hover:bg-surface-variant'
                }`
              }
            >
              <span className="material-symbols-outlined">{n.icon}</span>
              {n.label}
            </NavLink>
          ))}
          {user?.role === 'SUPER_ADMIN' && (
            <NavLink
              to="/admin/super"
              end
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 font-label-md text-label-md transition-colors ${
                  isActive
                    ? 'text-primary font-semibold border-r-4 border-primary bg-primary-fixed'
                    : 'text-on-surface-variant hover:bg-surface-variant'
                }`
              }
            >
              <span className="material-symbols-outlined">admin_panel_settings</span>
              Dashboard
            </NavLink>
          )}
        </nav>

        <div className="px-6 pt-6 border-t border-outline-variant space-y-1">
          <a href="#" className="flex items-center gap-3 py-2 font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">help</span>Support
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 py-2 font-label-md text-label-md text-on-surface-variant hover:text-error transition-colors w-full"
          >
            <span className="material-symbols-outlined">logout</span>Déconnexion
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col lg:ml-64">

        {/* Top bar */}
        <header className="sticky top-0 z-30 flex justify-between items-center h-16 px-4 md:px-6 bg-surface/90 backdrop-blur-md shadow-sm">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-lg transition-all"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
            <span className="font-headline-sm text-headline-sm text-primary">{title}</span>
          </div>
          <div className="flex items-center gap-3">
            {topbarRight ?? (
              <>
                <div className="relative hidden md:block">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="pl-10 pr-4 py-2 bg-surface-container rounded-full border-none focus:outline-none focus:ring-1 focus:ring-primary w-40 xl:w-56 text-sm font-body-md"
                  />
                </div>
                <button className="relative p-2 text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">notifications</span>
                  <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full" />
                </button>
                <div className="hidden sm:flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-sage-deep text-white flex items-center justify-center text-xs font-bold">
                    {user ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase() : '?'}
                  </div>
                  <div className="hidden lg:block">
                    <p className="font-label-md text-label-md text-on-surface leading-tight">{user ? `${user.firstName} ${user.lastName}` : ''}</p>
                    <p className="font-caption text-caption text-on-surface-variant leading-tight">{user?.email || ''}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </header>

        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
