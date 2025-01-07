<template>
  <v-app-bar
    class="py-2 position-fixed top-0"
    density="compact"
    flat
    color="white"
  >
    <v-app-bar-nav-icon
      v-if="display.lgAndDown.value"
      @click="$emit('update:drawer', !drawer)"
    />
    <v-app-bar-title class="logo"> <NuxtLink to="/" class="text-decoration-none">Family <span>Recipes</span></NuxtLink></v-app-bar-title>
    <v-spacer></v-spacer>
    <nav class="alternate-nav">
      <NuxtLink to="/" class="menu-item" activeClass="router-link-active">
        Home
      </NuxtLink>

      <template v-if="!store.user">
        <NuxtLink
          to="/auth/register"
          class="menu-item"
          activeClass="router-link-active"
        >
          Register
        </NuxtLink>
      </template>
      <template v-else>
        <NuxtLink
          to="/admin"
          class="menu-item"
          activeClass="router-link-active"
        >
          Profile
        </NuxtLink>
      </template>
      <NuxtLink class="menu-item" v-if="store.user" @click="store.logout">
        Logout
      </NuxtLink>
    </nav>

  </v-app-bar>
</template>

<script setup>
import { useDisplay } from "vuetify";

const store = useAppStore();
const display = useDisplay();
const props = defineProps({
  drawer: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:drawer"]);
</script>
