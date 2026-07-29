import { useEffect, type ReactNode } from 'react'

interface Props {
  open: boolean
  title?: string
  children: ReactNode
  onClose: () => void
  maxWidthClassName?: string
}

export default function Modal({ open, title, children, onClose, maxWidthClassName }: Props) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose, open])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" role="dialog" aria-modal="true">
      <button className="absolute inset-0 w-full h-full cursor-default" onClick={onClose} aria-label="Fermer la fenêtre" />
      <div
        className={`relative bg-white rounded-xl p-6 w-full shadow-2xl ${maxWidthClassName ?? 'max-w-md'}`}
      >
        <div className="flex items-center justify-between mb-6">
          {title ? (
            <h3 className="font-headline-sm text-headline-sm text-charcoal-muted">{title}</h3>
          ) : (
            <div />
          )}
          <button onClick={onClose} className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
