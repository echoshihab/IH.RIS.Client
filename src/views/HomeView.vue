<template>
  <main>
    <div class="search-form">
      <v-text-field label="Patient Search"></v-text-field>
      <v-select
        label="Select"
        :items="['MRN', 'HCN', 'Demographic Details']"
        variant="outlined"
      ></v-select>

      <v-btn @click="getPatient">Test</v-btn>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { Patient } from '@/Models/Patient'
import { PatientService } from '@/services/patientService'
import { ref } from 'vue'

let patientService = new PatientService()

const patient = ref<Patient>()

async function getPatient() {
  patient.value = await patientService.get(1)
  console.log(patient.value)
}
</script>

<style scoped>
.search-form {
  display: flex;
  flex-direction: row;
  flex: 2 1 0;
}
</style>
