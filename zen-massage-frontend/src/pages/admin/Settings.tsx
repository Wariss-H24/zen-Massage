import { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { useAuth } from '../../context/AuthContext'
import { appointmentService, type TypeSeance } from '../../services/appointment.service'

type Tab = 'profile' | 'notifications' | 'security' | 'system' | 'services'

/* ── Toggle switch ── */
function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`w-11 h-6 rounded-full relative transition-colors duration-300 flex-shrink-0 ${checked ? 'bg-primary' : 'bg-surface-container-highest'}`}
    >
      <div className={`absolute top-1 h-4 w-4 bg-white rounded-full shadow transition-all duration-300 ${checked ? 'right-1' : 'left-1'}`} />
    </button>
  )
}

/* ── Underline input ── */
function UInput({ label, type = 'text', defaultValue = '', rows }: { label: string; type?: string; defaultValue?: string; rows?: number }) {
  const base = 'w-full bg-transparent border-0 border-b border-outline-variant py-2 px-0 font-body-md text-body-md focus:outline-none transition-colors'
  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => (e.currentTarget.style.borderBottomColor = '#4A594D')
  const blur  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => (e.currentTarget.style.borderBottomColor = '')
  return (
    <div className="space-y-1">
      <label className="font-label-md text-label-md text-on-surface-variant">{label}</label>
      {rows
        ? <textarea rows={rows} defaultValue={defaultValue} className={`${base} resize-none`} onFocus={focus} onBlur={blur} />
        : <input type={type} defaultValue={defaultValue} className={base} onFocus={focus} onBlur={blur} />}
    </div>
  )
}

/* ── Number row ── */
function NumRow({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <label className="font-body-md text-on-surface-variant text-sm">{label}</label>
      <input type="number" defaultValue={defaultValue} className="w-20 text-right bg-transparent border-0 border-b border-outline-variant focus:outline-none font-semibold shrink-0" />
    </div>
  )
}

/* ── Format helpers ── */
function fmtDuree(d: number) {
  if (d < 60) return `${d} min`
  const h = Math.floor(d / 60), m = d % 60
  return m > 0 ? `${h}h${String(m).padStart(2, '0')}` : `${h}h`
}
function fmtPrix(p: number) { return p.toLocaleString('fr-FR') + ' FCFA' }

/* ── Field wrapper ── */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="font-label-md text-label-md text-on-surface-variant block">{label}</label>
      {children}
    </div>
  )
}

const INPUT_CLS = 'w-full px-3 py-2.5 rounded-lg border border-outline-variant/50 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors'
const EMPTY_FORM = { nom: '', description: '', duree: 60, prix: 0, actif: true }

