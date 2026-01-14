import { useFetch } from 'nuxt/app'
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
  const { apiFetch, apiBase } = useApi()

  const getUsers = async () => {
    return useFetch<User[]>('/users/', {
      baseURL: apiBase as string,
      method: 'GET',
      key: 'users',
      server: false,
    })
  }

  const addUser = async (request: AddUserRequest) => {
    try {
      const data = await apiFetch<User>(
        '/users/add/',
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