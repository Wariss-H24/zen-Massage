import cors from 'cors'

const isProd = process.env.NODE_ENV === 'production'

// Liste blanche explicite selon l'environnement
const ALLOWED_DEV = [
  'http://localhost:5173',
  process.env.FRONTEND_URL,
].filter(Boolean) as string[]

const ALLOWED_PROD = [
  process.env.FRONTEND_URL,
].filter(Boolean) as string[]

const ALLOWED = isProd ? ALLOWED_PROD : ALLOWED_DEV

export const corsMiddleware = cors({
  origin: (origin, cb) => {
    // Autoriser les requêtes sans origine (ex. Postman, server-to-server)
    if (!origin) return cb(null, true)
    if (ALLOWED.includes(origin)) return cb(null, true)
    cb(new Error(`CORS: origine non autorisée — ${origin}`))
  },
  credentials: true, // indispensable pour les cookies httpOnly
})
