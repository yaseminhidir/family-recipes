<template>
  <v-card max-width="400" class="recipe-card">
    <div class="position-relative">
        <v-img
        class="align-end text-white recipe-img"
        height="200"
        :src="recipe.image"
        cover
      >
      </v-img>
      <div class="whatsapp-btn">
          <v-btn class="ma-2 text-dark" color="green-accent-1" icon="mdi-whatsapp"></v-btn>
          <v-btn class="ma-2 text-dark" color="green-accent-1" icon="mdi-eye-outline"></v-btn>
        </div>
    </div>
    <v-card-title>{{ recipe.title }}</v-card-title>
    <v-card-subtitle class="pt-4">
      <p>Kategori:{{ recipe.category }}</p>
      {{ recipe.portion }} kişilik
    </v-card-subtitle>

    <v-card-text>
      <div>{{ recipe.username }}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn color="orange" text="Share"></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
const { recipe } = defineProps(["recipe"]);
</script>
