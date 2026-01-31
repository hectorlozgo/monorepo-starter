import type { Request, Response, NextFunction } from 'express'
import createError, { isHttpError, type HttpError } from 'http-errors'
import { envs } from '@/config/env'
import { ValidationError } from '@/validators/validationError'
import type { ApiErrorResponse, ApiValidationErrorResponse, ApiGenericErrorResponse } from '@/interfaces/apiResponse'
import { logger } from './logger'
import { sendJson } from '@/helpers/sendJson'

export class ErrorHandler {
  public static notFound = (req: Request, res: Response, next: NextFunction) => {
    if (!req.url.startsWith('/api/')) {
      const response: ApiErrorResponse = {
        status: 404,
        message: 'Not Found'
      }
      return sendJson(res, 404, response)
    }
    next(createError(404))
  }

  private static handleValidationError(err: ValidationError, res: Response) {
    logger.warn({ errors: err.errors }, `Fallo de validación: ${err.message}`)

    const response: ApiValidationErrorResponse = {
      status: err.status,
      message: err.message,
      errors: err.errors
    }
    sendJson(res, err.status, response)
  }

  private static handleHttpError(err: HttpError, res: Response) {
    const status = err.status ?? 500
    if (status >= 500) {
      logger.error({ stack: err.stack }, `Error de servidor: ${err.message}`)
    }

    const response: ApiErrorResponse = {
      status,
      message: status >= 500 ? 'Internal Server Error' : err.message
    }
    sendJson(res, status, response)
  }

  private static handleGenericError(err: Error, _req: Request, res: Response, next: NextFunction) {
    if (res.headersSent) {
      return next(err)
    }
    logger.error({ name: err.name, message: err.message, stack: err.stack }, `Error Not Controlled: ${err.message}`)

    const response: ApiGenericErrorResponse = {
      status: 500,
      message: 'Internal Server Error',
      ...(envs.NODE_ENV !== 'production' && { details: err.message, stack: err.stack })
    }
    sendJson(res, 500, response)
  }

  public static handle = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ValidationError) return ErrorHandler.handleValidationError(err, res)
    if (isHttpError(err)) return ErrorHandler.handleHttpError(err, res)
    if (err instanceof Error) return ErrorHandler.handleGenericError(err, req, res, next)

    // Fallback unknown error
    logger.error(
      { unknownError: err },
      `Unknown Throw Error: ${req.method} | ${req.originalUrl} | ${JSON.stringify(err)}`
    )
    const response: ApiErrorResponse = { status: 500, message: 'Unknown Error' }
    sendJson(res, 500, response)
  }
}
