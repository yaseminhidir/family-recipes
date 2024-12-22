<template>
  <template v-if="!loading">
    <div class="text-center pa-4">
      <v-dialog :modelValue="!tokenValidation.valid" width="auto">
        <v-card
          max-width="400"
          title="Token geçersiz"
          :subtitle="tokenValidation.message"
        >
        <v-card-item class="pt-1">
          <v-progress-circular
            color="red"
            indeterminate
          ></v-progress-circular>
          <span class="ms-2">
            {{ timerInSeconds }} saniye içerisinde Anasayfaya yönlendirileceksiniz.
          </span>
        </v-card-item>
        </v-card>
      </v-dialog>
      <v-dialog :modelValue="tokenValidation.valid" width="auto">
        <v-card
          max-width="400"
          class="custom-card-icon"
          :title="tokenValidation.groupName"
          subtitle="Bu gruba katılmak istediğinizden emin misiniz? "
        >
          <template v-slot:prepend>
            <v-icon color="success" icon="mdi-account-group-outline"></v-icon>
          </template>
          <v-card-text>
            Daveti kabul ettiğinizde, grup
            içerisinde paylaşılan içeriklere erişim sağlayabilir, siz de tariflerinizi sevdiklerinizle paylaşabilirsiniz!
          </v-card-text>
          <v-card-actions>
            <v-btn color="success" @click="acceptInvitation">Accept</v-btn>
            <v-btn color="red" @click="declineInvitation">Decline</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  <template v-else-if="loading"> Yükleniyor.. </template>
</template>

<script setup>
definePageMeta({
  layout: "profile",
});
const route = useRoute();
const token = ref(route.params.token);
const store = useAppStore();
const tokenValidation = ref();
const loading = ref(true);
const timer=ref(10000);
const timerInSeconds = computed(() => Math.floor(timer.value / 1000));
let interval = null;
onMounted(async () => {

  tokenValidation.value = await store.isTokenValid(token.value);
  loading.value = false;
  if(!tokenValidation.value.valid){
    interval = setInterval(() => {
      timer.value -= 1000;
      if (timer.value <= 0) {
        clearInterval(interval); 
        navigateTo({
    path: "/" ,
  });
      }
    }, 1000); 
  }
});
onBeforeUnmount(() => {
  if (interval) {
    clearInterval(interval);
  }
});
async function acceptInvitation() {
  const res = await store.joinGroup(token.value);
  return navigateTo({
    path: "/group/" + res.id,
  });
}
</script>
