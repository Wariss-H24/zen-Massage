import { useInView } from '../../hooks/useInView'

const heroImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCOqeF-c-bVFGx2FPkFUJIcZx2COeJNVrmop3E9tQwONUg-ar-Hs2A4rzitoSVglIkcfKjkKaincA5DWJ-Q4ZMjLeZ_f-2tBVobBJepe4ESy7uuIc93ajO6cb_MBfD8MCHM9qIzRPOlR1jQJPOE_oHPyXan0yBQShow2ODk4TaeRFHCJ6Ta2QCLAR4r3lP9CxsoZQ7AnOOBkADZbqIoA1T2Dpo3Dc6DD5xQCWYtlX_0ykxp103mFXPxxg'

export default function HeroSection() {
  const [ref, isInView] = useInView(0.1)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`relative h-[80vh] flex items-center overflow-hidden transition-all duration-1000 ease-out ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Serene coastline of Gabon"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-margin-desktop relative z-10">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-1 rounded-full bg-primary-fixed text-primary font-label-md mb-6">
            Notre Histoire
          </span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-sage-deep mb-8">
            Sanctuaire à travers le design, harmonie par le soin.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Né au cœur du Gabon, Ben Massage &amp; Wellness est une invitation au voyage
            intérieur. Nous marions l'excellence clinique aux rituels holistiques pour offrir
            un refuge contre le tumulte du monde moderne.
          </p>
        </div>
      </div>
    </section>
  )
}
