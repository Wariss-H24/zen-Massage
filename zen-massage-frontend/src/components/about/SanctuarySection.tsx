import { useInView } from '../../hooks/useInView'

const roomImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuASSSJQnH4RG5E1tlAPCQIGVP1PEIO5XCwDe_UT7643F9SnCX0YEKlCdleBEh4hR8bAzgQW7lY9dATWogBi17HsbvK939wO3YQxvMYrLWUYOsWyk8QhsLmJkcEdzugVCqR9y8rjFGGUJNs9wBeCIV3Kkhq2b3cFa-VbpfZtJKbwk4r4EsxLDN8eWjCb7b54iOzxKTdoMCuN9NcNRa1d4GREdfB3hq9QpLqEMHRvs82NWyzTTtGP4Pz2ow'

export default function SanctuarySection() {
  const [ref, isInView] = useInView(0.1)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-section-gap px-6 md:px-margin-desktop max-w-container-max mx-auto transition-all duration-1000 ease-out ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="flex flex-col md:flex-row items-center gap-gutter">

        {/* Image */}
        <div className="w-full md:w-1/2 relative h-[500px] rounded-lg overflow-hidden">
          <img
            src={roomImage}
            alt="Luxury treatment room"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2 md:pl-stack-lg">
          <h2 className="font-headline-md text-headline-md text-sage-deep mb-6">
            Le Sanctuaire
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 leading-relaxed italic">
            "Un espace où le temps s'arrête, et où le bien-être commence."
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8 leading-relaxed">
            Nos espaces sont conçus comme des écosystèmes de calme. De l'acoustique soigneusement
            étudiée aux fragrances naturelles de la flore gabonaise, chaque détail de notre
            sanctuaire est pensé pour induire un état de relaxation immédiat. Nous croyons que
            l'environnement est le premier thérapeute.
          </p>

          <div className="grid grid-cols-2 gap-stack-md border-t border-outline-variant pt-8">
            <div>
              <h4 className="font-label-md text-label-md text-sage-deep">Localisation</h4>
              <p className="font-caption text-caption text-on-surface-variant">Libreville, Gabon</p>
            </div>
            <div>
              <h4 className="font-label-md text-label-md text-sage-deep">Ambiance</h4>
              <p className="font-caption text-caption text-on-surface-variant">Lumière tamisée &amp; Nature</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
