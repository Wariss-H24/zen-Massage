import { useState, useEffect, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import { productService } from '../services/product.service'
import { reviewService } from '../services/review.service'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import type { ProduitDetail } from '../types/product'
import type { Review, ReviewStats } from '../types/review'
import Spinner from '../components/ui/Spinner'
import Toast from '../components/ui/Toast'
import Select from '../components/ui/Select'

function Stars({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'xs' }) {
  const r = Math.round(rating * 2) / 2
  const px = size === 'sm' ? 'text-sm' : 'text-xs'
  return (
    <div className={`flex text-[#D4AF37] ${px}`}>
      {[1, 2, 3, 4, 5].map(i => (
        <span
          key={i}
          className="material-symbols-outlined"
          style={{ fontVariationSettings: `'FILL' ${i <= r ? 1 : i - 0.5 <= r ? 0.5 : 0}`, fontSize: 'inherit' }}
        >
          star
        </span>
      ))}
    </div>
  )
}

function formatPrice(prix: number) {
  return `${prix.toLocaleString('fr-FR')} FCFA`
}

function formatDate(dateStr: string) {
  try {
    const d = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - d.getTime()
    const diffJours = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    if (diffJours === 0) return "Aujourd'hui"
    if (diffJours === 1) return 'Hier'
    if (diffJours < 7) return `Il y a ${diffJours} jours`
    if (diffJours < 30) return `Il y a ${Math.floor(diffJours / 7)} sem.`
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
  } catch {
    return ''
  }
}

function getInitials(first?: string, last?: string) {
  return `${(first || '').slice(0, 1)}${(last || '').slice(0, 1)}`.toUpperCase() || 'U'
}

const BG_COLORS = ['bg-secondary-fixed', 'bg-primary-fixed', 'bg-tertiary-fixed', 'bg-error-container']

const REVIEW_PAGE_SIZE = 5

type ReviewSortKey = 'recent' | 'note_desc' | 'note_asc'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const { addItem } = useCart()
  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  const [data, setData] = useState<ProduitDetail | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [reviewsTotal, setReviewsTotal] = useState(0)
  const [reviewsPage, setReviewsPage] = useState(1)
  const [reviewsPages, setReviewsPages] = useState(1)
  const [reviewsSort, setReviewsSort] = useState<ReviewSortKey>('recent')
  const [loadingReviews, setLoadingReviews] = useState(false)
  const [stats, setStats] = useState<ReviewStats | null>(null)
  const [related, setRelated] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; msg: string } | null>(null)

  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewForm, setReviewForm] = useState({ note: 5, titre: '', contenu: '' })
  const [submittingReview, setSubmittingReview] = useState(false)

  /* ---- Chargement ---- */
  const loadReviews = useCallback(async () => {
    if (!id) return
    setLoadingReviews(true)
    try {
      const res = await reviewService.listProductReviews(id, {
        limite: REVIEW_PAGE_SIZE,
        page: reviewsPage,
        tri: reviewsSort,
      })
      setReviews(prev => (reviewsPage === 1 ? res.data.avis : [...prev, ...res.data.avis]))
      setReviewsTotal(res.data.total)
      setReviewsPages(res.data.pages)
    } catch {
      setToast({ type: 'error', msg: 'Impossible de charger les avis.' })
    } finally {
      setLoadingReviews(false)
    }
  }, [id, reviewsPage, reviewsSort])

  const loadData = useCallback(async () => {
    if (!id) return
    setLoading(true)
    setError(null)
    try {
      const [detailRes, statsRes] = await Promise.all([
        productService.getProduit(id),
        reviewService.getProductStats(id),
      ])
      setData(detailRes.data)
      setStats(statsRes.data)
      document.title = `${detailRes.data.produit.nom} | Ben Massage & Wellness`

      if (user) {
        try {
          const likeStatusRes = await productService.getLikeStatus(id)
          setLiked(likeStatusRes.data.liked)
        } catch { /* non connecté ok */ }
      }
      const likeCountRes = await productService.getLikesCount(id)
      setLikeCount(likeCountRes.data.count)

      try {
        const relatedRes = await productService.listProduits({
          categorie_id: detailRes.data.produit.categorie_id,
          limite: 4,
          tri: 'populaire',
        })
        setRelated(relatedRes.data.produits.filter(p => p.id !== id).slice(0, 4))
      } catch {
        setRelated([])
      }
    } catch (err: any) {
      setError(err.message || 'Erreur de chargement')
    } finally {
      setLoading(false)
    }
  }, [id, user])

  useEffect(() => { loadData() }, [loadData])
  useEffect(() => { loadReviews() }, [loadReviews])
  useEffect(() => { setReviewsPage(1) }, [reviewsSort])

  /* ---- Actions ---- */
  const toggleLike = async () => {
    if (!user) {
      setToast({ type: 'info', msg: 'Connectez-vous pour aimer ce produit' })
      return
    }
    try {
      const res = await productService.toggleLike(id!)
      setLiked(res.data.liked)
      setLikeCount(res.data.count)
    } catch (err: any) {
      setToast({ type: 'error', msg: err.message })
    }
  }

