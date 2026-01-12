import { useApi } from "./useApi"

export interface User {
  id: number
  name: string
  total_task: number
}

export interface AddUserRequest {
  name: string
}



export const useUsers = () => {
  const config = useRuntimeConfig()
  const { apiFetch } = useApi()

  const getUsers = async () => {
    return useFetch<User[]>('/api/users/', {
      baseURL: config.public.apiBase,
      method: 'GET',
      key: 'users',
    })
  }

  const addUser = async (request: AddUserRequest) => {
    try {
      const data = await apiFetch<User>(
        '/api/users/add/',
        {
          method: 'POST',
          body: request,
        }
      )
      return { data, error: null }
    } catch (error: any) {
      return { data: null, error: error.data?.error || 'Failed to add user' }
    }
  }

  return { getUsers, addUser }
}