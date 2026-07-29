import { useCallback, useEffect, useMemo, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import Modal from '../../components/ui/Modal'
import Spinner from '../../components/ui/Spinner'
import Toast from '../../components/ui/Toast'
import { productService } from '../../services/product.service'
import type { Categorie } from '../../types/product'

type FormState = {
  nom: string
  description: string
  icone: string
  ordre: string
}

function buildBody(form: FormState) {
  const nom = form.nom.trim()
  const description = form.description.trim()
  const icone = form.icone.trim()
  const ordre = Math.max(0, Number.parseInt(form.ordre || '0', 10) || 0)

  return {
    nom,
    ...(description ? { description } : {}),
    ...(icone ? { icone } : {}),
    ordre,
  }
}

export default function CategoriesManagement() {
  const [categories, setCategories] = useState<Categorie[]>([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; msg: string } | null>(null)

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Categorie | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<Categorie | null>(null)

  const [form, setForm] = useState<FormState>({
    nom: '',
    description: '',
    icone: '',
    ordre: '0',
  })

  const sorted = useMemo(() => {
    return [...categories].sort((a, b) => (a.ordre ?? 0) - (b.ordre ?? 0) || a.nom.localeCompare(b.nom))
  }, [categories])

  const loadCategories = useCallback(async () => {
    setLoading(true)
    try {
      const res = await productService.getCategories()
      setCategories(res.data)
    } catch (err: any) {
      setToast({ type: 'error', msg: err.message || 'Erreur catégories' })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    document.title = 'Catégories | Admin Ben Massage'
  }, [])

  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  const openCreate = () => {
    setEditing(null)
    setForm({ nom: '', description: '', icone: '', ordre: '0' })
    setModalOpen(true)
  }

  const openEdit = (c: Categorie) => {
    setEditing(c)
    setForm({
      nom: c.nom || '',
      description: c.description || '',
      icone: c.icone || '',
      ordre: String(c.ordre ?? 0),
    })
    setModalOpen(true)
  }

  const closeModal = () => {
    if (submitting) return
    setModalOpen(false)
    setEditing(null)
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return

    const nom = form.nom.trim()
    if (!nom) {
      setToast({ type: 'error', msg: 'Le nom est obligatoire' })
      return
    }

    setSubmitting(true)
    try {
      const body = buildBody(form)
      if (editing) {
        await productService.updateCategorie(editing.id, body)
        setToast({ type: 'success', msg: 'Catégorie mise à jour' })
      } else {
        await productService.createCategorie(body)
        setToast({ type: 'success', msg: 'Catégorie créée' })
      }
      setModalOpen(false)
      setEditing(null)
      await loadCategories()
    } catch (err: any) {
      setToast({ type: 'error', msg: err.message || 'Action impossible' })
    } finally {
      setSubmitting(false)
    }
  }

  const doDelete = async (c: Categorie) => {
    setBusyId(c.id)
    try {
      await productService.deleteCategorie(c.id)
      setToast({ type: 'success', msg: 'Catégorie supprimée' })
      await loadCategories()
    } catch (err: any) {
      setToast({ type: 'error', msg: err.message || 'Suppression impossible' })
    } finally {
      setBusyId(null)
    }
  }

  return (
    <AdminLayout
      title="Catégories"
      topbarRight={
        <button
          type="button"
          onClick={openCreate}
          className="flex items-center gap-2 bg-surface-container-highest px-4 py-2 rounded-full font-label-md text-label-md hover:bg-secondary-container transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Ajouter
        </button>
      }
    >
      {toast && <Toast type={toast.type} message={toast.msg} onClose={() => setToast(null)} />}

      <ConfirmDialog
        open={Boolean(confirmDelete)}
        title="Supprimer la catégorie"
        description={confirmDelete ? `Supprimer définitivement "${confirmDelete.nom}" ?` : undefined}
        tone="danger"
        confirmLabel="Supprimer"
        loading={Boolean(confirmDelete && busyId === confirmDelete.id)}
        onClose={() => setConfirmDelete(null)}
        onConfirm={async () => {
          if (!confirmDelete) return
          const c = confirmDelete
          setConfirmDelete(null)
          await doDelete(c)
        }}
      />

      <Modal open={modalOpen} title={editing ? 'Modifier la catégorie' : 'Nouvelle catégorie'} onClose={closeModal} maxWidthClassName="max-w-lg">
        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Nom *</label>
            <input
              value={form.nom}
              onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))}
              className="w-full bg-surface-container-low px-4 py-3 rounded-xl border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary"
              required
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={4}
              className="w-full bg-surface-container-low px-4 py-3 rounded-xl border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              disabled={submitting}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Icône</label>
              <input
                value={form.icone}
                onChange={(e) => setForm((f) => ({ ...f, icone: e.target.value }))}
                className="w-full bg-surface-container-low px-4 py-3 rounded-xl border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="spa"
                disabled={submitting}
              />
            </div>
            <div>
              <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Ordre</label>
              <input
                value={form.ordre}
                onChange={(e) => setForm((f) => ({ ...f, ordre: e.target.value }))}
                type="number"
                min="0"
                className="w-full bg-surface-container-low px-4 py-3 rounded-xl border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary"
                disabled={submitting}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              disabled={submitting}
              onClick={closeModal}
              className={`px-4 py-2 rounded-lg border border-outline-variant/40 font-label-md text-label-md hover:bg-surface-variant transition-colors ${
                submitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
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
        </form>
      </Modal>

      <div className="p-4 sm:p-6 md:p-10 space-y-6 max-w-[1400px] mx-auto w-full">
        <div className="flex items-center justify-between">
          <div className="font-body-md text-on-surface-variant">
            {loading ? 'Chargement…' : `${sorted.length} catégorie(s)`}
          </div>
          <button
            type="button"
            onClick={loadCategories}
            disabled={loading}
            className={`px-3 py-2 rounded-lg border border-outline-variant/40 font-label-md text-label-md ${
              loading ? 'opacity-40 cursor-not-allowed' : 'hover:bg-surface-variant cursor-pointer'
            }`}
          >
            Actualiser
          </button>
        </div>

        <div className="lg:hidden space-y-4">
          {loading ? (
            <div className="bg-white rounded-xl border border-outline-variant/30 p-6">
              <Spinner />
            </div>
          ) : sorted.length === 0 ? (
            <div className="bg-white rounded-xl border border-outline-variant/30 p-6 text-on-surface-variant">
              Aucune catégorie.
            </div>
          ) : (
            sorted.map((c) => {
              const disabled = busyId === c.id
              return (
                <div key={c.id} className="bg-white rounded-xl border border-outline-variant/30 p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-label-md text-label-md text-primary truncate">{c.nom}</div>
                      <div className="font-caption text-caption text-on-surface-variant">
                        {c.description ? (c.description.length > 90 ? `${c.description.slice(0, 90)}…` : c.description) : '—'}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      {c.icone ? <span className="material-symbols-outlined">{c.icone}</span> : null}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-on-surface-variant">
                    <div className="bg-surface-container-low rounded-xl p-3 border border-outline-variant/30">
                      <div className="font-caption text-caption opacity-70">Ordre</div>
                      <div className="font-label-md text-label-md">{c.ordre ?? 0}</div>
                    </div>
                    <div className="bg-surface-container-low rounded-xl p-3 border border-outline-variant/30">
                      <div className="font-caption text-caption opacity-70">Créée le</div>
                      <div className="font-label-md text-label-md">
                        {c.createdAt ? new Date(c.createdAt).toLocaleDateString('fr-FR') : '—'}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      disabled={disabled}
                      onClick={() => openEdit(c)}
                      className={`px-3 py-2 rounded-lg border border-outline-variant/40 font-label-md text-label-md hover:bg-surface-variant transition-colors ${
                        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                      }`}
                    >
                      Modifier
                    </button>
                    <button
                      type="button"
                      disabled={disabled}
                      onClick={() => setConfirmDelete(c)}
                      className={`px-3 py-2 rounded-lg bg-error text-white font-label-md text-label-md hover:opacity-90 transition-opacity ${
                        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
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
                {['Nom', 'Description', 'Ordre', 'Icône', 'Créée le', 'Actions'].map((h) => (
                  <th key={h} className="py-4 px-4 font-label-md text-label-md text-on-surface-variant whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-6">
                    <Spinner />
                  </td>
                </tr>
              ) : sorted.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-6 text-on-surface-variant">Aucune catégorie.</td>
                </tr>
              ) : (
                sorted.map((c) => {
                  const disabled = busyId === c.id
                  return (
                    <tr key={c.id} className="border-b border-outline-variant/30 last:border-b-0">
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="font-label-md text-label-md text-primary">{c.nom}</div>
                      </td>
                      <td className="py-4 px-4 text-on-surface-variant min-w-[360px]">
                        {c.description ? (c.description.length > 110 ? `${c.description.slice(0, 110)}…` : c.description) : '—'}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-on-surface-variant">{c.ordre ?? 0}</td>
                      <td className="py-4 px-4 whitespace-nowrap text-on-surface-variant">
                        {c.icone ? <span className="material-symbols-outlined">{c.icone}</span> : '—'}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-on-surface-variant">
                        {c.createdAt ? new Date(c.createdAt).toLocaleDateString('fr-FR') : '—'}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            disabled={disabled}
                            onClick={() => openEdit(c)}
                            className={`px-3 py-2 rounded-lg border border-outline-variant/40 font-label-md text-label-md hover:bg-surface-variant transition-colors ${
                              disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                            }`}
                          >
                            Modifier
                          </button>
                          <button
                            type="button"
                            disabled={disabled}
                            onClick={() => setConfirmDelete(c)}
                            className={`px-3 py-2 rounded-lg bg-error text-white font-label-md text-label-md hover:opacity-90 transition-opacity ${
                              disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
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
