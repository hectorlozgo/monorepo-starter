import 'dotenv/config'
import { z } from 'zod'
import { logger } from '@/middlewares/logger'
import { ValidationError } from '@/validators/validationError'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  PORT: z.coerce.number().default(3000)
})

const result = envSchema.safeParse(process.env)

if (!result.success) {
  const error = new ValidationError(result.error, 'env')
  const details = error.errors.map((err) => `${err.location}${err.field ? `.${err.field}` : ''}: ${err.msg}`).join(', ')
  logger.error(`Invalid environment variables: ${details}`)
  process.exit(1)
}

export const envs = result.data
