<template>
  <v-row v-if="recipe" class="justify-center">
    <v-col cols="8">
      <hr />
      <div class="d-flex justify-space-between">
        <span class="text-body-2">{{ recipe.category?.name }}</span>
        <span class="text-body-2">{{ formattedDate }}</span>
      </div>
    </v-col>
    <v-col cols="8">
      <h1 class="">{{ recipe.title }}</h1>
    </v-col>
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

    <v-col cols="4">
      <v-list density="compact">
        <v-list-item>
          <h2 class="text-uppercase text-h6">Malzemeler</h2>
        </v-list-item>
        <v-list-item
          v-for="(ingredient, index) in recipe?.ingredients"
          :key="index"
        >
          <span>
            {{
              ingredient.measurement +
              " " +
              ingredient.unit?.name +
              " " +
              ingredient.type
            }}
          </span>
        </v-list-item>
      </v-list>
    </v-col>
    <v-col cols="8">
      <div class="py-2 border-b-md border-warning d-flex">
        <div>
            <span class="text-h6 text-uppercase"> PORSİYON </span>
            <span class="text-h6 font-weight-light"> : {{ recipe.portion?.name }} </span>
        </div>
        <div class="ms-5">
            <span class="text-h6 text-uppercase"> Kategori </span>
            <span class="text-h6 font-weight-light">
            : {{ recipe.category?.name }}
            </span>
        </div>
      </div>
      <div class="py-2 border-b-md border-warning mb-3">
        <span class="text-h6 text-uppercase"> Zorluk </span>
        <span class="text-h6 font-weight-light"> : {{ recipe.level ? recipe.level?.name : "" }} </span>
      </div>
      <p>
        {{ recipe.description }}
      </p>
    </v-col>

    <v-col cols="12" class="d-flex justify-end">
      <v-btn color="#FF6F61" text="Share" @click="shareWhatsapp"></v-btn
    ></v-col>
  </v-row>
</template>

<script setup>
import moment from "moment";
const store = useAppStore();

const { recipe } = defineProps(["recipe"]);
const formattedDate = computed(() => {
  return moment(recipe?.createdAt).format("DD.MM.YYYY"); // İstenen format
});
const options = await store.getOptions();

const level = computed(()=>{
    return options.levels?.filter(x=>x.id == recipe.level)[0]
});
</script>
