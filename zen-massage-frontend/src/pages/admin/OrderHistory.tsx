import { useEffect, useState, useMemo, useCallback } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { orderService, type Commande, type OrderStatus } from '../../services/order.service'
import Toast from '../../components/ui/Toast'

/* ══════════════════════════════════════════
   HELPERS STATUT
══════════════════════════════════════════ */
const STATUS_FR: Record<OrderStatus, string> = {
  PENDING:   'En attente',
  CONFIRMED: 'Confirmée',
  SHIPPED:   'Expédiée',
  DELIVERED: 'Livrée',
  CANCELLED: 'Annulée',
}

const STATUS_STYLE: Record<OrderStatus, string> = {
  PENDING:   'bg-amber-50  text-amber-700  border border-amber-200',
  CONFIRMED: 'bg-sage-deep/10 text-sage-deep border border-sage-deep/20',
  SHIPPED:   'bg-purple-50 text-purple-700 border border-purple-200',
  DELIVERED: 'bg-green-50  text-green-700  border border-green-200',
  CANCELLED: 'bg-red-50    text-red-700    border border-red-200',
}

const STATUS_DOT: Record<OrderStatus, string> = {
  PENDING:   'bg-amber-400',
  CONFIRMED: 'bg-sage-deep',
  SHIPPED:   'bg-purple-400',
  DELIVERED: 'bg-green-500',
  CANCELLED: 'bg-red-400',
}

/* Transitions autorisées : PENDING → CONFIRMED → SHIPPED → DELIVERED / CANCELLED */
const NEXT_STATUSES: Record<OrderStatus, OrderStatus[]> = {
  PENDING:   ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['SHIPPED',   'CANCELLED'],
  SHIPPED:   ['DELIVERED', 'CANCELLED'],
  DELIVERED: [],
  CANCELLED: [],
}

const NEXT_LABELS: Record<OrderStatus, string> = {
  CONFIRMED: 'Confirmer',
  SHIPPED:   'Marquer expédiée',
  DELIVERED: 'Marquer livrée',
  CANCELLED: 'Annuler',
}

const NEXT_ICON: Record<OrderStatus, string> = {
  CONFIRMED: 'check_circle',
  SHIPPED:   'local_shipping',
  DELIVERED: 'inventory',
  CANCELLED: 'cancel',
}

function fmt(n: number) { return n.toLocaleString('fr-FR') + ' FCFA' }
function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
}

/* ══════════════════════════════════════════
   SKELETON
══════════════════════════════════════════ */
function RowSkeleton() {
  return (
    <tr className="animate-pulse">
      {[120, 160, 100, 90, 100, 80].map((w, i) => (
        <td key={i} className="px-5 py-4">
          <div className="h-4 bg-outline-variant/20 rounded" style={{ width: w }} />
        </td>
      ))}
    </tr>
  )
}

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
type FilterKey = 'TOUS' | OrderStatus

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'TOUS',      label: 'Toutes'     },
  { key: 'PENDING',   label: 'En attente' },
  { key: 'CONFIRMED', label: 'Confirmées' },
  { key: 'SHIPPED',   label: 'Expédiées'  },
  { key: 'DELIVERED', label: 'Livrées'    },
  { key: 'CANCELLED', label: 'Annulées'   },
]

