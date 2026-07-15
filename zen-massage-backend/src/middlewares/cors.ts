import cors from 'cors'

const ALLOWED = [
  'http://localhost:5173',
  process.env.FRONTEND_URL,
].filter(Boolean) as string[]

export const corsMiddleware = cors({
  origin: (origin, cb) => {
    if (!origin || ALLOWED.includes(origin)) return cb(null, true)
    cb(new Error(`CORS: origine non autorisée — ${origin}`))
  },
  credentials: true, // indispensable pour les cookies httpOnly
})
