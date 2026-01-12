<script setup>
import { ref } from 'vue'
import { useTasks } from '../../../composables/useTasks'
const userId = useRoute().params.id
const dialog = ref(false)
const editDialog = ref(false)
const headers = [
  { title: 'Task Title', align: 'start', key: 'title' },
  { title: 'Description', align: 'start', key: 'description' },
  { title: 'Status', align: 'start', key: 'status' },
  { title: 'Created At', align: 'start', key: 'created_at' },
  { title: 'Action', key: 'action' }

]
const dataform = ref({
  id:null,
  title: '',
  description: '',
  status: 'Pending'
})
const { getTasks, addTask, deleteTask, updateTask } = useTasks()
const { data: tasks, error: tasksError, pending, refresh } = await getTasks(userId)

const handleAddTask = async () => {
  if (editDialog.value) {
    const { data, error } = await updateTask({ ...dataform.value, user: userId })
    if (error) {
      errorMessage.value = error.message
    } else {
      await refresh()
    }
    dataform.value = {
      id: null,
      title: '',
      description: '',
      status: 'Pending'
    }
    dialog.value = false
  } else {
    const { data, error } = await addTask({ ...dataform.value, user: userId })
    if (error) {
      errorMessage.value = error.message
    } else {
      await refresh()
    }
    dataform.value = {
      id: null,
      title: '',
      description: '',
      status: 'Pending'
    }
    dialog.value = false
  }


}

const handleDeleteTask = async ({ item }) => {
  if (!confirm(`Are you sure you want to delete "${item.title}"?`)) {
    return
  }
  const { data, error } = await deleteTask(item.id)
  if (error) {
    errorMessage.value = error.message
  } else {
    await refresh()
  }
}

const handleEditTask = async ({ item }) => {
  editDialog.value = true
  dialog.value = true
  dataform.value = {
    id: item.id,
    title: item.title,
    description: item.description,
    status: item.status
  }
}

</script>

<template>
  <div v-if="pending" class="text-center my-4">
    <v-progress-circular color="primary" indeterminate></v-progress-circular>
  </div>
  <main v-else>
    <v-app-bar :elevation="2">
      <v-app-bar-title>Tasks</v-app-bar-title>
      <template v-slot:append>
        <v-btn color="secondary" @click="dialog = true, dataform = { title: '', description: '', status: 'Pending' }">
          <v-icon>mdi-plus</v-icon>
          Add Task
        </v-btn>
      </template>
    </v-app-bar>

    <v-data-table :items="tasks" :headers="headers" density="compact" class="mt-4">
      <template v-slot:item.action="{ item }">
        <v-row>
          <v-btn @click="handleEditTask(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn @click="handleDeleteTask(item)">
            <v-icon>mdi-trash-can</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title>
          <span class="text-h5">Add New Task</span>
        </v-card-title>

        <v-card-text>
          <v-text-field label="Task Title" v-model="dataform.title" />
          <v-textarea label="Description" v-model="dataform.description" />
          <v-select label="Status" :items="['Pending', 'In Progress', 'Completed']" v-model="dataform.status" />
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="primary" @click="handleAddTask">
            {{ editDialog ? 'Update' : 'Save' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </main>
</template>