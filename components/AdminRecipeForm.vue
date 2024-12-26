<template>
  <v-form ref="recipeForm">
    <v-row>
      <v-col cols="12" md="3">
        <v-text-field
          label="Title"
          v-model="recipe.title"
          variant="outlined"
          :rules="[(v) => !!v || 'Title is required']"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-select
          clearable
          label="Groups"
          :items="groups"
          item-title="name"
          item-value="id"
          v-model="recipe.groupIds"
          multiple
          variant="outlined"
          required
          :rules="[(v) => (v.length == 0 ? 'Group is required' : true)]"
        >
          <template v-slot:selection="{ item, index }">
            <v-chip v-if="index < 3">
              <span>{{ item.title }}</span>
            </v-chip>
            <span
              v-if="index === 3"
              class="text-grey text-caption align-self-center"
            >
              (+{{ recipe.group_ids.length - 3 }} others)
            </span>
          </template>
        </v-select>
      </v-col>
      <v-col cols="12" md="3">
        <v-select
          clearable
          chips
          label="Category"
          :items="categories"
          item-title="name"
          item-value="id"
          v-model="recipe.categoryId"
          variant="outlined"
          :rules="[(v) => !!v || 'Category is required']"
          required
        ></v-select>
      </v-col>
      <v-col cols="12" md="3">
        <v-select
          clearable
          chips
          label="Portion"
          :items="portions"
          item-value="id"
          item-title="name"
          v-model="recipe.portionId"
          variant="outlined"
          :rules="[(v) => !!v || 'Portion is required']"
          required
        ></v-select>
      </v-col>
      <v-col cols="6">
        <v-text-field
          label="Image Link"
          v-model="recipe.image"
          variant="outlined"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-combobox
        chips
        multiple
        label="Tags"
        variant="outlined"
        v-model="recipe.tags"
      ></v-combobox>
      </v-col>
      <v-col cols="12">
        <v-radio-group inline v-model="recipe.visibility">
          <template v-slot:label>
            <div>Visibility </div>
          </template>
          <v-radio color="success" label="Public" :value="true"></v-radio>
          <v-radio
            color="success"
            label="Only group members"
            :value="false"
          ></v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="12">
        <v-radio-group
          inline
          v-model="recipe.levelId"
          :rules="[(v) => !!v || 'Level is reuqired']"
        >
          <template v-slot:label>
            <div>Level</div>
          </template>
          <v-radio
            color="success"
            v-for="item in levels"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></v-radio>
        </v-radio-group>
      </v-col>

      <v-col cols="12" md="12">
        <v-textarea
          label="Description"
          v-model="recipe.description"
          variant="outlined"
          :rules="[(v) => !!v || 'Description is required']"
          required
        ></v-textarea>
      </v-col>
      <v-col cols="12" md="12">
        <h2>Ingredients</h2>
        <p class="text-subtitle-2">
          Total Ingredient :
          {{ recipe.ingredients.length > 0 ? recipe.ingredients.length : "0" }}
        </p>
      </v-col>
      <v-col cols="12" md="12">
        <v-table height="300px" fixed-header>
          <thead>
            <tr>
              <th class="text-left" width="30%">Ingredient</th>
              <th class="text-left" width="30%">Ölçü</th>
              <th class="text-left" width="30%">Unit</th>
              <th class="text-left" width="9%">
                <v-btn
                  @click="addIngredient"
                  icon="mdi-plus"
                  color="teal-lighten-3"
                  variant="outlined"
                ></v-btn>
              </th>
            </tr>
          </thead>
          <tbody class="mt-4" v-if="hasIngredients">
            <tr v-for="item in recipe.ingredients" :key="item.id">
              <td class="pa-3">
                <v-text-field
                  :autofocus="item.autofocus"
                  :id="item.id.toString()"
                  label="Ingredient"
                  required
                  variant="outlined"
                  v-model="item.type"
                  :rules="[(v) => !!v || 'Ingredients are required']"
                ></v-text-field>
              </td>
              <td class="pa-3">
                <v-text-field
                  label="Amount"
                  required
                  variant="outlined"
                  v-model="item.measurement"
                  :rules="[(v) => !!v || 'Amount is required']"
                ></v-text-field>
              </td>
              <td class="pa-3">
                <v-select
                  clearable
                  chips
                  label="Unit"
                  :items="units"
                  item-value="id"
                  item-title="name"
                  v-model="item.unitId"
                  variant="outlined"
                  :rules="[(v) => !!v || 'Unit is required']"
                ></v-select>
              </td>
              <td class="pa-3" style="vertical-align: baseline">
                <v-btn
                  @click="deleteIngredient(item.id)"
                  color="red-lighten-3"
                  variant="outlined"
                  icon="mdi-trash-can"
                  class="mt-1"
                >
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
      <v-col cols="12" class="d-flex justify-center">
        <v-btn color="success" @click="saveOrUpdateRecipe">Save</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import { ref, nextTick, reactive } from "vue";
import { useAppStore } from "../stores/index";

const store = useAppStore();
const recipe = ref({});
const props = defineProps(["recipe" ]);
const recipeForm = ref();
const router = useRouter();



if (props.recipe) {
  recipe.value = props.recipe;

} else {
  const { $emptyRecipe } = useNuxtApp();
  recipe.value = reactive({ ...$emptyRecipe })

}
const { data:categories, error } = await useFetch("/api/categories",{
  onResponse({response}){
   response._data=response._data.data
  }
});
const options = await store.getOptions();

const portions = options?.value.portions;
const levels = options?.value.levels;
const units = options?.value.units;

const visibility = store.visibility;
const user = store.user;
const groups = await store.getMyGroups();

const emit= defineEmits(["setIsEdit"])

if (!recipe.ingredients) {
  recipe.ingredients = [];
}

const hasIngredients = computed(()=>{
    return recipe.value.ingredients && recipe.value.ingredients.length > 0;

});

async function addIngredient() {
  const id = Math.floor(Math.random() * 999999);
  recipe.value.ingredients.push({ type: "", autofocus: true, id });

  await nextTick(); 

  let input = document.getElementById(id);
  if(input){
    input.scrollIntoView({
    behavior: "smooth",
  });
  }
}
function saveOrUpdateRecipe(){
  recipeForm.value?.validate().then(async ({valid: isValid}) => {
      if(isValid){
       const newRecipe = await store.saveOrUpdateRecipe(recipe?.value);
        emit("setIsEdit", false);
        if(!recipe.value.id){
          router.push("/admin/recipe/" + newRecipe.id)
        }
        emit("newRecipe");

      }
    })

}
function deleteIngredient(id) {
  return (recipe.value.ingredients = recipe.value.ingredients.filter(
    (x) => x.id != id
  ));
}

</script>
