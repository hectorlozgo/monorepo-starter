import type { Response } from 'express'
import type { JsonResponse } from '@/interfaces/apiResponse'

export function sendJson(res: Response, status: number, data: JsonResponse): void {
  res.status(status).json(data)
}
