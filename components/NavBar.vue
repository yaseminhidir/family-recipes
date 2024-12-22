<template>
    <v-app-bar class="py-2 position-fixed top-0" density="compact" flat color="white">
      <v-app-bar-title class="logo">Aile <span>Tarifleri</span></v-app-bar-title>
     
      <nav class="alternate-nav">
        <NuxtLink to="/" class="menu-item" activeClass="router-link-active">
          Anasayfa
        </NuxtLink>
      
        <template v-if="!store.user">
          <NuxtLink
            to="/auth/login"
            class="menu-item"
            activeClass="router-link-active"
          >
            Login
          </NuxtLink>
        </template>
        <template v-else>
          <NuxtLink
            to="/admin"
            class="menu-item"
            activeClass="router-link-active"
          >
            Profil
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