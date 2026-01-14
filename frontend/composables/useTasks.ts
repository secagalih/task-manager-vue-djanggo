import { useFetch } from 'nuxt/app'
import { useApi } from "./useApi"

export enum StatusEnum {
  Pending = 'Pending',
  InProgress = 'In Progress',
  Completed = 'Completed',
}

export interface Task {
  title: string
  description: string
  status: StatusEnum
  user: string
}


export interface AddTaskRequest {
  title: string
  description: string
  status: StatusEnum
  user: string
}

export interface UpdateTaskRequest {
  id: string
  title: string
  description: string
  status: StatusEnum
  user: string
}


export const useTasks = () => {
  const { apiFetch, apiBase } = useApi()

  const getTasks = async (id: string) => {
    return useFetch<Task[]>(`/user/${id}`, {
      baseURL: apiBase as string,
      method: 'GET',
      key: `tasks:${id}`,
      server: false,
    })
  }

  const addTask = async (request: AddTaskRequest) => {
    try {

      const data = await apiFetch<Task>('/tasks/add/', {
        method: 'POST',
        body: request,
      })
      return { data, error: null }
    } catch (error: any) {
      return { data: null, error: error.data?.error || 'Failed to add task' }
    }
  }

  const updateTask = async (request: UpdateTaskRequest) => {
    try {
      const data = await apiFetch<Task>(`/tasks/update/${request.id}/`, {
        method: 'POST',
        body: request,
      })
      return { data, error: null }
    } catch (error: any) {
      return { data: null, error: error.data?.error || 'Failed to update task' }
    }
  }

  const deleteTask = async (id: string) => {
    try {
      const data = await apiFetch<Task>(`/tasks/delete/${id}/`, {
        method: 'POST',
      })
      return { data, error: null }
    } catch (error: any) {
      return { data: null, error: error.data?.error || 'Failed to delete task' }
    }
  }

  return { getTasks, addTask, updateTask, deleteTask }
}