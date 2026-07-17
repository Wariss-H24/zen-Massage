import { useState, useMemo, useEffect } from 'react'
import MainLayout from '../components/layout/MainLayout'
import ProductCard, { type ProductItem } from '../components/products/ProductCard'
import { useInView } from '../hooks/useInView'

/* ── Data ── */
const ALL_PRODUCTS: ProductItem[] = [
  {
    id: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBomtvWKlV7PCb8SuMOBO3DbQ8VMGE3fIqGmyI4hznlhGgvs9vtZoXzHdhIt4IvUYMo9Yonr88rASqlPOS179ovpI62rwYdpsWeNAEtNmBnkV4y7AJp7uYI_dwOkGzJNi6Op3CgBqVl02HLG4eRhUdkPvVzdUWj_aMYkdXfAjyOMvll3njP8y6h5X_BJn6CpiCkTL-LOLeFxgqh3FQcbremS9FDLyTFRwQm21kKxsR7Xg6dk7ugcOHNelKTqRzY4GyBGbBTF_xnReIc',
    badge: 'Nouveau',
    rating: 5,
    reviewCount: 48,
    name: 'Huile Essentielle Lavande Bio',
    description: 'Apaisement profond et relaxation nocturne.',
    price: '24.000 FCFA',
    category: 'Huiles essentielles',
  },
  {
    id: 2,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDf3Z7dlwjM_CbQgL68naKTTEYeL1mspCJjFnBIidfszYUOnybWAanIvPs2PQfEFTAUJDMq5LSbXGpsoHsKn7eDXf8QvG5BIhF3mNI6yM8Leqzdg_CIzzuZppICzofKQnORuXCVN9SaBLkXcLivawkXGALiCYYI2chRpmjq3NZPYX8gEg9FrCAGxE4lg3xNTuBEAu2e6kUkFuPsIJanLoiOQ_wsgHXUBCnhTxkL-D6tvbE2Wzct7OJEvhcq_yzBrSC0lqgG4g0SZGfW',
    rating: 4,
    reviewCount: 124,
    name: 'Complexe Magnésium Relax',
    description: 'Soutien musculaire et réduction du stress.',
    price: '18.500 FCFA',
    category: 'Compléments',
  },
  {
    id: 3,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBQljuO0UfenYR5jmY8JCrhIUrIBMmCyP0bOFQu1x94NZT3Hz9O3XS_O6nvSo6M8scGdFWGmIT7FJJ-NgjCRqU04JbQGEgxagEc0_MPYLoZM9S1iQ5KjN5RLsRwFRliEOYDPU0vDz81tAq9fulpD5OpQuPIfC8PECDuBj-7jQ9hLpZ9pDdRHOIdyeRFqbu9dMhPtohIOQhThudoLMu2laup-KTTznoOnGpXzJaGqvI4s5W1Y1hNJT5ylVgOgk9yuimj9qnNarcUbKz',
    rating: 5,
    reviewCount: 32,
    name: 'Diffuseur Ultrasonique Céramique',
    description: 'Design épuré pour une brume apaisante.',
    price: '45.000 FCFA',
    category: 'Accessoires',
  },
  {
    id: 4,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDv4b5LKvrWRdgmDDrD6LZB6q9NT93L0den2iDrgj6rV9ktf58xHXWi7lYYFA9puqaq1dAiaO0TBYK-LqrFOubZwreaU1vrakE4EzhZczDRGzP6_0F36ot-xLs6buoRvj8GTnM3oLGOcAAlE1DIhUDDjOJOt6AWfWmIb15_XYTutql4n0cZwkwGGncbIzasghKjyLy5ZL5BVH50I18dAzw3nvjBbGNTTVgHyj1FFzrUm7cdkkX2iEoF_tzwdFecCECtKApHrLnioey7',
    rating: 4,
    reviewCount: 89,
    name: 'Tapis de Yoga Éco-Conscient',
    description: 'Adhérence supérieure et confort naturel.',
    price: '35.000 FCFA',
    category: 'Accessoires',
  },
  {
    id: 5,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXs9BnSh60IdJ83PoQgReHv3on4OFGYDkfSs2EdgLY6fh0BB5EuhIUAkxLd8ZsYE9C5g45sBuBJeV0F49fH3pCwV_hJqd4I6BF5cfbPor0PpiZV4jh-eHa-T5ILlgfi788puh6k7h5PzHQrxKZDYoQR_3KwXcTo2XjK1gTlw3G4VMEhIMriHXaVve6ar9E8JePXg24sFOqWRvbwyC97UMToVSwCaI_k-t_mbShckXEoGKOMwxyoXrmVLn7PkOk-CioVxctFHMjGV9r',
    badge: 'Best Seller',
    rating: 5,
    reviewCount: 210,
    name: 'Huile de Forêt Équatoriale',
    description: 'Massage profond aux essences gabonaises.',
    price: '45.000 FCFA',
    category: 'Huiles essentielles',
  },
  {
    id: 6,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdYAZ8A90K5TfL9UsvsFwFn-_B4DxpwC33n3s3WENqdEmAuOtqTL7EgGzGWK4PxQh3yWCBbofumnAq1vhjuwOmuAkCuXeS4FFJ78Jp-b79HEYo3WD9q5ZzV-bAwvXpVP7yAjTUHvRVIRKXE93v0qexww1p9WrYg99dGAUiQhHfExJIJI5_wW3YxUdmj6PelJc2lByu21H9TITKPagwoiTc2ALBp5ySc0aEiUSTdiSirzsMYcy9QA-7kfZIiLwFU0t7Cz7gCZM__Q4q',
    rating: 4,
    reviewCount: 67,
    name: "Infusion 'Nuit au Gabon'",
    description: 'Tisane relaxante aux plantes tropicales.',
    price: '12.500 FCFA',
    category: 'Compléments',
  },
  {
    id: 7,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRfYMoKCTk6ip3-OLrFv8pzN_U3piA4j0JTeY1RtcBXEAy8_jTcNOXB4fkcXwgSiHJ69MyGYx7iu4PFvkkCATDyCIRUygVi7Q0q4O0_6w7jw5v3w52wHe3SGPzJIF2Pv9QXtS1IiTMQzqNUpmzzV7vIQU-_EMI-_RkhFQU_0FOzuognyKSvL4dyTKKM9dK88XxcFc4sSoX8unDfmIWXa4rbZmVkMNyNJxA_cty4YW_cusEXvbnU4DqrGYZsmBn1XhT4o2mBwP3sKAu',
    rating: 5,
    reviewCount: 44,
    name: 'Coffret Pierres Chaudes',
    description: 'Kit complet pour massage aux pierres volcaniques.',
    price: '65.000 FCFA',
    category: 'Accessoires',
  },
  {
    id: 8,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgtGb5ymu2-5MeKMziYnkK1-OVzt80xvs-DL8Hf6Bs9SBAv53YrlnVEkWzQEswxJLn0MY_N08At42YZwt5Nt2cfMPlCXP_nXvp80ojAWC0-F9O7pwyXOgxbMpixDdnjyX61N4SymTbZHgVW44gnGie-h_m0ePlhlkpRoKmVMYzg02ZxQxXbAJ3bD2OcJO_EWE0f98vB3snK28Gz0SyikJI2tP4fi9-WFvjYJGZbifdppBpGFzeRSBmRJNu-ZDmo4jr_qRk8gmo4vMQ',
    badge: 'Nouveau',
    rating: 4,
    reviewCount: 19,
    name: "Bougie 'Brise de l'Estuaire'",
    description: 'Cire naturelle aux fragrances marines gabonaises.',
    price: '28.000 FCFA',
    category: 'Accessoires',
  },
] satisfies ProductItem[]

