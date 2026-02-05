import http from 'node:http'
import app from '@/app'
import { envs } from '@/config/env'
import { logger } from '@/middlewares/logger'
import { startLogsCleanupInterval } from '@/utils/logs'

const server = http.createServer(app)

function bootstrap() {
  server.listen(envs.PORT, () => {
    logger.info(`[MODE: ${envs.NODE_ENV}] Server listening in http://localhost:${envs.PORT}`)
  })
  startLogsCleanupInterval()
}
bootstrap()