const handleAddToCart = () => {
    if (!data || !data.produit || data.produit.stock <= 0) return
    addItem({
      id: data.produit.id,
      nom: data.produit.nom,
      prix: data.produit.prix,
      image: data.produit.images?.[0] || '',
      stock: data.produit.stock,
    }, qty)
    setToast({ type: 'success', msg: `${qty} article(s) ajouté(s) au panier !` })
  }

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      setToast({ type: 'info', msg: 'Connectez-vous pour laisser un avis' })
      return
    }
    setSubmittingReview(true)
    try {
      await reviewService.createReview({ ...reviewForm, produit_id: id! })
      setToast({ type: 'success', msg: 'Merci pour votre avis !' })
      setReviewForm({ note: 5, titre: '', contenu: '' })
      setShowReviewForm(false)
      setReviewsPage(1)
      loadReviews()
      loadData()
    } catch (err: any) {
      setToast({ type: 'error', msg: err.message })
    } finally {
      setSubmittingReview(false)
    }
  }

  async function handleVoteUtile(review: Review, utile: boolean) {
    if (!user) {
      setToast({ type: 'info', msg: 'Connectez-vous pour voter' })
      return
    }
    try {
      const res = await reviewService.voteUtile(review.id, utile)
      setReviews(prev =>
        prev.map(r => r.id === review.id ? { ...r, utiles: res.data.utiles, mon_vote: res.data.mon_vote } : r)
      )
    } catch (e: any) {
      setToast({ type: 'error', msg: e.message || 'Impossible de voter.' })
    }
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      </MainLayout>
    )
  }
  if (error || !data) {
    return (
      <MainLayout>
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
          <span className="material-symbols-outlined text-6xl text-error mb-4">error_outline</span>
          <p className="font-body-lg text-body-lg text-error mb-6">{error || 'Produit introuvable'}</p>
          <Link to="/products" className="px-6 py-3 rounded-full bg-primary text-white font-label-md hover:bg-sage-deep transition-colors">
            Retour à la boutique
          </Link>
        </div>
      </MainLayout>
    )
  }

  const p = data.produit
  const images = p.images?.length ? p.images : ['']
  const moyenne = data.moyenne
  const stockOk = p.stock > 0
  const stockBadge = (() => {
    if (p.stock <= 0) return { label: 'Rupture de stock', className: 'bg-error text-white' }
    if (p.stock <= 3) return { label: `Stock faible (${p.stock})`, className: 'bg-amber-500/90 text-white' }
    return { label: 'En Stock', className: 'bg-status-confirmed/10 text-status-confirmed border border-status-confirmed/30' }
  })()
  const thumbnails = images.slice(0, 4)

  return (
    <MainLayout>
      {toast && <Toast type={toast.type} message={toast.msg} onClose={() => setToast(null)} />}

      <main className="pt-8 pb-section-gap px-4 md:px-margin-desktop max-w-container-max mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-8 text-on-surface-variant font-label-md text-caption overflow-x-auto whitespace-nowrap">
          <Link to="/products" className="hover:text-primary transition-colors">Boutique</Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          {p.categorie?.nom && (
            <>
              <span className="hover:text-primary cursor-pointer transition-colors">{p.categorie.nom}</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </>
          )}
          <span className="text-primary font-semibold">{p.nom}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Galerie bento */}
          <div className="lg:col-span-7 grid grid-cols-4 gap-3">
            <div className="col-span-4 aspect-[4/5] relative rounded-2xl overflow-hidden bg-sand-light group cursor-zoom-in">
              <img
                src={images[activeImg]}
                alt={p.nom}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {likeCount > 0 && (
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full font-label-md text-caption flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-error" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                  {likeCount}
                </div>
              )}
            </div>

            {thumbnails.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`col-span-1 aspect-square rounded-xl overflow-hidden bg-sand-light border-2 transition-all ${
                  activeImg === i ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                {img ? (
                  <img src={img} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-outline font-caption">
                    N/A
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Infos produit */}
          <div className="lg:col-span-5 flex flex-col">

            <div className="flex items-start justify-between gap-4 mb-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full font-label-md text-caption bg-primary-fixed text-on-primary-fixed-variant">
                {p.categorie?.nom || 'Produit'}
              </span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-label-md text-caption ${stockBadge.className}`}>
                <span className="material-symbols-outlined text-[16px]">{stockOk ? (p.stock <= 3 ? 'warning' : 'check_circle') : 'cancel'}</span>
                {stockBadge.label}
              </span>
            </div>
            <h1 className="font-headline-md text-headline-md text-sage-deep mb-3 leading-tight">
              {p.nom}
            </h1>

            {/* Note */}
            <div className="flex items-center gap-2 mb-6">
              <Stars rating={moyenne} />
              <span className="font-label-md text-caption text-on-surface-variant">
                {moyenne.toFixed(1)} ({stats?.total ?? 0} avis)
              </span>
            </div>

            {/* Prix */}
            <div className="mb-8">
              <span className="font-headline-sm text-headline-sm text-primary block">{formatPrice(p.prix)}</span>
              <p className="font-caption text-caption text-on-surface-variant mt-1 italic">
                Livraison gratuite au Gabon pour toute commande supérieure à 50 000 FCFA
              </p>
            </div>

            {/* Description */}
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
              {p.description}
            </p>

            {/* Quantité + Panier */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-outline-variant rounded-xl h-14 px-4 bg-white gap-2">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="hover:text-primary transition-colors p-1"
                    disabled={!stockOk}
                  >
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <span className="w-10 text-center font-bold font-body-md">{qty}</span>
                  <button
                    onClick={() => setQty(q => Math.min(p.stock || 99, q + 1))}
                    className="hover:text-primary transition-colors p-1"
                    disabled={!stockOk}
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={!stockOk}
                  className="flex-1 h-14 bg-primary text-white rounded-xl font-label-md text-label-md flex items-center justify-center gap-3 hover:bg-sage-deep transition-all active:scale-95 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined">shopping_cart</span>
                  {stockOk ? 'Ajouter au Panier' : 'Indisponible'}
                </button>
              </div>

              <button
                onClick={toggleLike}
                className="w-full h-14 border-2 border-primary text-primary rounded-xl font-label-md text-label-md flex items-center justify-center gap-3 hover:bg-primary-fixed transition-all"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: `'FILL' ${liked ? 1 : 0}`, color: liked ? '#ba1a1a' : undefined }}
                >
                  favorite
                </span>
                {liked
                  ? likeCount > 1
                    ? `Vous et ${likeCount - 1} autre${likeCount - 1 > 1 ? 's' : ''} aimez ce produit`
                    : 'Vous aimez ce produit'
                  : likeCount > 0
                    ? `${likeCount} personne${likeCount > 1 ? 's aiment' : ' aime'} ce produit`
                    : 'Ajouter aux favoris'
                }
              </button>
            </div>

            {/* Livraison */}
            <div className="mt-8 pt-8 border-t border-outline-variant space-y-3">
              <div className="flex items-center gap-2 text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px] text-sage-deep">local_shipping</span>
                <span className="font-label-md text-label-md text-on-surface">Livraison</span>
              </div>
              <ul className="space-y-2 pl-1">
                <li className="flex items-start gap-2 font-body-md text-body-md text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-primary mt-0.5">check</span>
                  Libreville — livraison sous 24 à 48h, frais : 3 000 FCFA
                </li>
                <li className="flex items-start gap-2 font-body-md text-body-md text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-primary mt-0.5">check</span>
                  Province (Port-Gentil, Franceville, Oyem…) — 3 à 5 jours, frais : 5 000 FCFA
                </li>
                <li className="flex items-start gap-2 font-body-md text-body-md text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-primary mt-0.5">check</span>
                  Livraison offerte dès 50 000 FCFA d'achat
                </li>
                <li className="flex items-start gap-2 font-body-md text-body-md text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-primary mt-0.5">check</span>
                  Paiement à la livraison uniquement
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section Avis */}
        <section className="mt-section-gap">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h2 className="font-headline-md text-headline-md text-sage-deep mb-2">Avis de la Communauté</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {stats?.total ?? 0} client{stats?.total && stats.total > 1 ? 's' : ''} ont partagé leur expérience.
              </p>
            </div>

            <div className="flex items-center gap-8 bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/30">
              <div className="text-center">
                <span className="font-headline-md text-headline-md text-primary block">
                  {moyenne ? moyenne.toFixed(1) : '—'}
                </span>
                <Stars rating={moyenne} size="xs" />
              </div>
              <div className="hidden sm:block space-y-1.5 w-44">
                {[5, 4, 3, 2, 1].map(n => {
                  const count = stats?.distribution?.[n] ?? 0
                  const total = stats?.total ?? 1
                  const w = `${Math.round((count / total) * 100)}%`
                  return (
                    <div key={n} className="flex items-center gap-2">
                      <span className="font-label-md text-caption w-3">{n}</span>
                      <div className="flex-1 h-1.5 bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: w }} />
                      </div>
                    </div>
                  )
                })}
              </div>
              <button
                onClick={() => setShowReviewForm(v => !v)}
                className="bg-primary-fixed text-on-primary-fixed-variant px-5 py-2.5 rounded-full font-label-md text-label-md hover:bg-primary hover:text-white transition-colors"
              >
                Écrire un avis
              </button>
            </div>
          </div>

          {/* Barre tri / compteur avis */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
            <div className="flex items-center gap-2 font-caption text-caption text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px] text-outline">rate_review</span>
              {reviewsTotal > 0 ? `${reviewsTotal} avis affichés` : 'Aucun avis publié'}
            </div>
            <div className="flex sm:justify-end">
              <Select
                value={reviewsSort}
                onChange={(v) => setReviewsSort(v as ReviewSortKey)}
                options={[
                  { value: 'recent',    label: 'Plus récents'   },
                  { value: 'note_desc', label: 'Mieux notés'    },
                  { value: 'note_asc',  label: 'Moins bien notés' },
                ]}
              />
            </div>
          </div>

          {showReviewForm && (
            <form onSubmit={submitReview} className="bg-white p-8 rounded-2xl border border-outline-variant/30 mb-10 max-w-2xl">
              <h3 className="font-headline-sm text-sage-deep mb-4">Votre avis</h3>
              <div className="space-y-5">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Note</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map(n => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setReviewForm(f => ({ ...f, note: n }))}
                        className="p-1"
                      >
                        <span
                          className="material-symbols-outlined text-3xl transition-colors"
                          style={{ color: n <= reviewForm.note ? '#D4AF37' : '#e0e0e0', fontVariationSettings: `'FILL' ${n <= reviewForm.note ? 1 : 0}` }}
                        >
                          star
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Titre</label>
                  <input
                    type="text"
                    required
                    value={reviewForm.titre}
                    onChange={e => setReviewForm(f => ({ ...f, titre: e.target.value }))}
                    className="w-full px-4 py-3 border border-outline-variant rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 font-body-md"
                    placeholder="Ex. Excellent produit !"
                  />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Votre avis</label>
                  <textarea
                    rows={4}
                    required
                    value={reviewForm.contenu}
                    onChange={e => setReviewForm(f => ({ ...f, contenu: e.target.value }))}
                    className="w-full px-4 py-3 border border-outline-variant rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 font-body-md resize-none"
                    placeholder="Partagez votre expérience..."
                  />
                </div>
                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="px-6 py-3 rounded-full border border-outline-variant font-label-md hover:bg-surface-container-highest transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="px-6 py-3 rounded-full bg-primary text-white font-label-md hover:bg-sage-deep transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {submittingReview && <Spinner size="sm" />}
                    Publier
                  </button>
                </div>
              </div>
            </form>
          )}

          {reviews.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {reviews.map((r, idx) => (
                  <div key={r.id} className="bg-white p-8 rounded-2xl border border-outline-variant/30 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full ${BG_COLORS[idx % BG_COLORS.length]} flex items-center justify-center font-bold text-on-surface`}>
                          {r.utilisateur.avatar ? (
                            <img src={r.utilisateur.avatar} alt="" className="w-full h-full object-cover rounded-full" />
                          ) : getInitials(r.utilisateur.firstName, r.utilisateur.lastName)}
                        </div>
                        <div>
                          <h4 className="font-label-md text-label-md">
                            {r.utilisateur.firstName} {r.utilisateur.lastName}
                          </h4>
                          <span className="font-caption text-caption text-on-surface-variant flex items-center gap-1">
                            <span className="material-symbols-outlined text-status-confirmed" style={{ fontSize: 14, fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                            Vérifié
                          </span>
                        </div>
                      </div>
                      <Stars rating={r.note} size="xs" />
                    </div>
                    <h5 className="font-semibold font-body-md mb-3 text-sage-deep">{r.titre}</h5>
                    <p className="font-body-md text-body-md text-on-surface-variant flex-grow">{r.contenu}</p>

                    {r.reponse_admin && (
                      <div className="mt-4 bg-sage-deep/5 border-l-4 border-primary p-4 rounded-r-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>support_agent</span>
                          <span className="font-label-md text-label-md text-primary">
                            {r.admin_repondant
                              ? `${r.admin_repondant.firstName} ${r.admin_repondant.lastName} · Ben Massage`
                              : 'Réponse de Ben Massage'}
                          </span>
                          {r.reponse_admin_at && (
                            <span className="font-caption text-caption text-on-surface-variant ml-auto">
                              {formatDate(r.reponse_admin_at)}
                            </span>
                          )}
                        </div>
                        <p className="font-body-md text-body-md text-on-surface-variant">{r.reponse_admin}</p>
                      </div>
                    )}

                    <div className="mt-6 pt-6 border-t border-outline-variant/20 flex items-center justify-between gap-4 flex-wrap">
                      <span className="font-caption text-caption text-on-surface-variant">{formatDate(r.createdAt)}</span>

                      <div className="flex items-center gap-2">
                        <span className="font-caption text-caption text-on-surface-variant mr-1">Utile ?</span>
                        <button
                          type="button"
                          disabled={!user}
                          title={!user ? 'Connectez-vous pour voter' : r.mon_vote === true ? 'Annuler mon vote' : 'Marquer comme utile'}
                          onClick={() => handleVoteUtile(r, true)}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-caption text-caption transition-all border ${
                            r.mon_vote === true
                              ? 'bg-primary text-white border-primary'
                              : 'border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'
                          } ${!user ? 'opacity-40 cursor-not-allowed' : ''}`}
                        >
                          <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: r.mon_vote === true ? "'FILL' 1" : "'FILL' 0" }}>thumb_up</span>
                          {r.utiles > 0 && <span className="font-bold">{r.utiles}</span>}
                        </button>
                        <button
                          type="button"
                          disabled={!user}
                          title={!user ? 'Connectez-vous pour voter' : r.mon_vote === false ? 'Annuler mon vote' : 'Marquer comme pas utile'}
                          onClick={() => handleVoteUtile(r, false)}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-caption text-caption transition-all border ${
                            r.mon_vote === false
                              ? 'bg-error text-white border-error'
                              : 'border-outline-variant text-on-surface-variant hover:border-error hover:text-error'
                          } ${!user ? 'opacity-40 cursor-not-allowed' : ''}`}
                        >
                          <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: r.mon_vote === false ? "'FILL' 1" : "'FILL' 0" }}>thumb_down</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {reviewsPage < reviewsPages && (
                <div className="flex justify-center mt-10">
                  <button
                    type="button"
                    onClick={() => setReviewsPage(p => p + 1)}
                    disabled={loadingReviews}
                    className="px-8 py-3 rounded-full border-2 border-primary text-primary font-label-md hover:bg-primary hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loadingReviews ? (
                      <>
                        <Spinner size="sm" /> Chargement…
                      </>
                    ) : (
                      <>
                        Charger plus d’avis
                        <span className="material-symbols-outlined text-[18px]">expand_more</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 bg-sand-light/30 rounded-2xl">
              <span className="material-symbols-outlined text-5xl text-outline-variant mb-3 block">rate_review</span>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Aucun avis pour le moment. Soyez le premier !
              </p>
            </div>
          )}
        </section>

        {/* Produits similaires */}
        {related.length > 0 && (
          <section className="mt-section-gap">
            <h2 className="font-headline-md text-headline-md text-sage-deep mb-8">Complétez votre rituel</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-gutter">
              {related.map(rp => (
                <Link key={rp.id} to={`/products/${rp.id}`} className="group">
                  <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-sand-light">
                    <img
                      src={rp.images?.[0] || ''}
                      alt={rp.nom}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-label-md text-label-md text-sage-deep mb-1 line-clamp-2">{rp.nom}</h3>
                  <p className="font-body-md text-body-md text-primary font-bold">{formatPrice(rp.prix)}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

      </main>
    </MainLayout>
  )
}
