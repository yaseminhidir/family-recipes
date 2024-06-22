<template>
  <v-app id="inspire">
    <v-app-bar class="px-3" density="compact" flat>
      <v-avatar
        class="hidden-md-and-up"
        color="grey-darken-1"
        size="32"
      ></v-avatar>

      <v-spacer></v-spacer>

      <nav>
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
        <NuxtLink
          to="/admin/recipe/new"
          class="menu-item"
          activeClass="router-link-active"
        >
          Yeni Tarif Ekle
        </NuxtLink>
        <NuxtLink class="menu-item" activeClass="router-link-active">
          Profil
        </NuxtLink>
        <svg
          class="position-absolute top-0"
          style="width: 35px; height: 35px; right: 100%;transform:rotate(275deg);"
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

      <v-avatar class="hidden-sm-and-down" color="grey-darken-1" size="32">
        <v-img v-if="user" alt="Avatar" :src="user.photoURL"></v-img>
      </v-avatar>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="2">
            <v-sheet min-height="268" class="pa-2" rounded="lg" height="1">
              <GroupsCard v-if="store.hasGroup"> </GroupsCard>
              <EmptyGroup v-else> </EmptyGroup>
            </v-sheet>
          </v-col>

          <v-col cols="12" md="8">
            <v-sheet min-height="100vh" rounded="lg" height="1">
              <slot></slot>
            </v-sheet>
          </v-col>

          <v-col cols="12" md="2">
            <v-sheet min-height="268" rounded="lg">
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import GroupsCard from "../components/GroupsCard.vue";
import EmptyGroup from "../components/EmptyGroup.vue";
import { useAppStore } from "../stores/index";

const store = useAppStore();
const links = ["Anasayfa", "Yeni Tarif Ekle", "Profil"];
const user = useCurrentUser();
</script>
