<template>
    <v-card max-width="400" class="recipe-card elevation-0" style="height:100%">
      
      <nuxt-link  :to="store.user ? '/admin/recipe/' + recipe.id : '/recipe/' + recipe.id"  class="post-preview card-link" :title="recipe.title">
      <div class="position-relative mb-3">
        <v-img
          class="align-end text-white recipe-img"
          height="200"
          :src="recipe.image"
          cover
        >
        </v-img>
       
      </div>
      <hr />
      <div class="d-flex justify-space-between py-2 px-3">
        <span class="text-body-2 text-uppercase">{{ recipe.category.name }}</span>
        <span class="text-body-2 text-uppercase">{{ recipe.level ? level?.name : "" }}</span>
        <span class="text-body-2">{{ formattedDate }}</span>
      </div>
      <v-card-title style="white-space:normal">
        <v-row>
          <v-col cols="7" xl="8" lg="7" sm="6" md="6">
            <h3 class="text-body-2">
              {{ recipe.title }} 
            </h3>
          </v-col>
          <v-col cols="5" xl="4" lg="5" sm="6" md="6" class="text-end">
            <span class="text-body-2 text-disabled">{{ recipe.portion.name }} kişilik</span>
          </v-col>
        </v-row>
     
      </v-card-title>
      <v-card-text>
      
        <span class="text-uppercase text-disabled">{{ recipe.user?.firstName }} {{ recipe.user?.lastName }}</span>
      </v-card-text>
    </nuxt-link>
      <v-card-actions class="d-block d-md-flex justify-space-between">
        <div class="d-flex" v-if="recipe.tags">
          <v-chip class="ms-2"  v-for="(tag, index) in recipe.tags.slice(0, 3)"  :key="index" prepend-icon="mdi-tag" color="green" label >{{tag}}</v-chip>
        </div>
    
        <v-btn color="#FF6F61" text="Share" @click="shareWhatsapp"></v-btn>
      </v-card-actions>
    </v-card>

</template>

<script setup>
import moment from "moment";

let { recipe } = defineProps(["recipe" ]);

const store = useAppStore();
const options = await store.getOptions();

const level = computed(()=>{
    return options.levels?.filter(x=>x.id == recipe.level)[0]
});
const formattedDate = computed(() => {
  return moment(recipe.createdAt).format("DD.MM.YYYY"); // İstenen format
});

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
