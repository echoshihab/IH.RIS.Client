<template>
  <main>
    <div class="d-flex justify-space-between">
      <v-btn-toggle v-model="toggle" divided class="mb-4">
        <v-btn value="mrn">Basic </v-btn>
        <v-btn value="advanced">Advanced </v-btn>
      </v-btn-toggle>
      <v-btn value="new" :to="{ name: 'PatientDetail', params: { mrn: 0 } }"
        >Register</v-btn
      >
    </div>
    <v-form v-if="showAdvanced">
      <v-text-field
        label="First Name"
        v-model="searchQuery.firstName"
      ></v-text-field>
      <v-text-field
        label="Middle Name"
        v-model="searchQuery.middleName"
      ></v-text-field>
      <v-text-field
        label="Last Name"
        v-model="searchQuery.lastName"
      ></v-text-field>
      <v-text-field label="Gender" v-model="searchQuery.gender"> </v-text-field>
      <v-date-input
        label="Date of Birth"
        prepend-icon=""
        prepend-inner-icon="$calendar"
        v-model="searchQuery.birthDate"
      ></v-date-input>
    </v-form>

    <v-text-field label="MRN" v-model="searchValue" v-else></v-text-field>

    <v-btn @click="getPatient">Search</v-btn>

    <div class="mt-4">
      <v-skeleton-loader v-if="loader" type="table"></v-skeleton-loader>
      <patient-list :patients="patients"></patient-list>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { Patient } from '@/Models/Patient'
import { PatientService } from '@/services/patientService'
import { computed, ref } from 'vue'
import PatientList from '@/components/PatientList.vue'
import { usePatientStore } from '@/stores/patientStore'

const patientStore = usePatientStore()

type SearchQuery = {
  firstName: String
  middleName: String
  lastName: String
  gender: String
  birthDate: String
}

const searchQuery = ref<SearchQuery>({
  firstName: '',
  middleName: '',
  lastName: '',
  gender: '',
  birthDate: '',
})

const patients = ref<Patient[]>([])

const toggle = ref('mrn')

const loader = ref(false)

const showAdvanced = computed(() => toggle.value == 'advanced')

let patientService = new PatientService()

const patient = ref<Patient>()

const searchValue = ref<string>()

const searchType = ref<string>()

async function getPatient() {
  loader.value = true
  if (toggle.value === 'mrn') {
    patient.value = await patientService.get(searchValue.value)
    patients.value = patient.value ? [patient.value] : []
  } else {
    patients.value = (await patientService.query(searchQuery.value)) ?? []
  }
  patientStore.addPatients(patients.value)
  loader.value = false
}
</script>

<style scoped>
.search-form {
  display: flex;
  flex-direction: row;
  flex: 2 1 0;
}
</style>
