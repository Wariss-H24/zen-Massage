import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import UserLayout from '../components/layout/UserLayout'
import { orderService, type Commande, type OrderStatus } from '../services/order.service'

/* ══════════════════════════════════════════
   HELPERS
══════════════════════════════════════════ */
const fmt = (n: number) => n.toLocaleString('fr-FR') + ' FCFA'

function fmtDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

/* Statuts en français */
const STATUS_FR: Record<OrderStatus, string> = {
  PENDING:   'En attente',
  CONFIRMED: 'Confirmée',
  SHIPPED:   'Expédiée',
  DELIVERED: 'Livrée',
  CANCELLED: 'Annulée',
}

const STATUS_STYLE: Record<OrderStatus, string> = {
  PENDING:   'bg-amber-50   text-amber-700  border border-amber-200',
  CONFIRMED: 'bg-blue-50    text-blue-700   border border-blue-200',
  SHIPPED:   'bg-purple-50  text-purple-700 border border-purple-200',
  DELIVERED: 'bg-green-50   text-green-700  border border-green-200',
  CANCELLED: 'bg-red-50     text-red-700    border border-red-200',
}

const STATUS_DOT: Record<OrderStatus, string> = {
  PENDING:   'bg-amber-400',
  CONFIRMED: 'bg-blue-400',
  SHIPPED:   'bg-purple-400',
  DELIVERED: 'bg-green-500',
  CANCELLED: 'bg-red-400',
}

type FilterKey = 'TOUT' | OrderStatus
const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'TOUT',      label: 'Tout'       },
  { key: 'PENDING',   label: 'En attente' },
  { key: 'CONFIRMED', label: 'Confirmée'  },
  { key: 'SHIPPED',   label: 'Expédiée'   },
  { key: 'DELIVERED', label: 'Livrée'     },
  { key: 'CANCELLED', label: 'Annulée'    },
]

