<template>
  <v-app id="inspire">
    <v-layout>
      <NavBar> </NavBar>
      <v-main>
        <v-container class="mt-5">
          <slot></slot>
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
definePageMeta({
  middleware: "check-login",
});

</script>
