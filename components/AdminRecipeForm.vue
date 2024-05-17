<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
            :counter="10"
            label="Title"
            hide-details
            v-model="recipe.title"
            required
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            clearable
            label="Gruplar"
            :items="groups"
            item-value="id"
            item-title="name"
            v-model="recipe.group_ids"
            multiple
            variant="outlined"
          >
            <template v-slot:selection="{ item, index }">
              <v-chip v-if="index < 1">
                <span>{{ item.title }}</span>
              </v-chip>
              <span
                v-if="index === 2"
                class="text-grey text-caption align-self-center"
              >
                (+{{ recipe.group_ids.length - 1 }} others)
              </span>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            clearable
            chips
            label="Kategori"
            :items="categories"
            v-model="recipe.category"
            variant="outlined"
          ></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            clearable
            chips
            label="Porsiyon"
            :items="portions"
            v-model="recipe.portion"
            variant="outlined"
          ></v-select>
        </v-col>
        <v-col cols="12" md="12">
          <v-textarea
            label="Description"
            v-model="recipe.description"
            variant="outlined"
          ></v-textarea>
        </v-col>
        <v-col cols="12" md="12">
          <h2>Malzemeler</h2>
          <p class="text-subtitle-2">Toplam Malzeme : {{ recipe.ingredients.length }}</p>
        </v-col>
        <v-col cols="12" md="12">
          <v-table height="300px" fixed-header>
            <thead>
              <tr>
                <th class="text-left">Malzeme</th>
                <th class="text-left">Ölçü</th>
                <th class="text-left">Birim</th>
                <th class="text-left">
                  <v-btn
                    @click="addIngredient"
                    icon="mdi-plus"
                    color="teal-lighten-3"
                    variant="outlined"
                  ></v-btn>
                </th>
              </tr>
            </thead>
            <tbody class="mt-4">
              <tr v-for="item in recipe.ingredients" :key="item.id">
                <td width="30%" class="pa-3">
                  <v-text-field
                    :autofocus="item.autofocus"
                    :id="item.id"
                    label="Malzeme"
                    hide-details
                    required
                    variant="outlined"
                    v-model="item.type"
                  ></v-text-field>
                </td>
                <td width="30%" class="pa-3">
                  <v-text-field
                    label="Ölçü"
                    hide-details
                    required
                    variant="outlined"
                    v-model="item.measurement"
                  ></v-text-field>
                </td>
                <td width="30%" class="pa-3">
                  <v-select
                    clearable
                    hide-details
                    chips
                    label="Birim"
                    :items="units"
                    v-model="item.unit"
                    variant="outlined"
                  ></v-select>
                </td>
                <td width="9%" class="pa-3">
                  <v-btn
                    @click="deleteIngredient(item.id)"
                    color="red-lighten-3"
                    variant="outlined"
                   
                    icon="mdi-trash-can"
                  >
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup>
import { ref, nextTick } from "vue";

const categories = ref(["Çorba", "Ana Yemek", "Salata", "Tatlı"]);
const portions = ref(["1-2", "4-6", "8-10"]);
const units = ref([
  "Su bardağı",
  "Çay bardağı",
  "kase",
  "Yemek kaşığı",
  "Tatlı kaşığı",
  "Çay Kaşığı",
  "adet",
  "gr",
  "kg",
  "ml",
  "l",
  "tutam",
  "demet",
]);
const groups = ref([
  { id: 1, name: "Aile Grubu" },
  { id: 2, name: "Arkadaş Grubu" },
  { id: 3, name: "Okul" },
]);
const recipe = ref({
  id:1,
  title: "Tarhana Çorbası",
  ingredients: [
    { id: 1, measurement: "2", unit: "Yemek kaşığı", type: "Toz tarhana" },
    {
      id: 2,
      measurement: "1",
      unit: "Yemek kaşığı",
      type: "Toz tarhana",
      description: "Su eklendikten sonra ilave edilecek",
    },
    { id: 3, measurement: "1", unit: "Yemek kaşığı", type: "Tereyağı" },
    { id: 4, measurement: "1", unit: "Çay kaşığı", type: "Sıvı yağ" },
    { id: 5, measurement: "1", unit: "Yemek kaşığı", type: "Salça" },
    { id: 6, measurement: "5", unit: "Su Bardağı", type: "Sıcak Su" },
  ],
  category: "Çorba",
  image:
    "https://www.kevserinmutfagi.com/wp-content/uploads/2008/11/tarhana_corbasi2-1.jpg",
  description: "",
  portion: "4-6",
  user_id: 1,
  username: "yasemin",
  group_ids: [1, 2, 3],
});

async function addIngredient() {
  const id = Math.floor(Math.random() * 999999);
  recipe.value.ingredients.push({ autofocus: true, id });
  await nextTick(); // ui update edildi.

  let input = document.getElementById(id);
  input.scrollIntoView({
    behavior: "smooth",
  });


}
function deleteIngredient(id){
    return recipe.value.ingredients=recipe.value.ingredients.filter(x=>x.id != id )
  }
</script>
