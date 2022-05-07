<template>
  <div class="main">
    <div class="top-bar"></div>
    <div class="edit-content">
      <div class="edit-area">
        <div class="title d-flex align-center">
          <span class="text-h6">标题</span>
          <v-text-field class="ml-5"></v-text-field>
        </div>
        <markdown-editor></markdown-editor>
      </div>
      <div class="edit-view"></div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { component } from 'vue/types/umd';
export default Vue.extend({
  data() {
    return {
      content: '123456',
      options: {},
    };
  },
  components: {
      MarkdownEditor:()=>import('@/components/markdown-editor.vue')
  },
});
</script>