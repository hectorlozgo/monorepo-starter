import path from 'node:path'
import { mkdir, appendFile } from 'fs/promises'
import { readdir, unlink } from 'node:fs/promises'
import { getTimestamp } from './timestamp'
import { logger } from '@/middlewares/logger'
import { envs } from '@/config/env'

type LogType = 'rate-limit' | 'http' | 'error' | 'auth'
interface LogEntry {
  timestamp: string
  level?: 'info' | 'warn' | 'error'
  message?: string
}

const LIFE_LOGS_DAYS = envs.LOGS_DAYS ?? 7
const LOG_RETENTION_MS = LIFE_LOGS_DAYS * 24 * 60 * 60 * 1000

export const persistLog = async (typeLog: LogType, log: LogEntry) => {
  try {
    if (envs.NODE_ENV === 'test') return
    const { date, time } = getTimestamp()
    if (!log.timestamp) log.timestamp = `${date} ${time}`

    const baseDir = path.join(process.cwd(), 'logs')
    const typeDir = path.join(baseDir, typeLog)

    await mkdir(typeDir, { recursive: true })

    const filePath = path.join(typeDir, `${date}.log`)
    await appendFile(filePath, JSON.stringify(log) + '\n')
  } catch (error) {
    logger.error(error, 'Error writing log file')
  }
}

const cleanExpiratedLogs = async (dir: string) => {
  try {
    const files = (await readdir(dir)).filter((file) => file.endsWith('.log'))
    for (const file of files) {
      const fileDate = new Date(file.replace('.log', '')).getTime()
      if (isNaN(fileDate)) continue
      if (Date.now() - fileDate > LOG_RETENTION_MS) {
        await unlink(path.join(dir, file))
      }
    }
  } catch (error) {
    logger.error(error, `Error cleaning logs in directory: ${dir}`)
  }
}

export const startLogsCleanupInterval = () => {
  if (envs.NODE_ENV !== 'test') {
    const logTypes: LogType[] = ['rate-limit', 'http', 'error', 'auth']
    setInterval(async () => {
      for (const type of logTypes) {
        const dir = path.join(process.cwd(), 'logs', type)
        await cleanExpiratedLogs(dir)
      }
    }, LOG_RETENTION_MS)
  }
}