const CATEGORIES = ['Tous les produits', 'Huiles essentielles', 'Compléments', 'Accessoires']

/* ── Newsletter section ── */
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

/* ── Page ── */
export default function Products() {
  const [activeCategory, setActiveCategory] = useState('Tous les produits')
  const [search, setSearch] = useState('')

  useEffect(() => {
    document.title = 'Boutique | Ben Massage & Wellness Gabon'
  }, [])

  const filtered = useMemo(() => {
    return ALL_PRODUCTS.filter((p) => {
      const matchCat = activeCategory === 'Tous les produits' || p.category === activeCategory
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [activeCategory, search])

  return (
    <MainLayout>
      <main className="min-h-screen">

        {/* ── Hero & Filters ── */}
        <section className="max-w-container-max mx-auto px-6 md:px-margin-desktop py-stack-lg">

          {/* Title + Search */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-gutter border-b border-outline-variant pb-stack-md mb-stack-lg">
            <div className="max-w-2xl">
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-sage-deep mb-2">
                Sanctuaire de Bien-être
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Découvrez notre sélection rigoureuse de produits naturels pour prolonger votre
                expérience thérapeutique à domicile.
              </p>
            </div>

            {/* Search */}
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

          {/* Category chips */}
          <div className="flex flex-wrap gap-4 mb-stack-lg">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-label-md text-label-md transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-sand-light text-on-surface-variant hover:bg-surface-container-highest border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* ── Product Grid ── */}
        <section className="max-w-container-max mx-auto px-6 md:px-margin-desktop pb-section-gap">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} delay={i * 80} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <span className="material-symbols-outlined text-5xl text-outline-variant mb-4 block">
                search_off
              </span>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Aucun produit trouvé pour "{search}"
              </p>
            </div>
          )}
        </section>

        {/* ── Newsletter ── */}
        <NewsletterSection />

      </main>
    </MainLayout>
  )
}
