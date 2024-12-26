<template>
  <v-sheet class="mx-auto" width="300">
    <v-form fast-fail @submit.prevent>
      <v-text-field
        v-model="user.firstName"
        :rules="firstNameRules"
        label="First name"
      ></v-text-field>
      <v-text-field
        v-model="user.lastName"
        :rules="lastNameRules"
        label="Last name"
      ></v-text-field>
      <v-text-field
        v-model="user.email"
        label="Email"
        type="email"
      ></v-text-field>
      <v-text-field
        v-model="user.password"
        label="Password"
        type="password"
      ></v-text-field>
      <p class="text-subtitle-1 mb-4">
        Zaten hesabın var mı? <a href="/auth/login" class="font-weight-bold" >Giriş Yap</a>
      </p>
      <v-btn class="mt-2" @click="store.register(user)" block>Register</v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup>
const store=useAppStore();;
const user=ref({});

const firstNameRules= [
    value => {
      if (value?.length >= 3) return true

      return 'First name must be at least 3 characters.'
    },
  ]
 const lastNameRules= [
    value => {
      if (/[^0-9]/.test(value)) return true

      return 'Last name can not contain digits.'
    },
];

</script>
