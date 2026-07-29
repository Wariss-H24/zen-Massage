import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import { useInView } from '../hooks/useInView'
import { appointmentService, type TypeSeance } from '../services/appointment.service'

/* ── Génère les initiales (2 premiers mots) depuis un nom ── */
function getInitials(name: string): string {
  const words = name.trim().split(/\s+/)
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}

/* ── Formate le prix depuis la BDD (nombre entier FCFA) ── */
function formatPrice(prix: number): string {
  return prix.toLocaleString('fr-FR') + ' FCFA'
}

/* ── Formate la durée en minutes ── */
function formatDuration(duree: number): string {
  if (duree < 60) return `${duree} min`
  const h = Math.floor(duree / 60)
  const m = duree % 60
  return m > 0 ? `${h}h${m.toString().padStart(2, '0')}` : `${h}h`
}

/* ── Service Card ── */
function ServiceCard({ service, delay = 0 }: { service: TypeSeance; delay?: number }) {
  const [ref, isInView] = useInView(0.1)

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`group flex flex-col bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/30 hover:shadow-xl transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Avatar initiales — couleur uniforme sage */}
      <div className="h-64 flex items-center justify-center bg-sage-deep/10 transition-all duration-500 group-hover:bg-sage-deep/15">
        <span className="text-6xl font-bold tracking-tight select-none text-sage-deep opacity-80">
          {getInitials(service.nom)}
        </span>
      </div>

      {/* Body */}
      <div className="p-stack-md flex-grow flex flex-col">
        <h3 className="font-headline-sm text-headline-sm text-sage-deep mb-2">{service.nom}</h3>

        {/* Meta */}
        <div className="flex items-center gap-4 text-on-surface-variant mb-4">
          <span className="flex items-center gap-1 font-label-md text-caption">
            <span className="material-symbols-outlined text-[18px]">schedule</span>
            {formatDuration(service.duree)}
          </span>
          <span className="flex items-center gap-1 font-label-md text-caption">
            <span className="material-symbols-outlined text-[18px]">payments</span>
            {formatPrice(service.prix)}
          </span>
        </div>

        <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow line-clamp-3">
          {service.description}
        </p>

        <Link
          to="/appointments"
          className="mt-auto w-full border border-sage-deep text-sage-deep py-3 rounded-xl font-label-md text-label-md text-center hover:bg-sage-deep hover:text-white transition-all duration-300 block"
        >
          Réserver
        </Link>
      </div>
    </div>
  )
}

/* ── Skeleton Card pendant le chargement ── */
function ServiceCardSkeleton() {
  return (
    <div className="flex flex-col bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/30 animate-pulse">
      <div className="h-64 bg-outline-variant/20" />
      <div className="p-stack-md space-y-3">
        <div className="h-5 bg-outline-variant/20 rounded w-3/4" />
        <div className="flex gap-4">
          <div className="h-4 bg-outline-variant/20 rounded w-16" />
          <div className="h-4 bg-outline-variant/20 rounded w-20" />
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-outline-variant/20 rounded w-full" />
          <div className="h-3 bg-outline-variant/20 rounded w-5/6" />
          <div className="h-3 bg-outline-variant/20 rounded w-4/6" />
        </div>
        <div className="h-10 bg-outline-variant/20 rounded-xl mt-4" />
      </div>
    </div>
  )
}

/* ── Sections ── */
function HeroSection() {
  const [ref, isInView] = useInView(0.05)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`relative h-[60vh] min-h-[450px] w-full flex items-center overflow-hidden transition-all duration-1000 ease-out ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="absolute inset-0 z-0">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBa3GRZqhV4REOQuDnq1Ddn99Cj_46TZUT_QBKzmVoLMRcBmU_BBMaC64r2MDPoSFbG2KJC8bTlvPfOZfpmt6-unnLHqIo8tz86UzprDRT_LCWShS1062cQdgbkzXojBAJcU_Cn31QGgXABqlGVPXwG0-S9pfTCHWTNeHBwaauVpV7TSeG2iQoE7RE1mJ4L04snh5u7Elmle-AdAAZ7HwVfYWs0LISRB767KM_1MVu2JGFvIiRODvWEJA"
          alt="Paysage côtier du Gabon à l'aube"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="relative z-10 px-6 md:px-margin-desktop max-w-container-max mx-auto w-full">
        <div className="max-w-2xl bg-surface/80 backdrop-blur-md p-stack-lg rounded-xl border border-white/20">
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-sage-deep mb-4">
            L'Art du Soin &amp; de la Sérénité
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">
            Découvrez nos rituels exclusifs inspirés par la nature gabonaise, conçus pour
            restaurer l'harmonie entre le corps et l'esprit.
          </p>
          <span className="inline-flex items-center gap-2 font-label-md text-label-md text-sage-deep">
            <span className="material-symbols-outlined">verified</span>
            Praticiens certifiés
          </span>
        </div>
      </div>
    </section>
  )
}

