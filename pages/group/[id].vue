<template>
  <div>
    <v-row class="d-flex">
      <v-col cols="12" sm="8">
        <v-menu transition="scroll-x-transition">
          <template v-slot:activator="{ props }">
            <v-btn variant="text" color="#FF6F61" dark v-bind="props">
              View Members
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="member in groupMembers" :key="member.firstName">
              <v-list-item-title
                class="d-flex justify-space-between align-center"
              >
                <nuxt-link
                  class="nuxt-link text-center me-3"
                  color="light-green-darken-4"
                  :to="'/profile/' + member.firstName"
                  >{{ member.firstName }}
                  <span v-if="member.id === store.user.id">(you)</span>
                </nuxt-link>

                <v-btn
                  v-if="isOwner && member.id != store.user.id"
                  @click="removeUserFromGroup(member.id)"
                  class="ms-2"
                  color="red"
                  icon="mdi-minus"
                  size="small"
                  variant="text"
                ></v-btn>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="4" class="d-flex justify-end">
        <div class="me-2 text-center">
          <v-btn-group
            v-if="isMember"
            density="comfortable"
            color="green"
            prepend-icon="mdi-plus"
          >
            <template v-slot:prepend>
              <v-icon color="white"></v-icon>
            </template>
            <v-btn class="pe-2" prepend-icon="mdi-plus" variant="text">
              <div class="text-none text-uppercase">Add Participant</div>
              <v-dialog activator="parent" max-width="500">
                <template v-slot:default="{ isActive }">
                  <v-card rounded="lg">
                    <v-card-title
                      class="d-flex justify-space-between align-center"
                    >
                      <div class="text-h5 text-medium-emphasis ps-2">
                        Invite your friends to the group
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
                        This invitation is only valid for 3 days, if it is not
                        used within 3 days, you must create a new invitation.
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
        <v-btn
          class="h-auto"
          variant="text"
          color="red"
          @click="leaveGroup"
          v-if="isMember && !isOwner"
        >
          Leave Group
        </v-btn>
      </v-col>
      <v-col cols="12" sm="12">
        <template v-if="recipesResult.length > 0">
          <RecipeList :recipes="recipesResult"> </RecipeList>
        </template>
        <template v-else>
          <EmptyRecipes> </EmptyRecipes>
        </template>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" timeout="2000" top>
      Link copied to clipboard!
    </v-snackbar>
  </div>
</template>

<script setup>
import { v4 as uuidv4 } from "uuid";
import { mapRecipeData } from "~/helpers/mapData";
definePageMeta({
  layout: "profile",
});
const store = useAppStore();
const route = useRoute();
const router = useRouter();

const inviteLink = ref("");
const snackbar = ref(false);

const { data: group, refresh } = await useFetch(
  `/api/groups/getGroup?id=${route.params.id}`,
  {
    onResponse({ response }) {
      response._data = response._data.group;
    },
  }
);
console.log("GRUP DETAY", group.value);

const groupMembers = computed(() => {
  return group.value.users.map((item) => item.user);
});

const isMember = computed(() => {
  return groupMembers.value.some((member) => member.id === store.user?.id);
});

const ownerUser = computed(() => {
  return group.value?.users?.find((member) => member.isOwner) || null;
});

const isOwner = computed(() => {
  return ownerUser.value.userId == store.user?.id ? true : false;
});

console.log("store user", store.user.id);
console.log("ownerUser", ownerUser.value);
console.log("isOwner computed", isOwner.value);
console.log("auth User", store.user?.id !== ownerUser?.value.userId);

let recipesResult = group.value.recipes.map((item) => item.recipe);
recipesResult.value = mapRecipeData(recipesResult);

function generateInviteCode() {
  const inviteCode = uuidv4();
  return { inviteCode };
}

const createInviteCode = async (groupId) => {
  const tokenData = {
    groupId: group.value.id,
    inviteToken: generateInviteCode().inviteCode,
    expireDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  };
  try {
    const { data, error } = await useFetch("/api/groups/createInviteToken", {
      method: "post",
      body: tokenData,
    });
    if (error.value) {
      throw new Error("Error invite link:", error);
    }
    if (data.value.success) {
      const inviteLink = `http://localhost:3000/invitation/${data.value.newToken.inviteToken}`;
      return inviteLink;
    }
  } catch (error) {
    console.error("Error in invite code function:");
    throw error;
  }
};

async function createInvitation() {
  inviteLink.value = await createInviteCode();
}

const copyInviteLink = async () => {
  try {
    await navigator.clipboard.writeText(inviteLink.value);
    snackbar.value = true;
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

async function leaveGroup() {
  try {
    const { data, error } = await useFetch("/api/groups/leaveGroup", {
      method: "post",
      body: { groupId: group.value.id },
    });
    navigateTo({
      path: "/admin",
    });
  } catch (error) {
    console.error("Failed to leave: ", eror);
  }
}

const removeUserFromGroup = async (memberId) => {
  try {
    const { data } = await useFetch("/api/groups/removeUserFromGroup", {
      method: "POST",
      body: { groupId: group.value.id, userId: memberId },
    });
    if (data.value.success) {
      refresh();
    }
    console.log(data.value);
  } catch (error) {
    console.error("Error in saveOrUpdateGroup function:", error);
    throw error;
  }
};
</script>

<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
.fill-height {
  min-height: 90vh;
}
</style>
