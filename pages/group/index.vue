<template>
  <v-sheet class="pa-2" rounded="lg">
    <v-row>
      <v-col cols="12">
        <div>
          <v-btn
            @click="createNewDialog = true"
            prepend-icon="mdi-plus"
            color="green"
            ><div class="text-none text-uppercase">Create Group</div></v-btn
          >
          <Dialog
            :dialog-visible="createNewDialog"
            :max-width="'500px'"
            @update:dialogVisible="(value) => (createNewDialog = value)"
          >
            <template #title> Create New Group </template>
            <template #content>
              <v-text-field
                class="py-2"
                label="Group name"
                variant="outlined"
                v-model="groupName"
                :rules="[(v) => !!v || 'Group name is required']"
              ></v-text-field>
            </template>
            <template #actions>
              <v-spacer></v-spacer>
              <v-btn color="success" @click="saveGroup">Save</v-btn>
            </template>
          </Dialog>
        </div>
      </v-col>
      <GroupsCard v-if="groups.length > 0" :groups="groups"> </GroupsCard>
      <EmptyGroup v-else> </EmptyGroup>
    </v-row>
  </v-sheet>
</template>
<script setup>
definePageMeta({
  layout: "profile",
});
import { mapRecipeData } from "~/helpers/mapData";

const createNewDialog = ref(false);

let {
  data: groups,
  refresh,
  error,
} = await useFetch(`/api/users/getMyGroups`, {
  onResponse({ response }) {
    console.log("grup detay response", response._data);
    response._data = response._data.groups.map((x) => {
      var isOwner = x.isOwner;
      x = x.group;
      x.isOwner = isOwner;
      x.recipes = x.recipes.map((y) => y.recipe);
      mapRecipeData(x.recipes);
      return x;
    });
  },
});

console.log("GRUP DETAY", groups.value);
const groupName = ref("");
const saveGroup = async () => {
  try {
    const { data: res } = await useFetch("/api/groups/createOrUpdate", {
      method: "POST",
      body: { name: groupName.value },
    });
    if (res.value.success) {
      createNewDialog.value = false;
      refresh();
    } else {
      console.error("Error saving/updating group:", res.error);
      throw new Error(res.error);
    }
  } catch (error) {
    console.error("Error in saveOrUpdateGroup function:", error);
    throw error;
  }
};


</script>
