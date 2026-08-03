import { API_URL } from '../config/env'

function stripWrappingQuotes(value: string): string {
  const v = value.trim()
  if (v.length >= 2) {
    const first = v[0]
    const last = v[v.length - 1]
    if ((first === last) && (first === '"' || first === "'" || first === '`')) {
      return v.slice(1, -1).trim()
    }
  }
  return v
}

export function getApiOrigin(): string {
  try {
    return new URL(API_URL).origin
  } catch {
    return API_URL.replace(/\/api\/?$/, '').replace(/\/$/, '')
  }
}

export function resolveImageUrl(raw?: string | null): string {
  if (!raw) return ''
  const cleaned = stripWrappingQuotes(raw)
  if (!cleaned) return ''
  if (cleaned.startsWith('blob:') || cleaned.startsWith('data:')) return cleaned

  const origin = getApiOrigin()

  try {
    const u = new URL(cleaned)
    if (u.pathname.startsWith('/uploads/')) return `${origin}${u.pathname}`
    return cleaned
  } catch {
    const p = cleaned.startsWith('/') ? cleaned : `/${cleaned}`
    return `${origin}${p}`
  }
}

