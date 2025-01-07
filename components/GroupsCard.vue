<template>
  <v-col v-for="group in groups" :key="group.name" cols="12">
    <v-card class="mx-auto mb-3" rel="noopener">
      <v-card-title class="d-flex justify-space-between">
        <div class=" d-flex align-center">
          <nuxt-link
            :to="'/group/' + group.id"
            class="text-decoration-none me-2 text-uppercase text-h5"
            :title="group.name"
            >{{ group.name }}
          </nuxt-link>

          <v-btn
            v-if="group.isOwner"
            @click="openEditDialog(group)"
            class="ms-2"
            icon="mdi-pencil"
            size="small"
            variant="text"
          ></v-btn>
        </div>
        <div class="text-subtitle-2">
          <nuxt-link
            :to="'/group/' + group.id"
            class="text-decoration-none me-2"
            title="View Detail"
          >
            View Detail
          </nuxt-link>
          {{ group._count.users + " members" }},
          {{ group._count.recipes + " recipes" }}
        </div>
      </v-card-title>

      <v-card-item>
        <RecipeList
          v-if="group.recipes.length > 0"
          :recipes="group.recipes"
        ></RecipeList>
        <EmptyRecipes v-else></EmptyRecipes>
      </v-card-item>
    </v-card>
  </v-col>
  <Dialog v-model:dialog-visible="groupEditDialog" :max-width="'500px'">
    <template #title>Edit Group Name</template>
    <template #content>
      <div v-if="success">
        {{ message }}
      </div>
      <v-text-field
        v-else
        class="py-2"
        label="Group name"
        variant="outlined"
        v-model="editingGroup.name"
        :rules="[(v) => !!v || 'Group name is required']"
      ></v-text-field>
    </template>
    <template #actions>
      <v-spacer></v-spacer>
      <v-btn v-if="success" @click="groupEditDialog = false">Close</v-btn>
      <v-btn
        v-else
        color="success"
        @click="saveGroup(editingGroup.id, editingGroup.name)"
        >Save</v-btn
      >
    </template>
  </Dialog>
</template>

<script setup>
import { ref } from "vue";

const { groups } = defineProps(["groups"]);

const groupEditDialog = ref(false);
const editingGroup = ref(null);
const originalGroup = ref(null);

const openEditDialog = (group) => {
  editingGroup.value = { ...group };
  groupEditDialog.value = true;
  originalGroup.value = group;
};

const saveGroup = async (id, name) => {
  try {
    const { data: res } = await useFetch(`/api/groups/createOrUpdate`, {
      method: "POST",
      body: { id, name },
    });
    if (res.value.success) {
      groupEditDialog.value = false;
      originalGroup.value.name = res.value.group.name;
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
