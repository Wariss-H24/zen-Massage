import { API_URL } from '../config/env'

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

// Délai avant abandon de la requête (10 secondes)
const REQUEST_TIMEOUT_MS = 10_000

// Callback global déclenché sur une réponse 401 (token expiré, session invalide)
// Enregistré par AuthProvider au montage via `api.onUnauthorized`
let unauthorizedHandler: (() => void) | null = null

export const api = {
  onUnauthorized(handler: () => void) {
    unauthorizedHandler = handler
  },

  get:    <T>(path: string)                  => request<T>('GET',    path),
  post:   <T>(path: string, body?: unknown)  => request<T>('POST',   path, body),
  put:    <T>(path: string, body?: unknown)  => request<T>('PUT',    path, body),
  patch:  <T>(path: string, body?: unknown)  => request<T>('PATCH',  path, body),
  delete: <T>(path: string)                  => request<T>('DELETE', path),
}

async function request<T>(method: Method, path: string, body?: unknown): Promise<T> {
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  let res: Response
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      credentials: 'include',
      headers: body ? (isFormData ? {} : { 'Content-Type': 'application/json' }) : {},
      body: body ? (isFormData ? (body as BodyInit) : JSON.stringify(body)) : undefined,
      signal: controller.signal,
    })
  } catch (err) {
    if ((err as Error).name === 'AbortError') {
      throw new Error('La requête a expiré. Vérifiez votre connexion.')
    }
    throw err
  } finally {
    clearTimeout(timeoutId)
  }

  // Session expirée ou non authentifié — on notifie l'AuthProvider
  if (res.status === 401 && unauthorizedHandler) {
    unauthorizedHandler()
  }

  const json = await res.json()

  if (!res.ok) {
    throw new Error(json.message || 'Erreur serveur')
  }

  return json
}
