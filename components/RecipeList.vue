<template>
  <v-row>
    <v-col cols="4" v-for="recipe in recipes" :key="recipe.id">
      <RecipeCard :recipe="recipe"></RecipeCard>
    </v-col>
  </v-row>
</template>

<script setup>
const { recipes } = defineProps(["recipes"]);
</script>
