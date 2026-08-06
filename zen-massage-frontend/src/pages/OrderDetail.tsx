import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import UserLayout from '../components/layout/UserLayout'
import { orderService, type Commande, type OrderStatus } from '../services/order.service'

const fmt = (n: number) => n.toLocaleString('fr-FR') + ' FCFA'

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

const STATUS_FR: Record<OrderStatus, string> = {
  PENDING:   'En attente',
  CONFIRMED: 'Confirmée',
  SHIPPED:   'Expédiée',
  DELIVERED: 'Livrée',
  CANCELLED: 'Annulée',
}

const STATUS_STYLE: Record<OrderStatus, string> = {
  PENDING:   'bg-amber-50 text-amber-700 border border-amber-200',
  CONFIRMED: 'bg-blue-50 text-blue-700 border border-blue-200',
  SHIPPED:   'bg-purple-50 text-purple-700 border border-purple-200',
  DELIVERED: 'bg-green-50 text-green-700 border border-green-200',
  CANCELLED: 'bg-red-50 text-red-700 border border-red-200',
}

const STATUS_DOT: Record<OrderStatus, string> = {
  PENDING:   'bg-amber-400',
  CONFIRMED: 'bg-blue-400',
  SHIPPED:   'bg-purple-400',
  DELIVERED: 'bg-green-500',
  CANCELLED: 'bg-red-400',
}

// Timeline des étapes
const STEPS: { key: OrderStatus; label: string; icon: string }[] = [
  { key: 'PENDING',   label: 'Commande reçue',  icon: 'receipt_long'    },
  { key: 'CONFIRMED', label: 'Confirmée',        icon: 'check_circle'    },
  { key: 'SHIPPED',   label: 'Expédiée',         icon: 'local_shipping'  },
  { key: 'DELIVERED', label: 'Livrée',           icon: 'inventory'       },
]

