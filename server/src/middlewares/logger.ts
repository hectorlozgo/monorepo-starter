import type { Request, Response, NextFunction } from 'express'
import pino from 'pino'
import { persistLog } from '@/utils/logs'
import { getTimestamp } from '@/utils/timestamp'

export const logger = pino({
  level: 'debug',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      singleLine: true,
      translateTime: 'HH:MM:ss.l',
      ignore: 'req,res,pid,hostname,reqId,responseTime'
    }
  }
})

export function pinoLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now()

  res.on('finish', () => {
    const ms = Date.now() - start
    const status = res.statusCode
    const message = `Method: ${req.method} | Status: ${status} | URL: ${req.originalUrl} | Duration: ${ms} ms`
    const level = status >= 500 ? 'error' : status >= 400 ? 'warn' : 'info'
    logger[level](message)
    const { date, time } = getTimestamp()
    persistLog('http', {
      timestamp: `${date} ${time}`,
      level,
      message
    }).catch((err) => {
      logger.error('Error writing log', err)
    })
  })

  next()
}
