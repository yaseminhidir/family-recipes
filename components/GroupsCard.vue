<template>
  <v-col v-for="group in groups" :key="group.name" cols="12" md="3">
    <nuxt-link
      activeClass="active-group"
      :to="'/group/' + group.id"
      class="nuxt-link"
    >
      <v-card
        prepend-icon="mdi-account-multiple"
        class="mx-auto mb-3"
        max-width="344"
        rel="noopener"
        :subtitle="'Kişi sayısı ' + groups.length"
        :title="group.name"
      ></v-card>
    </nuxt-link>
  </v-col>
</template>
<script setup>
const { groups } = defineProps(["groups"]);
</script>
