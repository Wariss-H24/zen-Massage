import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout'
import Spinner from '../../components/ui/Spinner'
import Toast from '../../components/ui/Toast'
import { productService } from '../../services/product.service'
import Select from '../../components/ui/Select'
import type { Categorie, Produit } from '../../types/product'

export default function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [categories, setCategories] = useState<Categorie[]>([])
  const [loadingCats, setLoadingCats] = useState(true)
  const [loadingProd, setLoadingProd] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [uploadingImages, setUploadingImages] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; msg: string } | null>(null)

  const [produit, setProduit] = useState<Produit | null>(null)
  const [form, setForm] = useState({
    nom: '',
    description: '',
    prix: '',
    stock: '',
    categorie_id: '',
  })
  const [publie, setPublie] = useState(true)
  const [images, setImages] = useState<string[]>([])

  const canUploadMore = useMemo(() => Math.max(0, 3 - images.length), [images.length])

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

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

  const loadProduit = useCallback(async () => {
    if (!id) return
    setLoadingProd(true)
    try {
      const res = await productService.getProduit(id)
      const p = res.data.produit
      setProduit(p)
      setForm({
        nom: p.nom || '',
        description: p.description || '',
        prix: String(p.prix ?? ''),
        stock: String(p.stock ?? ''),
        categorie_id: p.categorie_id || '',
      })
      setPublie(Boolean(p.publie))
      setImages(Array.isArray(p.images) ? p.images.slice(0, 3) : [])
    } catch (err: any) {
      setToast({ type: 'error', msg: err.message || 'Produit introuvable' })
    } finally {
      setLoadingProd(false)
    }
  }, [id])

  useEffect(() => {
    document.title = 'Modifier un produit | Admin Ben Massage'
  }, [])

  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  useEffect(() => {
    loadProduit()
  }, [loadProduit])

  const uploadFiles = async (files: FileList | File[]) => {
    const incoming = Array.from(files as any).slice(0, canUploadMore) as File[]
    const valid = incoming.filter((f) => f.type?.startsWith('image/'))
    if (valid.length === 0) {
      setToast({ type: 'error', msg: 'Veuillez sélectionner une image valide' })
      return
    }
    setUploadingImages(true)
    try {
      const res = await productService.uploadProductImages(valid)
      const next = [...images, ...res.data.urls].slice(0, 3)
      setImages(next)
      setToast({ type: 'success', msg: 'Images ajoutées' })
    } catch (err: any) {
      setToast({ type: 'error', msg: err.message || 'Upload impossible' })
    } finally {
      setUploadingImages(false)
    }
  }

  const removeImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) return
    if (!form.nom || !form.description || !form.prix || !form.stock || !form.categorie_id) {
      setToast({ type: 'error', msg: 'Veuillez remplir tous les champs obligatoires' })
      return
    }
    if (images.length === 0) {
      setToast({ type: 'error', msg: 'Veuillez ajouter au moins une image (max 3)' })
      return
    }
    setSubmitting(true)
    try {
      await productService.updateProduit(id, {
        nom: form.nom,
        description: form.description,
        prix: Number(form.prix),
        stock: Number(form.stock),
        categorie_id: form.categorie_id,
        images,
        publie,
      })
      setToast({ type: 'success', msg: 'Produit mis à jour' })
      setTimeout(() => navigate('/admin/products'), 800)
    } catch (err: any) {
      setToast({ type: 'error', msg: err.message || 'Mise à jour impossible' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AdminLayout title="Modifier un produit">
      {toast && <Toast type={toast.type} message={toast.msg} onClose={() => setToast(null)} />}

      <div className="p-6 md:p-10 max-w-[1100px] mx-auto w-full">
        {(loadingProd || loadingCats) && (
          <div className="py-10 flex justify-center">
            <Spinner />
          </div>
        )}

        {!loadingProd && produit && (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white rounded-xl border border-outline-variant/30 p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Nom du produit *</label>
                  <input
                    value={form.nom}
                    onChange={(e) => set('nom', e.target.value)}
                    className="w-full bg-surface-container-low px-4 py-3 rounded-xl border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Description *</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => set('description', e.target.value)}
                    rows={5}
                    className="w-full bg-surface-container-low px-4 py-3 rounded-xl border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Prix (FCFA) *</label>
                  <input
                    value={form.prix}
                    onChange={(e) => set('prix', e.target.value)}
                    type="number"
                    min="0"
                    className="w-full bg-surface-container-low px-4 py-3 rounded-xl border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Stock *</label>
                  <input
                    value={form.stock}
                    onChange={(e) => set('stock', e.target.value)}
                    type="number"
                    min="0"
                    className="w-full bg-surface-container-low px-4 py-3 rounded-xl border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Catégorie *</label>
                  <Select
                    value={form.categorie_id}
                    onChange={(v) => set('categorie_id', v)}
                    placeholder="Sélectionner"
                    options={[
                      { value: '', label: 'Sélectionner' },
                      ...categories.map((c) => ({ value: c.id, label: c.nom })),
                    ]}
                  />
                </div>

                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Référence (SKU)</label>
                  <input
                    value={produit.sku || ''}
                    disabled
                    className="w-full bg-surface-container-low px-4 py-3 rounded-xl border border-outline-variant/40 opacity-70"
                    placeholder="ZEN-PROD-001"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <label className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant">
                  <input
                    type="checkbox"
                    checked={publie}
                    onChange={(e) => setPublie(e.target.checked)}
                    className="rounded text-primary focus:ring-primary"
                  />
                  Produit publié
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => navigate('/admin/products')}
                    className="px-4 py-2 rounded-lg border border-outline-variant/40 font-label-md text-label-md hover:bg-surface-variant transition-colors cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`px-4 py-2 rounded-lg bg-primary text-white font-label-md text-label-md hover:opacity-90 transition-opacity ${
                      submitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                    }`}
                  >
                    {submitting ? 'Enregistrement…' : 'Enregistrer'}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-outline-variant/30 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-sm text-headline-sm text-charcoal-muted">Images</h3>
                <label className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-label-md text-label-md cursor-pointer ${
                  uploadingImages || canUploadMore === 0 ? 'opacity-50 cursor-not-allowed bg-surface-variant' : 'bg-surface-container-highest hover:bg-secondary-container'
                }`}>
                  <span className="material-symbols-outlined text-[20px]">upload</span>
                  Ajouter ({canUploadMore})
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    disabled={uploadingImages || canUploadMore === 0}
                    onChange={(e) => e.target.files && uploadFiles(e.target.files)}
                    className="hidden"
                  />
                </label>
              </div>

              {images.length === 0 ? (
                <div className="text-on-surface-variant">Aucune image.</div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((url, idx) => (
                    <div key={url} className="relative rounded-xl overflow-hidden border border-outline-variant/30 bg-surface-variant">
                      <img src={url} alt={`Image ${idx + 1}`} className="w-full h-40 object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-2 right-2 bg-black/60 text-white rounded-full w-9 h-9 flex items-center justify-center hover:bg-black/70 cursor-pointer"
                        aria-label="Supprimer l'image"
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  )
}
