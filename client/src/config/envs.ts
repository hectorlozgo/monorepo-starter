import z from 'zod'

const envSchema = z.object({
  VITE_NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  VITE_PORT: z.coerce.number().default(4000),
  VITE_API_BASE_URL: z.string().default('http://localhost:4000/api'),
  VITE_API_URL_PROD: z.string().default('https://api.example.com')
})

const parsedEnvs = envSchema.safeParse(import.meta.env)

if(!parsedEnvs.success) {
  throw new Error(`Invalid environment variables: ${parsedEnvs.error.message}`)
}

export const envs = parsedEnvs.data