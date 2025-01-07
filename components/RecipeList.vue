<template>
  <v-row>
    <v-col cols="12" xl="3" lg="3" md="6" sm="6" xs="12" v-for="recipe in recipes" :key="recipe.id">
      <RecipeCard :recipe="recipe"></RecipeCard>
    </v-col>
  </v-row>
</template>

<script setup>
const { recipes  } = defineProps(["recipes" ]);
console.log("RECIPE LIST", recipes)
</script>
