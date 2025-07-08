import { defineStore } from 'pinia'
import type { Patient } from '../Models/Patient'

export const usePatientStore = defineStore('patient', {
  state: () => ({
    patients: [] as Patient[],
  }),

  getters: {
    getPatients(state) {
      return state.patients
    },
    getPatientByMrn(state) {
      return (mrn: string) => state.patients.find(p => p.mrn === mrn)
    },
  },

  actions: {
    addPatients(patients: Patient[]) {
      this.patients = [...patients]
    },
  },
})
