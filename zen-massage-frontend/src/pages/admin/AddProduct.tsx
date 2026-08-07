import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout'
import { productService } from '../../services/product.service'
import type { Categorie } from '../../types/product'
import Spinner from '../../components/ui/Spinner'
import Toast from '../../components/ui/Toast'
import Select from '../../components/ui/Select'
import { useAuth } from '../../context/AuthContext'

const PREVIEW_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFHIs1ak4AzIeabY5CkyJcifU8KuqW1FkS97qVzfxXT0g6xmJhkOqKIvaZtOPy9ePFZWfd52lUYALhHYZ6RNVl-EhCbLGsvddh78lQPlB1EOzNFxd1gyXOf0DqVneLQxOfjWYz_oJq6Z47S1HOTw55cqedhKXS_1dCOM8ms7w6qHiJnkptNwQLFc5luC0t407nLcOQ2labKTIzWxVy9Y4H_dYPdcBhYQMyVCTvKImT651VnhW1EYhk2Tx-lQ7C4ExDFwuGiPkabdOu'

export default function AddProduct() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [categories, setCategories] = useState<Categorie[]>([])
  const [loadingCats, setLoadingCats] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [uploadingImages, setUploadingImages] = useState(false)
  const [creatingCategory, setCreatingCategory] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; msg: string } | null>(null)

  const [form, setForm] = useState({
    nom: '',
    description: '',
    prix: '',
    stock: '',
    categorie_id: '',
  })
  const [publie, setPublie] = useState(true)
  const [images, setImages] = useState<string[]>([])
  const [newCategory, setNewCategory] = useState({ nom: '', description: '', icone: '' })

  useEffect(() => {
    document.title = 'Ajouter un produit | Admin Ben Massage'
  }, [])

  const loadCategories = useCallback(async () => {
    try {
      const res = await productService.getCategories()
      setCategories(res.data)
    } catch (err: any) {
      setToast({ type: 'error', msg: err.message || 'Erreur catégories' })
    } finally {
      setLoadingCats(false)
    }
  }, [])

  useEffect(() => { loadCategories() }, [loadCategories])

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const uploadFiles = async (files: FileList | File[]) => {
    const incoming = Array.from(files as any).slice(0, Math.max(0, 3 - images.length)) as File[]
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

  const createCategory = async () => {
    if (!newCategory.nom.trim()) {
      setToast({ type: 'error', msg: 'Nom de catégorie requis' })
      return
    }
    setCreatingCategory(true)
    try {
      const res = await productService.createCategorie({
        nom: newCategory.nom.trim(),
        description: newCategory.description?.trim() || undefined,
        icone: newCategory.icone?.trim() || undefined,
      })
      await loadCategories()
      setForm((f) => ({ ...f, categorie_id: res.data.id }))
      setNewCategory({ nom: '', description: '', icone: '' })
      setToast({ type: 'success', msg: 'Catégorie créée' })
    } catch (err: any) {
      setToast({ type: 'error', msg: err.message || 'Création impossible' })
    } finally {
      setCreatingCategory(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
      await productService.createProduit({
        nom: form.nom,
        description: form.description,
        prix: Number(form.prix),
        stock: Number(form.stock),
        categorie_id: form.categorie_id,
        images,
        publie,
      })
      setToast({ type: 'success', msg: 'Produit créé avec succès !' })
      setTimeout(() => navigate('/admin'), 1500)
    } catch (err: any) {
      setToast({ type: 'error', msg: err.message || 'Erreur de création' })
    } finally {
      setSubmitting(false)
    }
  }

  const previewPrice = form.prix
    ? `${parseInt(form.prix || '0', 10).toLocaleString('fr-FR')} FCFA`
    : '12 500 FCFA'
  const previewName     = form.nom        || 'Organic Lavender Oil'
  const previewDesc     = form.description || "Experience profound calm with our artisanal lavender extract, ethically sourced from Gabonese highlands."
  const previewCategory = form.categorie_id
    ? categories.find(c => c.id === form.categorie_id)?.nom
    : 'Huiles Essentielles'
  const previewImg = images[0] || PREVIEW_IMG

  return (
    <AdminLayout title="Ajouter un produit"
      topbarRight={
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-colors">notifications</span>
          {/* <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-colors">help</span> */}
          <div className="h-8 w-8 rounded-full overflow-hidden border border-outline-variant bg-sand-light flex items-center justify-center font-bold text-sage-deep">
            {user ? `${(user.firstName || 'U').slice(0,1)}${(user.lastName || '').slice(0,1)}` : 'U'}
          </div>
        </div>
      }
    >
      {toast && <Toast type={toast.type} message={toast.msg} onClose={() => setToast(null)} />}

      <form onSubmit={handleSubmit} className="p-4 md:p-8 lg:p-12 max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

        {/* ── Form ── */}
        <div className="lg:col-span-7 space-y-8 lg:space-y-12">

          {/* Section 1 — Informations générales */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="h-8 w-8 rounded-full bg-sand-light flex items-center justify-center text-sage-deep font-bold font-label-md flex-shrink-0">1</span>
              <h3 className="font-headline-sm text-headline-sm text-charcoal-muted">Informations générales</h3>
            </div>
            <div className="space-y-6 pl-0 md:pl-11">
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Nom du produit *</label>
                <input
                  type="text"
                  value={form.nom}
                  onChange={e => set('nom', e.target.value)}
                  placeholder="ex. Huile Essentielle de Lavande Bio"
                  className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-0 font-body-lg text-body-lg placeholder:opacity-30 focus:outline-none focus:border-sage-deep transition-colors"
                  style={{ boxShadow: 'none' }}
                  onFocus={e => (e.currentTarget.style.boxShadow = '0 1px 0 0 #4A594D')}
                  onBlur={e => (e.currentTarget.style.boxShadow = 'none')}
                  required
                />
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Description *</label>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={e => set('description', e.target.value)}
                  placeholder="Décrivez les bienfaits thérapeutiques et les ingrédients..."
                  className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-0 font-body-md text-body-md resize-none placeholder:opacity-30 focus:outline-none focus:border-sage-deep transition-colors"
                  style={{ boxShadow: 'none' }}
                  onFocus={e => (e.currentTarget.style.boxShadow = '0 1px 0 0 #4A594D')}
                  onBlur={e => (e.currentTarget.style.boxShadow = 'none')}
                  required
                />
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Référence (SKU)</label>
                <input
                  type="text"
                  value=""
                  placeholder="Généré automatiquement (ex. ZEN-PROD-001)"
                  disabled
                  className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-0 font-body-lg text-body-lg placeholder:opacity-60 opacity-60 focus:outline-none"
                  style={{ boxShadow: 'none' }}
                />
              </div>
            </div>
          </section>

          {/* Section 2 — Prix & Inventaire */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="h-8 w-8 rounded-full bg-sand-light flex items-center justify-center text-sage-deep font-bold font-label-md flex-shrink-0">2</span>
              <h3 className="font-headline-sm text-headline-sm text-charcoal-muted">Prix &amp; Inventaire</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pl-0 md:pl-11">
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Prix (FCFA) *</label>
                <div className="flex items-center border-b border-outline-variant focus-within:border-sage-deep transition-colors"
                  style={{ boxShadow: 'none' }}>
                  <input
                    type="number"
                    value={form.prix}
                    onChange={e => set('prix', e.target.value)}
                    placeholder="0"
                    min="0"
                    className="w-full bg-transparent border-0 py-3 px-0 font-body-lg text-body-lg placeholder:opacity-30 focus:outline-none focus:ring-0"
                    required
                  />
                  <span className="font-label-md text-label-md text-on-surface-variant opacity-60 ml-2">FCFA</span>
                </div>
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Stock *</label>
                <input
                  type="number"
                  value={form.stock}
                  onChange={e => set('stock', e.target.value)}
                  placeholder="0"
                  min="0"
                  className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-0 font-body-lg text-body-lg placeholder:opacity-30 focus:outline-none focus:border-sage-deep transition-colors"
                  style={{ boxShadow: 'none' }}
                  onFocus={e => (e.currentTarget.style.boxShadow = '0 1px 0 0 #4A594D')}
                  onBlur={e => (e.currentTarget.style.boxShadow = 'none')}
                  required
                />
              </div>
              <div className="col-span-2 relative">
                <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Catégorie *</label>
                {loadingCats ? (
                  <div className="py-3"><Spinner size="sm" /></div>
                ) : (
                  <Select
                    value={form.categorie_id}
                    onChange={(v) => set('categorie_id', v)}
                    placeholder="Sélectionner une catégorie"
                    options={[
                      { value: '', label: 'Sélectionner une catégorie' },
                      ...categories.map((c) => ({ value: c.id, label: c.nom })),
                    ]}
                  />
                )}
              </div>

              <div className="col-span-2 bg-sand-light/30 border border-outline-variant/30 rounded-xl p-5">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div>
                    <h4 className="font-label-md text-label-md text-charcoal-muted">Ajouter une catégorie</h4>
                    <p className="font-caption text-caption text-on-surface-variant opacity-70">Création rapide sans quitter la page</p>
                  </div>
                  <button
                    type="button"
                    onClick={createCategory}
                    disabled={creatingCategory}
                    className="px-5 py-2 rounded-full bg-primary text-white font-label-md hover:bg-sage-deep transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
                  >
                    {creatingCategory && <Spinner size="sm" color="white" />}
                    Ajouter
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Nom *</label>
                    <input
                      type="text"
                      value={newCategory.nom}
                      onChange={(e) => setNewCategory((c) => ({ ...c, nom: e.target.value }))}
                      placeholder="ex. Huiles Essentielles"
                      className="w-full bg-white border border-outline-variant rounded-xl px-4 py-3 font-body-md focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Icône</label>
                    <input
                      type="text"
                      value={newCategory.icone}
                      onChange={(e) => setNewCategory((c) => ({ ...c, icone: e.target.value }))}
                      placeholder="ex. 🌿"
                      className="w-full bg-white border border-outline-variant rounded-xl px-4 py-3 font-body-md focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Description</label>
                    <input
                      type="text"
                      value={newCategory.description}
                      onChange={(e) => setNewCategory((c) => ({ ...c, description: e.target.value }))}
                      placeholder="Optionnel"
                      className="w-full bg-white border border-outline-variant rounded-xl px-4 py-3 font-body-md focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 — Médias */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="h-8 w-8 rounded-full bg-sand-light flex items-center justify-center text-sage-deep font-bold font-label-md flex-shrink-0">3</span>
              <h3 className="font-headline-sm text-headline-sm text-charcoal-muted">Images du produit (max 3)</h3>
            </div>
            <div className="pl-0 md:pl-11">
              <div
                onDragOver={(e) => { e.preventDefault() }}
                onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files?.length) uploadFiles(e.dataTransfer.files) }}
                className="border-2 border-dashed border-outline-variant rounded-xl p-10 text-center hover:border-sage-deep transition-colors bg-surface-container-low/50"
              >
                <input
                  id="product-images"
                  type="file"
                  accept="image/*"
                  multiple
                  disabled={uploadingImages || images.length >= 3}
                  onChange={(e) => { if (e.target.files?.length) uploadFiles(e.target.files) }}
                  className="hidden"
                />
                <label htmlFor="product-images" className="cursor-pointer block">
                  <span className="material-symbols-outlined text-4xl text-outline-variant mb-4 block">
                    cloud_upload
                  </span>
                  <p className="font-label-md text-label-md text-on-surface-variant mb-1">
                    Glissez-déposez vos images ici, ou cliquez pour choisir
                  </p>
                  <p className="font-caption text-caption text-on-surface-variant opacity-60">
                    Jusqu'à 3 images (PNG/JPG), 10Mo max chacune
                  </p>
                  {(uploadingImages) && (
                    <div className="mt-4 flex justify-center">
                      <Spinner size="sm" />
                    </div>
                  )}
                </label>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="col-span-2 row-span-2 aspect-[4/5] rounded-xl overflow-hidden bg-surface-container-low border border-outline-variant/30 relative">
                  {images[0] ? (
                    <>
                      <img src={images[0]} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(0)}
                        className="absolute top-2 right-2 h-8 w-8 bg-white/90 rounded-full flex items-center justify-center cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-error">close</span>
                      </button>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-outline-variant font-caption">
                      Image principale
                    </div>
                  )}
                </div>

                <div className="aspect-square rounded-xl overflow-hidden bg-surface-container-low border border-outline-variant/30 relative">
                  {images[1] ? (
                    <>
                      <img src={images[1]} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(1)}
                        className="absolute top-2 right-2 h-8 w-8 bg-white/90 rounded-full flex items-center justify-center cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-error">close</span>
                      </button>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-outline-variant font-caption">
                      Image 2
                    </div>
                  )}
                </div>

                <div className="aspect-square rounded-xl overflow-hidden bg-surface-container-low border border-outline-variant/30 relative">
                  {images[2] ? (
                    <>
                      <img src={images[2]} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(2)}
                        className="absolute top-2 right-2 h-8 w-8 bg-white/90 rounded-full flex items-center justify-center cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-error">close</span>
                      </button>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-outline-variant font-caption">
                      Image 3
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="pt-8 border-t border-outline-variant/30 flex gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3 bg-sage-deep text-white rounded-lg font-label-md text-label-md hover:brightness-110 active:scale-95 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
            >
              {submitting && <Spinner size="sm" />}
              Enregistrer le produit
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="px-8 py-3 bg-transparent border border-outline text-on-surface-variant rounded-lg font-label-md text-label-md hover:bg-surface-variant transition-all cursor-pointer"
            >
              Annuler
            </button>
          </div>
        </div>

        {/* ── Preview ── */}
        <aside className="lg:col-span-5 lg:sticky lg:top-24 h-fit">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-sand-light">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h4 className="font-label-md text-label-md text-sage-deep mb-1 uppercase tracking-widest">Aperçu live</h4>
                <p className="font-caption text-caption text-on-surface-variant opacity-60">Tel que vu par les clients</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${
                publie ? 'bg-status-confirmed/10 text-status-confirmed' : 'bg-outline-variant/20 text-on-surface-variant'
              }`}>
                {publie ? 'En stock' : 'Brouillon'}
              </span>
            </div>

            {/* Product card preview */}
            <div className="max-w-sm mx-auto group">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-6 bg-surface-container">
                <img
                  src={previewImg}
                  alt="preview"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => { (e.target as any).src = PREVIEW_IMG }}
                />
                <div className="absolute inset-0 bg-charcoal-muted/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
              <div className="space-y-4 text-center">
                <p className="font-caption text-caption text-secondary uppercase tracking-[0.2em]">
                  {previewCategory}
                </p>
                <h3 className="font-display-lg text-2xl text-charcoal-muted leading-tight">
                  {previewName}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant italic line-clamp-2">
                  {previewDesc}
                </p>
                <div className="pt-4 border-t border-sand-light flex items-center justify-between">
                  <span className="font-display-lg text-xl text-sage-deep">{previewPrice}</span>
                  <button type="button" className="h-10 w-10 rounded-full border border-sage-deep text-sage-deep flex items-center justify-center hover:bg-sage-deep hover:text-white transition-colors duration-500">
                    <span className="material-symbols-outlined text-lg">shopping_bag</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Visibility toggle */}
            <div className="mt-12 p-6 bg-sand-light/50 rounded-xl space-y-4">
              <h5 className="font-label-md text-label-md text-charcoal-muted">Visibilité du produit</h5>
              <div className="flex items-center justify-between">
                <span className="font-body-md text-body-md opacity-70">Visible dans la boutique</span>
                <button
                  type="button"
                  onClick={() => setPublie(v => !v)}
                  className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${publie ? 'bg-sage-deep' : 'bg-outline-variant'}`}
                >
                  <div className={`absolute top-1 h-4 w-4 bg-white rounded-full transition-all duration-300 ${publie ? 'right-1' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </div>
        </aside>
      </form>
    </AdminLayout>
  )
}
