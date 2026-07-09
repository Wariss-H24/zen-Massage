import { useInView } from '../../hooks/useInView'

export interface ProductItem {
  id: number
  image: string
  badge?: string
  rating: number
  reviewCount: number
  name: string
  description: string
  price: string
  category?: string
}

interface Props {
  product: ProductItem
  delay?: number
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 mb-2 text-[#C5A059]">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className="material-symbols-outlined text-[18px]"
          style={{
            fontVariationSettings: `'FILL' ${i <= rating ? 1 : i - 0.5 <= rating ? 0.5 : 0}`,
          }}
        >
          star
        </span>
      ))}
    </div>
  )
}

export default function ProductCard({ product, delay = 0 }: Props) {
  const [ref, isInView] = useInView(0.1)

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`group flex flex-col bg-white rounded-xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Image */}
      <div className="aspect-[4/5] relative overflow-hidden bg-surface-container-low">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {product.badge && (
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full font-label-md text-caption uppercase tracking-tighter text-primary">
            {product.badge}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-stack-md flex flex-col flex-grow">
        <Stars rating={product.rating} />
        <div className="flex items-center gap-1 mb-2">
          <span className="font-caption text-caption text-outline-variant">
            ({product.reviewCount})
          </span>
        </div>
        <h3 className="font-body-md text-body-md font-semibold text-on-surface mb-1">
          {product.name}
        </h3>
        <p className="font-caption text-caption text-on-surface-variant mb-4 flex-grow">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-headline-sm text-headline-sm text-sage-deep">
            {product.price}
          </span>
          <button className="font-label-md text-label-md text-primary border-b border-primary hover:text-sage-deep hover:border-sage-deep transition-colors">
            Voir détails
          </button>
        </div>
      </div>
    </div>
  )
}
