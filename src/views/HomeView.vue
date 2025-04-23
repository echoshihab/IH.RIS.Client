<template>
  <main>
    <v-btn-toggle v-model="toggle" divided class="mb-4">
      <v-btn value="mrn">Basic </v-btn>
      <v-btn value="advanced">Advanced </v-btn>
    </v-btn-toggle>
    <v-form v-if="showAdvanced">
      <v-text-field label="First Name"></v-text-field>
      <v-text-field label="Middle Name"></v-text-field>
      <v-text-field label="Last Name"></v-text-field>
      <v-text-field label="Gender"> </v-text-field>
      <v-date-input label="Birthdate"></v-date-input>
    </v-form>

    <v-text-field label="MRN" v-model="searchValue" v-else></v-text-field>

    <v-btn @click="getPatient">Search</v-btn>
  </main>
</template>

<script setup lang="ts">
import type { Patient } from '@/Models/Patient'
import { PatientService } from '@/services/patientService'
import { computed, ref } from 'vue'

const toggle = ref('mrn')

const showAdvanced = computed(() => toggle.value == 'advanced')

let patientService = new PatientService()

const patient = ref<Patient>()

const searchValue = ref<string>()

const searchType = ref<string>()

async function getPatient() {
  if (toggle.value === 'mrn') {
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
