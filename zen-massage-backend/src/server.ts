import 'dotenv/config'
import express from 'express'
import fs from 'fs'
import path from 'path'
import cookieParser from 'cookie-parser'
import { corsMiddleware } from './middlewares/cors'
import { errorHandler } from './middlewares/errorHandler'
import routes from './routes'

const app = express()
const PORT = process.env.PORT || 4000

// Render tourne derrière un reverse proxy — indispensable pour :
//  - req.protocol = 'https' (sinon Express voit 'http')
//  - req.ip = IP réelle du client (sinon tous les requêtes viennent du proxy)
//    → crucial pour express-rate-limit qui key sur req.ip
app.set('trust proxy', 1)

app.use(corsMiddleware)
app.use(express.json())
app.use(cookieParser())

const uploadsRoot = path.join(process.cwd(), 'public', 'uploads')
if (!fs.existsSync(uploadsRoot)) fs.mkdirSync(uploadsRoot, { recursive: true })
app.use('/uploads', express.static(uploadsRoot))

app.use('/api', routes)

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

app.use(errorHandler)

app.listen(PORT, () => console.log(`🌿 Ben API running on port ${PORT}`))
