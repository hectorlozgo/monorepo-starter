import type { z } from 'zod'
import type { ApiValidationError } from '@/interfaces/apiResponse'

export class ValidationError extends Error {
  public readonly status: number = 400
  public readonly errors: ApiValidationError[]

  constructor(zodError: z.ZodError, location: string = 'body') {
    super('Validation failed')
    Object.setPrototypeOf(this, ValidationError.prototype)

    this.errors = zodError.issues.map((issue) => ({
      msg: issue.message,
      field: issue.path.length > 0 ? issue.path.join('.') : undefined,
      type: issue.code,
      location
    }))

    Error.captureStackTrace?.(this, ValidationError)
  }
}
