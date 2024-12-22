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
    <RecipeDetail :recipe="recipe" />
  </template>
  <template v-else>
    <AdminRecipeForm
      :recipe="recipe"
      @set-is-edit="setIsEdit"
      @new-recipe="newRecipe"
    ></AdminRecipeForm>
  </template>
</template>

<script setup>

definePageMeta({
  layout: "profile",
});
const isEdit = ref(false);
const isOwner = computed(()=> recipe && recipe?.value && store.user?.id == recipe?.value.userId)

const store = useAppStore();
const route = useRoute();
const { data: recipe, error } = await useAsyncData("recipe", () =>
  store.getRecipeById(route.params.id)
);

function setIsEdit(state) {
  isEdit.value = state;
}
function newRecipe(data){
  console.log(data)
  recipe.value=data;
}
function shareWhatsapp() {
  const title = recipe.value.title || 'No Title';
  const description = recipe.value.description || 'No Description';
  const ingredients = recipe.value.ingredients
    ? recipe.value.ingredients.map(ingredient => `\n${ingredient.type}: ${ingredient.measurement} ${ingredient.unit}`).join(', ')
    : 'No Ingredients';
  const textToShare = `${title}\n${ingredients}\n ${description}`;
  const urlEncodedText = encodeURIComponent(textToShare);
  const url = `https://wa.me/?text=${urlEncodedText}`;
  window.open(url, '_blank'); // Yeni bir sekmede açılır
}


</script>
