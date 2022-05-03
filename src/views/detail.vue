<template>
  <div class="main">
    <v-sheet> {{ category + ' ' + id }} </v-sheet>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    category: String,
    id: [Number, String],
  },
});
</script>
