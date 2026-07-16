import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const heroImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBq541VjraApjrSEIVVSqSDF45BAldYUApyLctM-iZV8txuV65BkG9Mve4slukJ4mQ7FjC7TLntnm9O2H4toR0f816CwBSQM3LlAliuwHuNDT5mAEUvosS970NVgrJ7tmY3A1BXuOigWh5cB2Nz6EEA5MMyOsoeNmL_DQDKHuu_T_M6iAbw5JOGJBpdl6K7fvjDsQJKFdWtyLHI9HWyQLr940wLUl6BADAbRPunLbM7_NppxsiA8cEokXtqGixnQY26bdm8w_lsEy9J'

export default function HeroSection() {
  const { user } = useAuth()
  return (
    <header className="relative min-h-screen flex items-center pt-20">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-margin-desktop max-w-container-max mx-auto w-full">
        <div className="max-w-2xl text-white">
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-stack-md leading-tight">
            Le Sanctuaire du Bien-être au Gabon
          </h1>
          <p className="font-body-lg text-body-lg mb-stack-lg opacity-90 max-w-lg">
            Une expérience holistique où l'excellence clinique rencontre le luxe naturel.
            Redécouvrez votre équilibre intérieur.
          </p>
          <div className="flex flex-wrap gap-stack-md">
            <Link
              to={user ? "/appointments" : "/login"}
              className="bg-sage-deep text-white px-8 py-4 rounded-xl font-label-md text-label-md hover:bg-primary transition-colors"
            >
              Prendre rendez-vous
            </Link>
            <Link
              to="/services"
              className="bg-white/20 backdrop-blur-md text-white border border-white/40 px-8 py-4 rounded-xl font-label-md text-label-md hover:bg-white/30 transition-colors"
            >
              Découvrir nos soins
            </Link>
          </div>

          {/* Boutons pour visiteurs non connectés */}
          {!user && (
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="bg-white text-sage-deep px-8 py-3 rounded-full font-label-md text-label-md hover:bg-sand-light transition-all duration-300 shadow-lg"
              >
                Créer un compte
              </Link>
              <Link
                to="/login"
                className="text-white border border-white/50 px-8 py-3 rounded-full font-label-md text-label-md hover:bg-white/10 transition-all duration-300"
              >
                Se connecter
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/70 animate-bounce">
        <span className="font-caption text-caption uppercase tracking-widest mb-2">Découvrir</span>
        <span className="material-symbols-outlined">expand_more</span>
      </div>
    </header>
  )
}
