import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/services', label: 'Services' },
  { to: '/products', label: 'Produits' },
  { to: '/about',    label: 'À propos'  },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md shadow-sm transition-all duration-200 ease-in-out ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-margin-desktop max-w-container-max mx-auto">

        {/* Logo */}
        <Link
          to="/"
          className="font-display-lg text-headline-sm text-sage-deep hover:opacity-80 transition-opacity"
        >
          Zen Massage &amp; Wellness
        </Link>

        {/* Desktop links */}
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

        {/* CTA */}
        <Link
          to="/appointments"
          className="hidden md:inline-flex px-6 py-2 border border-sage-deep text-sage-deep font-label-md text-label-md rounded-full hover:bg-sage-deep hover:text-white transition-all duration-300"
        >
          Prendre rendez-vous
        </Link>

        {/* Mobile burger */}
        <button
          aria-label="Menu"
          className="md:hidden p-2 text-on-surface-variant hover:text-primary"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="material-symbols-outlined">
            {menuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface border-t border-outline-variant px-6 pb-4 space-y-4">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? 'block text-primary font-bold font-body-md text-body-md'
                  : 'block text-on-surface-variant font-body-md text-body-md hover:text-primary transition-colors'
              }
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/appointments"
            onClick={() => setMenuOpen(false)}
            className="block w-full text-center px-6 py-2 border border-sage-deep text-sage-deep font-label-md text-label-md rounded-full hover:bg-sage-deep hover:text-white transition-all"
          >
            Prendre rendez-vous
          </Link>
        </div>
      )}
    </nav>
  )
}
