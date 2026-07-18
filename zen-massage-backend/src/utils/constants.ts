export const COOKIE_NAME = 'ben_token'

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true, // toujours true pour sameSite none (HTTPS obligatoire)
  sameSite: (process.env.NODE_ENV === 'production' ? 'none' : 'lax') as 'none' | 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
  path: '/',
}
