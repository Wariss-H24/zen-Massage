import { useEffect, useState } from 'react'
import Modal from './Modal'

interface Props {
  open: boolean
  title?: string
  initialStock: number
  loading?: boolean
  onClose: () => void
  onSave: (nextStock: number) => void
}

export default function StockDialog({ open, title = 'Modifier le stock', initialStock, loading = false, onClose, onSave }: Props) {
  const [value, setValue] = useState(String(initialStock))

  useEffect(() => {
    if (!open) return
    setValue(String(initialStock))
  }, [initialStock, open])

  const stock = Math.max(0, Number(value || 0))

  return (
    <Modal open={open} title={title} onClose={loading ? () => {} : onClose}>
      <div className="space-y-5">
        <div>
          <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Nouveau stock</label>
          <input
            type="number"
            min="0"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full bg-surface-container-low px-4 py-3 rounded-xl border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary"
            disabled={loading}
          />
        </div>
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className={`px-4 py-2 rounded-lg border border-outline-variant/40 font-label-md text-label-md hover:bg-surface-variant transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            Annuler
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => onSave(stock)}
            className={`px-4 py-2 rounded-lg bg-primary text-white font-label-md text-label-md hover:opacity-90 transition-opacity ${
              loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            {loading ? 'Enregistrement…' : 'Enregistrer'}
          </button>
        </div>
      </div>
    </Modal>
  )
}
