import { Link } from 'react-router-dom'
import { useInView } from '../../hooks/useInView'

export default function CtaSection() {
  const [ref, isInView] = useInView(0.1)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`mb-section-gap px-6 md:px-margin-desktop max-w-container-max mx-auto transition-all duration-1000 ease-out ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="relative rounded-3xl overflow-hidden bg-sage-deep py-20 px-8 text-center text-white">
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-6">
            Prêt à commencer votre voyage&nbsp;?
          </h2>
          <p className="font-body-lg text-body-lg mb-10 opacity-80 text-on-primary-container">
            Réservez votre séance personnalisée dès aujourd'hui et laissez nos experts
            prendre soin de vous.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/appointments"
              className="bg-white text-sage-deep px-10 py-4 rounded-xl font-label-md text-label-md hover:bg-sand-light transition-colors shadow-lg"
            >
              Réserver maintenant
            </Link>
            <Link
              to="/products"
              className="bg-transparent border border-white/40 text-white px-10 py-4 rounded-xl font-label-md text-label-md hover:bg-white/10 transition-colors"
            >
              Consulter nos tarifs
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
