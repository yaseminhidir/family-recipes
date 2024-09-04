<template>
   <RecipeList :recipes="recipes"></RecipeList>
</template>
<script setup>
definePageMeta({
  layout: "profile",
});
import { useAppStore } from "../stores/index";
const store = useAppStore();
const recipes = await store.fetchRecipesByUserId();
</script>
