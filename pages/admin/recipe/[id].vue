<template>
  <div >
    <v-row class="justify-center" >
    <v-col cols="8"   v-if="!isEdit && isOwner">
      <div class="edit-button-container text-end">
        <v-btn
          icon="mdi-pencil"
          size="small"
          @click="isEdit = true"
        ></v-btn>
      </div>
    </v-col>
  </v-row>
 
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
  </div>
 
</template>

<script setup>
import { mapRecipeData } from '~/helpers/mapData';
definePageMeta({
  layout: "profile",
});
const isEdit = ref(false);
const isOwner = computed(()=> recipe && recipe?.value && store.user?.id == recipe?.value.userId)
const loading=ref(true);
const store = useAppStore();
const route = useRoute();


const { data: recipe, error, refresh } = await useFetch(`/api/recipes/${route.params.id}`, {
  onResponse({ request, response, options }) {
    mapRecipeData(response._data)
  },
}
);
console.log("recipe detail" ,recipe.value)

function setIsEdit(state) {
  isEdit.value = state;
}
async function newRecipe(){
  refresh()
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
