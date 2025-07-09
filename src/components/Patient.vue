<template>
  <v-overlay
    v-model="loading"
    persistent
    class="d-flex align-center justify-center"
    scrim
  >
    <v-progress-circular indeterminate color="primary" size="64" />
  </v-overlay>
  <v-card class="mx-auto" prepend-icon="$vuetify" width="400" v-if="patient">
    <template v-slot:title>
      <span class="font-weight-black">Patient MRN : {{ patient.mrn }}</span>
    </template>

    <v-card-text class="bg-surface-light pt-4 mb-2">
      <v-text-field
        label="First Name"
        v-model="patient.name.firstName"
      ></v-text-field>
      <v-text-field
        label="Middle Name"
        v-model="patient.name.middleName"
      ></v-text-field>
      <v-text-field
        label="Last Name"
        v-model="patient.name.lastName"
      ></v-text-field>
      <v-date-input
        label="Date of Birth"
        prepend-icon=""
        prepend-inner-icon="$calendar"
        v-model="patientDob"
      ></v-date-input>
    </v-card-text>
    <v-btn class="d-flex justify-center" color="indigo-darken-3"> Save </v-btn>
  </v-card>
</template>

<script setup lang="ts">
import type { Patient } from '@/Models/Patient'
import { usePatientStore } from '@/stores/patientStore'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const loading = ref(false)

const route = useRoute()

const patientStore = usePatientStore()

const patient = ref<Patient>()

const patientDob = computed({
  get() {
    if (patient.value && patient.value.birthYear) {
      const { birthYear, birthMonth, birthDay } = patient.value
      return new Date(birthYear, birthMonth - 1, birthDay)
    }
    return null
  },
  set(newBirthDate) {
    if (newBirthDate && patient.value) {
      patient.value.birthYear = newBirthDate.getFullYear()
      patient.value.birthMonth = newBirthDate.getMonth() + 1
      patient.value.birthDay = newBirthDate.getDate()
    }
  },
})

onMounted(() => {
  loading.value = true
  patient.value = patientStore.getPatientByMrn(
    route.params.mrn ? (route.params.mrn as string) : '',
  )
  loading.value = false
})
</script>
