<template>
  <v-row>
    <v-col cols="3" v-for="recipe in recipes" :key="recipe.id">
      <RecipeCard :recipe="recipe"></RecipeCard>
    </v-col>
  </v-row>
</template>

<script setup>
const { recipes  } = defineProps(["recipes" ]);
console.log("RECIPE LIST", recipes)
</script>
