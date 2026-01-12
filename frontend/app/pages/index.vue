<script setup>
import { ref, onMounted } from 'vue'
import { useUsers } from '../../composables/useUsers'

// Navigate to user detail page
const handleRowClick = (event, { item }) => {
  navigateTo(`/user/${item.id}`)
}

const { getUsers, addUser } = useUsers()

const { data: users, error: usersError, pending, refresh } = await getUsers()
const loading = ref(false)
const dialog = ref(false)


const headers = [
  { title: 'Client Name', align: 'start', key: 'name' },
  { title: 'Total Task', align: 'start', key: 'total_task' },
]

</script>

<template>
  <div v-if="pending" class="text-center my-4">
    <v-progress-circular color="primary" indeterminate></v-progress-circular>
  </div>
  <main v-else>
    <div class="d-flex justify-end my-4">
      <v-btn>
        Add Users
      </v-btn>
    </div>

    <v-data-table :items="users" :headers="headers" density="compact" @click:row="handleRowClick" hover class="cursor-pointer">
    </v-data-table>
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title>
          <span class="text-h5">Add New Item</span>
        </v-card-title>
        <v-card-text>
          <v-text-field label="Client Name" />
          <v-text-field label="Total Task" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary">
            Cancel
          </v-btn>
          <v-btn color="primary">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </main>
</template>