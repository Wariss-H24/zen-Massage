import { useState, type ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useAuth } from '../../context/AuthContext'

const NAV = [
  { to: '/account',  icon: 'calendar_today', label: 'Mes Rendez-vous' },
  { to: '/orders',   icon: 'shopping_bag',   label: 'Commandes'       },
  { to: '/products', icon: 'storefront',     label: 'Boutique'        },
  { to: '/profile',  icon: 'person',         label: 'Profil'          },
  { to: '/support',  icon: 'help',           label: 'Aide'            },
]

interface Props {
  children: ReactNode
  title: string
  subtitle?: string
  headerRight?: ReactNode
}

export default function UserLayout({ children, title, subtitle, headerRight }: Props) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  async function handleLogout() {
    setMobileMenuOpen(false)
    await logout()
    navigate('/', { replace: true })
  }

  const fullName = user ? `${user.firstName} ${user.lastName}` : 'Utilisateur'
  const initials = user ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase() : '?'
  const avatarUrl = user?.avatar || ''

  return (
    <div className="flex min-h-screen bg-background text-on-background">

      {/* ── Sidebar overlay mobile ── */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/30 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside className={`flex flex-col h-[100dvh] w-64 fixed left-0 top-0 z-50 bg-surface-container-low border-r border-outline-variant/30 p-stack-md transition-transform duration-300 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="mb-stack-lg px-2">
          <Link to="/" className="block">
            <h1 className="font-headline-sm text-headline-sm text-sage-deep mb-1">Mon Compte</h1>
            <p className="font-caption text-caption text-on-surface-variant opacity-70">Le sanctuaire vous attend</p>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto space-y-2">
          {NAV.map(n => {
            const active = pathname === n.to
            return (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-label-md text-label-md ${
                  active
                    ? 'text-primary font-bold border-r-4 border-primary bg-surface-container-high'
                    : 'text-on-surface-variant hover:bg-surface-container-highest'
                }`}
              >
                <span className="material-symbols-outlined">{n.icon}</span>
                {n.label}
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto pt-stack-md border-t border-outline-variant/20">
          <div className="flex items-center gap-3 p-2 mb-4">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-sand-light flex-shrink-0 flex items-center justify-center font-bold text-sm text-sage-deep">
              {avatarUrl ? (
                <img src={avatarUrl} alt={fullName} className="w-full h-full object-cover" />
              ) : (
                <span>{initials}</span>
              )}
            </div>
            <div className="min-w-0">
              <p className="font-label-md text-label-md text-on-surface font-bold truncate">{fullName}</p>
              <p className="font-caption text-caption text-on-surface-variant">{user?.email || ''}</p>
            </div>
          </div>
          <Link
            to="/appointments"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full py-3 px-4 border border-sage-deep text-sage-deep rounded-xl font-label-md text-label-md text-center hover:bg-sage-deep hover:text-white transition-all duration-300"
          >
            Nouvelle Session
          </Link>
          <button
            onClick={handleLogout}
            className="mt-2 flex items-center gap-2 px-4 py-2 w-full text-on-surface-variant hover:text-error font-label-md text-label-md transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Déconnexion
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 md:ml-64 min-h-screen flex flex-col">

        {/* Header */}
        <header
          className="sticky top-0 z-30 px-4 md:px-margin-desktop py-4 flex justify-between items-center gap-3 border-b border-outline-variant/10"
          style={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(250,249,247,0.9)' }}
        >
          <div className="min-w-0 flex-1">
            <h2 className="font-headline-sm text-headline-sm md:text-headline-md text-sage-deep truncate">{title}</h2>
            {subtitle && (
              <p className="font-body-md text-body-md text-on-surface-variant truncate">{subtitle}</p>
            )}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {headerRight}
            <button className="text-on-surface-variant hover:text-primary transition-colors hidden md:block">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-lg transition-all"
              onClick={() => setMobileMenuOpen(v => !v)}
              aria-label="Menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </header>



        {/* Content */}
        <div className="flex-1">
          {children}
        </div>

        <Footer />
      </main>


    </div>
  )
}
