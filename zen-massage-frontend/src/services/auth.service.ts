import { api } from './api'

export interface AuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'SUPER_ADMIN' | 'ADMIN' | 'USER'
  avatar?: string
  phone?: string | null
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

  updateProfile: (body: {
    firstName?: string
    lastName?: string
    phone?: string
    password?: string
  }) =>
    api.put<AuthResponse>('/auth/me', body),

  forgotPassword: (email: string) =>
    api.post<{ success: boolean; message: string }>('/auth/forgot-password', { email }),

  resetPassword: (token: string, password: string) =>
    api.post<{ success: boolean; message: string }>('/auth/reset-password', { token, password }),
}
