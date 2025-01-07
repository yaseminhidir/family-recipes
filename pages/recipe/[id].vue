<template>
    <RecipeDetail v-if="recipe" :recipe="recipe" />
</template>

<script  setup>
const store = useAppStore();
const route = useRoute();

import { mapRecipeData } from '~/helpers/mapData';
const { data: recipe, error, refresh } = await useFetch(`/api/recipes/${route.params.id}`, {
  onResponse({ request, response, options }) {
    mapRecipeData(response._data);
  },
}
);

useSeoMeta({
  title: () => recipe.value?.title,
  description: () => recipe.value?.description,
  ogTitle: () => recipe.value?.title,
  ogDescription: () => recipe.value?.description,
  keywords: () => recipe.value.tags.join(',')
});


</script>