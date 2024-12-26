<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Popüler Tarifler</h1>
      </v-col>

      <v-col cols="12">
        <RecipeList :recipes="recipes"> </RecipeList>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
definePageMeta({
  layout: "hero-section",
});
import { mapRecipeData } from "~/helpers/mapData";
const { data: recipes } = await useFetch(
  "/api/recipes/getRecipes",
  {
    method: "POST",
    body: { filters: { visibility: true } },
    onResponse({ response }) {
      mapRecipeData(response._data.recipes);
      response._data = response._data.recipes;
    },
  },
  
);
</script>
