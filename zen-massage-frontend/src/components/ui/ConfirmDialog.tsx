import Modal from './Modal'

interface Props {
  open: boolean
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  tone?: 'danger' | 'primary'
  loading?: boolean
  onConfirm: () => void
  onClose: () => void
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirmer',
  cancelLabel = 'Annuler',
  tone = 'primary',
  loading = false,
  onConfirm,
  onClose,
}: Props) {
  const confirmClass =
    tone === 'danger'
      ? 'bg-error text-white hover:opacity-90'
      : 'bg-primary text-white hover:opacity-90'

  return (
    <Modal open={open} title={title} onClose={loading ? () => {} : onClose}>
      {description ? <p className="text-on-surface-variant font-body-md mb-6">{description}</p> : null}
      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          disabled={loading}
          onClick={onClose}
          className={`px-4 py-2 rounded-lg border border-outline-variant/40 font-label-md text-label-md hover:bg-surface-variant transition-colors ${
            loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={onConfirm}
          className={`px-4 py-2 rounded-lg font-label-md text-label-md transition-opacity ${confirmClass} ${
            loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          {loading ? 'Veuillez patienter…' : confirmLabel}
        </button>
      </div>
    </Modal>
  )
}
