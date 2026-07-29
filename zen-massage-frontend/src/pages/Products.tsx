import { useState, useEffect, useCallback } from 'react'
import MainLayout from '../components/layout/MainLayout'
import ProductCard from '../components/products/ProductCard'
import { useInView } from '../hooks/useInView'
import { productService } from '../services/product.service'
import type { Categorie, Produit } from '../types/product'
import Spinner from '../components/ui/Spinner'

function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [ref, isInView] = useInView(0.1)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`bg-sage-deep py-section-gap relative overflow-hidden transition-all duration-1000 ease-out ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop relative z-10 text-center">
        <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-white mb-stack-md">
          Restez en Harmonie
        </h2>
        <p className="font-body-lg text-body-lg text-on-primary-container mb-stack-lg max-w-xl mx-auto">
          Inscrivez-vous à notre newsletter pour recevoir des conseils bien-être et des offres
          exclusives sur nos nouveaux produits.
        </p>
        <form
          onSubmit={(e) => { e.preventDefault(); setEmail('') }}
          className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email"
            className="flex-grow px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 font-body-md text-body-md"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-white text-sage-deep font-label-md text-label-md rounded-full hover:bg-sand-light transition-all uppercase tracking-widest font-bold"
          >
            S'abonner
          </button>
        </form>
      </div>
    </section>
  )
}

export default function Products() {
  const [categories, setCategories] = useState<Categorie[]>([])
  const [produits, setProduits] = useState<Produit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCatId, setActiveCatId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [tri, setTri] = useState<'recent' | 'prix_asc' | 'prix_desc' | 'avis_desc'>('recent')
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    document.title = 'Boutique | Ben Massage & Wellness Gabon'
  }, [])

  const loadCategories = useCallback(async () => {
    try {
      const res = await productService.getCategories()
      setCategories(res.data)
    } catch (err: any) {
      console.error('Catégories:', err.message)
    }
  }, [])

  const loadProduits = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await productService.listProduits({
        categorie_id: activeCatId ?? undefined,
        recherche: search || undefined,
        tri,
        page,
        limite: 12,
      })
      setProduits(res.data.produits)
      setTotal(res.data.total)
      setPages(res.data.pages)
    } catch (err: any) {
      setError(err.message || 'Erreur de chargement')
    } finally {
      setLoading(false)
    }
  }, [activeCatId, search, tri, page])

  useEffect(() => { loadCategories() }, [loadCategories])
  useEffect(() => { setPage(1) }, [activeCatId, search, tri])
  useEffect(() => { loadProduits() }, [loadProduits])

  return (
    <MainLayout>
      <main className="min-h-screen">

        <section className="max-w-container-max mx-auto px-6 md:px-margin-desktop py-stack-lg">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-gutter border-b border-outline-variant pb-stack-md mb-stack-lg">
            <div className="max-w-2xl">
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-sage-deep mb-2">
                Sanctuaire de Bien-être
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Découvrez notre sélection rigoureuse de produits naturels pour prolonger votre
                expérience thérapeutique à domicile.
              </p>
              {total > 0 && !loading && (
                <p className="font-caption text-caption text-outline mt-2">
                  {total} produit{total > 1 ? 's' : ''} trouvé{total > 1 ? 's' : ''}
                </p>
              )}
            </div>

            <div className="relative w-full md:w-80">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                search
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un produit..."
                className="w-full pl-10 pr-4 py-3 bg-transparent border-b border-outline-variant focus:border-primary focus:outline-none transition-colors font-body-md text-body-md"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mb-stack-lg">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setActiveCatId(null)}
                className={`px-6 py-2 rounded-full font-label-md text-label-md transition-all ${
                  activeCatId === null
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-sand-light text-on-surface-variant hover:bg-surface-container-highest border border-transparent'
                }`}
              >
                Tous les produits
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCatId(cat.id)}
                  className={`px-6 py-2 rounded-full font-label-md text-label-md transition-all ${
                    activeCatId === cat.id
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-sand-light text-on-surface-variant hover:bg-surface-container-highest border border-transparent'
                  }`}
                >
                  {cat.nom}
                </button>
              ))}
            </div>

            <select
              value={tri}
              onChange={(e) => setTri(e.target.value as any)}
              className="px-4 py-2 rounded-full bg-sand-light border border-outline-variant font-label-md text-label-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="recent">Plus récents</option>
              <option value="avis_desc">Mieux notés</option>
              <option value="prix_asc">Prix : croissant</option>
              <option value="prix_desc">Prix : décroissant</option>
            </select>
          </div>
        </section>

        <section className="max-w-container-max mx-auto px-6 md:px-margin-desktop pb-section-gap">
          {loading ? (
            <div className="flex justify-center py-24">
              <Spinner size="lg" />
            </div>
          ) : error ? (
            <div className="text-center py-24">
              <span className="material-symbols-outlined text-5xl text-error mb-4 block">
                error_outline
              </span>
              <p className="font-body-lg text-body-lg text-error mb-4">{error}</p>
              <button
                onClick={loadProduits}
                className="px-6 py-3 rounded-full bg-primary text-white font-label-md hover:bg-sage-deep transition-colors"
              >
                Réessayer
              </button>
            </div>
          ) : produits.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
                {produits.map((product, i) => (
                  <ProductCard key={product.id} produit={product} delay={i * 80} />
                ))}
              </div>

              {pages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-stack-lg">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 rounded-full bg-sand-light disabled:opacity-40 font-label-md hover:bg-surface-container-highest transition-colors"
                  >
                    ← Précédent
                  </button>
                  <span className="font-body-md text-on-surface-variant px-4">
                    Page {page} / {pages}
                  </span>
                  <button
                    onClick={() => setPage(p => Math.min(pages, p + 1))}
                    disabled={page === pages}
                    className="px-4 py-2 rounded-full bg-sand-light disabled:opacity-40 font-label-md hover:bg-surface-container-highest transition-colors"
                  >
                    Suivant →
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-24">
              <span className="material-symbols-outlined text-5xl text-outline-variant mb-4 block">
                search_off
              </span>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                {search ? `Aucun produit trouvé pour "${search}"` : 'Aucun produit disponible pour le moment'}
              </p>
            </div>
          )}
        </section>

        <NewsletterSection />

      </main>
    </MainLayout>
  )
}
