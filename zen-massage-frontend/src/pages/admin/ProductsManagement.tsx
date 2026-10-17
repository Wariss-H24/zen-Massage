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
import { resolveImageUrl } from '../../utils/mediaUrl'

type PublieFilter = 'all' | 'published' | 'disabled'

function formatPriceFCFA(value: number) {
  return `${Math.round(value).toLocaleString('fr-FR')} FCFA`
}

/* ── Drawer aperçu rapide ── */
function ProductDrawer({ produit, onClose }: { produit: Produit; onClose: () => void }) {
  const image = resolveImageUrl(produit.images?.[0])
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-white shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant/20">
          <h3 className="font-semibold text-sage-deep truncate pr-4">{produit.nom}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-surface-container transition-colors shrink-0">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          <div className="w-full aspect-video rounded-2xl overflow-hidden bg-surface-container-low">
            {image
              ? <img src={image} alt={produit.nom} className="w-full h-full object-cover" />
              : <div className="w-full h-full flex items-center justify-center"><span className="material-symbols-outlined text-5xl text-outline-variant">inventory_2</span></div>
            }
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-tight ${
              produit.publie ? 'bg-green-100 text-green-700' : 'bg-outline-variant/40 text-on-surface-variant'
            }`}>
              {produit.publie ? 'Publié' : 'Désactivé'}
            </span>
            {produit.stock < 5 && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-100 text-red-600">Stock faible</span>
            )}
            {produit.categorie && (
              <span className="px-2.5 py-1 rounded-full text-[11px] bg-surface-container text-on-surface-variant">{produit.categorie.nom}</span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {([
              { label: 'Prix',  value: formatPriceFCFA(produit.prix) },
              { label: 'Stock', value: String(produit.stock) },
              { label: 'SKU',   value: produit.sku || '—' },
              { label: 'Avis',  value: String(produit._count?.avis ?? 0) },
            ]).map(({ label, value }) => (
              <div key={label} className="bg-surface-container-low rounded-xl p-3 border border-outline-variant/20">
                <p className="text-[10px] text-on-surface-variant uppercase tracking-wide mb-1">{label}</p>
                <p className="font-semibold text-sm text-on-surface">{value}</p>
              </div>
            ))}
          </div>
          {produit.description && (
            <div>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-wide mb-2">Description</p>
              <p className="text-sm text-on-surface-variant leading-relaxed">{produit.description}</p>
            </div>
          )}
          {produit.images.length > 1 && (
            <div>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-wide mb-2">Photos</p>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {produit.images.map((img, i) => (
                  <img key={i} src={resolveImageUrl(img)} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0 border border-outline-variant/20" />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="px-5 py-4 border-t border-outline-variant/20 flex gap-3">
          <Link
            to={`/admin/products/${produit.id}/edit`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-white rounded-xl font-label-md text-sm hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
            Modifier
          </Link>
          <Link
            to={`/products/${produit.id}`}
            target="_blank"
            className="flex items-center justify-center gap-2 px-4 py-2.5 border border-outline-variant/40 rounded-xl font-label-md text-sm hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">open_in_new</span>
          </Link>
        </div>
      </div>
    </>
  )
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
  const [drawerProduit, setDrawerProduit] = useState<Produit | null>(null)
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
            className="flex items-center gap-1.5 px-3 py-2 rounded-full font-label-md text-sm border border-outline-variant/40 hover:bg-surface-variant transition-colors"
            title="Voir la boutique"
          >
            <span className="material-symbols-outlined text-[18px]">storefront</span>
            <span className="hidden sm:inline">Voir la boutique</span>
          </Link>
          <Link
            to="/admin/products/add"
            className="flex items-center gap-1.5 bg-surface-container-highest px-3 py-2 rounded-full font-label-md text-sm hover:bg-secondary-container transition-colors"
            title="Ajouter un produit"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span className="hidden sm:inline">Ajouter un produit</span>
          </Link>
        </div>
      }
    >
      {toast && <Toast type={toast.type} message={toast.msg} onClose={() => setToast(null)} />}
      {drawerProduit && <ProductDrawer produit={drawerProduit} onClose={() => setDrawerProduit(null)} />}
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
                    <button
                      onClick={() => setDrawerProduit(p)}
                      className="w-14 h-14 rounded-xl overflow-hidden bg-surface-variant border border-outline-variant/30 flex-shrink-0 hover:opacity-80 transition-opacity"
                    >
                      {p.images?.[0] ? (
                        <img src={p.images[0]} alt={p.nom} className="w-full h-full object-cover" />
                      ) : <span className="material-symbols-outlined text-outline-variant text-2xl">inventory_2</span>}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <button onClick={() => setDrawerProduit(p)} className="font-label-md text-label-md text-primary truncate hover:underline text-left">{p.nom}</button>
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
                    <div className={`rounded-xl p-3 border ${
                      p.stock < 5 ? 'bg-red-50 border-red-200' : 'bg-surface-container-low border-outline-variant/30'
                    }`}>
                      <div className="font-caption text-caption opacity-70">Stock</div>
                      <div className="flex items-center justify-between gap-3">
                        <div className={`font-label-md text-label-md flex items-center gap-1.5 ${
                          p.stock < 5 ? 'text-red-600 font-bold' : ''
                        }`}>
                          {p.stock < 5 && (
                            <span className="material-symbols-outlined text-[14px] text-red-500" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                          )}
                          {p.stock}
                        </div>
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
                          <button
                            onClick={() => setDrawerProduit(p)}
                            className="w-10 h-10 rounded-lg overflow-hidden bg-surface-variant border border-outline-variant/30 flex-shrink-0 hover:opacity-80 transition-opacity"
                          >
                            {p.images?.[0] ? (
                              <img src={p.images[0]} alt={p.nom} className="w-full h-full object-cover" />
                            ) : <span className="material-symbols-outlined text-outline-variant text-lg">inventory_2</span>}
                          </button>
                          <div className="min-w-[220px]">
                            <button onClick={() => setDrawerProduit(p)} className="font-label-md text-label-md text-primary hover:underline text-left">{p.nom}</button>
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
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className={`font-label-md flex items-center gap-1 ${
                            p.stock < 5 ? 'text-red-600 font-bold' : 'text-on-surface-variant'
                          }`}>
                            {p.stock < 5 && (
                              <span className="material-symbols-outlined text-[14px] text-red-500" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                            )}
                            {p.stock}
                          </span>
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
