import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import { corsMiddleware } from './middlewares/cors'
import { errorHandler } from './middlewares/errorHandler'
import routes from './routes'

const app = express()
const PORT = process.env.PORT || 4000

app.use(corsMiddleware)
app.use(express.json())
app.use(cookieParser())

app.use('/api', routes)

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

app.use(errorHandler)

app.listen(PORT, () => console.log(`🌿 Ben API running on port ${PORT}`))
