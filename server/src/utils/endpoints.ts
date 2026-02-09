const API_BASE = '/api'
const path = (base: string) => (path: string) => `${base}/${path}`

export const auth = path(`${API_BASE}/auth`)

export const authEndpoints = {
  login: auth('login'),
  logout: auth('logout'),
  signup: auth('signup'),
  refresh: auth('refresh-token'),
  me: auth('me')
}

export const ENDPOINTS = {
  AUTH: authEndpoints
} as const
