interface ErrorMessageProps {
  message: string
  type?: 'error' | 'warning' | 'info'
}

const ICONS: Record<string, string> = {
  error: 'error',
  warning: 'warning',
  info: 'info',
}

const STYLES: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  error: {
    bg: 'bg-error/10',
    border: 'border-error/20',
    text: 'text-error',
    icon: 'text-error',
  },
  warning: {
    bg: 'bg-status-pending/15',
    border: 'border-status-pending/20',
    text: 'text-secondary',
    icon: 'text-secondary',
  },
  info: {
    bg: 'bg-primary/10',
    border: 'border-primary/20',
    text: 'text-primary',
    icon: 'text-primary',
  },
}

export default function ErrorMessage({ message, type = 'error' }: ErrorMessageProps) {
  if (!message) return null

  const s = STYLES[type]

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-xl border ${s.bg} ${s.border} animate-slide-down`}
      style={{
        animation: 'slideDown 0.3s ease-out',
      }}
    >
      <span className={`material-symbols-outlined text-[20px] flex-shrink-0 mt-0.5 ${s.icon}`}>
        {ICONS[type]}
      </span>
      <p className={`font-body-md text-body-md ${s.text}`}>{message}</p>
    </div>
  )
}
