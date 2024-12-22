<template>
      <v-container class="fill-height d-flex flex-column align-center justify-center text-center">
  
      <v-typography class="text-h5 mb-2">
        Start by adding your first family recipe!
      </v-typography>

      <v-typography class="text-body-1 mb-4">
        It looks like you haven’t added any recipes yet. By adding a family recipe, you can preserve your family’s cooking traditions and share them with your loved ones.
      </v-typography>
      <v-btn color="success" variant="text" prepend-icon="mdi-plus" @click="addRecipe">
        Add a Recipe
      </v-btn>
    </v-container>
  </template>
  