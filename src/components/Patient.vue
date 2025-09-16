<template>
  <v-overlay v-model="loading" persistent class="d-flex align-center justify-center" scrim>
    <v-progress-circular indeterminate color="primary" size="64" />
  </v-overlay>

  <v-card class="mx-auto px-4 py-2" prepend-icon="$vuetify" width="400" v-if="patient">
    <template v-slot:title>
      <div class="d-flex justify-space-between" v-if="route.params.mrn !== '0'">
        <span class="font-weight-black">Patient MRN : {{ patient.mrn }}</span>

        <v-icon color="teal-darken-2" icon="mdi-eye" size="small" v-if="editMode" @click="toggleEditMode"></v-icon>
        <v-icon v-else color="teal-darken-2" icon="mdi-account-edit" size="small" @click="toggleEditMode"></v-icon>
      </div>
    </template>
    <v-card-text class="bg-surface-light pt-4 mb-2" v-if="editMode">
      <v-text-field label="First Name" v-model="patient.name.firstName"></v-text-field>
      <v-text-field label="Middle Name" v-model="patient.name.middleName"></v-text-field>
      <v-text-field label="Last Name" v-model="patient.name.lastName"></v-text-field>
      <v-date-input label="Date of Birth" prepend-icon="" prepend-inner-icon="$calendar"
        v-model="patientDob"></v-date-input>
      <v-select label="Gender" v-model="patient.gender" :items="Object.values(Gender)">
      </v-select>
    </v-card-text>

    <v-card-text class="bg-surface-light pt-4 mb-2" v-else>
      <v-list density="compact">
        <v-list-subheader>Patient Details</v-list-subheader>

        <v-list-item color="primary">
          <template v-slot:prepend>
            <v-label class="mr-2">Name: </v-label>
          </template>
          <v-list-item-title class="text-capitalize" v-text="getPatientFullName()"></v-list-item-title>
        </v-list-item>
        <v-list-item color="primary">
          <template v-slot:prepend>
            <v-label class="mr-2">DOB: </v-label>
          </template>
          <v-list-item-title class="text-capitalize" v-text="patientDob?.toLocaleDateString()"></v-list-item-title>
        </v-list-item>
        <v-list-item color="primary">
          <template v-slot:prepend>
            <v-label class="mr-2">Gender: </v-label>
          </template>
          <v-list-item-title class="text-capitalize" v-text="Gender[patient.gender]"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card-text>
    <div class="d-flex justify-space-between">
      <v-btn color="indigo-lighten-5" :to="{ name: 'home' }"> Back </v-btn>
      <v-btn v-if="editMode" color="indigo-darken-3" @click="savePatient()">
        Save
      </v-btn>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { Gender } from '@/Enums/Gender'
import { Patient } from '@/Models/Patient'
import { PatientService } from '@/services/patientService'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const loading = ref(false)

const route = useRoute()
const router = useRouter()

const patientService = new PatientService()

const getPatientFullName = () =>
  [
    patient.value?.name.firstName,
    patient.value?.name.middleName,
    patient.value?.name.lastName,
  ]
    .filter(v => !!v)
    .join(' ')

const patient = ref<Patient>(new Patient())

const savePatient = async () => {
  try {
    const { mrn } = patient.value
    const data = await (mrn
      ? patientService.put(mrn, patient.value)
      : patientService.post(patient.value))

    if (data && data.mrn) {
      loading.value = true
      toggleEditMode()
      router.push({ name: 'PatientDetail', params: { mrn: data.mrn } })
      loading.value = false
    }
  } catch (ex) {
    console.error(ex)
  }
}

const editMode = ref(false)
const toggleEditMode = function () {
  editMode.value = !editMode.value
}

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

onMounted(async () => {
  loading.value = true
  const mrn = Number(route.params.mrn)
  if (!isNaN(mrn)) {
    if (mrn === 0) {
      toggleEditMode()
    } else {
      patient.value = await patientService.get(mrn)

      // patient.value = patientStore.getPatientByMrn(
      //   route.params.mrn ? (route.params.mrn as string) : '',
      // )
    }
  }

  loading.value = false
})
</script>
