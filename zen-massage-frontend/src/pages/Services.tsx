import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import { useInView } from '../hooks/useInView'

/* ── Data ── */
const SERVICES = [
  {
    id: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA32qrrPwe5vnBYAbvbXqb9hScN-Ymb98SZAUeO_BfUx9n0zBzaP9nQ8nf5QHA_qGkqzuHB9Wn_ASZRNmV_4EpdjEIjUDOEGTmxP0rCZDl4sVg74hukaUFx1L7ugHk5Q--_ejl5nOtfZopd3n4eru_t9tJM-nh2sJGtVdPucR35ssWQA9uwQByg_N0eqzNU9iFScw3JcBUz6p2dpIMKWIRmbPqmYD8akuj0PRmruP42UGsriuy-AwSlSA',
    badge: 'Populaire',
    name: 'Massage Signature Gabonais',
    duration: '90 min',
    price: '75.000 FCFA',
    description: 'Un rituel ancestral utilisant des huiles botaniques locales pour une relaxation profonde et une revitalisation totale.',
  },
  {
    id: 2,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD85hNUETDvz6LAFC9TzpMiuJFdqn0loVB9c6h_9-1bffuKwpfx1Ni-AJhjF-I9qu-rskroOsGpP3FYTMRsJ5yQJpyg4zc-_2pWB6uL_5v6xRgqAIBhN8-bi60ybQSyw_0_1YYVOoNdyqL5fE680u3hYuwpNij-6ghdyQGKJ7LfmcGRzuhhe33oYe4ID4QbL9GDWNzJn1ZxUVbZ3GglQOt5Y3FPwq4yD7syO2ygQ1KXHzYn0Yw4DPpYLA',
    badge: null,
    name: 'Drainage Lymphatique',
    duration: '60 min',
    price: '55.000 FCFA',
    description: 'Technique manuelle douce visant à stimuler la circulation de la lymphe et à détoxifier l\'organisme en profondeur.',
  },
  {
    id: 3,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAm2p6sBUKvm2iPjEGIBHvt_IHcf0VWy5ojuGgIVfqp9ZY-ZzYlwcEglEgBSyfc5PsiUAD5lkHVbdNbF2_oE64Dd36YpNcI3DfDIUOFVYwkZWyJuiG6mgTyqaVjSUILpxJMYb9RuX1Tj3QkM1jN9-SXDlWxOMq3O-0zI9ETHJ-xPxQYSIpkiDOMZ_gKhQDSodBqWNvNcba_ST1smVjrPPREHIHJnB4LL4s5WuHYIeSa747459C2-RX0ZQ',
    badge: null,
    name: 'Rituel Pierres Chaudes',
    duration: '75 min',
    price: '65.000 FCFA',
    description: 'La chaleur des pierres volcaniques alliée à des manœuvres fluides pour dénouer les tensions musculaires les plus tenaces.',
  },
  {
    id: 4,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDWUZ1bHlrox_E_XnuVmNvQew4voUYG1ppUmXtUVwx1_a82WqOILLDe8nUCK7gik6hhqXt8tpqqX1kTBMZkoxs-CdECBnaeUDPmQLRCBtE-4MklFVVwegIp793HAHA9eDUGwk6kjcH-58fsNGjzaRj8c8gSTlww8XojT12po4lxo_aXRTq-pdbsDPQmj47-QWKhgqrnucmCHmjVmnN6ix2KYD1Ec6bJHiylrrgqE20CQKkV8BSFPgheg',
    badge: null,
    name: 'Massage Prénatal',
    duration: '60 min',
    price: '50.000 FCFA',
    description: 'Un accompagnement tout en douceur pour soulager les maux liés à la grossesse et offrir un moment de communion avec bébé.',
  },
]

const RITUALS = [
  { name: 'Gommage au Café du Gabon', description: 'Élimine les impuretés et tonifie la peau', price: '25.000 FCFA' },
  { name: 'Enveloppement à l\'Argile', description: 'Régénère et hydrate intensément', price: '30.000 FCFA' },
  { name: 'Réflexologie Plantaire', description: 'Harmonise les flux énergétiques', price: '35.000 FCFA' },
]

/* ── Service Card ── */
function ServiceCard({ service, delay = 0 }: { service: typeof SERVICES[0]; delay?: number }) {
  const [ref, isInView] = useInView(0.1)

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`group flex flex-col bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/30 hover:shadow-xl transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Image */}
      <div className="h-64 overflow-hidden relative">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105"
        />
        {service.badge && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full font-label-md text-caption text-sage-deep">
            {service.badge}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-stack-md flex-grow flex flex-col">
        <h3 className="font-headline-sm text-headline-sm text-sage-deep mb-2">{service.name}</h3>

        {/* Meta */}
        <div className="flex items-center gap-4 text-on-surface-variant mb-4">
          <span className="flex items-center gap-1 font-label-md text-caption">
            <span className="material-symbols-outlined text-[18px]">schedule</span>
            {service.duration}
          </span>
          <span className="flex items-center gap-1 font-label-md text-caption">
            <span className="material-symbols-outlined text-[18px]">payments</span>
            {service.price}
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

function ServicesGridSection() {
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {SERVICES.map((service, i) => (
          <ServiceCard key={service.id} service={service} delay={i * 100} />
        ))}
      </div>
    </section>
  )
}

function RitualsSection() {
  const [ref, isInView] = useInView(0.1)

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

            {/* Ritual list */}
            <div className="space-y-4 pt-4">
              {RITUALS.map((ritual) => (
                <div
                  key={ritual.name}
                  className="flex justify-between items-center border-b border-outline-variant pb-3"
                >
                  <div>
                    <h4 className="font-label-md text-label-md text-sage-deep">{ritual.name}</h4>
                    <p className="font-caption text-caption text-on-surface-variant">
                      {ritual.description}
                    </p>
                  </div>
                  <span className="font-label-md text-label-md text-sage-deep shrink-0 ml-4">
                    {ritual.price}
                  </span>
                </div>
              ))}
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
  useEffect(() => {
    document.title = 'Services & Soins | Zen Massage & Wellness Gabon'
  }, [])

  return (
    <MainLayout>
      <HeroSection />
      <ServicesGridSection />
      <RitualsSection />
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
