export interface ApiValidationError {
  msg: string
  field?: string
  type: string
  location: string
}

export interface ApiErrorResponse {
  status: number
  message: string
}

export interface ApiValidationErrorResponse extends ApiErrorResponse {
  errors: ApiValidationError[]
}

export interface ApiGenericErrorResponse extends ApiErrorResponse {
  details?: string
  stack?: string
}

export type ApiResponse = ApiErrorResponse | ApiValidationErrorResponse | ApiGenericErrorResponse
export type JsonResponse = ApiResponse | Record<string, unknown>