const STEP_ORDER: OrderStatus[] = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED']

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [order, setOrder] = useState<Commande | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cancelling, setCancelling] = useState(false)

  useEffect(() => {
    if (!id) return
    document.title = 'Détail commande | Ben Massage & Wellness'
    orderService.getCommande(id)
      .then(res => setOrder(res.data))
      .catch(e => setError(e.message || 'Commande introuvable'))
      .finally(() => setLoading(false))
  }, [id])

  async function handleCancel() {
    if (!order || !window.confirm(`Annuler la commande ${order.numero} ?`)) return
    setCancelling(true)
    try {
      await orderService.cancelCommande(order.id)
      setOrder(prev => prev ? { ...prev, statut: 'CANCELLED' } : prev)
    } catch (e: any) {
      alert(e.message || "Impossible d'annuler")
    }
    setCancelling(false)
  }

  if (loading) {
    return (
      <UserLayout title="Détail commande">
        <div className="flex justify-center items-center py-32">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </UserLayout>
    )
  }

  if (error || !order) {
    return (
      <UserLayout title="Détail commande">
        <div className="text-center py-24 px-6">
          <span className="material-symbols-outlined text-5xl text-error mb-4 block">error_outline</span>
          <p className="font-body-md text-error mb-6">{error || 'Commande introuvable'}</p>
          <Link to="/orders" className="px-6 py-3 bg-primary text-white rounded-full font-label-md hover:bg-sage-deep transition-colors">
            Retour aux commandes
          </Link>
        </div>
      </UserLayout>
    )
  }

  const isCancelled = order.statut === 'CANCELLED'
  const canCancel = order.statut === 'PENDING' || order.statut === 'CONFIRMED'
  const currentStepIdx = STEP_ORDER.indexOf(order.statut)

  return (
    <UserLayout
      title={order.numero}
      subtitle={`Passée le ${fmtDate(order.createdAt)}`}
      headerRight={
        <Link to="/orders" className="flex items-center gap-1 text-sm text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Retour
        </Link>
      }
    >
      <div className="p-4 sm:p-6 md:p-8 max-w-3xl mx-auto w-full space-y-6">

        {/* Statut + badge */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${STATUS_STYLE[order.statut]}`}>
            <span className={`w-2 h-2 rounded-full ${STATUS_DOT[order.statut]}`} />
            {STATUS_FR[order.statut]}
          </span>
          {canCancel && (
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold text-red-600 border border-red-200 hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              {cancelling ? 'Annulation…' : 'Annuler la commande'}
            </button>
          )}
        </div>

        {/* Timeline */}
        {!isCancelled && (
          <div className="bg-white rounded-2xl border border-outline-variant/30 p-5">
            <h3 className="font-label-md text-label-md text-on-surface-variant mb-4 uppercase tracking-wide text-xs">Suivi</h3>
            <div className="flex items-start gap-0">
              {STEPS.map((step, i) => {
                const done = currentStepIdx >= i
                const active = currentStepIdx === i
                return (
                  <div key={step.key} className="flex-1 flex flex-col items-center relative">
                    {/* Ligne de connexion */}
                    {i < STEPS.length - 1 && (
                      <div className={`absolute top-4 left-1/2 w-full h-0.5 ${done && currentStepIdx > i ? 'bg-primary' : 'bg-outline-variant/30'}`} />
                    )}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all ${
                      done ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant'
                    } ${active ? 'ring-4 ring-primary/20' : ''}`}>
                      <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: done ? "'FILL' 1" : "'FILL' 0" }}>{step.icon}</span>
                    </div>
                    <p className={`text-[10px] mt-2 text-center font-semibold ${done ? 'text-primary' : 'text-on-surface-variant'}`}>{step.label}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Articles */}
        <div className="bg-white rounded-2xl border border-outline-variant/30 overflow-hidden">
          <div className="px-5 py-4 border-b border-outline-variant/20">
            <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wide text-xs">
              Articles ({order.lignes.length})
            </h3>
          </div>
          <div className="divide-y divide-outline-variant/10">
            {order.lignes.map(ligne => (
              <div key={ligne.id} className="flex items-center gap-4 px-5 py-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-sand-light shrink-0">
                  {ligne.image
                    ? <img src={ligne.image} alt={ligne.nom_produit} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center"><span className="material-symbols-outlined text-outline-variant">inventory_2</span></div>
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-sage-deep truncate">{ligne.nom_produit}</p>
                  <p className="text-xs text-on-surface-variant">{fmt(ligne.prix_unitaire)} × {ligne.quantite}</p>
                </div>
                <p className="font-bold text-sm text-sage-deep shrink-0">{fmt(ligne.sous_total)}</p>
              </div>
            ))}
          </div>
          {/* Récap prix */}
          <div className="px-5 py-4 bg-surface-container-low space-y-2">
            <div className="flex justify-between text-sm text-on-surface-variant">
              <span>Sous-total</span>
              <span>{fmt(order.total - order.frais_livraison)}</span>
            </div>
            {order.frais_livraison > 0 && (
              <div className="flex justify-between text-sm text-on-surface-variant">
                <span>Livraison</span>
                <span>{fmt(order.frais_livraison)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-base text-sage-deep pt-2 border-t border-outline-variant/20">
              <span>Total</span>
              <span>{fmt(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Infos livraison + paiement */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-outline-variant/30 p-5 space-y-3">
            <h3 className="font-label-md text-xs text-on-surface-variant uppercase tracking-wide">Livraison</h3>
            <div className="space-y-1 text-sm">
              <p className="font-semibold text-sage-deep">{order.ville}</p>
              <p className="text-on-surface-variant">{order.adresse}</p>
              <p className="text-on-surface-variant">{order.telephone}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-outline-variant/30 p-5 space-y-3">
            <h3 className="font-label-md text-xs text-on-surface-variant uppercase tracking-wide">Paiement</h3>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">payments</span>
              <p className="font-semibold text-sm text-sage-deep capitalize">{order.mode_paiement}</p>
            </div>
            {order.notes && (
              <p className="text-xs text-on-surface-variant italic">"{order.notes}"</p>
            )}
          </div>
        </div>

        <div className="text-center">
          <button onClick={() => navigate('/orders')} className="text-sm text-primary hover:underline flex items-center gap-1 mx-auto">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Retour à mes commandes
          </button>
        </div>
      </div>
    </UserLayout>
  )
}
