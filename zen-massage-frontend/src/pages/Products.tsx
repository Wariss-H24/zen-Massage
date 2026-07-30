import { useState, useEffect, useCallback } from 'react'
import MainLayout from '../components/layout/MainLayout'
import ProductCard from '../components/products/ProductCard'
import { useInView } from '../hooks/useInView'
import { productService } from '../services/product.service'
import type { Categorie, Produit } from '../types/product'
import Spinner from '../components/ui/Spinner'
import Select from '../components/ui/Select'

/* ── Newsletter ── */
function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [ref, isInView] = useInView(0.1)
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`bg-sage-deep py-16 md:py-section-gap relative overflow-hidden transition-all duration-1000 ease-out ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-margin-desktop relative z-10 text-center">
        <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-white mb-4">
          Restez en Harmonie
        </h2>
        <p className="font-body-lg text-body-lg text-on-primary-container mb-8 max-w-xl mx-auto">
          Inscrivez-vous à notre newsletter pour recevoir des conseils bien-être et des offres
          exclusives sur nos nouveaux produits.
        </p>
        <form
          onSubmit={(e) => { e.preventDefault(); setEmail('') }}
          className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
        >
          <input
            type="email" required value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email"
            className="flex-grow px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 font-body-md text-body-md"
          />
          <button type="submit" className="px-7 py-3.5 bg-white text-sage-deep font-label-md text-label-md rounded-full hover:bg-sand-light transition-all uppercase tracking-widest font-bold whitespace-nowrap">
            S'abonner
          </button>
        </form>
      </div>
    </section>
  )
}

/* ── Page principale ── */
export default function Products() {
  const [categories, setCategories] = useState<Categorie[]>([])
  const [produits, setProduits]     = useState<Produit[]>([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState<string | null>(null)
  const [activeCatId, setActiveCatId] = useState<string | null>(null)
  const [search, setSearch]         = useState('')
  const [tri, setTri]               = useState<'recent' | 'prix_asc' | 'prix_desc' | 'avis_desc'>('recent')
  const [page, setPage]             = useState(1)
  const [pages, setPages]           = useState(1)
  const [total, setTotal]           = useState(0)
  const [filtersOpen, setFiltersOpen] = useState(false) // mobile filters panel

  useEffect(() => { document.title = 'Boutique | Ben Massage & Wellness Gabon' }, [])

  const loadCategories = useCallback(async () => {
    try {
      const res = await productService.getCategories()
      setCategories(res.data)
    } catch { /* silent */ }
  }, [])

  const loadProduits = useCallback(async () => {
    setLoading(true); setError(null)
    try {
      const res = await productService.listProduits({
        categorie_id: activeCatId ?? undefined,
        recherche:    search || undefined,
        tri, page, limite: 12,
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

        {/* ══════════════════════════════
            HERO + SEARCH
        ══════════════════════════════ */}
        <section className="max-w-container-max mx-auto px-4 sm:px-6 md:px-margin-desktop pt-8 pb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-outline-variant pb-6 mb-6">
            <div className="max-w-2xl">
              <h1 className="font-display-lg text-2xl sm:text-3xl md:text-display-lg text-sage-deep mb-2">
                Sanctuaire de Bien-être
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant text-sm md:text-base">
                Découvrez notre sélection de produits naturels pour prolonger votre expérience thérapeutique.
              </p>
              {total > 0 && !loading && (
                <p className="font-caption text-caption text-outline mt-1 text-xs">
                  {total} produit{total > 1 ? 's' : ''} trouvé{total > 1 ? 's' : ''}
                </p>
              )}
            </div>

            {/* Barre de recherche */}
            <div className="relative w-full md:w-80">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
              <input
                type="text" value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un produit..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-outline-variant/40 rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-body-md text-sm"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-error">
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
            </div>
          </div>

          {/* ── Filtres catégories + tri ── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

            {/* Mobile : bouton filtre + tri en ligne */}
            <div className="flex items-center gap-2 sm:hidden">
              <button
                onClick={() => setFiltersOpen(v => !v)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-label-md text-sm border transition-all ${
                  filtersOpen || activeCatId
                    ? 'bg-primary text-white border-primary'
                    : 'border-outline-variant text-on-surface-variant bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">filter_list</span>
                {activeCatId ? categories.find(c => c.id === activeCatId)?.nom ?? 'Filtrer' : 'Catégorie'}
                {activeCatId && (
                  <span
                    className="material-symbols-outlined text-[14px]"
                    onClick={e => { e.stopPropagation(); setActiveCatId(null) }}
                  >close</span>
                )}
              </button>
              <div className="flex-1">
                <Select
                  value={tri}
                  onChange={(v) => setTri(v as any)}
                  options={[
                    { value: 'recent',    label: 'Récents'      },
                    { value: 'avis_desc', label: 'Mieux notés'  },
                    { value: 'prix_asc',  label: 'Prix ↑'       },
                    { value: 'prix_desc', label: 'Prix ↓'       },
                  ]}
                />
              </div>
            </div>

            {/* Mobile : panneau catégories dépliable */}
            {filtersOpen && (
              <div className="sm:hidden flex flex-wrap gap-2 pb-2">
                <button
                  onClick={() => { setActiveCatId(null); setFiltersOpen(false) }}
                  className={`px-4 py-1.5 rounded-full font-label-md text-sm transition-all ${
                    !activeCatId ? 'bg-primary text-white' : 'bg-sand-light text-on-surface-variant border border-outline-variant/30'
                  }`}
                >
                  Tous
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveCatId(cat.id); setFiltersOpen(false) }}
                    className={`px-4 py-1.5 rounded-full font-label-md text-sm transition-all ${
                      activeCatId === cat.id ? 'bg-primary text-white' : 'bg-sand-light text-on-surface-variant border border-outline-variant/30'
                    }`}
                  >
                    {cat.nom}
                  </button>
                ))}
              </div>
            )}

            {/* Desktop : catégories pills + tri */}
            <div className="hidden sm:flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCatId(null)}
                className={`px-5 py-2 rounded-full font-label-md text-sm transition-all ${
                  !activeCatId ? 'bg-primary text-white shadow-sm' : 'bg-sand-light text-on-surface-variant hover:bg-surface-container-highest border border-transparent'
                }`}
              >
                Tous les produits
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCatId(cat.id)}
                  className={`px-5 py-2 rounded-full font-label-md text-sm transition-all ${
                    activeCatId === cat.id ? 'bg-primary text-white shadow-sm' : 'bg-sand-light text-on-surface-variant hover:bg-surface-container-highest border border-transparent'
                  }`}
                >
                  {cat.nom}
                </button>
              ))}
            </div>

            {/* Desktop : tri */}
            <div className="hidden sm:block shrink-0 w-48">
              <Select
                value={tri}
                onChange={(v) => setTri(v as any)}
                options={[
                  { value: 'recent',    label: 'Plus récents'      },
                  { value: 'avis_desc', label: 'Mieux notés'       },
                  { value: 'prix_asc',  label: 'Prix : croissant'  },
                  { value: 'prix_desc', label: 'Prix : décroissant' },
                ]}
              />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
            GRILLE PRODUITS
        ══════════════════════════════ */}
        <section className="max-w-container-max mx-auto px-4 sm:px-6 md:px-margin-desktop pb-16 md:pb-section-gap">
          {loading ? (
            <div className="flex justify-center py-24">
              <Spinner size="lg" />
            </div>
          ) : error ? (
            <div className="text-center py-24">
              <span className="material-symbols-outlined text-5xl text-error mb-4 block">error_outline</span>
              <p className="font-body-lg text-body-lg text-error mb-4">{error}</p>
              <button onClick={loadProduits} className="px-6 py-3 rounded-full bg-primary text-white font-label-md hover:bg-sage-deep transition-colors">
                Réessayer
              </button>
            </div>
          ) : produits.length > 0 ? (
            <>
              {/* Grille responsive :
                  mobile (< sm)  : 2 colonnes
                  tablette (sm)  : 2 colonnes
                  tablette (md)  : 3 colonnes
                  desktop (lg+)  : 4 colonnes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-gutter">
                {produits.map((product, i) => (
                  <ProductCard key={product.id} produit={product} delay={i * 60} />
                ))}
              </div>

              {/* Pagination */}
              {pages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="flex items-center gap-1 px-4 py-2.5 rounded-full bg-sand-light disabled:opacity-40 font-label-md text-sm hover:bg-surface-container-highest transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                    <span className="hidden sm:inline">Précédent</span>
                  </button>

                  {/* Pages numériques */}
                  <div className="flex gap-1">
                    {Array.from({ length: pages }, (_, i) => i + 1)
                      .filter(p => p === 1 || p === pages || Math.abs(p - page) <= 1)
                      .reduce<(number | '...')[]>((acc, p, idx, arr) => {
                        if (idx > 0 && (arr[idx - 1] as number) + 1 < p) acc.push('...')
                        acc.push(p)
                        return acc
                      }, [])
                      .map((p, i) =>
                        p === '...'
                          ? <span key={`e${i}`} className="px-2 py-2 text-on-surface-variant text-sm">…</span>
                          : (
                            <button
                              key={p}
                              onClick={() => setPage(p as number)}
                              className={`w-9 h-9 rounded-full text-sm font-semibold transition-all ${
                                page === p ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:bg-surface-container'
                              }`}
                            >
                              {p}
                            </button>
                          )
                      )
                    }
                  </div>

                  <button
                    onClick={() => setPage(p => Math.min(pages, p + 1))}
                    disabled={page === pages}
                    className="flex items-center gap-1 px-4 py-2.5 rounded-full bg-sand-light disabled:opacity-40 font-label-md text-sm hover:bg-surface-container-highest transition-colors"
                  >
                    <span className="hidden sm:inline">Suivant</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-24">
              <span className="material-symbols-outlined text-5xl text-outline-variant mb-4 block">search_off</span>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-2">
                {search ? `Aucun produit pour "${search}"` : 'Aucun produit disponible pour le moment'}
              </p>
              {(search || activeCatId) && (
                <button
                  onClick={() => { setSearch(''); setActiveCatId(null) }}
                  className="mt-4 text-primary font-label-md hover:underline"
                >
                  Réinitialiser les filtres
                </button>
              )}
            </div>
          )}
        </section>

        <NewsletterSection />
      </main>
    </MainLayout>
  )
}
