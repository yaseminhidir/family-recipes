<template>
  <template v-if="recipes">
    <v-select
      clearable
      label="Görünürlük"
      :items="store.visibility"
      variant="outlined"
      v-model="select"
    ></v-select>

    <RecipeList :recipes="filteredRecipes"></RecipeList>
  </template>
  <template v-else>
    <EmptyRecipes ></EmptyRecipes>
  </template>
</template>

<script setup>
definePageMeta({
  layout: "profile",
});
import { useAppStore } from "../stores/index";
const store = useAppStore();
const recipes = await store.getMyRecipes();
console.log("rmy recipes" , recipes)
const select = ref(null);

const filteredRecipes = computed(() => {
  if (select.value == null) return recipes;
  return recipes?.filter((x) => x.visibility == select.value);
});
</script>
