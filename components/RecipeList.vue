<template>
  <v-row>
    <v-col cols="4" v-for="recipe in recipes" :key="recipe.id">
      <RecipeCard :recipe="recipe" :category="category" ></RecipeCard>
    </v-col>
  </v-row>
</template>

<script setup>
const { recipes , category } = defineProps(["recipes" , "category"]);
</script>
