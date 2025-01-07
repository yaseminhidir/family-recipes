<template>
  <v-app style="min-height: 100vh">
    <v-layout class="mt-5 pt-5"
      >
      <NavBar v-model:drawer="drawer" />

      <v-navigation-drawer
        v-model="drawer"
        app
        :temporary="display.lgAndDown.value"
        :permanent="display.lgAndUp.value"
      >
        <template v-slot:prepend>
          <v-list-item
            lines="two"
            prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
            subtitle="Logged in"
            title="Jane Smith"
          ></v-list-item>
        </template>

        <v-divider></v-divider>
       
        <v-list density="compact" nav>
          <v-list-item
            to="/admin"
            prepend-icon="mdi-account-group-outline"
            title="My Recipes"
            value="recipes"
          ></v-list-item>
          <v-list-item
            to="/admin/recipe/new"
            prepend-icon="mdi-home-city"
            title="Add New Recipe"
            value="add-recipe"
          ></v-list-item>
          <v-list-item
            to="/group"
            prepend-icon="mdi-account-group-outline"
            title="Groups"
            value="groups"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <v-container fluid>
          <slot></slot>
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { useDisplay } from "vuetify";

const drawer = ref(false);

const display = useDisplay();
if(display.lgAndUp.value){
  drawer.value=true
}

definePageMeta({
  middleware: "check-login",
});

</script>
