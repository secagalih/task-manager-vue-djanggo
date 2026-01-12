StatusEnum = ['Pending', 'In Progress', 'Completed']


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
  title: string
  description: string
  status: StatusEnum
  user: string
}


export const useTasks = () => {
  const config = useRuntimeConfig()
  const { apiFetch } = useApi()

  const getTasks = async () => {
    return useFetch<Task[]>('/api/tasks/', {
      baseURL: config.public.apiBase,
      method: 'GET',
      key: 'tasks',
    })
  }

  const addTask = async (request: AddTaskRequest) => {
    try {

      const data = await apiFetch<Task>('/api/tasks/', {
        method: 'POST',
        body: request,
      })
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.data?.error || 'Failed to add task' }
    }
  }

  const updateTask = async (request: UpdateTaskRequest) => {
    try {
      const data = await apiFetch<Task>(`/api/tasks/update/${request.id}/`, {
        method: 'POST',
        body: request,
      })
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.data?.error || 'Failed to update task' }
    }
  }

  const deleteTask = async (id: string) => {
    try {
      const data = await apiFetch<Task>(`/api/tasks/delete/${id}/`, {
        method: 'POST',
      })
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.data?.error || 'Failed to delete task' }
    }
  }

  return { getTasks, addTask, updateTask, deleteTask }
}