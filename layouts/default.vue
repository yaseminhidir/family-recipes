<template>
  <v-app id="inspire">
    <v-layout>
      <NavBar> </NavBar>
      <v-main>
          <slot></slot>
          <v-footer class="d-block d-md-flex align-center" color="light-green-lighten-5">
          Get connected with us on social networks!
          <v-spacer></v-spacer>
          <v-btn
            v-for="social in socials"
            :key="social.icon"
            :icon="social.icon"
            class="mx-4"
            size="small"
            variant="plain"
            target="_blank"
            :href="`https://${social.link}`"
          ></v-btn>
        </v-footer>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
definePageMeta({
  middleware: "check-login",
});
const socials = ref([
  { icon: "mdi-facebook", link: "facebook.com" },
  { icon: "mdi-twitter", link: "twitter.com" },
  { icon: "mdi-linkedin", link: "linkedin.com" },
  { icon: "mdi-instagram", link: "instagram.com" },
]);
</script>

