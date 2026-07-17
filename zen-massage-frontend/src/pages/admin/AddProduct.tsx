import { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'

const CATEGORIES = [
  { value: 'oils',   label: 'Huiles Essentielles' },
  { value: 'creams', label: 'Crèmes Thérapeutiques' },
  { value: 'herbal', label: 'Tisanes & Infusions' },
  { value: 'tools',  label: 'Accessoires Bien-être' },
]

const PREVIEW_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFHIs1ak4AzIeabY5CkyJcifU8KuqW1FkS97qVzfxXT0g6xmJhkOqKIvaZtOPy9ePFZWfd52lUYALhHYZ6RNVl-EhCbLGsvddh78lQPlB1EOzNFxd1gyXOf0DqVneLQxOfjWYz_oJq6Z47S1HOTw55cqedhKXS_1dCOM8ms7w6qHiJnkptNwQLFc5luC0t407nLcOQ2labKTIzWxVy9Y4H_dYPdcBhYQMyVCTvKImT651VnhW1EYhk2Tx-lQ7C4ExDFwuGiPkabdOu'
const SAMPLE_IMG  = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbzjCRJLX8FZeVz2KWT-xrkKMB17g3pB2U8SD5VsS2xiMNRoQZL4zV78HsYHgjkYcM83w7oKmXo6i4rctjsPk8FgZuReHBuTg-3AR8moYWe8j9tUE_dhyVnR6zRvdEGI4qNiLq06ilsSLDCcBAE080A0vqnN_uwu1O8wDJfWkCkQ1RooBycAsixExENmguMTaqwefocYiM3LqXd8lw0HnvEl-o-YsmSpFbu-cJDqOGQKybux4WmhPvWg3Y1eGMo4hMiiGMA8G-fgd5'
const AVATAR_IMG  = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRuQAbMEenIdiU0LxXlbHVsOaytVCnYn-VDBMdNNa0inEktowgbsQ1-ETKwSUc_zBC9ycwDOlA70_5qDNV9mvWjf5kIkmOY2ho5z6bYDeX2nctOkTERduPPzWY6-N0cCP2XKHF26B1oOwPBkhAKKkAIupBKxPFOseGxuuQJIYLbnYQyHE82h2vf4jiprjT9muUecjw4dzHIoPIb8X6YdxD_D3wAAvdnDqy9I71O0W-aQ7zn45zzTaYE2O-h-IlZ9Z7p8UQPN4be7pA'

export default function AddProduct() {
  const [form, setForm] = useState({ name: '', description: '', price: '', stock: '', category: '' })
  const [visible, setVisible] = useState(true)

  useEffect(() => { document.title = 'Ajouter un produit | Admin Ben Massage' }, [])

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const previewPrice = form.price
    ? `${parseInt(form.price).toLocaleString('fr-FR')} FCFA`
    : '12 500 FCFA'
  const previewName     = form.name        || 'Organic Lavender Oil'
  const previewDesc     = form.description || "Experience profound calm with our artisanal lavender extract, ethically sourced from Gabonese highlands."
  const previewCategory = form.category
    ? CATEGORIES.find(c => c.value === form.category)?.label
    : 'Huiles Essentielles'

  return (
    <AdminLayout title="Ajouter un produit"
      topbarRight={
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-colors">notifications</span>
          <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-colors">help</span>
          <div className="h-8 w-8 rounded-full overflow-hidden border border-outline-variant">
            <img src={AVATAR_IMG} alt="Admin" className="w-full h-full object-cover" />
          </div>
        </div>
      }
    >
      <div className="p-12 max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* ── Form ── */}
          <div className="lg:col-span-7 space-y-12">

            {/* Section 1 — Informations générales */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-full bg-sand-light flex items-center justify-center text-sage-deep font-bold font-label-md flex-shrink-0">1</span>
                <h3 className="font-headline-sm text-headline-sm text-charcoal-muted">Informations générales</h3>
              </div>
              <div className="space-y-8 pl-11">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Nom du produit</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => set('name', e.target.value)}
                    placeholder="ex. Huile Essentielle de Lavande Bio"
                    className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-0 font-body-lg text-body-lg placeholder:opacity-30 focus:outline-none focus:border-sage-deep transition-colors"
                    style={{ boxShadow: 'none' }}
                    onFocus={e => (e.currentTarget.style.boxShadow = '0 1px 0 0 #4A594D')}
                    onBlur={e => (e.currentTarget.style.boxShadow = 'none')}
                  />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Description</label>
                  <textarea
                    rows={4}
                    value={form.description}
                    onChange={e => set('description', e.target.value)}
                    placeholder="Décrivez les bienfaits thérapeutiques et les ingrédients..."
                    className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-0 font-body-md text-body-md resize-none placeholder:opacity-30 focus:outline-none focus:border-sage-deep transition-colors"
                    style={{ boxShadow: 'none' }}
                    onFocus={e => (e.currentTarget.style.boxShadow = '0 1px 0 0 #4A594D')}
                    onBlur={e => (e.currentTarget.style.boxShadow = 'none')}
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
              <div className="grid grid-cols-2 gap-8 pl-11">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Prix (FCFA)</label>
                  <div className="flex items-center border-b border-outline-variant focus-within:border-sage-deep transition-colors"
                    style={{ boxShadow: 'none' }}>
                    <input
                      type="number"
                      value={form.price}
                      onChange={e => set('price', e.target.value)}
                      placeholder="0"
                      className="w-full bg-transparent border-0 py-3 px-0 font-body-lg text-body-lg placeholder:opacity-30 focus:outline-none focus:ring-0"
                    />
                    <span className="font-label-md text-label-md text-on-surface-variant opacity-60 ml-2">FCFA</span>
                  </div>
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Stock</label>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={e => set('stock', e.target.value)}
                    placeholder="0"
                    className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-0 font-body-lg text-body-lg placeholder:opacity-30 focus:outline-none focus:border-sage-deep transition-colors"
                    style={{ boxShadow: 'none' }}
                    onFocus={e => (e.currentTarget.style.boxShadow = '0 1px 0 0 #4A594D')}
                    onBlur={e => (e.currentTarget.style.boxShadow = 'none')}
                  />
                </div>
                <div className="col-span-2 relative">
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Catégorie</label>
                  <select
                    value={form.category}
                    onChange={e => set('category', e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-0 font-body-md text-body-md appearance-none focus:outline-none focus:border-sage-deep transition-colors"
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {CATEGORIES.map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-0 bottom-3 pointer-events-none opacity-40">expand_more</span>
                </div>
              </div>
            </section>

            {/* Section 3 — Médias */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-full bg-sand-light flex items-center justify-center text-sage-deep font-bold font-label-md flex-shrink-0">3</span>
                <h3 className="font-headline-sm text-headline-sm text-charcoal-muted">Médias du produit</h3>
              </div>
              <div className="pl-11">
                <label
                  htmlFor="file-upload"
                  className="border-2 border-dashed border-outline-variant rounded-xl p-12 text-center group hover:border-sage-deep transition-colors cursor-pointer bg-surface-container-low/50 block"
                >
                  <input id="file-upload" type="file" accept="image/*" className="hidden" />
                  <span className="material-symbols-outlined text-4xl text-outline-variant group-hover:text-sage-deep transition-colors mb-4 block">cloud_upload</span>
                  <p className="font-label-md text-label-md text-on-surface-variant mb-1">Glissez-déposez vos images ici</p>
                  <p className="font-caption text-caption text-on-surface-variant opacity-60">PNG, JPG jusqu'à 10Mo</p>
                </label>

                <div className="mt-6 flex gap-4 overflow-x-auto pb-4">
                  {/* Sample uploaded image */}
                  <div className="h-24 w-24 rounded-lg bg-surface-variant relative overflow-hidden flex-shrink-0 group">
                    <img src={SAMPLE_IMG} alt="preview" className="w-full h-full object-cover" />
                    <button className="absolute top-1 right-1 h-6 w-6 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-sm text-error">close</span>
                    </button>
                  </div>
                  {/* Add more */}
                  <div className="h-24 w-24 rounded-lg border border-outline-variant flex items-center justify-center flex-shrink-0 opacity-40 cursor-pointer hover:opacity-70 transition-opacity">
                    <span className="material-symbols-outlined">add</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Actions */}
            <div className="pt-8 border-t border-outline-variant/30 flex gap-4">
              <button className="px-8 py-3 bg-sage-deep text-white rounded-lg font-label-md text-label-md hover:brightness-110 active:scale-95 transition-all shadow-md">
                Enregistrer le produit
              </button>
              <button className="px-8 py-3 bg-transparent border border-outline text-on-surface-variant rounded-lg font-label-md text-label-md hover:bg-surface-variant transition-all">
                Annuler
              </button>
            </div>
          </div>

          {/* ── Preview ── */}
          <aside className="lg:col-span-5 sticky top-24 h-fit">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-sand-light">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h4 className="font-label-md text-label-md text-sage-deep mb-1 uppercase tracking-widest">Aperçu live</h4>
                  <p className="font-caption text-caption text-on-surface-variant opacity-60">Tel que vu par les clients</p>
                </div>
                <span className="bg-status-confirmed/10 text-status-confirmed px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                  En stock
                </span>
              </div>

              {/* Product card preview */}
              <div className="max-w-sm mx-auto group">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-6 bg-surface-container">
                  <img
                    src={PREVIEW_IMG}
                    alt="preview"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
                    <button className="h-10 w-10 rounded-full border border-sage-deep text-sage-deep flex items-center justify-center hover:bg-sage-deep hover:text-white transition-colors duration-500">
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
                    onClick={() => setVisible(v => !v)}
                    className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${visible ? 'bg-sage-deep' : 'bg-outline-variant'}`}
                  >
                    <div className={`absolute top-1 h-4 w-4 bg-white rounded-full transition-all duration-300 ${visible ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between opacity-50">
                  <span className="font-body-md text-body-md">Planifier le lancement</span>
                  <span className="material-symbols-outlined">calendar_today</span>
                </div>
              </div>
            </div>
          </aside>
      </div>
    </AdminLayout>
  )
}
