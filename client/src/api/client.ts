import axios from 'axios'
import { envs } from '@/config/envs'

export const apiClient = axios.create({
  baseURL: envs.VITE_API_BASE_URL
})
