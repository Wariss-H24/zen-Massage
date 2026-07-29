interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'white' | 'inherit'
  className?: string
}

const SIZE_MAP: Record<NonNullable<SpinnerProps['size']>, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-3',
}

const COLOR_MAP: Record<NonNullable<SpinnerProps['color']>, string> = {
  primary: 'border-primary border-transparent border-t-primary',
  white:   'border-white border-transparent border-t-white',
  inherit: 'border-current border-transparent border-t-current',
}

export default function Spinner({
  size = 'md',
  color = 'primary',
  className = '',
}: SpinnerProps) {
  return (
    <div
      className={`rounded-full border-solid border-t-current animate-spin ${SIZE_MAP[size]} ${COLOR_MAP[color]} ${className}`}
      style={{ borderTopColor: undefined as any }}
      role="status"
      aria-label="Chargement..."
    >
      <span className="sr-only">Chargement...</span>
    </div>
  )
}
