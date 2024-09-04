<template>
  <template  v-if="!tokenValidation">
    <div class="text-center pa-4">
      <v-dialog v-model="dialog" width="auto">
        <v-card
          max-width="400"
          prepend-icon="mdi-update"
          text="Token geçersiz. Süresi dolmuş veya hatalı bir token kullanılmış olabilir. "
          title="Token geçersiz"
          color="red"
        >
        </v-card>
      </v-dialog>
    </div>
  </template>
</template>

<script setup>
const route = useRoute();
const token = ref(route.params.token);
const store = useAppStore();
const tokenValidation = ref();
const  dialog=ref(false);
onMounted(async () => {
  tokenValidation.value = await store.isTokenValid(token.value);
    if(!tokenValidation.value){
        dialog.value=true
    }
});
</script>
