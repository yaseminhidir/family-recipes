<template>
    <v-app-bar class="py-2 position-fixed top-0" density="compact" flat color="white">
      <v-app-bar-title class="logo">Family <span>Recipes</span></v-app-bar-title>
     
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
        <NuxtLink  class="menu-item" v-if="store.user" @click="store.logout">
          Logout
        </NuxtLink>

      </nav>
      <v-spacer></v-spacer>
    
    </v-app-bar>
</template>
<script setup>
const store=useAppStore()

</script>