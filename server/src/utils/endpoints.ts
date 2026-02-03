const BASE = `/api`
const path = (...params: string[]) => params.join('/')

const AUTH = path(BASE, 'auth')

export const ENDPOINTS = {
  AUTH: {
    login: path(AUTH, 'login'),
    logout: path(AUTH, 'logout'),
    signup: path(AUTH, 'signup'),
    refresh: path(AUTH, 'refresh-token'),
    me: path(AUTH, 'me')
  }
}
