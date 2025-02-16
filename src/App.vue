<template>
  <v-snackbar v-model="show" :timeout="timeout">
    {{ message }}
  </v-snackbar>

  <header>
    <div class="wrapper"></div>
  </header>

  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useSnackbarStore } from '@/stores/snackbarStore'

const snackbarStore = useSnackbarStore()
const { show, message, timeout } = storeToRefs(snackbarStore)
</script>

<style scoped></style>
