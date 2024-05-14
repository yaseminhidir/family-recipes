<template>
    <div>
        <RecipeCard v-for="recipe in recipes" :key="recipe.index" :recipe="recipe"></RecipeCard>
    </div>
</template>

<script setup>
const {recipes} = defineProps(['recipes']);
</script>