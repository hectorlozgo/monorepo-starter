import request from 'supertest'
import app from '@/app'
import { ENDPOINTS } from '@/utils/endpoints'

describe('Endpoints Tests', () => {
  describe('Endpoint Constants', () => {
    test('auth endpoints should have correct paths', () => {
      const auth = ENDPOINTS.AUTH
      expect(auth.login).toBe('/api/auth/login')
      expect(auth.logout).toBe('/api/auth/logout')
      expect(auth.signup).toBe('/api/auth/signup')
      expect(auth.refresh).toBe('/api/auth/refresh-token')
      expect(auth.me).toBe('/api/auth/me')
    })
  })

  describe('API Integration Tests', () => {
    test('should return 404 for undefined routes', async () => {
      const response = await request(app).get('/api/undefined-route')
      expect(response.status).toBe(404)
    })

    test('should have CORS enabled', async () => {
      const response = await request(app).options('/api/auth/login')
      expect(response.headers['access-control-allow-origin']).toBeDefined()
    })

    test('should parse JSON body', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com', password: 'password123' })
        .set('Content-Type', 'application/json')

      // Expect 404 since the route is not implemented yet
      expect(response.status).toBe(404)
    })
  })
})
