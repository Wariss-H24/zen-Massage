import { useEffect, useMemo, useRef, useState } from 'react'

export interface SelectOption {
  value: string
  label: string
}

interface Props {
  label?: string
  value: string
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  onChange: (value: string) => void
}

export default function Select({
  label,
  value,
  options,
  placeholder = 'Sélectionner',
  disabled = false,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)

  const selected = useMemo(() => options.find((o) => o.value === value), [options, value])
  const displayLabel = selected?.label ?? placeholder

  /* Fermeture au clic extérieur / Escape */
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    const onMouse = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onMouse)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onMouse)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative w-full">
      {/* Label optionnel */}
      {label && (
        <p className="font-label-md text-label-md text-on-surface-variant mb-1.5">{label}</p>
      )}

      {/* ── Trigger ── */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl border-2 font-body-md text-body-md text-left transition-all focus:outline-none ${
          disabled
            ? 'opacity-50 cursor-not-allowed border-outline-variant/30 bg-surface-container-low'
            : open
            ? 'border-sage-deep bg-surface cursor-pointer shadow-sm'
            : 'border-outline-variant/50 bg-surface-container-low cursor-pointer hover:border-sage-deep/50'
        }`}
      >
        <span className={`truncate ${selected ? 'text-on-surface font-semibold' : 'text-on-surface-variant/60'}`}>
          {displayLabel}
        </span>
        <span
          className={`material-symbols-outlined text-on-surface-variant shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          expand_more
        </span>
      </button>

      {/* ── Dropdown ── */}
      {open && !disabled && (
        <div
          role="listbox"
          className="absolute z-50 mt-1.5 w-full rounded-2xl border border-outline-variant/30 bg-white shadow-xl overflow-hidden"
          style={{ boxShadow: '0 8px 32px rgba(44,46,48,0.12)' }}
        >
          {options.map((o) => {
            const isActive = o.value === value
            /* Premier item vide = placeholder → fond vert clair */
            const isPlaceholder = o.value === ''

            return (
              <button
                key={o.value}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => { onChange(o.value); setOpen(false) }}
                className={`w-full text-left px-5 py-3.5 font-label-md text-label-md transition-colors ${
                  isActive
                    ? 'bg-sage-deep text-white font-bold'
                    : isPlaceholder
                    ? 'bg-sage-deep/10 text-on-surface-variant'
                    : 'text-on-surface hover:bg-sage-deep/8'
                }`}
                style={
                  !isActive && !isPlaceholder
                    ? { ['--tw-bg-opacity' as any]: 1 }
                    : undefined
                }
                onMouseEnter={e => {
                  if (!isActive && !isPlaceholder) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(66,86,70,0.08)'
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive && !isPlaceholder) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = ''
                  }
                }}
              >
                <span className="flex items-center justify-between">
                  {o.label}
                  {isActive && (
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check
                    </span>
                  )}
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
