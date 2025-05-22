<template>
  <v-container fluid>
    <ResizablePage>
      <template #header>
        <v-toolbar
          color="primary"
          dark
        >
          <v-toolbar-title>My Resizable Table Page</v-toolbar-title>
        </v-toolbar>
      </template>

      <template #toolbar>
        <v-row class="my-2">
          <v-col>
            <v-text-field
              v-model="search"
              label="Search..."
            />
          </v-col>
        </v-row>
      </template>

      <template #filter>
        <!-- Optional filter area -->
      </template>

      <template #table="{ tableHeight }">
        <v-data-table
          :items="items"
          :headers="headers"
          :items-per-page="5"
          :height="tableHeight"
          class="elevation-1"
        />
      </template>
    </ResizablePage>
  </v-container>
</template>

<script setup>
import ResizablePage from '@/components/utils/ResizablePage.vue'
import { ref } from 'vue'

const search = ref('')

const headers = [
  { title: 'Name', key: 'name' },
  { title: 'Age', key: 'age' }
]

const items = [
  { name: 'John', age: 25 },
  { name: 'Jane', age: 30 },
  { name: 'Alice', age: 28 },
  { name: 'Bob', age: 35 },
  { name: 'Carol', age: 27 },
  { name: 'David', age: 40 }
]
</script>
