import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET as string
const EXPIRES = process.env.JWT_EXPIRES_IN || '7d'

export function signToken(payload: { id: string; role: string }): string {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES } as jwt.SignOptions)
}

export function verifyToken(token: string): { id: string; role: string } {
  return jwt.verify(token, SECRET) as { id: string; role: string }
}
