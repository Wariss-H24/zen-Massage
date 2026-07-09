import { useInView } from '../../hooks/useInView'

interface Value {
  icon: string
  title: string
  description: string
}

const values: Value[] = [
  {
    icon: 'balance',
    title: 'Harmonie',
    description:
      "La recherche constante du point d'équilibre entre force et douceur, action et repos.",
  },
  {
    icon: 'verified',
    title: 'Excellence',
    description:
      "Une rigueur clinique associée à un art du toucher d'exception, certifiée par nos experts.",
  },
  {
    icon: 'spa',
    title: 'Sincérité',
    description:
      "Une approche holistique honnête, centrée sur les besoins uniques de chaque individu.",
  },
]

export default function ValuesSection() {
  const [ref, isInView] = useInView(0.1)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`bg-sand-light py-section-gap transition-all duration-1000 ease-out ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="px-6 md:px-margin-desktop max-w-container-max mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-headline-md text-headline-md text-sage-deep mb-4">
            Nos Valeurs Fondamentales
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-lg">
          {values.map((value) => (
            <div
              key={value.title}
              className="p-8 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm">
                <span className="material-symbols-outlined text-sage-deep text-3xl">
                  {value.icon}
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm mb-4">{value.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
