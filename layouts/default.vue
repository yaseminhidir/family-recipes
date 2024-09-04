<template>
  <v-app id="inspire">
    <v-layout>
      <NavBar> </NavBar>
      <v-main>
        <slot></slot>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
definePageMeta({
  middleware: "check-login",
});

const user = useCurrentUser();
</script>
