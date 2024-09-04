<template>
  <div>
    <v-row class="d-flex justify-space-between">
      <v-col cols="12" sm="4">
        <v-slide-group show-arrows>
          <v-slide-group-item v-for="member in membersResult" :key="member">
            <nuxt-link
              class="nuxt-link text-center me-3"
              color="light-green-darken-4"
              to="/profile"
            >
              <v-avatar color="light-green-lighten-4">
                <v-icon icon="mdi-account-circle"></v-icon>
              </v-avatar>

              <p>{{ member.username }}</p>
            </nuxt-link>
          </v-slide-group-item>
          <v-slide-group-item class="me-3" v-for="n in 10" :key="n">
            <nuxt-link
              class="nuxt-link text-center me-3"
              color="light-green-darken-4"
              to="/profile"
            >
              <v-avatar color="light-green-lighten-4">
                <v-icon icon="mdi-account-circle"></v-icon>
              </v-avatar>
              <p>Username</p>
            </nuxt-link>
          </v-slide-group-item>
        </v-slide-group>
      </v-col>
      <v-col cols="12" sm="4" class="d-flex justify-end">
        <div class="pa-4 text-center">
          <v-btn-group
            density="comfortable"
            color="#FF6F61"
            prepend-icon="mdi-plus"
          >
            <template v-slot:prepend>
              <v-icon color="white"></v-icon>
            </template>
            <v-btn class="pe-2" prepend-icon="mdi-plus" variant="flat">
              <div class="text-none font-weight-regular">Katılımcı Ekle</div>
              <v-dialog activator="parent" max-width="500">
                <template v-slot:default="{ isActive }">
                  <v-card rounded="lg">
                    <v-card-title
                      class="d-flex justify-space-between align-center"
                    >
                      <div class="text-h5 text-medium-emphasis ps-2">
                        Arkadaşlarını gruba davet et
                      </div>

                      <v-btn
                        icon="mdi-close"
                        variant="text"
                        @click="isActive.value = false"
                      ></v-btn>
                    </v-card-title>
                    <v-divider class="mb-4"></v-divider>
                    <v-card-text>
                      <div class="text-medium-emphasis mb-1">
                        Bu davetiye yalnızca 3 gün geçerlidir, 3 gün içerisinde
                        kullanılmadığı durumda yeni bir davet oluşturmanız
                        gerekmektedir.
                      </div>

                      <v-btn
                        class="text-none font-weight-bold ms-n4"
                        color="primary"
                        text="Davet Kodu Oluştur"
                        @click="createInvitation"
                        variant="text"
                      ></v-btn>
                      <template v-if="inviteLink">
                        <div class="my-2">
                          <v-row>
                            <v-col md="10">
                              <p label="Invite Link" readonly>
                                {{ inviteLink }}
                              </p>
                            </v-col>
                            <v-col>
                              <v-btn icon @click="copyInviteLink" color="light">
                                <v-icon>mdi-content-copy</v-icon>
                              </v-btn>
                            </v-col>
                          </v-row>
                        </div>
                      </template>
                    </v-card-text>

                    <v-divider class="mt-2"></v-divider>

                    <v-card-actions class="my-2 d-flex justify-end">
                      <v-btn
                        class="text-none"
                        rounded="xl"
                        text="Cancel"
                        @click="isActive.value = false"
                      ></v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </v-btn>
          </v-btn-group>
        </div>
      </v-col>
      <v-col cols="12" sm="412">
        <RecipeList :recipes="recipesResult"> </RecipeList>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" timeout="2000" top>
      Link copied to clipboard!
    </v-snackbar>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'profile'
})
const store = useAppStore();
const route = useRoute();

const inviteLink = ref("");
const recipesResult = store.fetchRecipesByGroupId(route.params.id);
const membersResult = store.fetchMembers(route.params.id);
const snackbar = ref(false);

async function createInvitation() {
  inviteLink.value = await store.createInviteCode();
}
const copyInviteLink = async () => {
  try {
    await navigator.clipboard.writeText(inviteLink.value);
    snackbar.value = true;
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};
</script>
