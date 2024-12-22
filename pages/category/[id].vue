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
      {{ categories }}
    </v-col>

    <v-col md="12">
      <RecipeList :recipes="recipes" :category="category.name"></RecipeList>
    </v-col>
  </v-row>
</template>
<script setup>
import { useAppStore } from "../stores/index";

const store = useAppStore();

const categories = await store.getCategories();
const route = useRoute();
const router = useRouter();
const select = ref(route.params.id);

const category = await store.getCategory(route.params.id);
const recipes = category.recipes;
function handleChange(id) {
  router.push(`/category/${id}`);
}
</script>
