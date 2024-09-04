<template>
    <v-sheet min-height="268" class="pa-2" rounded="lg" height="1">
        <v-row>
           <GroupsCard v-if="store.hasGroup" :groups="groups"> </GroupsCard>
           <EmptyGroup v-else> </EmptyGroup>
        </v-row>
    </v-sheet>
</template>
<script setup>
definePageMeta({
  layout: 'profile'
})
import { useAppStore } from "../stores/index";
const store = useAppStore();
const groups = await store.fetchGroupById()
</script>
