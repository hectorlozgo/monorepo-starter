import path from 'node:path'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { pinoLogger } from '@/middlewares/logger'
import { limiter } from '@/middlewares/rateLimit'
import { ErrorHandler } from '@/middlewares/errorHandler'

const app: express.Application = express()

app.use(helmet())
app.use(cors())
app.use(limiter)
app.use(pinoLogger)
app.use(express.json({ limit: '15kb' }))
app.use(express.static(path.join(process.cwd(), 'public')))

app.use(ErrorHandler.notFound)
app.use(ErrorHandler.handle)

export default app
