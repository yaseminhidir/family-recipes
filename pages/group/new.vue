<template>
  <v-text-field
    label="Grup adı"
    variant="outlined"
    v-model="group.name"
  ></v-text-field>
  <v-btn color="success" @click="store.saveGroup(group)">Kaydet</v-btn>
</template>

<script setup>
definePageMeta({
  layout: "profile",
});
const store = useAppStore();

const group = { name: "" };
</script>
