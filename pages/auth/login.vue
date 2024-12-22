<template>
    <v-sheet class="mx-auto" width="300">
      <v-form fast-fail @submit.prevent>
        <v-text-field
          v-model="user.email"
          label="Email"
          type="email"
        ></v-text-field>
        <v-text-field
          v-model="user.password"
          label="Password"
          type="password"
        ></v-text-field>
        <v-btn class="mt-2" @click="store.login(user)" block>Submit</v-btn>
      </v-form>
    </v-sheet>
  </template>
  
  <script setup>
  const store=useAppStore();;
  const user=ref({});

  
  </script>
  