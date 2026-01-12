<script setup>
import { ref, onMounted } from 'vue'
import { useUsers } from '../../composables/useUsers'

// Navigate to user detail page
const handleRowClick = (event, { item }) => {
  navigateTo(`/user/${item.id}`)
}

const { getUsers, addUser } = useUsers()

const { data: users, error: usersError, pending, refresh } = await getUsers()

const userName = ref('') 
const errorMessage = ref('')
const dialog = ref(false)


const headers = [
  { title: 'Client Name', align: 'start', key: 'name' },
  { title: 'Total Task', align: 'start', key: 'total_task' },
]

const handleAddUser = async () => {
  const { data, error } = await addUser({ name: userName.value })
  if (error) {
    errorMessage.value = error.message
  } else {
    await refresh()
  }
  dialog.value = false
  userName.value = ''
  errorMessage.value = ''
}

const showDialog = () => {
  dialog.value = true
  userName.value = ''
  errorMessage.value = ''
}
</script>

<template>

  <div v-if="pending" class="text-center my-4">
    <v-progress-circular color="primary" indeterminate></v-progress-circular>
  </div>
  <div v-if="usersError" class="text-center my-4">
    {{ usersError }}
  </div>

  <main v-else>
    <v-app-bar :elevation="2">
      <v-app-bar-title>Users</v-app-bar-title>
      <template v-slot:append>
        <v-btn color="secondary" @click="showDialog">
          <v-icon>mdi-plus</v-icon>
          Add Users
        </v-btn>
      </template>
    </v-app-bar>

    <v-data-table :items="users" :headers="headers" density="compact" @click:row="handleRowClick" hover class="cursor-pointer mt-4">
    </v-data-table>
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-alert v-if="errorMessage" type="error" class="mb-4">
          {{ errorMessage }}
        </v-alert>
        <v-card-title>
          <span class="text-h5">Add New Item</span>
        </v-card-title>
        <v-card-text>
          <v-text-field label="Client Name" v-model="userName" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="primary" @click="handleAddUser">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </main>
</template>