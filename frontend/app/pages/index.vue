<script setup>
import { ref } from 'vue'

const items = ref([
  {
    'id': 1,
    "name": "seca",
    "total_task": 6
  },
  {
    'id': 2,
    "name": "seca 2",
    "total_task": 10
  }
])
const loading = ref(false)
const dialog = ref(false)

const headers = [
  { title: 'Client Name', align: 'start', key: 'name' },
  { title: 'Total Task', align: 'start', key: 'total_task' },
]

// Navigate to user detail page
const handleRowClick = (event, { item }) => {
  navigateTo(`/user/${item.id}`)
}
</script>

<template>
  <div v-if="loading" class="text-center my-4">
    <v-progress-circular color="primary" indeterminate></v-progress-circular>
  </div>
  <main v-else>
    <div class="d-flex justify-end my-4">
      <v-btn>
        Add Users
      </v-btn>
    </div>

    <v-data-table 
      :items="items" 
      :headers="headers" 
      density="compact"
      @click:row="handleRowClick"
      hover
      class="cursor-pointer"
    >
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