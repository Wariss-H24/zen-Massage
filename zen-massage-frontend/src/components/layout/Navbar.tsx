import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const navLinks = [
  { to: '/services', label: 'Services' },
  { to: '/products', label: 'Produits' },
  { to: '/about',    label: 'À propos'  },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Ferme le menu si on redimensionne vers desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  async function handleLogout() {
    setMenuOpen(false)
    await logout()
    navigate('/', { replace: true })
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-surface/90 backdrop-blur-md shadow-sm transition-all duration-300 ease-in-out ${
        scrolled ? 'py-3' : 'py-4'
      }`}
    >
      <div className="flex justify-between items-center px-4 md:px-margin-desktop max-w-container-max mx-auto">

        {/* Logo responsive */}
        <Link
          to="/"
          className="font-display-lg text-headline-sm text-sage-deep hover:opacity-80 transition-opacity whitespace-nowrap"
        >
          <span className="hidden sm:inline">Zen Massage & Wellness</span>
          <span className="sm:hidden text-[20px]">Zen Massage</span>
        </Link>

        {/* Liens desktop (md+) */}
        <div className="hidden md:flex items-center space-x-stack-lg">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive
                  ? 'font-body-md text-body-md text-primary font-bold border-b-2 border-primary pb-1 transition-colors duration-300'
                  : 'font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-300'
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Boutons desktop (md+) selon état */}
        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            /* ── Visiteur non connecté ── */
            <>
              <Link
                to="/login"
                className="px-6 py-2 border border-sage-deep text-sage-deep font-label-md text-label-md rounded-full hover:bg-sage-deep hover:text-white transition-all duration-300"
              >
                Se connecter
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 bg-sage-deep text-white font-label-md text-label-md rounded-full hover:opacity-90 transition-all duration-300"
              >
                S'inscrire
              </Link>
            </>
          ) : user.role === 'SUPER_ADMIN' || user.role === 'ADMIN' ? (
            /* ── Admin / Super Admin ── */
            <>
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 px-5 py-2 bg-sage-deep text-white font-label-md text-label-md rounded-full hover:opacity-90 transition-all duration-300"
              >
                <span className="material-symbols-outlined text-[18px]">dashboard</span>
                Espace Praticien
              </Link>
              {user.role === 'SUPER_ADMIN' && (
                <Link
                  to="/admin/super"
                  className="inline-flex items-center gap-2 px-5 py-2 border border-sage-deep text-sage-deep font-label-md text-label-md rounded-full hover:bg-sage-deep hover:text-white transition-all duration-300"
                >
                  <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                  Super Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-on-surface-variant hover:text-error font-label-md text-label-md transition-colors"
                title="Déconnexion"
              >
                <span className="material-symbols-outlined text-[20px]">logout</span>
                Déconnexion
              </button>
            </>
          ) : (
            /* ── Utilisateur connecté (USER) ── */
            <>
              <Link
                to="/account"
                className="px-5 py-2 border border-sage-deep text-sage-deep font-label-md text-label-md rounded-full hover:bg-sage-deep hover:text-white transition-all duration-300"
              >
                Mon compte
              </Link>
              <Link
                to="/appointments"
                className="px-5 py-2 bg-sage-deep text-white font-label-md text-label-md rounded-full hover:opacity-90 transition-all duration-300"
              >
                Prendre rendez-vous
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-on-surface-variant hover:text-error font-label-md text-label-md transition-colors"
                title="Déconnexion"
              >
                <span className="material-symbols-outlined text-[20px]">logout</span>
                Déconnexion
              </button>
            </>
          )}
        </div>

        {/* Menu burger mobile */}
        <button
          aria-label="Menu"
          className="md:hidden flex items-center justify-center w-10 h-10 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-lg transition-all duration-200"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="material-symbols-outlined text-2xl">
            {menuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Menu mobile avec animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen
            ? 'max-h-[600px] opacity-100'
            : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-surface border-t border-outline-variant/30 px-4 pb-5 pt-2 space-y-3">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? 'block py-2 text-primary font-bold font-body-md text-body-md'
                  : 'block py-2 text-on-surface-variant font-body-md text-body-md hover:text-primary transition-colors'
              }
            >
              {label}
            </NavLink>
          ))}

          <div className="border-t border-outline-variant/20 pt-3 space-y-3">
            {!user ? (
              /* Mobile : non connecté */
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-center px-6 py-3 border border-sage-deep text-sage-deep font-label-md text-label-md rounded-full hover:bg-sage-deep hover:text-white transition-all duration-200"
                >
                  Se connecter
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-center px-6 py-3 bg-sage-deep text-white font-label-md text-label-md rounded-full hover:opacity-90 transition-all duration-200"
                >
                  S'inscrire
                </Link>
              </>
            ) : (
              /* Mobile : connecté */
              <>
                <Link
                  to="/appointments"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-center px-6 py-3 bg-sage-deep text-white font-label-md text-label-md rounded-full hover:opacity-90 transition-all duration-200"
                >
                  Prendre rendez-vous
                </Link>
                <Link
                  to="/account"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-center px-6 py-3 border border-sage-deep text-sage-deep font-label-md text-label-md rounded-full hover:bg-sage-deep hover:text-white transition-all duration-200"
                >
                  Mon compte
                </Link>
                {(user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') && (
                  <Link
                    to="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="block w-full text-center px-6 py-3 bg-sage-deep text-white font-label-md text-label-md rounded-full hover:opacity-90 transition-all duration-200"
                  >
                    Espace Praticien
                  </Link>
                )}
                {user.role === 'SUPER_ADMIN' && (
                  <Link
                    to="/admin/super"
                    onClick={() => setMenuOpen(false)}
                    className="block w-full text-center px-6 py-3 border border-sage-deep text-sage-deep font-label-md text-label-md rounded-full hover:bg-sage-deep hover:text-white transition-all duration-200"
                  >
                    Super Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 w-full text-center px-6 py-3 text-on-surface-variant hover:text-error font-label-md text-label-md transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">logout</span>
                  Déconnexion
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
