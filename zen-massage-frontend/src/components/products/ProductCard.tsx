import { Link } from 'react-router-dom'
import { useInView } from '../../hooks/useInView'
import type { Produit } from '../../types/product'

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

function Stars({ rating }: { rating: number }) {
  const r = Math.round(rating * 2) / 2
  return (
    <div className="flex items-center gap-1 mb-2 text-[#C5A059]">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className="material-symbols-outlined text-[18px]"
          style={{
            fontVariationSettings: `'FILL' ${i <= r ? 1 : i - 0.5 <= r ? 0.5 : 0}`,
          }}
        >
          star
        </span>
      ))}
    </div>
  )
}

function formatPrice(prix: number): string {
  return `${prix.toLocaleString('fr-FR')} FCFA`
}

interface ProduitCardProps {
  produit: Produit
  delay?: number
  moyenne?: number
}

export default function ProductCard({ produit, delay = 0, moyenne }: ProduitCardProps) {
  const [ref, isInView] = useInView(0.1)
  const image = produit.images?.[0] || ''
  const rating = moyenne ?? 0
  const reviewCount = produit._count?.avis ?? 0
  const catNom = produit.categorie?.nom

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`group flex flex-col bg-white rounded-xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="aspect-[4/5] relative overflow-hidden bg-surface-container-low">
        <img
          src={image}
          alt={produit.nom}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {produit.stock > 0 && produit.stock <= 3 && (
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full font-label-md text-caption uppercase tracking-tighter text-primary">
            Stock faible
          </span>
        )}
        {produit.stock === 0 && (
          <span className="absolute top-4 left-4 bg-error/90 text-white backdrop-blur-md px-3 py-1 rounded-full font-label-md text-caption uppercase tracking-tighter">
            Rupture
          </span>
        )}
      </div>

      <div className="p-stack-md flex flex-col flex-grow">
        <Stars rating={rating} />
        <div className="flex items-center gap-1 mb-2">
          <span className="font-caption text-caption text-outline-variant">
            ({reviewCount})
          </span>
        </div>
        <h3 className="font-body-md text-body-md font-semibold text-on-surface mb-1">
          {produit.nom}
        </h3>
        {catNom && (
          <p className="font-caption text-caption text-primary/80 mb-1 uppercase tracking-wider">
            {catNom}
          </p>
        )}
        <p className="font-caption text-caption text-on-surface-variant mb-4 flex-grow line-clamp-2">
          {produit.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-headline-sm text-headline-sm text-sage-deep">
            {formatPrice(produit.prix)}
          </span>
          <Link
            to={`/products/${produit.id}`}
            className="font-label-md text-label-md text-primary border-b border-primary hover:text-sage-deep hover:border-sage-deep transition-colors"
          >
            Voir détails
          </Link>
        </div>
      </div>
    </div>
  )
}
