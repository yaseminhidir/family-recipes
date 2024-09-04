<template>
    <v-app-bar class="px-3" density="compact" flat>
      <v-avatar
        class="hidden-md-and-up"
        color="grey-darken-1"
        size="32"
      ></v-avatar>

      <v-spacer></v-spacer>

      <nav class="alternate-nav">
        <svg
          class="position-absolute top-0"
          style="
            width: 35px;
            height: 35px;
            left: 100%;
            transform: rotate(180deg);
          "
          viewBox="0 0 100 100"
        >
          <path
            d="M0,100Q100,100,100,0q0-91.00364,0,100h-100Z"
            fill="rgba(248, 251, 241, 1) "
            stroke-width="0.6"
          ></path>
        </svg>
        <NuxtLink to="/home" class="menu-item" activeClass="router-link-active">
          Anasayfa
        </NuxtLink>
        <Login v-if="!user"></Login>
        <template v-else>
          <NuxtLink
            to="/admin/recipes"
            class="menu-item"
            activeClass="router-link-active"
          >
            Profil
          </NuxtLink>
        </template>

        <svg
          class="position-absolute top-0"
          style="
            width: 35px;
            height: 35px;
            right: 100%;
            transform: rotate(270deg);
          "
          viewBox="0 0 100 100"
        >
          <path
            d="M0,100Q100,100,100,0q0-91.00364,0,100h-100Z"
            fill="rgba(248, 251, 241, 1) "
            stroke-width="0.6"
          ></path>
        </svg>
      </nav>

      <v-spacer></v-spacer>
      <template v-if="user">
        <v-avatar class="hidden-sm-and-down" color="grey-darken-1" size="32">
          <v-img alt="Avatar" :src="user.photoURL"></v-img>
        </v-avatar>
      </template>
    </v-app-bar>
</template>
<script setup>
const user = useCurrentUser();
</script>