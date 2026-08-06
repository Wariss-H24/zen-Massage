import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import Select from '../../components/ui/Select'
import StockDialog from '../../components/ui/StockDialog'
import Spinner from '../../components/ui/Spinner'
import Toast from '../../components/ui/Toast'
import { productService } from '../../services/product.service'
import type { Categorie, Produit } from '../../types/product'

type PublieFilter = 'all' | 'published' | 'disabled'

function formatPriceFCFA(value: number) {
  return `${Math.round(value).toLocaleString('fr-FR')} FCFA`
}

export default function ProductsManagement() {
  const [categories, setCategories] = useState<Categorie[]>([])
  const [loadingCats, setLoadingCats] = useState(true)

  const [produits, setProduits] = useState<Produit[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [loading, setLoading] = useState(true)

  const [categorieId, setCategorieId] = useState('')
  const [recherche, setRecherche] = useState('')
  const [publieFilter, setPublieFilter] = useState<PublieFilter>('all')

  const [busyId, setBusyId] = useState<string | null>(null)
  const [confirmAction, setConfirmAction] = useState<
    | { type: 'togglePublie'; produit: Produit; nextPublie: boolean }
    | { type: 'delete'; produit: Produit }
    | null
  >(null)
  const [stockAction, setStockAction] = useState<Produit | null>(null)
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; msg: string } | null>(null)

  const publie = useMemo(() => {
    if (publieFilter === 'published') return true
    if (publieFilter === 'disabled') return false
    return undefined
  }, [publieFilter])

  const loadCategories = useCallback(async () => {
    setLoadingCats(true)
    try {
      const res = await productService.getCategories()
      setCategories(res.data)
    } catch (err: any) {
      setToast({ type: 'error', msg: err.message || 'Erreur catégories' })
    } finally {
      setLoadingCats(false)
    }
  }, [])

  const loadProduits = useCallback(async () => {
    setLoading(true)
    try {
      const res = await productService.listProduitsAdmin({
        categorie_id: categorieId || undefined,
        recherche: recherche.trim() || undefined,
        page,
        limite: 20,
        publie,
      })
      setProduits(res.data.produits)
      setTotal(res.data.total)
      setPages(res.data.pages)
    } catch (err: any) {
      setToast({ type: 'error', msg: err.message || 'Erreur produits' })
    } finally {
      setLoading(false)
    }
  }, [categorieId, page, publie, recherche])

  useEffect(() => {
    document.title = 'Produits | Admin Ben Massage'
  }, [])

  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  useEffect(() => {
    loadProduits()
  }, [loadProduits])

  const doTogglePublie = async (p: Produit, nextPublie: boolean) => {
    setBusyId(p.id)
    try {
      await productService.updateProduit(p.id, { publie: nextPublie })
      setToast({ type: 'success', msg: nextPublie ? 'Produit publié' : 'Produit désactivé' })
      await loadProduits()
    } catch (err: any) {
      setToast({ type: 'error', msg: err.message || 'Action impossible' })
    } finally {
      setBusyId(null)
    }
  }

  const doRemoveProduit = async (p: Produit) => {
    setBusyId(p.id)
    try {
      await productService.deleteProduit(p.id)
      setToast({ type: 'success', msg: 'Produit supprimé' })
      setPage(1)
      await loadProduits()
    } catch (err: any) {
      setToast({ type: 'error', msg: err.message || 'Suppression impossible' })
    } finally {
      setBusyId(null)
    }
  }

  const doUpdateStock = async (p: Produit, nextStock: number) => {
    setBusyId(p.id)
    try {
      await productService.updateProduit(p.id, { stock: nextStock })
      setToast({ type: 'success', msg: 'Stock mis à jour' })
      await loadProduits()
    } catch (err: any) {
      setToast({ type: 'error', msg: err.message || 'Mise à jour impossible' })
    } finally {
      setBusyId(null)
    }
  }

  const canPrev = page > 1
  const canNext = page < pages

  return (
    <AdminLayout
      title="Produits"
      topbarRight={
        <div className="flex items-center gap-2">
          <Link
            to="/products"
            className="flex items-center gap-2 px-4 py-2 rounded-full font-label-md text-label-md border border-outline-variant/40 hover:bg-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">storefront</span>
            Voir la boutique
          </Link>
          <Link
            to="/admin/products/add"
            className="flex items-center gap-2 bg-surface-container-highest px-4 py-2 rounded-full font-label-md text-label-md hover:bg-secondary-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            Ajouter un produit
          </Link>
        </div>
      }
    >
      {toast && <Toast type={toast.type} message={toast.msg} onClose={() => setToast(null)} />}
      <ConfirmDialog
        open={Boolean(confirmAction)}
        title={
          confirmAction?.type === 'delete'
            ? 'Supprimer le produit'
            : confirmAction?.nextPublie
            ? 'Publier le produit'
            : 'Désactiver le produit'
        }
        description={
          confirmAction?.type === 'delete'
            ? `Supprimer définitivement "${confirmAction.produit.nom}" ? Cette action est irréversible.`
            : confirmAction
            ? `Confirmer l’action sur "${confirmAction.produit.nom}" ?`
            : undefined
        }
        tone={confirmAction?.type === 'delete' ? 'danger' : 'primary'}
        confirmLabel={confirmAction?.type === 'delete' ? 'Supprimer' : 'Confirmer'}
        loading={Boolean(confirmAction?.produit && busyId === confirmAction.produit.id)}
        onClose={() => setConfirmAction(null)}
        onConfirm={async () => {
          if (!confirmAction) return
          const p = confirmAction.produit
          if (confirmAction.type === 'delete') {
            await doRemoveProduit(p)
          } else {
            await doTogglePublie(p, confirmAction.nextPublie)
          }
          setConfirmAction(null)
        }}
      />
      <StockDialog
        open={Boolean(stockAction)}
        initialStock={stockAction?.stock ?? 0}
        loading={Boolean(stockAction && busyId === stockAction.id)}
        onClose={() => setStockAction(null)}
        onSave={async (nextStock) => {
          if (!stockAction) return
          await doUpdateStock(stockAction, nextStock)
          setStockAction(null)
        }}
      />

      <div className="p-4 sm:p-6 md:p-10 space-y-6 max-w-[1400px] mx-auto w-full">
        <div className="bg-white rounded-xl border border-outline-variant/30 p-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5">
              <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Recherche</label>
              <input
                value={recherche}
                onChange={(e) => {
                  setPage(1)
                  setRecherche(e.target.value)
                }}
                placeholder="Nom ou description"
                className="w-full bg-surface-container-low px-4 py-3 rounded-xl border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="md:col-span-4">
              <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Catégorie</label>
              {loadingCats ? (
                <div className="py-3"><Spinner size="sm" /></div>
              ) : (
                <Select
                  value={categorieId}
                  onChange={(v) => {
                    setPage(1)
                    setCategorieId(v)
                  }}
                  placeholder="Toutes"
                  options={[
                    { value: '', label: 'Toutes' },
                    ...categories.map((c) => ({ value: c.id, label: c.nom })),
                  ]}
                />
              )}
            </div>
            <div className="md:col-span-3">
              <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Statut</label>
              <Select
                value={publieFilter}
                onChange={(v) => {
                  setPage(1)
                  setPublieFilter(v as PublieFilter)
                }}
                options={[
                  { value: 'all', label: 'Tous' },
                  { value: 'published', label: 'Publiés' },
                  { value: 'disabled', label: 'Désactivés' },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="font-body-md text-on-surface-variant">
            {loading ? 'Chargement…' : `${total} produit(s)`}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              disabled={!canPrev || loading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className={`px-3 py-2 rounded-lg border border-outline-variant/40 font-label-md text-label-md ${
                !canPrev || loading ? 'opacity-40 cursor-not-allowed' : 'hover:bg-surface-variant'
              }`}
            >
              Précédent
            </button>
            <div className="px-3 py-2 font-label-md text-label-md text-on-surface-variant">
              Page {page} / {pages}
            </div>
            <button
              disabled={!canNext || loading}
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              className={`px-3 py-2 rounded-lg border border-outline-variant/40 font-label-md text-label-md ${
                !canNext || loading ? 'opacity-40 cursor-not-allowed' : 'hover:bg-surface-variant'
              }`}
            >
              Suivant
            </button>
          </div>
        </div>

        <div className="lg:hidden space-y-4">
          {loading ? (
            <div className="bg-white rounded-xl border border-outline-variant/30 p-6">
              <Spinner />
            </div>
          ) : produits.length === 0 ? (
            <div className="bg-white rounded-xl border border-outline-variant/30 p-6 text-on-surface-variant">
              Aucun produit.
            </div>
          ) : (
            produits.map((p) => {
              const disabled = busyId === p.id
              return (
                <div key={p.id} className="bg-white rounded-xl border border-outline-variant/30 p-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-surface-variant border border-outline-variant/30 flex-shrink-0">
                      {p.images?.[0] ? (
                        <img src={p.images[0]} alt={p.nom} className="w-full h-full object-cover" />
                      ) : null}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="font-label-md text-label-md text-primary truncate">{p.nom}</div>
                          <div className="font-caption text-caption text-on-surface-variant">
                            {p.description?.slice(0, 80) || ''}
                            {p.description && p.description.length > 80 ? '…' : ''}
                          </div>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-[11px] font-bold uppercase tracking-tight whitespace-nowrap ${
                            p.publie ? 'bg-status-confirmed text-white' : 'bg-outline-variant/60 text-on-surface'
                          }`}
                        >
                          {p.publie ? 'PUBLIÉ' : 'DÉSACTIVÉ'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-on-surface-variant">
                    <div className="bg-surface-container-low rounded-xl p-3 border border-outline-variant/30">
                      <div className="font-caption text-caption opacity-70">SKU</div>
                      <div className="font-label-md text-label-md break-all">{p.sku || '—'}</div>
                    </div>
                    <div className="bg-surface-container-low rounded-xl p-3 border border-outline-variant/30">
                      <div className="font-caption text-caption opacity-70">Catégorie</div>
                      <div className="font-label-md text-label-md">{p.categorie?.nom || '—'}</div>
                    </div>
                    <div className="bg-surface-container-low rounded-xl p-3 border border-outline-variant/30">
                      <div className="font-caption text-caption opacity-70">Prix</div>
                      <div className="font-label-md text-label-md">{formatPriceFCFA(p.prix)}</div>
                    </div>
                    <div className="bg-surface-container-low rounded-xl p-3 border border-outline-variant/30">
                      <div className="font-caption text-caption opacity-70">Stock</div>
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-label-md text-label-md">{p.stock}</div>
                        <button
                          disabled={disabled}
                          onClick={() => setStockAction(p)}
                          className={`px-3 py-2 rounded-lg border border-outline-variant/40 font-label-md text-label-md  cursor-pointer hover:bg-surface-variant transition-colors ${
                            disabled ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          Modifier
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-on-surface-variant">
                    <div className="flex-1 bg-surface-container-low rounded-xl p-3 border border-outline-variant/30">
                      <div className="font-caption text-caption opacity-70">Avis</div>
                      <div className="font-label-md text-label-md">{p._count?.avis ?? 0}</div>
                    </div>
                    <div className="flex-1 bg-surface-container-low rounded-xl p-3 border border-outline-variant/30">
                      <div className="font-caption text-caption opacity-70">Likes</div>
                      <div className="font-label-md text-label-md">{p._count?.likes ?? 0}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <Link
                      to={`/admin/products/${p.id}/edit`}
                      className="px-3 py-2 rounded-lg border border-outline-variant/40 font-label-md text-label-md cursor-pointer  hover:bg-surface-variant transition-colors text-center"
                    >
                      Modifier
                    </Link>
                    <button
                      disabled={disabled}
                      onClick={() => setConfirmAction({ type: 'togglePublie', produit: p, nextPublie: !p.publie })}
                      className={`px-3 py-2 rounded-lg font-label-md text-label-md transition-colors ${
                        p.publie ? 'border border-outline-variant/40 hover:bg-surface-variant' : 'bg-primary text-white hover:opacity-90'
                      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {p.publie ? 'Désactiver' : 'Publier'}
                    </button>
                    <button
                      disabled={disabled}
                      onClick={() => setConfirmAction({ type: 'delete', produit: p })}
                      className={`px-3 py-2 rounded-lg bg-error text-white font-label-md text-label-md hover:opacity-90 transition-opacity ${
                        disabled ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>

        <div className="hidden lg:block overflow-x-auto bg-white rounded-xl border border-outline-variant/30">
          <table className="w-full text-left font-body-md">
            <thead>
              <tr className="border-b border-outline-variant/40">
                {['Produit', 'SKU', 'Catégorie', 'Prix', 'Stock', 'Statut', 'Avis', 'Likes', 'Actions'].map((h) => (
                  <th key={h} className="py-4 px-4 font-label-md text-label-md text-on-surface-variant whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} className="p-6">
                    <Spinner />
                  </td>
                </tr>
              ) : produits.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-6 text-on-surface-variant">Aucun produit.</td>
                </tr>
              ) : (
                produits.map((p) => {
                  const disabled = busyId === p.id
                  return (
                    <tr key={p.id} className="border-b border-outline-variant/30 last:border-b-0">
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-surface-variant border border-outline-variant/30 flex-shrink-0">
                            {p.images?.[0] ? (
                              <img src={p.images[0]} alt={p.nom} className="w-full h-full object-cover" />
                            ) : null}
                          </div>
                          <div className="min-w-[220px]">
                            <div className="font-label-md text-label-md text-primary">{p.nom}</div>
                            <div className="font-caption text-caption text-on-surface-variant">
                              {p.description?.slice(0, 48) || ''}
                              {p.description && p.description.length > 48 ? '…' : ''}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-on-surface-variant">{p.sku || '—'}</td>
                      <td className="py-4 px-4 whitespace-nowrap text-on-surface-variant">{p.categorie?.nom || '—'}</td>
                      <td className="py-4 px-4 whitespace-nowrap text-on-surface-variant">{formatPriceFCFA(p.prix)}</td>
                      <td className="py-4 px-4 whitespace-nowrap text-on-surface-variant">
                        <div className="flex items-center gap-2">
                          <span>{p.stock}</span>
                          <button
                            disabled={disabled}
                            onClick={() => setStockAction(p)}
                            className={`px-2 py-1 rounded-lg border border-outline-variant/40 font-label-md text-label-md hover:bg-surface-variant transition-colors ${
                              disabled ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            Modifier
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-[11px] font-bold uppercase tracking-tight ${
                          p.publie ? 'bg-status-confirmed text-white' : 'bg-outline-variant/60 text-on-surface'
                        }`}>
                          {p.publie ? 'PUBLIÉ' : 'DÉSACTIVÉ'}
                        </span>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-on-surface-variant">{p._count?.avis ?? 0}</td>
                      <td className="py-4 px-4 whitespace-nowrap text-on-surface-variant">{p._count?.likes ?? 0}</td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/admin/products/${p.id}/edit`}
                            className="px-3 py-2 rounded-lg border border-outline-variant/40 font-label-md  text-label-md hover:bg-surface-variant transition-colors"
                          >
                            Modifier
                          </Link>
                          <button
                            disabled={disabled}
                            onClick={() => setConfirmAction({ type: 'togglePublie', produit: p, nextPublie: !p.publie })}
                            className={`px-3 py-2 rounded-lg font-label-md text-label-md transition-colors ${
                              p.publie ? 'border border-outline-variant/40 hover:bg-surface-variant' : 'bg-primary text-white hover:opacity-90'
                            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            {p.publie ? 'Désactiver' : 'Publier'}
                          </button>
                          <button
                            disabled={disabled}
                            onClick={() => setConfirmAction({ type: 'delete', produit: p })}
                            className={`px-3 py-2 rounded-lg bg-error text-white font-label-md text-label-md hover:opacity-90 transition-opacity ${
                              disabled ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
