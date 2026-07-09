import { useInView } from '../../hooks/useInView'

export default function QuoteSection() {
  const [ref, isInView] = useInView(0.1)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-24 bg-surface-container transition-all duration-1000 ease-out ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="material-symbols-outlined text-primary text-5xl opacity-30 mb-6 block">
          format_quote
        </span>
        <blockquote className="font-headline-sm text-headline-sm text-sage-deep mb-6">
          Le massage n'est pas un luxe, c'est un investissement dans votre longévité
          et votre paix intérieure.
        </blockquote>
        <cite className="font-label-md text-label-md text-primary uppercase tracking-widest not-italic">
          — Fondateur, Zen Wellness Gabon
        </cite>
      </div>
    </section>
  )
}
