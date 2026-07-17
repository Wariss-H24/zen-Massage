import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'

/* ── Types ── */
interface Review {
  initials: string
  bg: string
  name: string
  verified: boolean
  rating: number
  title: string
  body: string
  date: string
  helpful: number
}

/* ── Data ── */
const IMAGES = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBx3Am1b4NXlKZunsJr0XUo3CDp7JWQ_J79ntsGFtXqVvxVNbkeHEu5RrYHtvDELBPWTzcssrLiI1jStFVD5bEXr4esdMM6mJXHHLeR1Pkgw69NY-BqSU1X9ulwrHxRGpQ41K91vRNpQzY2IrRXtVMfhJmqpZLnPwQ4oeCN2SEqfUPwXqX8JSaq7Tjz3qgejrVO-f7a6iG2W7v9kYdQLIzzxFf2C9pH9dMQgiuGedu0idKoxgs6SUTAdA',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAL_PgyNlnuCBuQmiHaMValSZ4mMaAi9qj581PgRpzkbuIELk_vdEs2-iu4x2dxLv13bz3pdY1JoXJv5Lh54TKJ6-SjV5HenGESL1Kx7LaVfuSdKtmiygr9FEZXiSuEaUI6-zF4iBnNwnnZvZo8fMOqzL3chJRYYyrJXSP2U4xedwFgEkAFKAPJzwri8AWbPI6NF_vPq9_W6JgcUKdb2pgRzf5Eeej3wAyJS1uZ4O2t20hMxJf_tjB7uA',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCAEw1I2t-SoszqzV0MsPgUu0yGLDSXUKgkQ7Qi-hEgDlPcXv3lefF42C5t2X6fUY8_1Tih40biKYhQ6mBRSrkff2V0cffLQmnkKg7VPiFPueQoXzQO6LTibmNLsu7_mkNbANF3NR3MUSES14ioROst3nSBu5BpEURgzDeZT-gOq40IDyFH8c019l8IsMuUIchvVCQibDbOWd0AeaArnkA290LOU5XnRev_A7bE6XZXlULEOwkisddrOg',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAx38u8BF1GrKsw_a2hduPAApaJMBLT5iJselSProrahc9rSZdSophBuLCsNVGJOjIjkChGm-VzcDlooP7TyvijliVxaOOuFIcQzVcnoA6Fg0-RNFcJ-VLOdFQ0L5c6y_XY2PSMzlNRKPWUrRK7V72zjngHMsIjkagmJ7hYFfs-XnPTaE8rBF8opsibb-2L0SX0poKMGhTa0K14a2oH8owxSgEuYsCycEW33oyIH1WGBV2rTgrWMUM4LQ',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBNtY-tIvDy2Kdv7Ulxg0TKlYRauOi4YZDqGsl10c9f7njY4MYbLSd_cM_ncJVUVJP4dwxAmR5203ZjUB8EbPAdwqYUjyw1L2BrJ2dwDXcUkF2x6fluuA47QdAZNkQV0GZcj-y8cS0h69gcMXJBsS84__6DeJ1sUIw0gqVY9NSznc4vVWVZKJCEcwj0KPp4vF9O78oQcQQddSydDvo-zq1YAjKAkT_EsMfTeZGiT19u1PeIBj7mNXTygQ',
]

const FEATURES = [
  '100% Naturel & Bio',
  'Propriétés anti-stress',
  'Hydratation 24h',
  'Artisanat Local',
]

const REVIEWS: Review[] = [
  {
    initials: 'EM', bg: 'bg-secondary-fixed',
    name: 'Elsa M.', verified: true, rating: 5,
    title: 'Un voyage olfactif incroyable',
    body: "Cette huile est devenue mon rituel du soir. L'odeur est apaisante sans être entêtante. Je l'utilise après ma douche et ma peau est incroyablement douce au réveil.",
    date: 'Il y a 3 jours', helpful: 12,
  },
  {
    initials: 'KB', bg: 'bg-primary-fixed',
    name: 'Kevin B.', verified: true, rating: 4,
    title: 'Très bon produit local',
    body: "Fier de voir un produit de cette qualité fabriqué chez nous. Le packaging est superbe et l'huile de très bonne facture. Seul bémol, le flacon se finit trop vite !",
    date: 'Il y a 1 semaine', helpful: 8,
  },
]

