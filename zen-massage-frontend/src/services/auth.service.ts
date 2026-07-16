import { api } from './api'

export interface AuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'SUPER_ADMIN' | 'ADMIN' | 'USER'
  avatar: string | null
}

interface AuthResponse {
  success: boolean
  message: string
  data: AuthUser
}

export const authService = {
  register: (body: { firstName: string; lastName: string; email: string; password: string; phone?: string }) =>
    api.post<AuthResponse>('/auth/register', body),

  login: (body: { email: string; password: string }) =>
    api.post<AuthResponse>('/auth/login', body),

  logout: () =>
    api.post<{ success: boolean }>('/auth/logout'),

  me: () =>
    api.get<AuthResponse>('/auth/me'),
}
