import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from '../../hooks/useInView'
import { productService } from '../../services/product.service'
import { resolveImageUrl } from '../../utils/mediaUrl'
import type { Produit } from '../../types/product'

function formatPrice(prix: number) {
  return `${Math.round(prix).toLocaleString('fr-FR')} FCFA`
}

export default function ProductsSection() {
  const [ref, isInView] = useInView(0.1)
  const [produits, setProduits] = useState<Produit[]>([])

  useEffect(() => {
    productService.listProduits({ tri: 'recent', limite: 4, page: 1 })
      .then(res => setProduits(res.data.produits ?? []))
      .catch(() => {})
  }, [])

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`bg-surface-container-low py-section-gap transition-all duration-1000 ease-out ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="px-6 md:px-margin-desktop max-w-container-max mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <span className="font-label-md text-label-md text-primary tracking-widest uppercase mb-2 block">
              La Boutique Ben
            </span>
            <h2 className="font-display-lg text-headline-md text-sage-deep">Élixirs de Sérénité</h2>
          </div>
          <Link
            to="/products"
            className="text-sage-deep font-label-md text-label-md flex items-center gap-2 hover:translate-x-2 transition-transform"
          >
            Voir toute la collection
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>

        {/* Product grid */}
        {produits.length === 0 ? (
          /* Skeletons pendant le chargement */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] rounded-xl bg-outline-variant/20 mb-4" />
                <div className="h-4 bg-outline-variant/20 rounded w-3/4 mb-2" />
                <div className="h-3 bg-outline-variant/10 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {produits.map((produit, i) => {
              const image = resolveImageUrl(produit.images?.[0])
              const isNew = i === 0
              return (
                <Link key={produit.id} to={`/products/${produit.id}`} className="group">
                  <div className="aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-white shadow-sm relative">
                    {image ? (
                      <img
                        src={image}
                        alt={produit.nom}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-sage-deep/5">
                        <span className="material-symbols-outlined text-5xl text-sage-deep/30">inventory_2</span>
                      </div>
                    )}
                    {isNew && (
                      <div className="absolute top-4 left-4 bg-primary text-white text-[10px] uppercase tracking-tighter px-2 py-1 rounded-full">
                        Nouveau
                      </div>
                    )}
                    {produit.stock === 0 && (
                      <div className="absolute top-4 left-4 bg-error/90 text-white text-[10px] uppercase tracking-tighter px-2 py-1 rounded-full">
                        Rupture
                      </div>
                    )}
                  </div>
                  <h4 className="font-body-md text-body-md font-medium text-sage-deep line-clamp-1">{produit.nom}</h4>
                  <p className="font-display-lg text-body-md italic text-primary">{formatPrice(produit.prix)}</p>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
