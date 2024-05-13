<template>
  <v-dialog width="auto">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        class="hero-subtitle ps-0"
        variant="text"
        v-bind="activatorProps"
        text="Üye Ol"
        block
        min-width="auto"
      ></v-btn>
    </template>

    <template v-slot:default>
      <v-card>
        <v-toolbar title="Sosyal Medya Hesaplarınızla Oturum Açın" class="modal-header"></v-toolbar>
        <v-card-text class="text-subtitle pt-12"> Google veya Facebook hesabınızı kullanarak oturum açabilirsiniz. </v-card-text>
        <v-card-actions class="justify-center pb-6">
          <button @click="signInPopUp" class="login-with-google-btn">
            Google ile giriş yap
          </button>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script>
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "@/assets/css/google-button.scss"
export const provider = new GoogleAuthProvider();
</script>

<script setup>
const errorCode = ref(null);
const errorMessage = ref(null);
const auth = useFirebaseAuth();
const user = useCurrentUser();
async function signInPopUp() {
  try {
    await signInWithPopup(auth, provider);

    return navigateTo({
      path: "/home",
    });
  } catch (error) {
    console.log(error);
    errorCode.value = error.code;
    errorMessage.value = error.message;
    console.log(errorCode.value, errorMessage.value);
  }
}
</script>
