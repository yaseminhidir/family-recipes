<template>
    <div>
      <AdminRecipeForm :recipe="recipe"></AdminRecipeForm>
    </div>
  </template>
  
  <script setup>
  const store = useAppStore();
  const route = useRoute();
  const { data: recipe, error } = await useAsyncData("recipe", () =>
    store.fetchRecipeById(route.params.id)
  );

  </script>
  