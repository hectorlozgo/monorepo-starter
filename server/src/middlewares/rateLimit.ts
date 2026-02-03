import rateLimit from 'express-rate-limit'
import type { Request, Response } from 'express'
import { logger } from '@/middlewares/logger'
import { envs } from '@/config/env'
import { persistLog } from '@/utils/logs'
import { getTimestamp } from '@/utils/timestamp'

const isDev = envs.NODE_ENV !== 'production'
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: isDev ? 5 : 150,
  handler: (req: Request, res: Response, _next) => {
    const { date, time } = getTimestamp()

    const ip = req.ip === '::1' ? 'localhost' : req.ip
    const method = req.method
    const url = req.originalUrl
    const message = `Rate limit exceeded: [IP]: ${ip} [METHOD]: ${method} [URL]: ${url}`
    logger.error(message)
    persistLog('rate-limit', {
      timestamp: `${date} ${time}`,
      level: 'error',
      message
    }).catch((err) => {
      logger.error('Error writing log', err)
    })

    res.status(429).json({
      status: 'error',
      code: 'TOO_MANY_REQUESTS',
      message: 'Has superado el limite de peticiones, por favor, inténtalo de nuevo más tarde.'
    })
  },
  standardHeaders: true,
  legacyHeaders: false
})
