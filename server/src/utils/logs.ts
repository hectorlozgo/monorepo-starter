import path from 'node:path'
import { mkdir, appendFile } from 'fs/promises'
import { getTimestamp } from './timestamp'
import { logger } from '@/middlewares/logger'

type LogType = 'rate-limit' | 'http' | 'error' | 'auth'
interface LogEntry {
  timestamp: string
  level?: 'info' | 'warn' | 'error'
  message?: string
}

export const persistLog = async (typeLog: LogType, log: LogEntry) => {
  try {
    const { date, time } = getTimestamp()

    const baseDir = path.join(process.cwd(), 'logs')

    const typeDir = path.join(baseDir, typeLog)
    await mkdir(typeDir, { recursive: true })

    const filePath = path.join(typeDir, `${date}.log`)
    if (!log.timestamp) log.timestamp = `${date} ${time}`

    /**
     * TODO: implementar lógica de rotación de logs
     */

    await appendFile(filePath, JSON.stringify(log) + '\n')
  } catch (error) {
    logger.error(error, 'Error writing log file')
  }
}
