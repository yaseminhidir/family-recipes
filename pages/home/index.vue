<template>
  <v-container class="h-100">
    <template v-if="store.hasGroup">
      <RecipeList :recipes="store.recipes"></RecipeList>
    </template>
    <template v-else>
      <div class="h-100 d-flex justify-center align-center flex-column">
        <v-btn prepend-icon="mdi-plus" class="ma-2 d-flex">
          <template v-slot:prepend>
            <v-icon color="success"></v-icon>
          </template>
          Bir Gruba Katıl
        </v-btn>
        <v-btn prepend-icon="mdi-account-multiple" class="ma-2 d-flex">
          <template v-slot:prepend>
            <v-icon color="success"></v-icon>
          </template>
          Yeni Bir Grup Oluştur
        </v-btn>
      </div>
    
    </template>
  </v-container>
</template>

<script setup>
import { useAppStore } from "../stores/index";

const store = useAppStore();
</script>
