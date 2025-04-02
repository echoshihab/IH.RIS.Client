<template>
  <main>
    <div class="search-form">
      <v-text-field label="Patient Search" v-model="searchValue"></v-text-field>
      <v-select
        label="Select"
        :items="['MRN', 'HCN', 'Demographic Details']"
        v-model="searchType"
        variant="outlined"
      ></v-select>

      <v-btn @click="getPatient">Search</v-btn>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { Patient } from '@/Models/Patient'
import { PatientService } from '@/services/patientService'
import { ref } from 'vue'

let patientService = new PatientService()

const patient = ref<Patient>()

const searchValue = ref<string>()

const searchType = ref<string>()

async function getPatient() {
  if (searchType.value === 'MRN') {
    patient.value = await patientService.get(searchValue.value)
    console.log(patient.value)
  }
}
</script>

<style scoped>
.search-form {
  display: flex;
  flex-direction: row;
  flex: 2 1 0;
}
</style>
