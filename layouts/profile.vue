<template>
  <v-app>
    <NavBar> </NavBar>
    <v-container>
      <v-card>
        <v-layout>
          <v-navigation-drawer permanent>
            <template v-slot:prepend>
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
                to="/admin/recipes"
                prepend-icon="mdi-account-group-outline"
                title="Tariflerim"
                value="users"
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
                value="users"
              ></v-list-item>
             
            </v-list>
          </v-navigation-drawer>
          <v-main class="h-screen pt-5">
            <v-container> <slot></slot> </v-container
          ></v-main>
        </v-layout>
      </v-card>
    </v-container>
  </v-app>
</template>
<script setup>
definePageMeta({
  middleware: "check-login",
});
</script>
