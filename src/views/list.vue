<template>
  <div class="main">
    <v-sheet rounded>
      <v-list>
        <v-list-item
          v-for="article of articles"
          :key="article.id"
          :to="{
            name: 'detail',
            params: { id: article.id, category },
          }"
        >
          <v-list-item-avatar color="yellow"></v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ article.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ article.subtitle }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action-text>{{
            article.createTime
          }}</v-list-item-action-text>
        </v-list-item>
      </v-list>
    </v-sheet>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    category: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      articles: [] as Article[],
    };
  },
  created() {
    const list = [
      {
        id: 1,
        title: 'js垃圾回收机制',
        subtitle: '深入介绍垃圾回收原理',
        content: 'xxxxxxxxxxxsdfsdfsdfssdfsfa',
        author: 'hxx',
        createTime: '2022-01-01 12:11:36',
        category: 'javascript',
      },
    ];
    this.articles = list;
  },
});
</script>
<style lang="scss" scoped>
.v-sheet {
  height: 100%;
}
</style>
