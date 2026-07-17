import { api } from './api'

export interface UserItem {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'SUPER_ADMIN' | 'ADMIN' | 'USER'
  active: boolean
  avatar: string | null
  createdAt: string
}

export interface UserStats {
  totalUsers: number
  superAdmins: number
  admins: number
  regularUsers: number
}

interface ApiListResponse {
  success: boolean
  data: UserItem[]
}

interface ApiStatsResponse {
  success: boolean
  data: UserStats
}

interface ApiSingleResponse {
  success: boolean
  data: UserItem
  message: string
}

export const userService = {
  list: () =>
    api.get<ApiListResponse>('/users'),

  stats: () =>
    api.get<ApiStatsResponse>('/users/stats'),

  create: (body: { firstName: string; lastName: string; email: string; password: string; phone?: string; role?: UserItem['role'] }) =>
    api.post<ApiSingleResponse>('/users', body),

  updateRole: (userId: string, role: UserItem['role']) =>
    api.patch<ApiSingleResponse>(`/users/${userId}/role`, { role }),

  toggleActive: (userId: string) =>
    api.patch<ApiSingleResponse>(`/users/${userId}/toggle-active`),
}
