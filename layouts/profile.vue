<template>
  <v-app>
    <NavBar> </NavBar>
    <v-container class="mt-5 pt-5">
        <v-layout class="mt-5 pt-5">
          <v-navigation-drawer permanent>
            <template v-slot:prepend >
              <v-list-item
                lines="two"
                prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
                subtitle="Logged in"
                title="Jane Smith"
              ></v-list-item>
            </template>

            <v-divider></v-divider>

            <v-list density="compact" nav>
              <v-list-item
                to="/admin"
                prepend-icon="mdi-account-group-outline"
                title="Tariflerim"
                value="recipes"
              ></v-list-item>
              <v-list-item
                to="/admin/recipe/new"
                prepend-icon="mdi-home-city"
                title="Yeni Tarif Ekle"
                value="home"
              ></v-list-item>
              <v-list-item
                to="/group/new"
                prepend-icon="mdi-account"
                title="Yeni Grup Oluştur"
                value="account"
              ></v-list-item>
              <v-list-item
                to="/group"
                prepend-icon="mdi-account-group-outline"
                title="Groups"
                value="groups"
              ></v-list-item>
             
            </v-list>
          </v-navigation-drawer>
          <v-main style="min-height:100vh">
            <v-container > <slot></slot> </v-container
          ></v-main>
        </v-layout>
    </v-container>
  </v-app>
</template>
<script setup>
definePageMeta({
  middleware: "check-login",
});
</script>
