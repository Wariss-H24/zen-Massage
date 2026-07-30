import { useEffect, useState, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout'
import { orderService, type Commande } from '../../services/order.service'
import { appointmentService, type RendezVousWithUser } from '../../services/appointment.service'
import { productService } from '../../services/product.service'
import { reviewService } from '../../services/review.service'

/* ══════════════════════════════════════════
   HELPERS
══════════════════════════════════════════ */
const fmt = (n: number) => n.toLocaleString('fr-FR') + ' FCFA'
const MONTHS_FR = ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc']

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

/* Regrouper les commandes par mois (6 derniers mois) */
function commandesByMonth(commandes: Commande[]) {
  const now = new Date()
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1)
    const label = MONTHS_FR[d.getMonth()]
    const monthCmds = commandes.filter(c => {
      const cd = new Date(c.createdAt)
      return cd.getFullYear() === d.getFullYear() && cd.getMonth() === d.getMonth()
    })
    const revenue = monthCmds.reduce((s, c) => s + c.total, 0)
    const count   = monthCmds.length
    return { label, revenue, count }
  })
}

/* ── Bar animée ── */
function Bar({ pct, color, delay }: { pct: number; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    el.style.height = '0%'
    const t = setTimeout(() => { el.style.height = `${Math.max(pct, 2)}%` }, delay + 200)
    return () => clearTimeout(t)
  }, [pct, delay])
  return <div ref={ref} className={`w-full ${color} rounded-t-md transition-all duration-1000 ease-out`} style={{ height: '0%' }} />
}

