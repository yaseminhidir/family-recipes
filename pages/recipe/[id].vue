<template>
    <RecipeDetail :recipe="recipe" />
</template>

<script  setup>
const store = useAppStore();
const route = useRoute();
const { data: recipe, error } = await useAsyncData("recipe", () =>
  store.getRecipeById(route.params.id)

);
</script>