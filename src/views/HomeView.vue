<script setup lang="ts"></script>

<template>
  <main>
    <div class="search-form">
      <v-text-field label="Patient Search"></v-text-field>
      <v-select
        label="Select"
        :items="['MRN', 'HCN', 'Demographic Details']"
        variant="outlined"
      ></v-select>
    </div>
  </main>
</template>

<style scoped>
.search-form {
  display: flex;
  flex-direction: row;
  flex: 2 1 0;
}
</style>
