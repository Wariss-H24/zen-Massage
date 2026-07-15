export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'USER'

export interface AuthUser {
  id: string
  role: UserRole
}
