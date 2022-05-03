<template>
  <v-combobox v-bind="$attrs" v-on="$listeners">
    <template #selection="{ item, index }">
      <v-chip
        small
        color="secondary"
        close
        @click:close="$emit('update:close', index)"
        >{{ item }}</v-chip
      >
    </template>
  </v-combobox>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  inheritAttrs: false,
});
</script>