/* ══════════════════════════════════════════
   SKELETON
══════════════════════════════════════════ */
function OrderSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-5 border border-outline-variant/30 animate-pulse">
      <div className="flex gap-4">
        <div className="flex -space-x-3">
          {[0, 1].map(i => <div key={i} className="w-16 h-16 rounded-xl bg-outline-variant/20 border-2 border-white" />)}
        </div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-outline-variant/20 rounded w-32" />
          <div className="h-3 bg-outline-variant/20 rounded w-24" />
          <div className="h-3 bg-outline-variant/20 rounded w-40" />
        </div>
        <div className="text-right space-y-2">
          <div className="h-5 bg-outline-variant/20 rounded w-28 ml-auto" />
          <div className="h-8 bg-outline-variant/20 rounded-full w-24 ml-auto" />
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   CARTE COMMANDE
══════════════════════════════════════════ */
function OrderCard({ order, onCancel }: { order: Commande; onCancel: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false)
  const [cancelling, setCancelling] = useState(false)

  const canCancel = order.statut === 'PENDING' || order.statut === 'CONFIRMED'

  const images = order.lignes
    .map(l => l.image || l.produit?.images?.[0])
    .filter(Boolean)
    .slice(0, 3) as string[]

  async function handleCancel() {
    if (!window.confirm(`Annuler la commande ${order.numero} ?`)) return
    setCancelling(true)
    try {
      await orderService.cancelCommande(order.id)
      onCancel(order.id)
    } catch (e: any) {
      alert(e.message || "Impossible d'annuler")
    }
    setCancelling(false)
  }

  return (
    <div className="bg-white rounded-2xl border border-outline-variant/30 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Barre colorée statut */}
      <div className={`h-1 w-full ${STATUS_DOT[order.statut]}`} />

      <div className="p-4 sm:p-5 space-y-4">

        {/* ── Ligne 1 : numéro + badge statut + date ── */}
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-sm tracking-wide text-sage-deep">{order.numero}</span>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${STATUS_STYLE[order.statut]}`}>
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS_DOT[order.statut]}`} />
              {STATUS_FR[order.statut]}
            </span>
          </div>
          <span className="text-xs text-on-surface-variant shrink-0">{fmtDate(order.createdAt)}</span>
        </div>

        {/* ── Ligne 2 : miniatures + nom articles ── */}
        <div className="flex items-start gap-3">
          {/* Miniatures */}
          <div className="flex -space-x-2 shrink-0">
            {images.length > 0
              ? images.map((img, i) => (
                  <div key={i} className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg border-2 border-white overflow-hidden shadow-sm bg-sand-light" style={{ zIndex: images.length - i }}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))
              : <div className="w-12 h-12 rounded-lg bg-sage-deep/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-sage-deep text-lg">inventory_2</span>
                </div>
            }
            {order.lignes.length > 3 && (
              <div className="w-12 h-12 rounded-lg border-2 border-white bg-surface-container flex items-center justify-center text-xs font-bold text-on-surface-variant" style={{ zIndex: 0 }}>
                +{order.lignes.length - 3}
              </div>
            )}
          </div>

          {/* Articles */}
          <div className="flex-1 min-w-0">
            <div className={`space-y-0.5 ${!expanded && order.lignes.length > 2 ? 'max-h-10 overflow-hidden' : ''}`}>
              {order.lignes.map(ligne => (
                <div key={ligne.id} className="flex items-center gap-1 text-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-[12px] text-primary shrink-0">check_small</span>
                  <span className="truncate">{ligne.nom_produit}</span>
                  <span className="shrink-0 opacity-60">× {ligne.quantite}</span>
                </div>
              ))}
            </div>
            {order.lignes.length > 2 && (
              <button onClick={() => setExpanded(v => !v)} className="mt-1 text-xs text-primary hover:underline flex items-center gap-0.5">
                {expanded ? 'Masquer' : `+${order.lignes.length - 2} articles`}
                <span className="material-symbols-outlined text-[13px]">{expanded ? 'expand_less' : 'expand_more'}</span>
              </button>
            )}
          </div>
        </div>

        {/* ── Ligne 3 : total + actions (toujours en row, wrappable) ── */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-outline-variant/20">
          {/* Total */}
          <div>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-wide">Total</p>
            <p className="font-bold text-sm text-sage-deep">{fmt(order.total)}</p>
            {order.frais_livraison > 0 && (
              <p className="text-[10px] text-on-surface-variant">+ {fmt(order.frais_livraison)} livraison</p>
            )}
          </div>

          {/* Boutons */}
          <div className="flex items-center gap-2 shrink-0">
            {canCancel && (
              <button
                onClick={handleCancel}
                disabled={cancelling}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-red-600 border border-red-200 hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                {cancelling ? '…' : 'Annuler'}
              </button>
            )}
            <Link
              to={`/orders/${order.id}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 border border-outline-variant rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">visibility</span>
              <span className="hidden xs:inline sm:inline">Détails</span>
            </Link>
          </div>
        </div>

        {/* ── Infos livraison expandables ── */}
        {expanded && (
          <div className="pt-3 border-t border-outline-variant/20 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-wide mb-0.5">Ville</p>
              <p className="text-xs font-semibold">{order.ville}</p>
            </div>
            <div>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-wide mb-0.5">Paiement</p>
              <p className="text-xs font-semibold capitalize">{order.mode_paiement}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-[10px] text-on-surface-variant uppercase tracking-wide mb-0.5">Adresse</p>
              <p className="text-xs font-semibold truncate">{order.adresse}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function Orders() {
  const [orders, setOrders]   = useState<Commande[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)
  const [filter, setFilter]   = useState<FilterKey>('TOUT')
  const [search, setSearch]   = useState('')

  useEffect(() => {
    document.title = 'Mes Commandes | Ben Massage & Wellness'
    orderService.getMyCommandes()
      .then(res => setOrders(res.data ?? []))
      .catch(e  => setError(e.message || 'Impossible de charger les commandes'))
      .finally(() => setLoading(false))
  }, [])

  // Mise à jour locale après annulation
  function handleCancelled(id: string) {
    setOrders(prev => prev.map(o =>
      o.id === id ? { ...o, statut: 'CANCELLED' as OrderStatus } : o
    ))
  }

  const filtered = useMemo(() =>
    orders.filter(o => {
      const matchStatus = filter === 'TOUT' || o.statut === filter
      const q = search.toLowerCase()
      const matchSearch = !q
        || o.numero.toLowerCase().includes(q)
        || o.lignes.some(l => l.nom_produit.toLowerCase().includes(q))
        || o.ville.toLowerCase().includes(q)
      return matchStatus && matchSearch
    }),
    [orders, filter, search]
  )

  // Compteur par statut
  const counts = useMemo(() => {
    const c: Record<string, number> = { TOUT: orders.length }
    for (const o of orders) {
      c[o.statut] = (c[o.statut] ?? 0) + 1
    }
    return c
  }, [orders])

  return (
    <UserLayout title="Mes Commandes" subtitle="Suivez vos achats de produits de soin et rituels bien-être.">
      <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto w-full">

        {/* ── Statistiques rapides ── */}
        {!loading && orders.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-5">
            {([
              { status: 'DELIVERED', label: 'Livrées',    icon: 'check_circle'   },
              { status: 'SHIPPED',   label: 'Expédiées',  icon: 'local_shipping' },
              { status: 'PENDING',   label: 'En attente', icon: 'schedule'       },
              { status: 'CANCELLED', label: 'Annulées',   icon: 'cancel'         },
            ] as const).map(({ status, label, icon }) => (
              <button
                key={status}
                onClick={() => setFilter(s => s === status ? 'TOUT' : status)}
                className={`flex flex-col items-center p-2.5 sm:p-3 rounded-xl border transition-all ${
                  filter === status
                    ? 'border-primary bg-primary/5'
                    : 'border-outline-variant/30 bg-white hover:border-primary/40'
                }`}
              >
                <span className={`material-symbols-outlined text-[20px] sm:text-[22px] mb-0.5 ${STATUS_DOT[status].replace('bg-', 'text-')}`}>{icon}</span>
                <span className="font-bold text-base sm:text-lg text-sage-deep leading-none">{counts[status] ?? 0}</span>
                <span className="text-[10px] sm:text-[11px] text-on-surface-variant mt-0.5">{label}</span>
              </button>
            ))}
          </div>
        )}

        {/* ── Recherche ── */}
        <div className="relative w-full mb-3">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="N° commande, produit, ville…"
            className="w-full pl-9 pr-9 py-2.5 border border-outline-variant/40 rounded-xl bg-white focus:outline-none focus:border-primary text-sm transition-colors"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-error">
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>

        {/* ── Filtres pills — scroll horizontal sur mobile ── */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-5 -mx-4 sm:mx-0 px-4 sm:px-0" style={{ scrollbarWidth: 'none' }}>
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                filter === f.key
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {f.label}
              {(counts[f.key] ?? 0) > 0 && (
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${filter === f.key ? 'bg-white/25 text-white' : 'bg-outline-variant/30'}`}>
                  {counts[f.key]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Contenu ── */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => <OrderSkeleton key={i} />)}
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-5xl text-error mb-3 block">error_outline</span>
            <p className="font-body-md text-body-md text-error mb-4">{error}</p>
            <button
              onClick={() => { setLoading(true); setError(null); orderService.getMyCommandes().then(r => setOrders(r.data)).catch(e => setError(e.message)).finally(() => setLoading(false)) }}
              className="px-6 py-2.5 bg-primary text-white rounded-full font-label-md hover:bg-sage-deep transition-colors"
            >
              Réessayer
            </button>
          </div>
        ) : filtered.length > 0 ? (
          <div className="space-y-4">
            {filtered.map(o => (
              <OrderCard key={o.id} order={o} onCancel={handleCancelled} />
            ))}
          </div>
        ) : orders.length === 0 ? (
          /* Aucune commande du tout */
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center mx-auto mb-5">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant">shopping_bag</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-sage-deep mb-2">Aucune commande</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">
              Vous n'avez pas encore passé de commande.
            </p>
            <Link
              to="/products"
              className="px-8 py-3 bg-primary text-white rounded-full font-label-md text-label-md hover:bg-sage-deep transition-colors"
            >
              Découvrir nos produits
            </Link>
          </div>
        ) : (
          /* Filtre actif mais aucun résultat */
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-5xl text-outline-variant mb-4 block">filter_list_off</span>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {search
                ? `Aucune commande pour "${search}"`
                : 'Aucune commande dans cette catégorie.'}
            </p>
            <button
              onClick={() => { setFilter('TOUT'); setSearch('') }}
              className="mt-4 text-primary font-label-md hover:underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </UserLayout>
  )
}