function ServicesGridSection({ services, loading, error }: {
  services: TypeSeance[]
  loading: boolean
  error: string | null
}) {
  const [ref, isInView] = useInView(0.05)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-section-gap px-6 md:px-margin-desktop max-w-container-max mx-auto transition-all duration-1000 ease-out ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="mb-stack-lg text-center">
        <h2 className="font-headline-md text-display-lg-mobile md:text-headline-md text-sage-deep mb-2">
          Nos Massages
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">
          Chaque geste est une intention, chaque séance est un voyage vers votre sanctuaire intérieur.
        </p>
      </div>

      {/* Erreur */}
      {error && (
        <div className="text-center py-12 text-on-surface-variant">
          <span className="material-symbols-outlined text-4xl mb-3 block">error_outline</span>
          <p className="font-body-md text-body-md">{error}</p>
        </div>
      )}

      {/* Grille */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <ServiceCardSkeleton key={i} />)
          : services.map((service, i) => (
              <ServiceCard key={service.id} service={service} delay={i * 100} />
            ))}
      </div>

      {/* Aucun service */}
      {!loading && !error && services.length === 0 && (
        <div className="text-center py-12 text-on-surface-variant">
          <span className="material-symbols-outlined text-4xl mb-3 block">spa</span>
          <p className="font-body-md text-body-md">Aucun service disponible pour le moment.</p>
        </div>
      )}
    </section>
  )
}

function RitualsSection({ services }: { services: TypeSeance[] }) {
  const [ref, isInView] = useInView(0.1)

  // On prend les 3 services les moins chers comme "rituels complémentaires"
  const rituals = [...services]
    .sort((a, b) => a.prix - b.prix)
    .slice(0, 3)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`bg-sand-light/30 py-section-gap transition-all duration-1000 ease-out ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="px-6 md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row gap-stack-lg items-center">

          {/* Image */}
          <div className="w-full md:w-1/2">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAXUjthPpgm5jCOG7oNn9_vA68pnBVJzz-_Ock2IwgIEFH0km0ejVtoPAqRat4AsV4Bcgwol2YBrGSTx04NQ4lKLzT9eisBOAJ4F8rhJoya3D-Ttj4lXzZyqqIi5XNjem4771NUCGH0UQEVSRiCLGuygC54Ih7muoE-TTMxaylqK8x7FSoWMTzsRmXmGYKBHeIAcJBzzsEZk-A5i3Oht48UJiMi0DtkCMnNfDJp126l0oRrvFNL8e03Q"
              alt="Mélange d'huiles essentielles dans un bol en argile"
              className="rounded-xl shadow-lg w-full h-[500px] object-cover"
            />
          </div>

          {/* Content */}
          <div className="w-full md:w-1/2 space-y-stack-md">
            <span className="font-label-md text-label-md text-primary tracking-widest uppercase block">
              Expériences Holistiques
            </span>
            <h2 className="font-display-lg text-headline-md text-sage-deep">
              Nos Rituels de Bien-être
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Prolongez votre évasion avec nos soins complémentaires, élaborés pour nourrir
              tant le corps que l'esprit.
            </p>

            {/* Liste des rituels dynamiques */}
            <div className="space-y-4 pt-4">
              {rituals.length > 0
                ? rituals.map((ritual) => (
                    <div
                      key={ritual.id}
                      className="flex justify-between items-center border-b border-outline-variant pb-3"
                    >
                      <div>
                        <h4 className="font-label-md text-label-md text-sage-deep">{ritual.nom}</h4>
                        <p className="font-caption text-caption text-on-surface-variant">
                          {formatDuration(ritual.duree)}
                        </p>
                      </div>
                      <span className="font-label-md text-label-md text-sage-deep shrink-0 ml-4">
                        {formatPrice(ritual.prix)}
                      </span>
                    </div>
                  ))
                : /* Skeleton si chargement */
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-outline-variant pb-3 animate-pulse">
                      <div className="space-y-1">
                        <div className="h-4 bg-outline-variant/30 rounded w-40" />
                        <div className="h-3 bg-outline-variant/20 rounded w-24" />
                      </div>
                      <div className="h-4 bg-outline-variant/30 rounded w-20" />
                    </div>
                  ))
              }
            </div>

            <Link
              to="/appointments"
              className="mt-8 inline-block bg-sage-deep text-white px-8 py-3 rounded-full font-label-md text-label-md hover:bg-primary transition-colors"
            >
              Découvrir tous les soins
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function QuoteSection() {
  const [ref, isInView] = useInView(0.1)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-section-gap bg-surface flex flex-col items-center justify-center text-center px-6 transition-all duration-1000 ease-out ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <span className="material-symbols-outlined text-sage-deep text-4xl mb-4">spa</span>
      <blockquote className="font-headline-sm text-display-lg-mobile md:text-headline-md text-sage-deep italic max-w-3xl">
        "Le calme est le berceau de la puissance."
      </blockquote>
      <p className="font-caption text-caption text-on-surface-variant mt-4 uppercase tracking-[0.2em]">
        — Sagesse de la Nature
      </p>
    </section>
  )
}

/* ── Page ── */
export default function Services() {
  const [services, setServices] = useState<TypeSeance[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    document.title = 'Services & Soins | Ben Massage & Wellness Gabon'
  }, [])

  useEffect(() => {
    appointmentService.getTypeSeances()
      .then(res => setServices(Array.isArray(res.data) ? res.data : []))
      .catch(() => setError('Impossible de charger les services. Veuillez réessayer.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <MainLayout>
      <HeroSection />
      <ServicesGridSection services={services} loading={loading} error={error} />
      <RitualsSection services={services} />
      <QuoteSection />

      {/* FAB mobile */}
      <div className="fixed bottom-8 right-8 z-40 md:hidden">
        <Link
          to="/appointments"
          className="bg-sage-deep text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-primary transition-colors"
          aria-label="Prendre rendez-vous"
        >
          <span className="material-symbols-outlined">calendar_today</span>
        </Link>
      </div>
    </MainLayout>
  )
}
