<template>
  <div class="hero-section">
    <v-container class="h-100 justify-center align-center d-flex">
      <v-row>
        <v-col>
          <div>
            <h1 class="hero-caption">Aile Tarifleri</h1>
            <v-list style="background: transparent">
              <v-list-item class="hero-subtitle">
               <Login></Login>
              </v-list-item>
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
        <v-col class="position-relative"> </v-col>
      </v-row>
    </v-container>
    <v-card
      :variant="variant"
      class="mx-auto hero-card pa-6"
      color="text"
      max-width="25%"
      style=""
    >
      <v-card-subtitle
        style="white-space: normal; font-weight: 700; font-size: 15px"
      >
        <p class="mb-2">
          "Her aile yemeğinin ardında unutulmaz bir hikaye yatar. 'Friends'
          dizisinin 'The One with Phoebe's Cookies' bölümü, Monica'nın
          Phoebe'nin büyükannesinden kalan gizemli çikolatalı kurabiye tarifini
          yeniden yaratma çabasını anlatır. Uzun süreler boyunca deneme yanılma
          yöntemleri sonucunda, tarifin aslında herkesin bildiği bir paketin
          arka yüzünde yazılı olduğunu keşfederler.
        </p>
        <v-divider></v-divider>

        <p class="mt-2">
          Bu hikayeden ilham alarak yarattığımız Aile Tarifleri uygulaması, aile
          tariflerinizi ve onların hikayelerini kaydederek, Monica'nın başına
          gelen uzun süreli arayışlara son vermenizi sağlar. Gerçek lezzetler
          mirastır ve şimdi bu mirası korumak ve keşfetmek daha kolay!"
        </p>
      </v-card-subtitle>
      <svg class="clip-circle top right" viewBox="0 0 100 100">
        <path
          d="M0,100Q100,100,100,0q0-91.00364,0,100h-100Z"
          fill="rgb(255 255 255 / 81%)"
          stroke-width="0.6"
        ></path>
      </svg>
      <svg
        class="clip-circle bottom right"
        viewBox="0 0 100 100"
        style="transform: rotate(270deg)"
      >
        <path
          d="M0,100Q100,100,100,0q0-91.00364,0,100h-100Z"
          fill="rgb(255 255 255 / 81%)"
          stroke-width="0.6"
        ></path>
      </svg>
    </v-card>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "hero-section",
  middleware: "check-login",
});

</script>
