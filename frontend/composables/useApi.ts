import {  useRuntimeConfig } from 'nuxt/app'
import { $fetch } from 'ofetch'

export const useApi = () => {
  // Always use localhost:8000, only available on client
  if (import.meta.server) {
    // Return a no-op during SSR
    return {
      apiFetch: () => Promise.reject(new Error('API calls only available on client')),
      apiBase: 'http://localhost:8000/api'
    }
  }

  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase || 'http://localhost:8000/api'

  const apiFetch = $fetch.create({
    baseURL: apiBase as string  ,
    headers: {
      'Content-Type': 'application/json',
    },
    // Ensure this never runs on server
    onResponseError({ response }) {
      console.error('API Error:', response.status, response.statusText)
    },
    onRequest({ request }) {
      console.log('API Request:', request)
    },
  })

  return {
    apiFetch,
    apiBase
  }
}