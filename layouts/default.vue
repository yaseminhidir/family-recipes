<template>
  <v-app id="inspire">
    <v-app-bar class="px-3" density="compact" flat>
      <v-avatar
        class="hidden-md-and-up"
        color="grey-darken-1"
        size="32"
      ></v-avatar>

      <v-spacer></v-spacer>

      <v-tabs color="grey-darken-2" centered>
        <v-tab v-for="link in links" :key="link" :text="link"></v-tab>
      </v-tabs>
      <v-spacer></v-spacer>

      <v-avatar class="hidden-sm-and-down" color="grey-darken-1" size="32">
        <v-img
          v-if="user"
          alt="Avatar"
          :src="user.photoURL"
        ></v-img>
      </v-avatar>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="2">
            <v-sheet min-height="268" class="pa-2" rounded="lg" height="1">
              <GroupsCard v-if="store.hasGroup"> </GroupsCard>
              <EmptyGroup v-else> </EmptyGroup>
            </v-sheet>
          </v-col>

          <v-col cols="12" md="8">
            <v-sheet min-height="70vh" rounded="lg" height="1">
              <slot></slot>
            </v-sheet>
          </v-col>

          <v-col cols="12" md="2">
            <v-sheet min-height="268" rounded="lg">
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import GroupsCard from "../components/GroupsCard.vue";
import EmptyGroup from "../components/EmptyGroup.vue";
import { useAppStore } from "../stores/index";

const store = useAppStore();
const links = ["Dashboard", "Messages", "Profile", "Updates"];
const user = useCurrentUser();
</script>
