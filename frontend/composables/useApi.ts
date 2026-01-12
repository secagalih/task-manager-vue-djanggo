

export const useApi = () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  const apiFetch = $fetch.create({
    baseURL: apiBase,
    headers: {
      'Content-Type': 'application/json',
    },
    onResponseError({ response }) {
      console.error('API Error:', response.status, response.statusText)
    },
    onRequest({ options }) {
      console.log('API Request:', options.url)
    },
  })


  return {
    apiFetch,
    apiBase
  }
}