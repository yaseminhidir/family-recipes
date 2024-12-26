<template>
  <template v-if="recipes">
    <v-select
      clearable
      label="Visibility"
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
import { mapRecipeData } from "~/helpers/mapData";
import { useAppStore } from "../stores/index";

const store = useAppStore();
const { data:recipes, error } = await useFetch("/api/recipes/getMine", {
  onResponse({response}){
    mapRecipeData(response._data.recipes);
    response._data=response._data.recipes
  }
});
console.log("RECPIES",recipes.value);

const select = ref(null);

const filteredRecipes = computed(() => {
  if (select.value == null) return recipes.value;
  return recipes?.value?.filter((x) => x.visibility == select.value);
});

</script>
