<template>
  <v-overlay
    v-model="loading"
    persistent
    class="d-flex align-center justify-center"
    scrim
  >
    <v-progress-circular indeterminate color="primary" size="64" />
  </v-overlay>
  <v-card
    class="mx-auto"
    prepend-icon="$vuetify"
    subtitle="The #1 Vue UI Library"
    width="400"
  >
    <template v-slot:title>
      <span class="font-weight-black">Patient MRN : {{ patientMrn }}</span>
    </template>

    <v-card-text class="bg-surface-light pt-4">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione
      debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat
      totam, magni doloremque veniam neque porro libero rerum unde voluptatem!
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const loading = ref(true)

const route = useRoute()

const patientMrn = route.params.mrn
</script>
