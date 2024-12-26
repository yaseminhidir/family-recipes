<template>
  <v-row>
    <v-col md="3">
      <v-select
        label="Kategori"
        :items="categories"
        item-title="name"
        item-value="id"
        variant="outlined"
        v-model="select"
        @update:modelValue="handleChange"
      ></v-select>
    
    </v-col>
    <v-col md="12">
      <RecipeList :recipes="recipes" ></RecipeList>
    </v-col>
  </v-row>
</template>
<script setup>
import { mapRecipeData } from "~/helpers/mapData";
import { useAppStore } from "../stores/index";

const store = useAppStore();

const { data:categories } = await useFetch("/api/categories", {
  onResponse({response}){
   response._data=response._data.data
  }
});

const route = useRoute();
const router = useRouter();
const select = ref(route.params.id);

const { data:category} = await useFetch(`/api/categories/${route.params.id}`);
let recipes = category.value.recipes;
recipes=recipes.map(recipe => ({
  ...recipe,
  tags: JSON.parse(recipe.tags),
}));
function handleChange(id) {
  router.push(`/category/${id}`);
}
</script>