const RELATED = [
  { name: 'Bougie Forêt Équatoriale', price: '18 500 FCFA', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkUhWOTSrtUDUovRP0on8dOt6mDBbKRdS4nXJHZJ-9KTj7qSaziyF5ty-4CFkx8gdVq3_KLdvt5dO0P7jlVPC9CoYzXPGFEFbDGHZY5bIbMdaUx0MkZGPxny61dW5ZbEmxJbZc_LDi5JXCVd_gAt-PO8YOJ5Qj9kvf8-K-NAwWiHL_uDgbvzpq6TV0AUo3glVYv4pTeuTqDS353LgjU6QoBFGuxtiaIvYQSiqrY9WyGL4SJ6hSXqm3Zw' },
  { name: 'Tisane Détox Tropicale',    price: '12 000 FCFA', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdBLVU6kx931LUVx2gP322_TENmynJ2kkdVhHQ3dn7rVcJ5TFsfL1I6-JussTteJb9uLMfT2kjluryG_FdRRLLjfvgVJWfEvAJqusy0ImNoZQqyJotruNSWJ73Cby_WMibLBe4iE5lwpEN4Fi_oLBFRT4CKB92cqKYt383S8MZbtXCpxjWsUAJ42BIuTENobraHN6L-iYTB2I4sn-yl0yIft4kJ5JkMLE-3bt0HOXJt8OS-0CBQuDFwA' },
  { name: 'Kit Massage Pierre Noire',  price: '35 000 FCFA', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2zzSxRgVbxfhodBLyYweg17r7BEmsserSGgTf_0wa78-NQKbUwytR527Efw-8u_HDPZNAzq1gCKb9Ap_4ThLQM-8KBV0IAtWZTfX_QFnfhZizqd9R-VTXceCYJhKFN08K7DiiNJMnPSvGyTVYTZiLPKUz2keF8J7Ex_lz7FPyLCM6CAnQRKfFg9SYaPNMSzb7VPt7W2J8nRCugNcMu_G7TPNy4VCOCSf45fW_9kxXfxthCwsWuGmV5A' },
  { name: 'Sels de Bain des Lagunes', price: '15 500 FCFA', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ02fe2M0WazTfK5SQj181zpt3VVE3rMgTNNOu45hCXGdcOI17YmDfyeDN43ObNhS4e7L8EqkwazPiNoR7zCHqgNE39awvADH81ivDDApGsC3TFpjmwCuABrIbRJAZzW7bDhtnKWt9qa-sL_BvRcrU4sprA4TJ9M5Z1zUarSwj1mFVtREDnyK7gG6nLLjsNk6ScBMPBRE1XQXV4FbOsV1-Pko4rPvrzgONZBSbSJgAgxROdWhWzKmE8Q' },
]

/* ── Stars ── */
function Stars({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'xs' }) {
  const px = size === 'sm' ? 'text-sm' : 'text-xs'
  return (
    <div className={`flex text-[#D4AF37] ${px}`}>
      {[1, 2, 3, 4, 5].map(i => (
        <span
          key={i}
          className="material-symbols-outlined"
          style={{ fontVariationSettings: `'FILL' ${i <= rating ? 1 : i - 0.5 <= rating ? 0.5 : 0}`, fontSize: 'inherit' }}
        >
          star
        </span>
      ))}
    </div>
  )
}

/* ── Page ── */
export default function ProductDetail() {
  const navigate = useNavigate()
  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [liked, setLiked] = useState(false)
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)

  useEffect(() => {
    document.title = "Huile d'Éveil de l'Okoumé | Ben Massage & Wellness"
  }, [])

  const toggleAccordion = (key: string) =>
    setOpenAccordion(v => (v === key ? null : key))

  const handleAddToCart = () => navigate('/checkout')

  return (
    <MainLayout>
      <main className="pt-8 pb-section-gap px-4 md:px-margin-desktop max-w-container-max mx-auto">

        {/* ── Breadcrumb ── */}
        <nav className="flex items-center gap-2 mb-8 text-on-surface-variant font-label-md text-caption overflow-x-auto whitespace-nowrap">
          <Link to="/products" className="hover:text-primary transition-colors">Boutique</Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="hover:text-primary cursor-pointer transition-colors">Huiles essentielles</span>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-primary font-semibold">Huile d'Éveil de l'Okoumé</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* ── Galerie bento ── */}
          <div className="lg:col-span-7 grid grid-cols-4 gap-3">
            {/* Image principale */}
            <div className="col-span-4 aspect-[4/5] relative rounded-2xl overflow-hidden bg-sand-light group cursor-zoom-in">
              <img
                src={IMAGES[activeImg]}
                alt="Huile d'Éveil de l'Okoumé"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full font-label-md text-caption text-sage-deep">
                Extraction Durable
              </div>
            </div>

            {/* Miniatures */}
            {IMAGES.slice(0, 4).map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`col-span-1 aspect-square rounded-xl overflow-hidden bg-sand-light border-2 transition-all ${
                  activeImg === i ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                {i === 3 && IMAGES.length > 4 ? (
                  <div className="relative w-full h-full">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white font-bold text-sm">
                      +{IMAGES.length - 4}
                    </div>
                  </div>
                ) : (
                  <img src={img} alt="" className="w-full h-full object-cover" />
                )}
              </button>
            ))}
          </div>

          {/* ── Infos produit ── */}
          <div className="lg:col-span-5 flex flex-col">

            {/* Badge + titre */}
            <span className="inline-flex items-center px-3 py-1 rounded-full font-label-md text-caption bg-primary-fixed text-on-primary-fixed-variant mb-3 w-fit">
              Best-seller
            </span>
            <h1 className="font-headline-md text-headline-md text-sage-deep mb-3 leading-tight">
              Huile d'Éveil de l'Okoumé
            </h1>

            {/* Note + stock */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Stars rating={4.5} />
                <span className="font-label-md text-caption text-on-surface-variant">(48 avis)</span>
              </div>
              <div className="h-4 w-px bg-outline-variant" />
              <div className="flex items-center gap-1.5 text-status-confirmed font-label-md text-caption">
                <span className="material-symbols-outlined text-sm">inventory_2</span>
                En Stock
              </div>
            </div>

            {/* Prix */}
            <div className="mb-8">
              <span className="font-headline-sm text-headline-sm text-primary block">24 500 FCFA</span>
              <p className="font-caption text-caption text-on-surface-variant mt-1 italic">
                Livraison gratuite au Gabon pour toute commande supérieure à 50 000 FCFA
              </p>
            </div>

            {/* Description */}
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
              Inspirée des rituels ancestraux du bassin du Congo, cette huile précieuse extraite de la résine
              d'Okoumé gabonais est un véritable élixir de vitalité. Sa texture soyeuse pénètre instantanément
              pour apaiser l'esprit et régénérer la barrière cutanée, laissant un sillage boisé et mystique.
            </p>

            {/* Features */}
            <ul className="grid grid-cols-2 gap-y-2 gap-x-4 mb-8">
              {FEATURES.map(f => (
                <li key={f} className="flex items-center gap-2 font-label-md text-label-md">
                  <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            {/* Quantité + Panier */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-outline-variant rounded-xl h-14 px-4 bg-white gap-2">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="hover:text-primary transition-colors p-1"
                  >
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <span className="w-10 text-center font-bold font-body-md">{qty}</span>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    className="hover:text-primary transition-colors p-1"
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 h-14 bg-primary text-white rounded-xl font-label-md text-label-md flex items-center justify-center gap-3 hover:bg-sage-deep transition-all active:scale-95 shadow-md"
                >
                  <span className="material-symbols-outlined">shopping_cart</span>
                  Ajouter au Panier
                </button>
              </div>

              <button
                onClick={() => setLiked(v => !v)}
                className="w-full h-14 border-2 border-primary text-primary rounded-xl font-label-md text-label-md flex items-center justify-center gap-3 hover:bg-primary-fixed transition-all"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: `'FILL' ${liked ? 1 : 0}`, color: liked ? '#ba1a1a' : undefined }}
                >
                  favorite
                </span>
                {liked ? 'Retiré des favoris' : 'Ajouter aux favoris'}
              </button>
            </div>

            {/* Accordéons */}
            <div className="mt-8 pt-8 border-t border-outline-variant space-y-0">
              {[
                {
                  key: 'ingredients',
                  label: 'Ingrédients Complets',
                  content: (
                    <p className="text-sm text-on-surface-variant leading-loose">
                      Aucoumea Klaineana (Okoumé) Resin Extract, Simmondsia Chinensis (Jojoba) Seed Oil*,
                      Santalum Album (Sandalwood) Oil, Tocopherol (Vitamin E), Limonene, Linalool.{' '}
                      <span className="text-primary font-medium block mt-2">*Ingrédients issus de l'agriculture biologique.</span>
                    </p>
                  ),
                },
                {
                  key: 'usage',
                  label: "Conseils d'utilisation",
                  content: (
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      Appliquer quelques gouttes sur les points de pulsation (poignets, tempes, cou) ou mélanger
                      à votre crème de corps habituelle pour une expérience sensorielle amplifiée. Parfait pour
                      une séance de méditation ou de massage relaxant.
                    </p>
                  ),
                },
              ].map(({ key, label, content }) => (
                <div key={key} className="border-b border-outline-variant/50">
                  <button
                    onClick={() => toggleAccordion(key)}
                    className="w-full flex justify-between items-center py-4 font-label-md text-label-md text-on-surface hover:text-primary transition-colors"
                  >
                    <span>{label}</span>
                    <span
                      className="material-symbols-outlined transition-transform duration-300"
                      style={{ transform: openAccordion === key ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                      expand_more
                    </span>
                  </button>
                  {openAccordion === key && (
                    <div className="pb-4">{content}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Section Avis ── */}
        <section className="mt-section-gap">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="font-headline-md text-headline-md text-sage-deep mb-2">Avis de la Communauté</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">48 clients ont partagé leur expérience.</p>
            </div>

            {/* Score global */}
            <div className="flex items-center gap-8 bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/30">
              <div className="text-center">
                <span className="font-headline-md text-headline-md text-primary block">4.8</span>
                <Stars rating={5} size="xs" />
              </div>
              <div className="hidden sm:block space-y-1.5 w-44">
                {[{ n: 5, w: '85%' }, { n: 4, w: '10%' }, { n: 3, w: '5%' }].map(({ n, w }) => (
                  <div key={n} className="flex items-center gap-2">
                    <span className="font-label-md text-caption w-3">{n}</span>
                    <div className="flex-1 h-1.5 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: w }} />
                    </div>
                  </div>
                ))}
              </div>
              <button className="bg-primary-fixed text-on-primary-fixed-variant px-5 py-2.5 rounded-full font-label-md text-label-md hover:bg-primary hover:text-white transition-colors">
                Écrire un avis
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {REVIEWS.map(r => (
              <div key={r.name} className="bg-white p-8 rounded-2xl border border-outline-variant/30 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full ${r.bg} flex items-center justify-center font-bold text-on-surface`}>
                      {r.initials}
                    </div>
                    <div>
                      <h4 className="font-label-md text-label-md">{r.name}</h4>
                      {r.verified && (
                        <span className="font-caption text-caption text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-status-confirmed" style={{ fontSize: 14, fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                          Achat Vérifié
                        </span>
                      )}
                    </div>
                  </div>
                  <Stars rating={r.rating} size="xs" />
                </div>
                <h5 className="font-semibold font-body-md mb-3 text-sage-deep">{r.title}</h5>
                <p className="font-body-md text-body-md text-on-surface-variant flex-grow">{r.body}</p>
                <div className="mt-6 pt-6 border-t border-outline-variant/20 flex items-center gap-4 font-caption text-caption text-on-surface-variant">
                  <span>{r.date}</span>
                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>thumb_up</span>
                    Utile ({r.helpful})
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button className="font-label-md text-label-md text-primary border-b-2 border-primary pb-1 hover:text-sage-deep hover:border-sage-deep transition-all">
              Afficher tous les avis
            </button>
          </div>
        </section>

        {/* ── Produits similaires ── */}
        <section className="mt-section-gap">
          <h2 className="font-headline-md text-headline-md text-sage-deep mb-8">Complétez votre rituel</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-gutter">
            {RELATED.map(p => (
              <Link key={p.name} to="/products" className="group">
                <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-sand-light">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-label-md text-label-md text-sage-deep mb-1">{p.name}</h3>
                <p className="font-body-md text-body-md text-primary font-bold">{p.price}</p>
              </Link>
            ))}
          </div>
        </section>

      </main>
    </MainLayout>
  )
}
