<script setup>
  import { ref } from 'vue'
const items = ref([
  {
    'id': 1,
    'task_title': 'Task 1',
    'description': 'Description 1',
    'status': 'Pending',
    'created_at': '2021-01-01',
  }
])
const loading = ref(false)
const dialog = ref(false)
const headers = [
  { title: 'Task Title', align: 'start', key: 'task_title' },
  { title: 'Description', align: 'start', key: 'description' },
  { title: 'Status', align: 'start', key: 'status' },
  { title: 'Created At', align: 'start', key: 'created_at' },
  { title: 'Action', key: 'action' }

]

</script>

<template>
  <div v-if="loading" class="text-center my-4">
    <v-progress-circular color="primary" indeterminate></v-progress-circular>
  </div>
  <main v-else>
    <div class="d-flex justify-end my-4">
      <v-btn>
        Add Task
      </v-btn>
    </div>

    <v-data-table :items="items" density="compact" :headers>
      <template v-slot:item.action="{ item }">
        <v-row>
          <v-btn @click="dialog = true">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn>
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
          <v-text-field label="Task Title" />
          <v-textarea label="Description" />
          <v-select label="Status" :items="['Pending', 'In Progress', 'Completed']" />
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