/* ── Skeleton card ── */
function KpiSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-5 border border-outline-variant/30 animate-pulse space-y-3">
      <div className="h-3 bg-outline-variant/20 rounded w-24" />
      <div className="h-7 bg-outline-variant/20 rounded w-32" />
      <div className="h-3 bg-outline-variant/20 rounded w-20" />
    </div>
  )
}

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function Statistics() {
  const [commandes, setCommandes]       = useState<Commande[]>([])
  const [appointments, setAppointments] = useState<RendezVousWithUser[]>([])
  const [totalProduits, setTotalProduits] = useState(0)
  const [moyenneAvis, setMoyenneAvis]   = useState(0)
  const [totalAvis, setTotalAvis]       = useState(0)
  const [loading, setLoading]           = useState(true)

  useEffect(() => {
    document.title = 'Analytiques | Admin Ben Massage'
    async function load() {
      try {
        const [ordRes, apptRes, prodRes] = await Promise.all([
          orderService.getAllCommandes({ limite: 200 }),
          appointmentService.getAllAppointments(),
          productService.listProduitsAdmin({ limite: 200 }),
        ])
        setCommandes(ordRes.data.commandes ?? [])
        setAppointments(apptRes.data ?? [])
        setTotalProduits(prodRes.data.total ?? 0)

        // Moyenne avis globale via les 200 premiers avis
        try {
          const revRes = await reviewService.listReviews({ limite: 200 })
          const avis = revRes.data.avis ?? []
          setTotalAvis(revRes.data.total ?? avis.length)
          if (avis.length > 0) {
            setMoyenneAvis(avis.reduce((s, a) => s + a.note, 0) / avis.length)
          }
        } catch { /* optional */ }
      } catch { /* handled per section */ }
      setLoading(false)
    }
    load()
  }, [])

  /* ── Métriques calculées ── */
  const metrics = useMemo(() => {
    const delivered  = commandes.filter(c => c.statut === 'DELIVERED')
    const cancelled  = commandes.filter(c => c.statut === 'CANCELLED')
    const active     = commandes.filter(c => !['CANCELLED'].includes(c.statut))
    const caTotal    = delivered.reduce((s, c) => s + c.total, 0)
    const panierMoyen = delivered.length ? caTotal / delivered.length : 0

    const confirmedAppts  = appointments.filter(a => a.statut === 'CONFIRMED')
    const pendingAppts    = appointments.filter(a => a.statut === 'PENDING')
    const completedAppts  = appointments.filter(a => a.statut === 'COMPLETED')

    return {
      caTotal, panierMoyen,
      nbCommandes: active.length,
      nbAnnulees:  cancelled.length,
      nbRdvTotal:  appointments.length,
      nbRdvConfirmed: confirmedAppts.length,
      nbRdvPending:   pendingAppts.length,
      nbRdvCompleted: completedAppts.length,
    }
  }, [commandes, appointments])

  /* ── Données graphique ── */
  const barData = useMemo(() => commandesByMonth(commandes), [commandes])
  const maxRevenue = Math.max(...barData.map(b => b.revenue), 1)

  /* ── Top produits commandés ── */
  const topProduits = useMemo(() => {
    const map: Record<string, { nom: string; image?: string; qty: number; revenue: number }> = {}
    for (const cmd of commandes) {
      for (const ligne of cmd.lignes) {
        if (!map[ligne.produit_id]) {
          map[ligne.produit_id] = { nom: ligne.nom_produit, image: ligne.image, qty: 0, revenue: 0 }
        }
        map[ligne.produit_id].qty     += ligne.quantite
        map[ligne.produit_id].revenue += ligne.sous_total
      }
    }
    return Object.values(map).sort((a, b) => b.revenue - a.revenue).slice(0, 5)
  }, [commandes])

  /* ── 5 dernières commandes ── */
  const recentCommandes = useMemo(() =>
    [...commandes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5),
    [commandes]
  )

  const STATUS_FR: Record<string, string> = {
    PENDING: 'En attente', CONFIRMED: 'Confirmée', SHIPPED: 'Expédiée', DELIVERED: 'Livrée', CANCELLED: 'Annulée',
  }
  const STATUS_STYLE: Record<string, string> = {
    PENDING: 'bg-amber-50 text-amber-700 border border-amber-200',
    CONFIRMED: 'bg-sage-deep/10 text-sage-deep border border-sage-deep/20',
    SHIPPED: 'bg-purple-50 text-purple-700 border border-purple-200',
    DELIVERED: 'bg-green-50 text-green-700 border border-green-200',
    CANCELLED: 'bg-red-50 text-red-700 border border-red-200',
  }

  return (
    <AdminLayout title="Analytiques">
      <div className="px-4 sm:px-6 pb-20 pt-6 max-w-[1280px] mx-auto space-y-8">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h2 className="font-headline-md text-headline-md text-sage-deep">Performance & Insights</h2>
            <p className="font-body-md text-on-surface-variant text-sm mt-1">Vue d'ensemble de l'activité — données en temps réel.</p>
          </div>
          <Link to="/admin/orders" className="text-primary font-label-md text-sm hover:underline shrink-0">
            Gérer les commandes →
          </Link>
        </div>

        {/* ══════════════════════════════════════
            KPIs — 4 colonnes
        ══════════════════════════════════════ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {loading ? Array.from({ length: 4 }).map((_, i) => <KpiSkeleton key={i} />) : (<>
            {/* CA Total */}
            <div className="bg-sage-deep text-white rounded-2xl p-5 shadow-lg col-span-2 sm:col-span-1">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-white/70 uppercase tracking-wide">CA Total</span>
                <span className="material-symbols-outlined text-white/60 text-[20px]">payments</span>
              </div>
              <p className="font-bold text-xl sm:text-2xl leading-none">{fmt(metrics.caTotal)}</p>
              <p className="text-xs text-white/60 mt-2">{metrics.nbCommandes} commande{metrics.nbCommandes > 1 ? 's' : ''}</p>
            </div>

            {/* Panier moyen */}
            <div className="bg-white rounded-2xl p-5 border border-outline-variant/30 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">Panier Moyen</span>
                <span className="material-symbols-outlined text-sage-deep/50 text-[20px]">shopping_cart</span>
              </div>
              <p className="font-bold text-xl text-sage-deep leading-none">{fmt(metrics.panierMoyen)}</p>
              <p className="text-xs text-on-surface-variant mt-2">sur {commandes.filter(c => c.statut === 'DELIVERED').length} livrées</p>
            </div>

            {/* Rendez-vous */}
            <div className="bg-white rounded-2xl p-5 border border-outline-variant/30 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">Rendez-vous</span>
                <span className="material-symbols-outlined text-sage-deep/50 text-[20px]">calendar_today</span>
              </div>
              <p className="font-bold text-xl text-sage-deep leading-none">{metrics.nbRdvTotal}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-amber-600">{metrics.nbRdvPending} en attente</span>
                <span className="text-xs text-on-surface-variant/40">·</span>
                <span className="text-xs text-green-600">{metrics.nbRdvConfirmed} confirmés</span>
              </div>
            </div>

            {/* Note moyenne */}
            <div className="bg-white rounded-2xl p-5 border border-outline-variant/30 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">Note Moy.</span>
                <span className="material-symbols-outlined text-amber-400 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <p className="font-bold text-xl text-sage-deep leading-none">
                {moyenneAvis > 0 ? moyenneAvis.toFixed(1) : '—'}<span className="text-sm font-normal text-on-surface-variant">/5</span>
              </p>
              <p className="text-xs text-on-surface-variant mt-2">{totalAvis} avis · {totalProduits} produits</p>
            </div>
          </>)}
        </div>

        {/* ══════════════════════════════════════
            GRAPHIQUE + TOP PRODUITS
        ══════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

          {/* Graphique CA 6 mois */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-5 sm:p-6 border border-outline-variant/30 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h4 className="font-semibold text-sm text-sage-deep">Chiffre d'affaires</h4>
                <p className="text-xs text-on-surface-variant mt-0.5">6 derniers mois (commandes livrées)</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-on-surface-variant">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-sage-deep inline-block" />CA mensuel</span>
              </div>
            </div>

            {loading ? (
              <div className="h-48 bg-outline-variant/10 rounded-xl animate-pulse" />
            ) : (
              <div className="relative">
                {/* Grille horizontale */}
                <div className="absolute inset-0 flex flex-col justify-between pb-7 pointer-events-none">
                  {[100, 75, 50, 25, 0].map(p => (
                    <div key={p} className="w-full border-t border-outline-variant/10 relative">
                      <span className="absolute -top-2 -left-1 text-[9px] text-on-surface-variant/50 w-12 text-right">
                        {p > 0 ? fmt(Math.round((maxRevenue * p) / 100)).replace(' FCFA', 'F') : '0'}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-end justify-between gap-2 pl-14 h-52">
                  {barData.map((b, i) => (
                    <div key={b.label} className="flex-1 flex flex-col items-center gap-1 group">
                      <div className="relative w-full flex flex-col justify-end h-full">
                        {/* Tooltip */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-sage-deep text-white text-[9px] px-2 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                          {fmt(b.revenue)}<br/>{b.count} cmd
                        </div>
                        <Bar pct={b.revenue > 0 ? (b.revenue / maxRevenue) * 90 : 2} color="bg-sage-deep hover:bg-primary transition-colors cursor-pointer" delay={i * 60} />
                      </div>
                      <span className="text-[10px] text-on-surface-variant mt-1">{b.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Top produits */}
          <div className="bg-white rounded-2xl p-5 border border-outline-variant/30 shadow-sm">
            <h4 className="font-semibold text-sm text-sage-deep mb-1">Top produits vendus</h4>
            <p className="text-xs text-on-surface-variant mb-5">Par chiffre d'affaires</p>

            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 animate-pulse">
                    <div className="w-10 h-10 bg-outline-variant/20 rounded-lg shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-3 bg-outline-variant/20 rounded w-3/4" />
                      <div className="h-2 bg-outline-variant/10 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : topProduits.length === 0 ? (
              <div className="text-center py-8 text-on-surface-variant">
                <span className="material-symbols-outlined text-3xl block mb-2">inventory_2</span>
                <p className="text-xs">Aucune vente enregistrée</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {topProduits.map((p, i) => (
                  <li key={p.nom} className="flex items-center gap-3">
                    {/* Rang */}
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                      i === 0 ? 'bg-amber-400 text-white' : i === 1 ? 'bg-slate-300 text-white' : i === 2 ? 'bg-orange-300 text-white' : 'bg-surface-container text-on-surface-variant'
                    }`}>{i + 1}</span>

                    {/* Image */}
                    {p.image
                      ? <img src={p.image} alt={p.nom} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                      : <div className="w-10 h-10 rounded-lg bg-sage-deep/10 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-sage-deep text-lg">inventory_2</span>
                        </div>
                    }

                    {/* Infos */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-on-surface truncate">{p.nom}</p>
                      <p className="text-[10px] text-on-surface-variant">{p.qty} unité{p.qty > 1 ? 's' : ''}</p>
                    </div>
                    <span className="text-xs font-bold text-sage-deep shrink-0">{fmt(p.revenue)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* ══════════════════════════════════════
            STATUTS COMMANDES + STATUTS RDV
        ══════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Répartition commandes */}
          <div className="bg-white rounded-2xl p-5 border border-outline-variant/30 shadow-sm">
            <h4 className="font-semibold text-sm text-sage-deep mb-4">Répartition des commandes</h4>
            {loading ? (
              <div className="space-y-2">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-8 bg-outline-variant/10 rounded animate-pulse" />)}</div>
            ) : commandes.length === 0 ? (
              <p className="text-xs text-on-surface-variant text-center py-6">Aucune commande</p>
            ) : (
              <div className="space-y-3">
                {(['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'] as const).map(s => {
                  const count = commandes.filter(c => c.statut === s).length
                  const pct   = commandes.length ? Math.round((count / commandes.length) * 100) : 0
                  const colors: Record<string, string> = {
                    PENDING: 'bg-amber-400', CONFIRMED: 'bg-sage-deep', SHIPPED: 'bg-purple-400', DELIVERED: 'bg-green-500', CANCELLED: 'bg-red-400',
                  }
                  return (
                    <div key={s}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-on-surface">{STATUS_FR[s]}</span>
                        <span className="text-on-surface-variant">{count} · {pct}%</span>
                      </div>
                      <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                        <div className={`h-full ${colors[s]} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Répartition rendez-vous */}
          <div className="bg-white rounded-2xl p-5 border border-outline-variant/30 shadow-sm">
            <h4 className="font-semibold text-sm text-sage-deep mb-4">Répartition des rendez-vous</h4>
            {loading ? (
              <div className="space-y-2">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-8 bg-outline-variant/10 rounded animate-pulse" />)}</div>
            ) : appointments.length === 0 ? (
              <p className="text-xs text-on-surface-variant text-center py-6">Aucun rendez-vous</p>
            ) : (
              <div className="space-y-3">
                {([
                  { s: 'PENDING',   label: 'En attente',  color: 'bg-amber-400'  },
                  { s: 'CONFIRMED', label: 'Confirmés',   color: 'bg-sage-deep'  },
                  { s: 'COMPLETED', label: 'Terminés',    color: 'bg-green-500'  },
                  { s: 'CANCELLED', label: 'Annulés',     color: 'bg-red-400'    },
                ] as const).map(({ s, label, color }) => {
                  const count = appointments.filter(a => a.statut === s).length
                  const pct   = appointments.length ? Math.round((count / appointments.length) * 100) : 0
                  return (
                    <div key={s}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-on-surface">{label}</span>
                        <span className="text-on-surface-variant">{count} · {pct}%</span>
                      </div>
                      <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                        <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* ══════════════════════════════════════
            DERNIÈRES COMMANDES
        ══════════════════════════════════════ */}
        <div className="bg-white rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant/10">
            <div>
              <h4 className="font-semibold text-sm text-sage-deep">Dernières commandes</h4>
              <p className="text-xs text-on-surface-variant mt-0.5">5 commandes les plus récentes</p>
            </div>
            <Link to="/admin/orders" className="text-xs text-primary font-semibold hover:underline">Voir tout →</Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[480px]">
              <thead className="bg-surface-container-low/50">
                <tr>
                  {['N°', 'Client', 'Total', 'Date', 'Statut'].map(h => (
                    <th key={h} className="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {loading
                  ? Array.from({ length: 3 }).map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        {[80, 120, 90, 80, 80].map((w, j) => (
                          <td key={j} className="px-4 py-3"><div className="h-3 bg-outline-variant/20 rounded" style={{ width: w }} /></td>
                        ))}
                      </tr>
                    ))
                  : recentCommandes.length === 0
                  ? <tr><td colSpan={5} className="text-center py-8 text-xs text-on-surface-variant">Aucune commande</td></tr>
                  : recentCommandes.map(o => (
                      <tr key={o.id} className="hover:bg-surface-container-lowest transition-colors">
                        <td className="px-4 py-3 font-mono font-bold text-xs text-sage-deep">{o.numero}</td>
                        <td className="px-4 py-3 text-xs font-semibold">
                          {o.utilisateur ? `${o.utilisateur.firstName} ${o.utilisateur.lastName}` : '—'}
                        </td>
                        <td className="px-4 py-3 text-xs font-bold text-sage-deep whitespace-nowrap">{fmt(o.total)}</td>
                        <td className="px-4 py-3 text-xs text-on-surface-variant whitespace-nowrap">{fmtDate(o.createdAt)}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${STATUS_STYLE[o.statut]}`}>
                            {STATUS_FR[o.statut]}
                          </span>
                        </td>
                      </tr>
                    ))
                }
              </tbody>
            </table>
          </div>
        </div>

        {/* ══════════════════════════════════════
            CTA PLANNING
        ══════════════════════════════════════ */}
        <div className="bg-sage-deep text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-[10px] font-semibold uppercase tracking-wider mb-3">
              Configuration
            </span>
            <h4 className="font-bold text-lg sm:text-xl mb-1">Gérer vos disponibilités</h4>
            <p className="text-sm text-white/70">Configurez vos horaires de travail et les types de massage proposés.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link to="/admin/settings" className="px-5 py-2.5 bg-white text-sage-deep rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
              Paramètres
            </Link>
            <Link to="/admin/bookings" className="px-5 py-2.5 border border-white/40 text-white rounded-full text-sm font-semibold hover:bg-white/10 transition-colors">
              Rendez-vous
            </Link>
          </div>
        </div>

      </div>
    </AdminLayout>
  )
}