export default function OrderHistory() {
  const [orders, setOrders]   = useState<Commande[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter]   = useState<FilterKey>('TOUS')
  const [search, setSearch]   = useState('')
  const [page, setPage]       = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)
  // Modal confirmation changement statut
  const [modalOrder, setModalOrder] = useState<Commande | null>(null)
  const [modalNextStatus, setModalNextStatus] = useState<OrderStatus | null>(null)

  useEffect(() => { document.title = 'Commandes | Admin Ben Massage' }, [])

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await orderService.getAllCommandes({
        statut: filter === 'TOUS' ? undefined : filter,
        page,
        limite: 10,
      })
      setOrders(res.data.commandes)
      setTotalPages(res.data.pages)
      setTotalCount(res.data.total)
    } catch (e: any) {
      setToast({ type: 'error', msg: e.message || 'Erreur de chargement' })
    } finally {
      setLoading(false)
    }
  }, [filter, page])

  useEffect(() => { setPage(1) }, [filter])
  useEffect(() => { load() }, [load])

  /* Changer le statut d'une commande */
  async function handleStatusChange(order: Commande, nextStatus: OrderStatus) {
    setUpdatingId(order.id)
    setModalOrder(null)
    setModalNextStatus(null)
    try {
      const res = await orderService.updateStatut(order.id, nextStatus)
      setOrders(prev => prev.map(o => o.id === order.id ? res.data : o))
      setToast({ type: 'success', msg: `Commande ${order.numero} → ${STATUS_FR[nextStatus]}` })
    } catch (e: any) {
      setToast({ type: 'error', msg: e.message || 'Mise à jour impossible' })
    } finally {
      setUpdatingId(null)
    }
  }

  /* Filtrage local par recherche */
  const displayed = useMemo(() =>
    orders.filter(o => {
      if (!search.trim()) return true
      const q = search.toLowerCase()
      return (
        o.numero.toLowerCase().includes(q) ||
        o.utilisateur?.firstName?.toLowerCase().includes(q) ||
        o.utilisateur?.lastName?.toLowerCase().includes(q) ||
        o.ville.toLowerCase().includes(q)
      )
    }),
    [orders, search]
  )

  /* Compteurs */
  const counts = useMemo(() => {
    const c: Record<string, number> = {}
    for (const o of orders) c[o.statut] = (c[o.statut] ?? 0) + 1
    return c
  }, [orders])

  return (
    <AdminLayout title="Gestion des Commandes">
      {toast && <Toast type={toast.type} message={toast.msg} onClose={() => setToast(null)} />}

      <div className="px-4 sm:px-6 pb-20 pt-6 max-w-[1280px] mx-auto space-y-6">

        {/* ── KPIs ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {([
            { key: 'PENDING',   label: 'En attente', icon: 'schedule',       color: 'text-amber-600'  },
            { key: 'CONFIRMED', label: 'Confirmées', icon: 'check_circle',   color: 'text-sage-deep'  },
            { key: 'SHIPPED',   label: 'Expédiées',  icon: 'local_shipping', color: 'text-purple-600' },
            { key: 'DELIVERED', label: 'Livrées',    icon: 'inventory',      color: 'text-green-600'  },
          ] as const).map(({ key, label, icon, color }) => (
            <button
              key={key}
              onClick={() => setFilter(f => f === key ? 'TOUS' : key)}
              className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${
                filter === key
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-outline-variant/30 bg-white hover:border-primary/30'
              }`}
            >
              <span className={`material-symbols-outlined text-[22px] ${color}`}>{icon}</span>
              <div>
                <p className="font-bold text-lg text-sage-deep leading-none">{counts[key] ?? 0}</p>
                <p className="text-xs text-on-surface-variant mt-0.5">{label}</p>
              </div>
            </button>
          ))}
        </div>

        {/* ── Table card ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden">

          {/* Controls */}
          <div className="p-4 sm:p-5 border-b border-outline-variant/20 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            {/* Filtres pills */}
            <div className="flex gap-2 overflow-x-auto pb-0.5" style={{ scrollbarWidth: 'none' }}>
              {FILTERS.map(f => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                    filter === f.key
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {f.label}
                  {f.key !== 'TOUS' && (counts[f.key] ?? 0) > 0 && (
                    <span className={`ml-1.5 text-[9px] px-1.5 py-0.5 rounded-full ${filter === f.key ? 'bg-white/25' : 'bg-outline-variant/30'}`}>
                      {counts[f.key]}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Recherche */}
            <div className="relative w-full sm:w-64 shrink-0">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[16px]">search</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="N° commande, client, ville…"
                className="w-full pl-8 pr-8 py-2 border border-outline-variant/40 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline hover:text-error">
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              )}
            </div>
          </div>

          {/* ── Table (tous écrans avec scroll horizontal) ── */}
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[640px]">
              <thead className="bg-surface-container-low/60 border-b border-outline-variant/20">
                <tr>
                  {['N° Commande', 'Client', 'Date', 'Articles', 'Total', 'Statut', 'Actions'].map(h => (
                    <th key={h} className="px-3 md:px-5 py-3.5 text-xs font-semibold text-on-surface-variant uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {loading
                  ? Array.from({ length: 5 }).map((_, i) => <RowSkeleton key={i} />)
                  : displayed.map(o => (
                    <tr key={o.id} className="hover:bg-surface-container-lowest transition-colors">
                      {/* Numéro */}
                      <td className="px-3 md:px-5 py-3.5">
                        <span className="font-mono font-bold text-xs md:text-sm text-sage-deep">{o.numero}</span>
                      </td>

                      {/* Client */}
                      <td className="px-3 md:px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-sage-deep/10 flex items-center justify-center text-sage-deep font-bold text-[10px] md:text-xs shrink-0">
                            {o.utilisateur ? `${o.utilisateur.firstName[0]}${o.utilisateur.lastName[0]}` : '?'}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-xs md:text-sm truncate">
                              {o.utilisateur ? `${o.utilisateur.firstName} ${o.utilisateur.lastName}` : '—'}
                            </p>
                            <p className="text-[10px] text-on-surface-variant truncate hidden sm:block">{o.ville}</p>
                          </div>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-3 md:px-5 py-3.5 text-xs text-on-surface-variant whitespace-nowrap">{fmtDate(o.createdAt)}</td>

                      {/* Articles */}
                      <td className="px-3 md:px-5 py-3.5 text-xs text-on-surface-variant">{o.lignes.length} art.</td>

                      {/* Total */}
                      <td className="px-3 md:px-5 py-3.5 font-bold text-xs md:text-sm text-sage-deep whitespace-nowrap">{fmt(o.total)}</td>

                      {/* Statut */}
                      <td className="px-3 md:px-5 py-3.5">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold whitespace-nowrap ${STATUS_STYLE[o.statut]}`}>
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS_DOT[o.statut]}`} />
                          <span className="hidden sm:inline">{STATUS_FR[o.statut]}</span>
                          <span className="sm:hidden">{STATUS_FR[o.statut].slice(0, 3)}.</span>
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-3 md:px-5 py-3.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {NEXT_STATUSES[o.statut].map(next => (
                            <button
                              key={next}
                              onClick={() => { setModalOrder(o); setModalNextStatus(next) }}
                              disabled={updatingId === o.id}
                              title={NEXT_LABELS[next]}
                              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 whitespace-nowrap ${
                                next === 'CANCELLED'
                                  ? 'text-red-600 border border-red-200 hover:bg-red-50'
                                  : 'text-sage-deep border border-sage-deep/30 hover:bg-sage-deep/10'
                              }`}
                            >
                              <span className="material-symbols-outlined text-[14px]">{NEXT_ICON[next]}</span>
                              <span className="hidden md:inline">{NEXT_LABELS[next]}</span>
                            </button>
                          ))}
                          {updatingId === o.id && (
                            <span className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>

          {/* État vide */}
          {!loading && displayed.length === 0 && (
            <div className="text-center py-16">
              <span className="material-symbols-outlined text-5xl text-outline-variant mb-3 block">shopping_bag</span>
              <p className="text-on-surface-variant font-body-md">
                {search ? `Aucune commande pour "${search}"` : 'Aucune commande dans cette catégorie.'}
              </p>
              {(search || filter !== 'TOUS') && (
                <button onClick={() => { setSearch(''); setFilter('TOUS') }} className="mt-3 text-primary text-sm hover:underline">
                  Réinitialiser
                </button>
              )}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-outline-variant/10 flex items-center justify-between gap-4">
              <p className="text-xs text-on-surface-variant">
                {totalCount} commande{totalCount > 1 ? 's' : ''} — page {page}/{totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-9 h-9 rounded-lg border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container disabled:opacity-40 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                  .reduce<(number | '...')[]>((acc, p, idx, arr) => {
                    if (idx > 0 && (arr[idx - 1] as number) + 1 < p) acc.push('...')
                    acc.push(p)
                    return acc
                  }, [])
                  .map((p, i) =>
                    p === '...'
                      ? <span key={`e${i}`} className="px-1 text-on-surface-variant text-sm self-center">…</span>
                      : (
                        <button
                          key={p}
                          onClick={() => setPage(p as number)}
                          className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all ${
                            page === p ? 'bg-primary text-white' : 'border border-outline-variant text-on-surface-variant hover:bg-surface-container'
                          }`}
                        >
                          {p}
                        </button>
                      )
                  )
                }
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-9 h-9 rounded-lg border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container disabled:opacity-40 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════
          MODAL CONFIRMATION CHANGEMENT STATUT
      ══════════════════════════════════════ */}
      {modalOrder && modalNextStatus && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md p-6 space-y-4">
            {/* Icône */}
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
              modalNextStatus === 'CANCELLED' ? 'bg-red-100' : 'bg-sage-deep/10'
            }`}>
              <span className={`material-symbols-outlined text-2xl ${modalNextStatus === 'CANCELLED' ? 'text-red-600' : 'text-sage-deep'}`}
                style={{ fontVariationSettings: "'FILL' 1" }}>
                {NEXT_ICON[modalNextStatus]}
              </span>
            </div>

            <div className="text-center">
              <h3 className="font-headline-sm text-headline-sm text-sage-deep">
                {modalNextStatus === 'CANCELLED' ? 'Annuler cette commande ?' : `${NEXT_LABELS[modalNextStatus]} ?`}
              </h3>
              <p className="text-sm text-on-surface-variant mt-1">
                Commande <strong>{modalOrder.numero}</strong> —{' '}
                {modalOrder.utilisateur ? `${modalOrder.utilisateur.firstName} ${modalOrder.utilisateur.lastName}` : ''}
              </p>
              <p className="text-xs text-on-surface-variant mt-1">
                Statut : <span className="font-semibold">{STATUS_FR[modalOrder.statut]}</span>
                {' → '}
                <span className="font-semibold">{STATUS_FR[modalNextStatus]}</span>
              </p>
              <p className="text-xs text-on-surface-variant/70 mt-2 italic">
                Le client verra le nouveau statut sur son espace commandes.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => { setModalOrder(null); setModalNextStatus(null) }}
                className="flex-1 py-3 border border-outline-variant/40 rounded-xl text-sm font-semibold hover:bg-surface-container transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => handleStatusChange(modalOrder, modalNextStatus)}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold text-white transition-colors ${
                  modalNextStatus === 'CANCELLED' ? 'bg-red-600 hover:bg-red-700' : 'bg-sage-deep hover:opacity-90'
                }`}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
