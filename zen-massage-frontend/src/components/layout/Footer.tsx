import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/',         label: 'Accueil'           },
  { to: '/services', label: 'Services & Soins'  },
  { to: '/products', label: 'Boutique en ligne' },
  { to: '/about',    label: 'À propos'          },
  { to: '/account',  label: 'Espace Client'     },
]

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault()
    setEmail('')
  }

  return (
    <footer className="w-full bg-[#121212] text-white">

      {/* Main grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-6 md:px-margin-desktop py-16 w-full max-w-container-max mx-auto">

        {/* Brand */}
        <div className="space-y-6">
          <Link
            to="/"
            className="block font-display-lg text-headline-sm text-white hover:opacity-80 transition-opacity"
          >
            Zen Massage &amp; Wellness
          </Link>
          <p className="font-caption text-caption text-surface-container-high opacity-80 leading-relaxed max-w-xs">
            Votre sanctuaire de bien-être au Gabon. Excellence holistique et rituels de soins
            ancestraux dans un cadre contemporain.
          </p>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="text-white hover:text-primary-fixed-dim transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 1 0-11.563 9.877v-6.988h-2.54V12h2.54V9.797c0-2.506 1.493-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.562V12h2.773l-.443 2.889h-2.33v6.988A10.003 10.003 0 0 0 22 12z"/>
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="text-white hover:text-primary-fixed-dim transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.326 3.608 1.301.975.975 1.24 2.242 1.301 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.326 2.633-1.301 3.608-.975.975-2.242 1.24-3.608 1.301-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.326-3.608-1.301-.975-.975-1.24-2.242-1.301-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.326-2.633 1.301-3.608.975-.975 2.242-1.24 3.608-1.301C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038C23.986 15.668 24 15.259 24 12s-.014-3.668-.072-4.948c-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-6">
          <h4 className="font-label-md text-label-md text-white uppercase tracking-wider">
            Navigation
          </h4>
          <ul className="space-y-3">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    isActive
                      ? 'font-caption text-caption text-white font-bold'
                      : 'font-caption text-caption text-surface-variant hover:text-white transition-colors'
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-6">
          <h4 className="font-label-md text-label-md text-white uppercase tracking-wider">
            Contact
          </h4>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3 text-surface-variant font-caption text-caption">
              <span className="material-symbols-outlined text-lg">location_on</span>
              <span>Quartier Batterie IV,<br />Libreville, Gabon</span>
            </li>
            <li className="flex items-center space-x-3 text-surface-variant font-caption text-caption">
              <span className="material-symbols-outlined text-lg">call</span>
              <span>+241 07 00 00 00</span>
            </li>
            <li className="flex items-center space-x-3 text-surface-variant font-caption text-caption">
              <span className="material-symbols-outlined text-lg">mail</span>
              <span>contact@zenwellness-gabon.com</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-6">
          <h4 className="font-label-md text-label-md text-white uppercase tracking-wider">
            Newsletter
          </h4>
          <p className="font-caption text-caption text-surface-variant">
            Recevez nos conseils bien-être et offres exclusives.
          </p>
          <form onSubmit={handleNewsletter} className="flex flex-col space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre email"
              className="bg-white/10 border border-white/20 text-white rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary-fixed-dim outline-none font-caption text-caption placeholder:text-white/40"
            />
            <button
              type="submit"
              className="bg-white text-on-background font-label-md text-label-md py-2 rounded-lg hover:bg-primary-fixed transition-colors"
            >
              S'inscrire
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-8 px-6 md:px-margin-desktop max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="font-caption text-caption text-surface-variant">
          © {new Date().getFullYear()} Zen Massage &amp; Wellness Gabon. Sanctuaire à travers le design.
        </p>
        <div className="flex space-x-8 mt-4 md:mt-0">
          <a href="#" className="font-caption text-caption text-surface-variant hover:text-white transition-colors">
            Mentions Légales
          </a>
          <a href="#" className="font-caption text-caption text-surface-variant hover:text-white transition-colors">
            Confidentialité
          </a>
        </div>
      </div>
    </footer>
  )
}
