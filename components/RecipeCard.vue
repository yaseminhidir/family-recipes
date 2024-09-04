<template>
 
    <v-card max-width="400" class="recipe-card">
      <nuxt-link :to="'/admin/recipe/' + recipe.id" class="post-preview card-link">
      <div class="position-relative">
        <v-img
          class="align-end text-white recipe-img"
          height="200"
          :src="recipe.image"
          cover
        >
        </v-img>
       
      </div>
      <v-card-title>{{ recipe.title }}</v-card-title>
      <v-card-subtitle class="pt-4">
        <p>Kategori:{{ recipe.category.name }}</p>
        {{ recipe.portion }} kişilik
      </v-card-subtitle>

      <v-card-text>
        <div>{{ recipe.username }}</div>
      </v-card-text>
    </nuxt-link>
      <v-card-actions>
        <v-btn color="#FF6F61" text="Share" @click="shareWhatsapp"></v-btn>
      </v-card-actions>
    </v-card>

</template>

<script setup>
const { recipe } = defineProps(["recipe"]);
function shareWhatsapp() {
  const title = recipe.title || 'No Title';
  const description = recipe.description || 'No Description';
  const ingredients = recipe.ingredients
    ? recipe.ingredients.map(ingredient => `\n${ingredient.type}: ${ingredient.measurement} ${ingredient.unit}`).join(', ')
    : 'No Ingredients';
  const textToShare = `${title}\n${ingredients}\n ${description}`;
  const urlEncodedText = encodeURIComponent(textToShare);
  const url = `https://wa.me/?text=${urlEncodedText}`;
  window.open(url, '_blank'); // Yeni bir sekmede açılır
}

</script>
