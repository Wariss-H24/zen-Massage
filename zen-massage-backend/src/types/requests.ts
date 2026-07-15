export interface RegisterBody {
  firstName: string
  lastName: string
  email: string
  password: string
  phone?: string
}

export interface LoginBody {
  email: string
  password: string
}
