<template>
  <v-app>
    <v-layout>
      <NavBar> </NavBar>

      <v-main class="pt-0">
        <div class="hero-section">
          <v-container>
            <v-row class="h-screen">
              <v-col class="h-100 d-flex align-center">
                <div>
                  <v-list
                    style="background: transparent"
                    class="h-100 d-flex flex-column justify-center"
                  >
                    <v-list-item
                      title="Grup Oluştur"
                      class="hero-subtitle"
                    ></v-list-item>
                    <v-list-item
                      title="Tariflerini Kaydet"
                      class="hero-subtitle"
                    ></v-list-item>
                  </v-list>
                </div>
              </v-col>
              <v-col class="position-relative d-flex align-end justify-end">
                <v-img
                  :width="750"
                  style="opacity: 0.5"
                  cover
                  src="/assets/images/hero-pic.png"
                ></v-img>
              </v-col>
            </v-row>
          </v-container>
          <div class="category-container">
            ??????????????????
            <v-card>
              <v-card-item>
                <v-row>
                  <v-col
                    cols="12"
                    md="3"
                    v-for="(category, index) in categories"
                    :key="index"
                  >
                    <v-row>
                      <v-col cols="12" md="5">
                        <nuxt-link :to="'category/' + category.id" class="post-preview card-link">
                        <v-img
                          class="rounded"
                          height="150"
                          :src="category.image"
                          cover
                        >
                      </v-img>
                      </nuxt-link>
                      
                      </v-col>
                      <v-col cols="12" md="7" class="d-flex align-center">
                        <p class="text-h6 font-weight-bold">
                          {{ category.name }}
                        </p>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-item>
            </v-card>
          </div>
        </div>
        <slot></slot>
        <v-footer class="d-flex align-center" color="light-green-lighten-5">
          Get connected with us on social networks!
          <v-spacer></v-spacer>
          <v-btn
            v-for="social in socials"
            :key="social.icon"
            :icon="social.icon"
            class="mx-4"
            size="small"
            variant="plain"
            target="_blank"
          :href="`https://${social.link}`"
          ></v-btn>
        </v-footer>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
import { useAppStore } from "../stores/index";

const store = useAppStore();
const categories =await store.getCategories();

const socials=ref([
        {icon:'mdi-facebook', link: 'facebook.com'},
        {icon:'mdi-twitter', link: 'twitter.com'},
        {icon:'mdi-linkedin', link: 'linkedin.com'},
        {icon:'mdi-instagram', link: 'instagram.com'},
      ])
</script>
