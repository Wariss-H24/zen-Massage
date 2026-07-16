import type { ReactNode } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { authService } from '../../services/auth.service'
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
  const { user } = useAuth()

  async function handleLogout() {
    await authService.logout()
    navigate('/login')
  }
  return (
    <div className="flex min-h-screen bg-background text-on-background font-body-md">

      {/* ── Sidebar ── */}
      <aside className="h-screen w-64 fixed left-0 top-0 flex flex-col py-8 border-r border-outline-variant bg-surface-container-low z-50">
        <div className="px-6 mb-10">
          <Link to="/admin">
            <h1 className="font-headline-sm text-headline-sm text-sage-deep">Zen Admin</h1>
            <p className="font-label-md text-label-md text-on-surface-variant opacity-70">Practitioner Suite</p>
          </Link>
        </div>

        <nav className="flex-1 space-y-1">
          {NAV.map(n => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === '/admin'}
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
            <span className="material-symbols-outlined">logout</span>Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="ml-64 flex-1 flex flex-col">

        {/* Top bar */}
        <header className="fixed top-0 right-0 w-[calc(100%-16rem)] z-40 flex justify-between items-center h-16 px-6 bg-surface/90 backdrop-blur-md shadow-sm">
          <span className="font-headline-sm text-headline-sm text-primary">{title}</span>
          <div className="flex items-center gap-4">
            {topbarRight ?? (
              <>
                <div className="relative hidden lg:block">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="pl-10 pr-4 py-2 bg-surface-container rounded-full border-none focus:outline-none focus:ring-1 focus:ring-primary w-56 text-sm font-body-md"
                  />
                </div>
                <button className="relative p-2 text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">notifications</span>
                  <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full" />
                </button>
                <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">account_circle</span>
                </button>
              </>
            )}
          </div>
        </header>

        <main className="pt-16 flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
