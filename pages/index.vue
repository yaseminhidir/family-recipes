<template>
  <div class="hero-section">
    <v-container>
      <v-row class="content-container" >
        <v-col class="h-100 d-flex align-center" cols="12" xs="12" sm="12" lg="6">
          <div>
            <v-list
              style="background: transparent"
              class="h-100 d-flex flex-column justify-center"
            >
              <v-list-item
                title="Create a group"
                class="hero-subtitle"
              ></v-list-item>
              <v-list-item
                title="Save your recipes"
                class="hero-subtitle"
              ></v-list-item>
            </v-list>
          </div>
        </v-col>
        <v-col class="position-relative d-flex align-end justify-end" cols="12" xs="12" sm="12" lg="6">
          <v-img
            style="opacity: 0.5"
            cover
            src="/assets/images/hero-pic.png"
          ></v-img>
        </v-col>
      </v-row>
    </v-container>
    <div class="category-container">
      <v-card>
        <v-card-item>
          <v-row>
            <v-col
              cols="12"
              md="3"
              v-for="(category, index) in categories"
              :key="index"
            >
              <v-row>
                <v-col cols="12" lg="5">
                  <nuxt-link
                    :to="'category/' + category.id"
                    class="post-preview card-link"
                    :title="category.name"
                  >
                    <v-img
                      class="rounded"
                      height="150"
                      :src="category.image"
                      :alt="category.name"
                      cover
                    >
                    </v-img>
                  </nuxt-link>
                </v-col>
                <v-col cols="12" md="7" class="d-flex align-center">
                  <div>
                    <p class="text-h6 text-uppercase">
                      {{ category.name }}
                    </p>
                    <p class="text-body-1">
                      More than {{ category._count.recipes }} Recipes
                    </p>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-item>
      </v-card>
    </div>
  </div>
  <v-col cols="12">
    <h1>Popüler Tarifler</h1>
  </v-col>

  <v-col cols="12">
    <RecipeList :recipes="recipes"> </RecipeList>
  </v-col>
</template>

<script setup>
import { mapRecipeData } from "~/helpers/mapData";
const { data: recipes } = await useFetch("/api/recipes/getRecipes", {
  method: "POST",
  body: { filters: { visibility: true } },
  onResponse({ response }) {
    mapRecipeData(response._data.recipes);
    response._data = response._data.recipes;
  },
});
const { data: categories, error } = await useFetch("/api/categories", {
  onResponse({ response }) {
    response._data = response._data.data;
  },
});


useSeoMeta({
  title: "Family Recipes - Home",
  description: "Create a group and save your recipes",
  ogTitle: "Family Recipes - Home",
  ogDescription: "Create a group and save your recipes",
  keywords: `family-recipes, recipe-book , ${categories.value.map(x => x.name).join(', ')}`,
});
</script>
