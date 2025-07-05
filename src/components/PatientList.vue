<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Id</th>
        <th class="text-left"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="patient in patients" :key="patient.mrn">
        <td>
          {{ patient.name.lastName.toUpperCase() }},
          {{ patient.name.firstName.toUpperCase() }}
        </td>
        <td>{{ patient.mrn }}</td>
        <td>
          <v-btn
            color="indigo-darken-3"
            :to="{ name: 'PatientDetail', params: { mrn: patient.mrn } }"
          >
            View
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
<script setup lang="ts">
import type { Patient } from '@/Models/Patient'

const props = defineProps<{
  patients: Patient[]
}>()
</script>
