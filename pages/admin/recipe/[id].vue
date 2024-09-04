<template>
  <div class="edit-button-container text-end mb-3">
    <v-btn
      icon="mdi-pencil"
      size="small"
      v-if="!isEdit && isOwner"
      @click="isEdit = true"
    ></v-btn>
  </div>
  <template v-if="!isEdit">
    <v-row v-if="recipe">
      <v-col cols="12">
        <div class="position-relative">
          <v-img
            class="align-end text-white recipe-img"
            height="200"
            :src="recipe.image"
            cover
          >
          </v-img>
        </div>
      </v-col>
      <v-col cols="12">
        <h1>{{ recipe.title }}</h1>
      </v-col>
      <v-col cols="12">
        <div class="text-body-2">
          <p>Kategori:{{ recipe.category.name }}</p>
          {{ recipe.portion }} kişilik
        </div>
      </v-col>
      <v-col cols="12">
        <div class="text-body-2 pb-1"  v-for="(ingredient, index) in recipe.ingredients" :key="index">    {{ ingredient.measurement }} {{ ingredient.unit }} {{ ingredient.type }} </div>
      </v-col>
      <v-col cols="12">
        <p class="text-body-1">
          {{ recipe.description }}
        </p>
      </v-col>

      <v-col cols="12"> <v-btn color="#FF6F61" text="Share"></v-btn></v-col>
    </v-row>
  </template>
  <template v-else>
    <AdminRecipeForm
      :recipe="recipe"
      @set-is-edit="setIsEdit"
    ></AdminRecipeForm>
  </template>
</template>

<script setup>
const isEdit = ref(false);
const isOwner = computed(()=> recipe && recipe.value && store.user.id == recipe.value.user.id)

definePageMeta({
  layout: "profile",
});
const store = useAppStore();
const route = useRoute();
const { data: recipe, error } = await useAsyncData("recipe", () =>
  store.fetchRecipeById(route.params.id)
);
function setIsEdit(state) {
  isEdit.value = state;
}




</script>
