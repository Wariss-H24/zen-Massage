import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService, type AuthUser } from '../services/auth.service'
import { api } from '../services/api'

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<AuthUser>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const navigateRef = useRef(navigate)
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  // Garde la ref à jour sans relancer le useEffect
  useEffect(() => { navigateRef.current = navigate }, [navigate])

  // Enregistre le handler 401 global une seule fois au montage
  useEffect(() => {
    api.onUnauthorized(() => {
      setUser(null)
      navigateRef.current('/login', { replace: true })
    })
  }, [])

  // Vérifie si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    authService.me()
      .then(res => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  async function login(email: string, password: string): Promise<AuthUser> {
    const res = await authService.login({ email, password })
    setUser(res.data)
    return res.data
  }

  async function logout() {
    try {
      await authService.logout()
    } finally {
      setUser(null)
    }
  }

  async function refreshUser() {
    try {
      const res = await authService.me()
      setUser(res.data)
    } catch {
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
