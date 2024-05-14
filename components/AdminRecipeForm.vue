<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
            :counter="10"
            label="Title"
            hide-details
            required
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            clearable
            chips
            label="Gruplar"
            :items="['Aile Grubu', 'Arkadaş Grubu', 'Okul']"
            multiple
            variant="outlined"
          ></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            clearable
            chips
            label="Kategori"
            :items="['Çorba', 'Ana Yemek', 'Salata', 'Tatlı']"
            variant="outlined"
          ></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            clearable
            chips
            label="Porsiyon"
            :items="['1-2', '4-6', '8-10']"
            variant="outlined"
          ></v-select>
        </v-col>
        <v-col cols="12" md="12">
          <v-textarea label="Description" variant="outlined"></v-textarea>
        </v-col>
        <v-col cols="12" md="12">
          <h2>Malzemeler</h2>
        </v-col>
        <v-col cols="12" md="12">
          <v-table height="300px" fixed-header>
            <thead>
              <tr>
                <th class="text-left">Malzeme</th>
                <th class="text-left">Ölçü</th>
                <th class="text-left">Birim</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <v-text-field
                    label="Malzeme"
                    hide-details
                    required
                    variant="outlined"
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field
                    label="Ölçü"
                    hide-details
                    required
                    variant="outlined"
                  ></v-text-field>
                </td>
                <td>
                  <v-select
                    clearable
                    hide-details
                    chips
                    label="Birim"
                    :items="['1-2', '4-6', '8-10']"
                    variant="outlined"
                  ></v-select>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
const recipe = ref({
  title: "Tarhana Çorbası",
  ingredients: [
    { measurement: "2", unit: "Yemek kaşığı", type: "Toz tarhana" },
    {
      measurement: "1",
      unit: "Yemek kaşığı",
      type: "Toz tarhana",
      description: "Su eklendikten sonra ilave edilecek",
    },
    { measurement: "1", unit: "Yemek kaşığı", type: "Tereyağı" },
    { measurement: "1", unit: "Çay kaşığı", type: "Sıvı yağ" },
    { measurement: "1", unit: "Yemek kaşığı", type: "Salça" },
    { measurement: "5", unit: "Su Bardağı", type: "Sıcak Su" },
  ],
  category: "Çorba",
  image:
    "https://www.kevserinmutfagi.com/wp-content/uploads/2008/11/tarhana_corbasi2-1.jpg",
  description: "",
  portion: "4-6",
  user_id: user.uid,
  username: user.displayName,
  group_ids: [1, 2],
});
</script>
