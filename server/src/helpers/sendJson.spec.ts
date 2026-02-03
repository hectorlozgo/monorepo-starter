import { sendJson } from './sendJson'
import type { Response } from 'express'
import type { ApiErrorResponse, ApiValidationErrorResponse } from '@/interfaces/apiResponse'

describe('sendJson helper', () => {
  let mockRes: Partial<Response>

  beforeEach(() => {
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }
  })

  describe('when sending a simple response', () => {
    it('should call status with the provided status code', () => {
      const data = { message: 'success' }
      sendJson(mockRes as Response, 200, data)

      expect(mockRes.status).toHaveBeenCalledWith(200)
    })

    it('should call json with the provided data', () => {
      const data = { message: 'success' }
      sendJson(mockRes as Response, 200, data)

      expect(mockRes.json).toHaveBeenCalledWith(data)
    })

    it('should chain status and json correctly', () => {
      const data = { message: 'success' }
      sendJson(mockRes as Response, 200, data)

      expect(mockRes.status).toHaveBeenCalled()
      expect(mockRes.json).toHaveBeenCalled()
    })
  })

  describe('when sending an error response', () => {
    it('should send a 404 error response', () => {
      const errorResponse: ApiErrorResponse = {
        status: 404,
        message: 'Not Found'
      }
      sendJson(mockRes as Response, 404, errorResponse)

      expect(mockRes.status).toHaveBeenCalledWith(404)
      expect(mockRes.json).toHaveBeenCalledWith(errorResponse)
    })

    it('should send a 500 error response', () => {
      const errorResponse: ApiErrorResponse = {
        status: 500,
        message: 'Internal Server Error'
      }
      sendJson(mockRes as Response, 500, errorResponse)

      expect(mockRes.status).toHaveBeenCalledWith(500)
      expect(mockRes.json).toHaveBeenCalledWith(errorResponse)
    })
  })

  describe('when sending a validation error response', () => {
    it('should send a validation error with errors array', () => {
      const validationResponse: ApiValidationErrorResponse = {
        status: 400,
        message: 'Validation failed',
        errors: [
          {
            msg: 'Email is required',
            field: 'email',
            type: 'required',
            location: 'body'
          }
        ]
      }
      sendJson(mockRes as Response, 400, validationResponse)

      expect(mockRes.status).toHaveBeenCalledWith(400)
      expect(mockRes.json).toHaveBeenCalledWith(validationResponse)
    })

    it('should send a validation error with multiple errors', () => {
      const validationResponse: ApiValidationErrorResponse = {
        status: 400,
        message: 'Validation failed',
        errors: [
          {
            msg: 'Email is required',
            field: 'email',
            type: 'required',
            location: 'body'
          },
          {
            msg: 'Password must be at least 8 characters',
            field: 'password',
            type: 'min_length',
            location: 'body'
          }
        ]
      }
      sendJson(mockRes as Response, 400, validationResponse)

      expect(mockRes.json).toHaveBeenCalledWith(validationResponse)
      expect((mockRes.json as jest.Mock).mock.calls[0][0].errors).toHaveLength(2)
    })
  })

  describe('when sending different status codes', () => {
    it('should handle 200 status code', () => {
      const data = { data: 'test' }
      sendJson(mockRes as Response, 200, data)
      expect(mockRes.status).toHaveBeenCalledWith(200)
    })

    it('should handle 201 status code', () => {
      const data = { id: '123', created: true }
      sendJson(mockRes as Response, 201, data)
      expect(mockRes.status).toHaveBeenCalledWith(201)
    })

    it('should handle 400 status code', () => {
      const data = { message: 'Bad Request' }
      sendJson(mockRes as Response, 400, data)
      expect(mockRes.status).toHaveBeenCalledWith(400)
    })

    it('should handle 403 status code', () => {
      const data = { message: 'Forbidden' }
      sendJson(mockRes as Response, 403, data)
      expect(mockRes.status).toHaveBeenCalledWith(403)
    })
  })

  describe('when sending complex data structures', () => {
    it('should send nested objects', () => {
      const data = {
        user: {
          id: '123',
          name: 'John',
          email: 'john@example.com'
        }
      }
      sendJson(mockRes as Response, 200, data)

      expect(mockRes.json).toHaveBeenCalledWith(data)
    })

    it('should send arrays of data', () => {
      const data = {
        items: [
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' }
        ]
      }
      sendJson(mockRes as Response, 200, data)

      expect(mockRes.json).toHaveBeenCalledWith(data)
    })

    it('should send data with null values', () => {
      const data = {
        message: 'success',
        metadata: null
      }
      sendJson(mockRes as Response, 200, data)

      expect(mockRes.json).toHaveBeenCalledWith(data)
    })
  })
})
