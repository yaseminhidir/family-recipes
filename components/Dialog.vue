<template>
  <v-dialog
    :model-value="dialogVisible"
    :max-width="maxWidth"
    @update:model-value="updateDialogVisible"
  >
    <v-card>
      <v-card-title >
        <slot name="title"></slot>
      </v-card-title>
      <v-card-text>
        <slot name="content"></slot>
      </v-card-text>
      <v-card-actions>
        <slot name="actions"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

defineProps({
  dialogVisible: {
    type: Boolean,
    required: true,
  },
  maxWidth: {
    type: String,
    default: "400px",
  },
});

const emit = defineEmits(["update:dialogVisible"]);

const updateDialogVisible = (value) => {
  emit("update:dialogVisible", value);
};
</script>
