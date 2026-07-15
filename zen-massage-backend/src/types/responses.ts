export interface ApiResponse<T = unknown> {
  success: boolean
  message: string
  data?: T
}

export interface UserPayload {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  avatar: string | null
}
