<template>
  <v-container>
    <v-row >
      <v-col cols="12">
        <h1>Popüler Tarifler</h1>
      </v-col>
      <v-col cols="12">
        <RecipeList :recipes="publicRecipes"></RecipeList>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>

definePageMeta({
  layout: 'hero-section'
})
import { useAppStore } from "../stores/index";
const store = useAppStore();
const publicRecipes = store.fetchPublicRecipes();
</script>