/* ══════════════════════════════════════════
   SERVICES TAB
══════════════════════════════════════════ */
function ServicesTab() {
  const [services, setServices]         = useState<TypeSeance[]>([])
  const [loading, setLoading]           = useState(true)
  const [modalOpen, setModalOpen]       = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<TypeSeance | null>(null)
  const [editing, setEditing]           = useState<TypeSeance | null>(null)
  const [form, setForm]                 = useState(EMPTY_FORM)
  const [saving, setSaving]             = useState(false)
  const [deleting, setDeleting]         = useState(false)
  const [error, setError]               = useState<string | null>(null)
  const [success, setSuccess]           = useState<string | null>(null)

  function flash(type: 'ok' | 'err', msg: string) {
    if (type === 'ok') { setSuccess(msg); setTimeout(() => setSuccess(null), 3000) }
    else               { setError(msg);   setTimeout(() => setError(null),   4000) }
  }

  async function load() {
    setLoading(true)
    try { const res = await appointmentService.getAllTypeSeancesAdmin(); setServices(res.data ?? []) }
    catch { flash('err', 'Impossible de charger les services') }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function openCreate() { setEditing(null); setForm(EMPTY_FORM); setModalOpen(true) }
  function openEdit(s: TypeSeance) {
    setEditing(s)
    setForm({ nom: s.nom, description: s.description, duree: s.duree, prix: s.prix, actif: s.actif })
    setModalOpen(true)
  }

  async function handleSave() {
    if (!form.nom.trim() || !form.description.trim() || form.duree <= 0 || form.prix < 0) {
      flash('err', 'Remplissez tous les champs obligatoires'); return
    }
    setSaving(true)
    try {
      if (editing) {
        const res = await appointmentService.updateTypeSeance(editing.id, form)
        setServices(prev => prev.map(s => s.id === editing.id ? res.data : s))
        flash('ok', 'Service mis à jour')
      } else {
        const res = await appointmentService.createTypeSeance(form)
        setServices(prev => [...prev, res.data])
        flash('ok', 'Service créé')
      }
      setModalOpen(false)
    } catch (e: any) { flash('err', e.message || 'Erreur lors de la sauvegarde') }
    setSaving(false)
  }

  async function handleDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await appointmentService.deleteTypeSeance(deleteTarget.id)
      setServices(prev => prev.filter(s => s.id !== deleteTarget.id))
      flash('ok', 'Service supprimé'); setDeleteTarget(null)
    } catch (e: any) { flash('err', e.message || 'Impossible de supprimer'); setDeleteTarget(null) }
    setDeleting(false)
  }

  return (
    <div className="space-y-5">
      {/* ── Header ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-headline-sm text-headline-sm text-sage-deep">Types de massage</h3>
          <p className="text-sm text-on-surface-variant mt-0.5">Gérez les services proposés aux clients pour la prise de rendez-vous.</p>
        </div>
        <button onClick={openCreate} className="flex items-center justify-center gap-2 bg-sage-deep text-white px-5 py-2.5 rounded-full font-label-md text-label-md hover:opacity-90 transition-opacity w-full sm:w-auto shrink-0">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Nouveau service
        </button>
      </div>

      {/* ── Toasts ── */}
      {success && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>{success}
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
          <span className="material-symbols-outlined text-[18px]">error</span>{error}
        </div>
      )}

      {/* ── Skeleton ── */}
      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-16 bg-outline-variant/10 rounded-xl animate-pulse" />)}
        </div>
      )}

      {/* ── Vide ── */}
      {!loading && services.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-on-surface-variant bg-white rounded-xl border border-outline-variant/30">
          <span className="material-symbols-outlined text-5xl mb-3">spa</span>
          <p className="font-body-md text-center px-4">Aucun service. Cliquez sur "Nouveau service" pour commencer.</p>
        </div>
      )}

      {/* ── Vue MOBILE : cartes (< md) ── */}
      {!loading && services.length > 0 && (
        <div className="md:hidden space-y-3">
          {services.map(s => (
            <div key={s.id} className="bg-white rounded-xl border border-outline-variant/30 shadow-sm p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-sage-deep/10 flex items-center justify-center text-sage-deep font-bold text-xs shrink-0 mt-0.5">
                    {s.nom.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-label-md text-label-md text-sage-deep truncate">{s.nom}</p>
                    <p className="text-xs text-on-surface-variant line-clamp-2 mt-0.5">{s.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => openEdit(s)} className="p-2 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                  <button onClick={() => setDeleteTarget(s)} className="p-2 rounded-lg hover:bg-red-50 text-on-surface-variant hover:text-red-600 transition-colors">
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-outline-variant/20 flex-wrap">
                <span className="inline-flex items-center gap-1 text-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-[13px]">schedule</span>{fmtDuree(s.duree)}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-sage-deep">
                  <span className="material-symbols-outlined text-[13px]">payments</span>{fmtPrix(s.prix)}
                </span>
                <span className={`ml-auto px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${s.actif ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-surface-container text-on-surface-variant border border-outline-variant/40'}`}>
                  {s.actif ? 'Actif' : 'Inactif'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Vue TABLETTE + DESKTOP : tableau (≥ md) ── */}
      {!loading && services.length > 0 && (
        <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden border border-outline-variant/30">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead className="bg-surface-container-low border-b border-outline-variant/30">
                <tr>
                  {['Nom', 'Description', 'Durée', 'Prix', 'Statut', 'Actions'].map(h => (
                    <th key={h} className="px-4 py-3 font-label-md text-label-md text-on-surface-variant text-sm">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {services.map(s => (
                  <tr key={s.id} className="hover:bg-surface-container-lowest transition-colors group">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-sage-deep/10 flex items-center justify-center text-sage-deep font-bold text-xs shrink-0">
                          {s.nom.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase()}
                        </div>
                        <span className="font-label-md text-label-md text-sage-deep">{s.nom}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 max-w-[200px] lg:max-w-xs">
                      <p className="text-sm text-on-surface-variant truncate">{s.description}</p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-on-surface-variant">
                      <span className="inline-flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">schedule</span>{fmtDuree(s.duree)}</span>
                    </td>
                    <td className="px-4 py-3 font-label-md text-label-md text-sage-deep whitespace-nowrap">{fmtPrix(s.prix)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide ${s.actif ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-surface-container text-on-surface-variant border border-outline-variant/40'}`}>
                        {s.actif ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors" title="Modifier">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button onClick={() => setDeleteTarget(s)} className="p-1.5 rounded-lg hover:bg-red-50 text-on-surface-variant hover:text-red-600 transition-colors" title="Supprimer">
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Modal Créer / Modifier — slide-up mobile, centré sm+ ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-lg max-h-[95dvh] flex flex-col">
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-outline-variant/20 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-sage-deep/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-sage-deep text-[20px]">spa</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-sage-deep">
                  {editing ? 'Modifier le service' : 'Nouveau service'}
                </h3>
              </div>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded-full hover:bg-surface-container transition-colors shrink-0">
                <span className="material-symbols-outlined text-on-surface-variant">close</span>
              </button>
            </div>
            <div className="px-5 py-5 space-y-4 overflow-y-auto flex-1">
              <Field label="Nom du service *">
                <input className={INPUT_CLS} value={form.nom} onChange={e => setForm(f => ({ ...f, nom: e.target.value }))} placeholder="ex: Massage Relaxant" maxLength={100} />
              </Field>
              <Field label="Description *">
                <textarea className={`${INPUT_CLS} resize-none`} rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Décrivez brièvement ce service..." maxLength={500} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Durée (min) *">
                  <input type="number" className={INPUT_CLS} value={form.duree} min={5} max={300} step={5} onChange={e => setForm(f => ({ ...f, duree: parseInt(e.target.value) || 0 }))} />
                </Field>
                <Field label="Prix (FCFA) *">
                  <input type="number" className={INPUT_CLS} value={form.prix} min={0} step={500} onChange={e => setForm(f => ({ ...f, prix: parseInt(e.target.value) || 0 }))} />
                </Field>
              </div>
              {(form.prix > 0 || form.duree > 0) && (
                <p className="text-xs text-on-surface-variant bg-sage-deep/5 px-3 py-2 rounded-lg">
                  Affiché : <span className="font-semibold text-sage-deep">{fmtPrix(form.prix)}</span>
                  {form.duree > 0 && <> — <span className="font-semibold text-sage-deep">{fmtDuree(form.duree)}</span></>}
                </p>
              )}
              <Field label="Statut">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <div onClick={() => setForm(f => ({ ...f, actif: !f.actif }))} className={`w-11 h-6 rounded-full relative transition-colors duration-200 shrink-0 ${form.actif ? 'bg-sage-deep' : 'bg-outline-variant'}`}>
                    <div className={`absolute top-1 h-4 w-4 bg-white rounded-full shadow transition-all duration-200 ${form.actif ? 'right-1' : 'left-1'}`} />
                  </div>
                  <span className="text-sm text-on-surface-variant">{form.actif ? 'Visible aux clients' : 'Masqué (inactif)'}</span>
                </label>
              </Field>
            </div>
            <div className="flex gap-3 px-5 pb-6 pt-3 border-t border-outline-variant/10 shrink-0">
              <button onClick={() => setModalOpen(false)} disabled={saving} className="flex-1 py-3 font-label-md text-label-md border border-outline-variant/40 rounded-xl hover:bg-surface-container transition-colors">Annuler</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 py-3 font-label-md text-label-md bg-sage-deep text-white rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50">
                {saving ? 'Enregistrement…' : editing ? 'Enregistrer' : 'Créer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal Suppression — slide-up mobile, centré sm+ ── */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-sm p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-red-600">delete_forever</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-sage-deep">Supprimer ce service ?</h3>
            </div>
            <p className="text-sm text-on-surface-variant">
              Le service <span className="font-semibold text-sage-deep">"{deleteTarget.nom}"</span> sera définitivement supprimé. Cette action est irréversible.
            </p>
            <div className="flex gap-3 pt-1">
              <button onClick={() => setDeleteTarget(null)} disabled={deleting} className="flex-1 py-3 font-label-md text-label-md border border-outline-variant/40 rounded-xl hover:bg-surface-container transition-colors">Annuler</button>
              <button onClick={handleDelete} disabled={deleting} className="flex-1 py-3 font-label-md text-label-md bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50">
                {deleting ? 'Suppression…' : 'Supprimer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════
   PAGE SETTINGS
══════════════════════════════════════════ */
export default function Settings() {
  const { user } = useAuth()
  const [tab, setTab] = useState<Tab>('profile')
  const [notifs, setNotifs] = useState({ bookings: true, daily: false, stock: true, newsletter: false })

  useEffect(() => { document.title = 'Paramètres | Admin Ben Massage' }, [])

  const initials = user ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase() : '?'

  const tabs: { id: Tab; label: string; shortLabel: string; icon: string }[] = [
    { id: 'profile',       label: 'Profil',           shortLabel: 'Profil',     icon: 'person'      },
    { id: 'services',      label: 'Types de massage', shortLabel: 'Services',   icon: 'spa'         },
    { id: 'notifications', label: 'Notifications',    shortLabel: 'Notifs',     icon: 'notifications' },
    { id: 'security',      label: 'Sécurité',         shortLabel: 'Sécurité',   icon: 'lock'        },
    { id: 'system',        label: 'Système',          shortLabel: 'Système',    icon: 'settings'    },
  ]

  return (
    <AdminLayout title="Paramètres">
      <div className="px-4 sm:px-6 md:px-8 pb-20 pt-6 md:pt-8 max-w-5xl mx-auto">

        {/* ── Tab nav — scrollable horizontal, icône seule sur xs ── */}
        <div className="flex border-b border-outline-variant overflow-x-auto mb-6 md:mb-8 -mx-4 sm:-mx-6 md:mx-0 px-4 sm:px-6 md:px-0">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 pb-3 px-3 sm:px-4 font-label-md text-label-md whitespace-nowrap transition-all shrink-0 ${
                tab === t.id ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[17px]">{t.icon}</span>
              <span className="hidden sm:inline">{t.shortLabel}</span>
            </button>
          ))}
        </div>

        {/* ── Services ── */}
        {tab === 'services' && <ServicesTab />}

        {/* ── Profil ── */}
        {tab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="md:col-span-1">
              <h3 className="font-headline-sm text-headline-sm mb-2">Informations Personnelles</h3>
              <p className="font-body-md text-on-surface-variant opacity-80 text-sm">Mettez à jour vos détails personnels et votre adresse email.</p>
              <div className="mt-6 flex flex-row md:flex-col items-center gap-6 md:gap-0 md:items-start">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-surface-container relative group cursor-pointer flex items-center justify-center text-3xl md:text-4xl font-bold text-sage-deep shrink-0">
                  <span>{initials}</span>
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                    <span className="material-symbols-outlined text-white">photo_camera</span>
                  </div>
                </div>
                <div className="md:mt-4">
                  <button className="text-primary font-label-md text-label-md hover:underline">Changer la photo</button>
                </div>
              </div>
            </div>
            <div className="md:col-span-2 bg-white rounded-xl p-5 md:p-6 shadow-sm space-y-5 md:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                <UInput label="Prénom" defaultValue={user?.firstName || ''} />
                <UInput label="Nom"    defaultValue={user?.lastName  || ''} />
              </div>
              <UInput label="Email Professionnel" type="email" defaultValue={user?.email || ''} />
              <UInput label="Bio / Spécialité" defaultValue="Spécialiste en massages thérapeutiques et aromathérapie holistique. 12 ans d'expérience." rows={3} />
              <div className="pt-3 flex flex-col sm:flex-row justify-end gap-3">
                <button className="w-full sm:w-auto px-6 py-2.5 font-label-md text-label-md text-primary border border-primary rounded-full hover:bg-primary-fixed transition-colors">
                  Annuler
                </button>
                <button className="w-full sm:w-auto px-6 py-2.5 font-label-md text-label-md text-white rounded-full hover:opacity-90 active:scale-95 transition-all shadow-md" style={{ backgroundColor: '#425646' }}>
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Notifications ── */}
        {tab === 'notifications' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="md:col-span-1">
              <h3 className="font-headline-sm text-headline-sm mb-2">Centre de Notifications</h3>
              <p className="font-body-md text-on-surface-variant opacity-80 text-sm">Gérez comment et quand vous souhaitez être informé des activités de la plateforme.</p>
            </div>
            <div className="md:col-span-2 bg-white rounded-xl p-5 md:p-6 shadow-sm divide-y divide-outline-variant/30">
              {([
                { key: 'bookings',   title: 'Confirmations de rendez-vous', desc: 'Recevoir un email pour chaque nouvelle réservation.' },
                { key: 'daily',      title: 'Rappels quotidiens',           desc: 'Récapitulatif de votre agenda chaque matin à 08h00.' },
                { key: 'stock',      title: 'Alertes de stock',             desc: 'Notification lorsque vos produits atteignent le seuil critique.' },
                { key: 'newsletter', title: 'Newsletters & Mises à jour',   desc: 'Conseils bien-être et nouvelles fonctionnalités admin.' },
              ] as const).map(item => (
                <div key={item.key} className="flex items-center justify-between gap-4 py-4">
                  <div className="min-w-0">
                    <p className="font-label-md text-label-md text-on-surface">{item.title}</p>
                    <p className="font-caption text-on-surface-variant text-xs mt-0.5">{item.desc}</p>
                  </div>
                  <Toggle checked={notifs[item.key]} onChange={() => setNotifs(n => ({ ...n, [item.key]: !n[item.key] }))} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Sécurité ── */}
        {tab === 'security' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="md:col-span-1">
              <h3 className="font-headline-sm text-headline-sm mb-2">Sécurité & Accès</h3>
              <p className="font-body-md text-on-surface-variant opacity-80 text-sm">Protégez votre compte avec des mesures de sécurité avancées.</p>
            </div>
            <div className="md:col-span-2 space-y-5 md:space-y-6">
              {/* Mot de passe */}
              <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm space-y-5 md:space-y-6">
                <div className="flex items-center gap-3 text-primary">
                  <span className="material-symbols-outlined">lock</span>
                  <h4 className="font-label-md text-label-md">Changer le mot de passe</h4>
                </div>
                <UInput label="Mot de passe actuel" type="password" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                  <UInput label="Nouveau mot de passe" type="password" />
                  <UInput label="Confirmer" type="password" />
                </div>
                <button className="w-full sm:w-auto px-6 py-2.5 font-label-md text-label-md text-primary border border-primary rounded-full hover:bg-primary-fixed transition-colors">
                  Mettre à jour le mot de passe
                </button>
              </div>
              {/* 2FA */}
              <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-l-4 border-[#7A9E7E]">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full shrink-0" style={{ backgroundColor: 'rgba(122,158,126,0.1)' }}>
                    <span className="material-symbols-outlined text-[#7A9E7E]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                  </div>
                  <div>
                    <h4 className="font-label-md text-label-md">Double Authentification (2FA)</h4>
                    <p className="font-caption text-on-surface-variant text-xs mt-0.5">Sécurisez votre accès avec un code mobile.</p>
                  </div>
                </div>
                <span className="self-start sm:self-center px-3 py-1 rounded-full font-label-md text-[12px] text-[#7A9E7E] shrink-0" style={{ backgroundColor: 'rgba(122,158,126,0.2)' }}>
                  ACTIVÉ
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ── Paramètres Système ── */}
        {tab === 'system' && (
          <div className="space-y-6 md:space-y-8">
            {/* Banner */}
            <div className="bg-primary-fixed/30 p-5 md:p-6 rounded-xl border border-primary-fixed-dim flex items-start sm:items-center gap-4">
              <span className="material-symbols-outlined text-primary text-3xl shrink-0">admin_panel_settings</span>
              <div>
                <h3 className="font-headline-sm text-[18px] md:text-[20px] text-primary">Contrôles Administrateur</h3>
                <p className="font-body-md text-on-surface-variant text-sm mt-0.5">Configuration globale de la boutique et de la facturation.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {/* Fiscalité */}
              <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm space-y-4 md:space-y-6">
                <h4 className="font-label-md text-label-md border-b border-outline-variant pb-2">Fiscalité & Commissions</h4>
                <div className="space-y-4">
                  <NumRow label="TVA applicable (%)"       defaultValue="20"   />
                  <NumRow label="Commission plateforme (%)" defaultValue="12"   />
                  <NumRow label="Frais de service fixe (€)" defaultValue="1.50" />
                </div>
              </div>

              {/* Logistique */}
              <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm space-y-4 md:space-y-6">
                <h4 className="font-label-md text-label-md border-b border-outline-variant pb-2">Expédition & Logistique</h4>
                <div className="space-y-4">
                  <NumRow label="Livraison standard (€)"      defaultValue="4.90" />
                  <NumRow label="Gratuité à partir de (€)"    defaultValue="75"   />
                  <NumRow label="Délai préparation max (h)"   defaultValue="48"   />
                </div>
              </div>

              {/* Boutique config */}
              <div className="md:col-span-2 bg-white rounded-xl p-5 md:p-6 shadow-sm">
                <h4 className="font-label-md text-label-md border-b border-outline-variant pb-3 mb-4">Configuration de la Boutique</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { icon: 'language',    title: 'Devises & Langues',       sub: 'EUR, FR/EN configurés' },
                    { icon: 'storefront',  title: "Horaires d'Ouverture",    sub: 'Lun-Sam: 09h00-19h00' },
                    { icon: 'credit_card', title: 'Passerelles de Paiement', sub: 'Stripe & PayPal actifs' },
                  ].map(card => (
                    <div key={card.icon} className="flex sm:flex-col items-center sm:items-start gap-4 sm:gap-0 p-4 border border-outline-variant rounded-lg hover:border-primary transition-colors cursor-pointer group">
                      <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary sm:mb-2 shrink-0">{card.icon}</span>
                      <div>
                        <p className="font-label-md text-label-md">{card.title}</p>
                        <p className="font-caption text-on-surface-variant text-xs mt-0.5">{card.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <footer className="py-8 mt-8 border-t border-outline-variant text-center opacity-30">
          <p className="font-label-md text-label-md">© 2024 Ben Massage & Wellness</p>
        </footer>
      </div>
    </AdminLayout>
  )
}
