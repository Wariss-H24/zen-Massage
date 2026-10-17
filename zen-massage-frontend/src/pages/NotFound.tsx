import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import MainLayout from '../components/layout/MainLayout'

export default function NotFound() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const homeHref = !user
    ? '/'
    : user.role === 'ADMIN' || user.role === 'SUPER_ADMIN'
    ? '/admin'
    : '/account'

  return (
    <MainLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">

        {/* Illustration chiffre */}
        <div className="relative mb-8 select-none">
          <span className="font-display-lg text-[120px] sm:text-[160px] leading-none font-bold text-sage-deep/8 tracking-tighter">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="material-symbols-outlined text-[64px] sm:text-[80px] text-sage-deep/40"
              style={{ fontVariationSettings: "'FILL' 0, 'wght' 200" }}
            >
              spa
            </span>
          </div>
        </div>

        <h1 className="font-display-lg text-2xl sm:text-3xl text-sage-deep mb-3">
          Page introuvable
        </h1>
        <p className="font-body-lg text-on-surface-variant max-w-sm mb-8 text-sm sm:text-base">
          Cette page n'existe pas ou a été déplacée. Revenez à l'accueil pour continuer votre expérience.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-outline-variant/40 font-label-md text-sm hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Retour
          </button>
          <button
            onClick={() => navigate(homeHref)}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-label-md text-sm hover:bg-sage-deep transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">home</span>
            Accueil
          </button>
        </div>

        {/* Liens rapides */}
        <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {[
            { label: 'Boutique',    href: '/products' },
            { label: 'Services',   href: '/services'  },
            { label: 'À propos',   href: '/about'     },
          ].map(({ label, href }) => (
            <button
              key={href}
              onClick={() => navigate(href)}
              className="text-sm text-on-surface-variant hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
