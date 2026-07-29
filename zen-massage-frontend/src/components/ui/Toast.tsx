import { useEffect } from 'react'

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface ToastProps {
  type?: ToastType
  message: string
  duration?: number
  onClose: () => void
}

const ICON_MAP: Record<ToastType, string> = {
  success: 'check_circle',
  error:   'error',
  info:    'info',
  warning: 'warning',
}

export default function Toast({
  type = 'info',
  message,
  duration = 4000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    if (duration <= 0) return
    const t = setTimeout(onClose, duration)
    return () => clearTimeout(t)
  }, [duration, onClose])

  const bg = type === 'success'
    ? 'bg-[#2e7d32]/95 text-white'
    : type === 'error'
    ? 'bg-[#ba1a1a]/95 text-white'
    : type === 'warning'
    ? 'bg-[#f59e0b]/95 text-white'
    : 'bg-primary-container text-on-primary-container border border-primary'

  return (
    <div className="fixed top-6 right-6 z-[9999] animate-[slideIn_0.3s_ease-out] max-w-sm w-full">
      <div className={`${bg} shadow-lg rounded-xl px-5 py-4 flex items-start gap-3 backdrop-blur-sm`}>
        <span
          className="material-symbols-outlined text-lg mt-0.5 flex-shrink-0"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {ICON_MAP[type]}
        </span>
        <p className="font-body-md text-body-md flex-grow">{message}</p>
        <button
          onClick={onClose}
          className="ml-2 p-1 rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
          aria-label="Fermer"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>
    </div>
  )
}
