import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from '../../hooks/useInView'
import { useCart } from '../../context/CartContext'
import type { Produit } from '../../types/product'

function Stars({ rating }: { rating: number }) {
  const r = Math.round(rating * 2) / 2
  return (
    <div className="flex items-center gap-0.5 text-[#C5A059]">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className="material-symbols-outlined text-[14px]"
          style={{ fontVariationSettings: `'FILL' ${i <= r ? 1 : i - 0.5 <= r ? 0.5 : 0}` }}
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
  const [ref, isInView] = useInView(0.08)
  const { addItem, items } = useCart()
  const [added, setAdded] = useState(false)

  const image      = produit.images?.[0] || ''
  const rating     = moyenne ?? 0
  const reviewCount = produit._count?.avis ?? 0
  const catNom     = produit.categorie?.nom
  const stockOk    = produit.stock > 0

  // Quantité déjà dans le panier
  const inCart = items.find(i => i.id === produit.id)?.qty ?? 0

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault() // ne pas naviguer vers le détail
    if (!stockOk) return
    addItem({
      id:    produit.id,
      nom:   produit.nom,
      prix:  produit.prix,
      image: image,
      stock: produit.stock,
    }, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 border border-outline-variant/20 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* ── Image ── */}
      <Link to={`/products/${produit.id}`} className="block relative overflow-hidden bg-surface-container-low aspect-[3/2] sm:aspect-[4/5]">
        {image
          ? <img src={image} alt={produit.nom} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          : (
            <div className="w-full h-full flex items-center justify-center bg-sage-deep/5">
              <span className="material-symbols-outlined text-5xl text-sage-deep/30">inventory_2</span>
            </div>
          )
        }

        {/* Badges stock */}
        {produit.stock === 0 && (
          <span className="absolute top-3 left-3 bg-error/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide backdrop-blur-sm">
            Rupture
          </span>
        )}
        {produit.stock > 0 && produit.stock <= 3 && (
          <span className="absolute top-3 left-3 bg-amber-500/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide backdrop-blur-sm">
            Stock faible
          </span>
        )}

        {/* Badge compteur panier */}
        {inCart > 0 && (
          <span className="absolute top-3 right-3 bg-primary text-white text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center shadow">
            {inCart}
          </span>
        )}

        {/* Overlay bouton "Voir détails" au hover — desktop */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-end justify-center pb-4">
          <span className="bg-white/90 backdrop-blur-sm text-sage-deep font-label-md text-xs px-4 py-2 rounded-full">
            Voir les détails
          </span>
        </div>
      </Link>

      {/* ── Body ── */}
      <div className="p-4 flex flex-col flex-grow gap-2">
        {/* Étoiles + avis */}
        <div className="flex items-center gap-1.5">
          <Stars rating={rating} />
          <span className="font-caption text-[11px] text-on-surface-variant">({reviewCount})</span>
        </div>

        {/* Nom */}
        <h3 className="font-body-md text-sm font-semibold text-on-surface leading-snug line-clamp-2">
          {produit.nom}
        </h3>

        {/* Catégorie */}
        {catNom && (
          <span className="font-caption text-[10px] text-primary/80 uppercase tracking-wider">
            {catNom}
          </span>
        )}

        {/* Description */}
        <p className="font-caption text-[11px] text-on-surface-variant line-clamp-2 flex-grow">
          {produit.description}
        </p>

        {/* Prix + CTA */}
        <div className="flex items-center justify-between mt-auto pt-2 gap-2">
          <span className="font-headline-sm text-sm font-bold text-sage-deep whitespace-nowrap">
            {formatPrice(produit.prix)}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={!stockOk}
            title={stockOk ? 'Ajouter au panier' : 'Rupture de stock'}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-label-md text-xs font-semibold transition-all duration-200 active:scale-95 shrink-0 ${
              !stockOk
                ? 'bg-surface-container text-on-surface-variant cursor-not-allowed opacity-50'
                : added
                ? 'bg-green-500 text-white'
                : 'bg-primary text-white hover:bg-sage-deep shadow-sm hover:shadow-md'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: added ? "'FILL' 1" : "'FILL' 0" }}>
              {added ? 'check_circle' : 'shopping_cart'}
            </span>
            <span className="hidden sm:inline">{added ? 'Ajouté !' : 'Panier'}</span>
          </button>
        </div>

        {/* Lien détails — visible sous le CTA sur mobile */}
        <Link
          to={`/products/${produit.id}`}
          className="sm:hidden text-center font-caption text-[11px] text-primary hover:underline mt-1"
        >
          Voir les détails →
        </Link>
      </div>
    </div>
  )
}
