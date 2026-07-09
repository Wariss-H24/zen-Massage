import { useInView } from '../../hooks/useInView'

const stoneImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCII0HjV0medW61QMME5_8401OKgGPEdW0n7vy4vsz95igEV--PK8pl5QAFakB5qepjkjRkT7ez84VwkHMEjSnL1iCo6qsvlIrJ2M8vUAIw8XHyWYGBD3ttb8HOa2n64AI_dCgpY6uxQzdSeo5-XT6Xo_-rwLBx_Z3BUVfe0PsadLK1w-iestTjFiXtuJRNigbnr15PhE-F7vLmCotZATHFqw0kGgxWYxy0DUgy8-RSzShz5NxsNehrdg'

export default function MissionSection() {
  const [ref, isInView] = useInView(0.1)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-section-gap px-6 md:px-margin-desktop max-w-container-max mx-auto transition-all duration-1000 ease-out ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-stretch">

        {/* Text block */}
        <div className="md:col-span-7 bg-surface-container-low p-8 rounded-lg flex flex-col justify-center">
          <h2 className="font-headline-md text-headline-md text-sage-deep mb-6">
            Notre Mission
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed">
            Rétablir l'équilibre naturel du corps et de l'esprit. Dans un monde de bruits
            incessants, nous créons des espaces de silence et de régénération profonde,
            où chaque geste est une intention, chaque souffle un renouveau.
          </p>
          <div className="flex items-center space-x-4">
            <span className="material-symbols-outlined text-primary text-4xl">
              energy_savings_leaf
            </span>
            <span className="font-label-md text-label-md text-primary">
              Inspiré par la nature du Gabon
            </span>
          </div>
        </div>

        {/* Image block */}
        <div className="md:col-span-5 h-[450px] rounded-lg overflow-hidden">
          <img
            src={stoneImage}
            alt="Zen river stones stack"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
