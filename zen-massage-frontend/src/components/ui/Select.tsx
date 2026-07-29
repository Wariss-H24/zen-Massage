import { useEffect, useMemo, useRef, useState } from 'react'

export interface SelectOption {
  value: string
  label: string
}

interface Props {
  value: string
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  onChange: (value: string) => void
}

export default function Select({ value, options, placeholder = 'Sélectionner', disabled = false, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)

  const selected = useMemo(() => options.find((o) => o.value === value), [options, value])
  const label = selected?.label ?? placeholder

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onMouseDown = (e: MouseEvent) => {
      const root = rootRef.current
      if (!root) return
      if (!root.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onMouseDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onMouseDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface-container-low font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary transition-colors ${
          disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:bg-secondary-container'
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={`min-w-0 truncate ${selected ? 'text-on-surface' : 'text-on-surface-variant opacity-80'}`}>
          {label}
        </span>
        <span className="material-symbols-outlined text-on-surface-variant opacity-70">expand_more</span>
      </button>

      {open && !disabled && (
        <div
          className="absolute z-40 mt-2 w-full rounded-xl border border-outline-variant/40 bg-white shadow-lg overflow-hidden"
          role="listbox"
        >
          {options.map((o) => {
            const active = o.value === value
            return (
              <button
                key={o.value}
                type="button"
                onClick={() => {
                  onChange(o.value)
                  setOpen(false)
                }}
                className={`w-full text-left px-4 py-3 font-label-md text-label-md transition-colors ${
                  active ? 'bg-primary text-white cursor-pointer' : 'text-on-surface cursor-pointer hover:bg-primary-fixed'
                }`}
                role="option"
                aria-selected={active}
              >
                {o.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
