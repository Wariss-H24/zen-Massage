import { useState, type ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useAuth } from '../../context/AuthContext'

const NAV = [
  { to: '/account', icon: 'calendar_today', label: 'Mes Rendez-vous' },
  { to: '/orders',  icon: 'shopping_bag',   label: 'Commandes'       },
  { to: '/profile', icon: 'person',         label: 'Profil'          },
]

const AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBR9YP2ilAO3sGRJTf7D0dVSbJXx3F_DaIzLcixdJSaYXX0NxaakKlAgcVCfUUaNH8rM8e10nUaIpus_fZImSdkxVHtmAlkfSevUvWtXtJ4tJOZys40pzX6Y9knrryM7FryYoEmTRFHRV-oQPo7UBkUEYDuR9jqNKAkquFMeInvS-_8oi_NjYflrAeKkET38drF1XMHROyVuMhHtbeQ9MI2Wi78xl1PmaFlPqSAWvPihwT75FbtqQJiCJMOCxs38DFdMwy-8k1L9YN4'

interface Props {
  children: ReactNode
  /** Titre affiché dans le header */
  title: string
  subtitle?: string
  /** Contenu optionnel dans le header (droite) */
  headerRight?: ReactNode
}

export default function UserLayout({ children, title, subtitle, headerRight }: Props) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  async function handleLogout() {
    setMobileMenuOpen(false)
    await logout()
    navigate('/', { replace: true })
  }

  return (
    <div className="flex min-h-screen bg-background text-on-background">

      {/* ── Sidebar ── */}
      <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 z-50 bg-surface-container-low border-r border-outline-variant/30 p-stack-md">
        <div className="mb-stack-lg px-2">
          <Link to="/" className="block">
            <h1 className="font-headline-sm text-headline-sm text-sage-deep mb-1">Mon Compte Zen</h1>
            <p className="font-caption text-caption text-on-surface-variant opacity-70">Le sanctuaire vous attend</p>
          </Link>
        </div>

        <nav className="flex-1 space-y-2">
          {NAV.map(n => {
            const active = pathname === n.to
            return (
              <Link
                key={n.to}
                to={n.to}
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
            <div className="w-10 h-10 rounded-full overflow-hidden bg-sand-light flex-shrink-0">
              <img src={AVATAR} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <p className="font-label-md text-label-md text-on-surface font-bold truncate">Marc Dupont</p>
              <p className="font-caption text-caption text-on-surface-variant">Membre Sérénité</p>
            </div>
          </div>
          <Link
            to="/appointments"
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

        {/* Header avec bouton burger mobile */}
        <header
          className="sticky top-0 z-30 px-4 md:px-margin-desktop py-4 flex justify-between items-center border-b border-outline-variant/10"
          style={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(250,249,247,0.9)' }}
        >
          <div>
            <h2 className="font-headline-sm text-headline-sm md:text-headline-md text-sage-deep">{title}</h2>
            {subtitle && (
              <p className="font-body-md text-body-md text-on-surface-variant">{subtitle}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {headerRight ?? (
              <>
                <button className="text-on-surface-variant hover:text-primary transition-colors">
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
              </>
            )}
          </div>
        </header>

        {/* Panneau latéral mobile */}
        {mobileMenuOpen && (
          <>
            <div
              className="md:hidden fixed inset-0 bg-black/30 z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="md:hidden fixed top-0 right-0 h-full w-72 z-50 bg-surface shadow-2xl animate-slide-in">
              <div className="flex flex-col h-full p-6">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-headline-sm text-headline-sm text-sage-deep">Menu</h3>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-on-surface-variant hover:text-primary rounded-lg"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>

                <nav className="flex-1 space-y-2">
                  {NAV.map(n => {
                    const active = pathname === n.to
                    return (
                      <Link
                        key={n.to}
                        to={n.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-label-md text-label-md ${
                          active
                            ? 'text-primary font-bold bg-surface-container-high'
                            : 'text-on-surface-variant hover:bg-surface-container-highest'
                        }`}
                      >
                        <span className="material-symbols-outlined">{n.icon}</span>
                        {n.label}
                      </Link>
                    )
                  })}
                </nav>

                <div className="pt-6 border-t border-outline-variant/20 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-sand-light flex-shrink-0">
                      <img src={AVATAR} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-label-md text-label-md text-on-surface font-bold">Marc Dupont</p>
                      <p className="font-caption text-caption text-on-surface-variant">Membre Sérénité</p>
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
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 text-on-surface-variant hover:text-error font-label-md text-label-md transition-colors rounded-xl hover:bg-error/5"
                  >
                    <span className="material-symbols-outlined text-[20px]">logout</span>
                    Déconnexion
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Content */}
        <div className="flex-1 pb-24 md:pb-0">
          {children}
        </div>

        <Footer />
      </main>

      {/* ── Mobile bottom nav ── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-outline-variant/10 flex justify-around items-center py-3"
        style={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(250,249,247,0.9)' }}
      >
        <Link to="/account" className={`flex flex-col items-center gap-1 ${pathname === '/account' ? 'text-primary' : 'text-on-surface-variant opacity-60'}`}>
          <span className="material-symbols-outlined">calendar_today</span>
          <span className="text-[10px] font-label-md">Rdv</span>
        </Link>
        <Link to="/orders" className={`flex flex-col items-center gap-1 ${pathname === '/orders' ? 'text-primary' : 'text-on-surface-variant opacity-60'}`}>
          <span className="material-symbols-outlined">shopping_bag</span>
          <span className="text-[10px] font-label-md">Commandes</span>
        </Link>
        {/* FAB center */}
        <div className="relative -top-6">
          <Link to="/appointments" className="w-14 h-14 bg-sage-deep text-surface rounded-full shadow-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">add</span>
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 text-on-surface-variant opacity-60 hover:text-error transition-colors"
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="text-[10px] font-label-md">Déconnexion</span>
        </button>
        <Link to="/profile" className={`flex flex-col items-center gap-1 ${pathname === '/profile' ? 'text-primary' : 'text-on-surface-variant opacity-60'}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: pathname === '/profile' ? "'FILL' 1" : "'FILL' 0" }}>person</span>
          <span className="text-[10px] font-label-md">Profil</span>
        </Link>
      </nav>
    </div>
  )
}
