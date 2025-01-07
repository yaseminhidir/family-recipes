<template>
  <v-container
    class="d-flex flex-column align-center justify-center text-center"
  >
    <v-typography class="text-body-1 mb-4">
      It looks like you haven’t added any recipes yet. By adding a family
      recipe, you can preserve your family’s cooking traditions and share them
      with your loved ones.
    </v-typography>
    <nuxt-link to="/admin/recipe/new" title="add-recipe">
      <v-btn color="success" variant="text" prepend-icon="mdi-plus">
        Add a Recipe
      </v-btn>
    </nuxt-link>
  </v-container>
</template>
