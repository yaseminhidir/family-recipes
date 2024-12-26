<template>
  <v-col v-for="group in groups" :key="group.name" cols="12">
      <v-card
        class="mx-auto mb-3"
        rel="noopener"
      >
      <nuxt-link :to="'/group/' + group.id" class="text-decoration-none">
      <v-card-title class="d-flex justify-space-between" >
        <div class="text-uppercase text-h5">
        
          {{ group.name }}
     
        </div>
        <div class="text-subtitle-2">
          {{ group._count.users + ' members' }} , 
          {{ group._count.recipes + ' recipes' }}
        </div>
      </v-card-title>
    </nuxt-link>
      <v-card-item>
      <RecipeList v-if="group.recipes.length > 0 " :recipes="group.recipes"> </RecipeList>
      <EmptyRecipes v-else>
      </EmptyRecipes>
    </v-card-item>
    </v-card>
  </v-col>
</template>
<script setup>
const { groups } = defineProps(["groups"]);
console.log("GROUP CARDS", groups)
</script>
