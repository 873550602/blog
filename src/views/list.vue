<template>
  <div class="main">
    <v-btn color="primary" fab class="add-blog">
      <v-icon>fa fa-plus</v-icon>
    </v-btn>
    <add-blog class="add-blog-content">
      
    </add-blog>
    <v-sheet class="content-box" rounded>
      <v-list class="px-1">
        <v-list-item
          v-for="article of articles"
          :key="article.id"
          class="list-item mt-1"
          :to="{
            name: 'detail',
            params: { id: article.id, category },
          }"
        >
          <v-list-item-avatar color="yellow"></v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-h5">{{
              article.title
            }}</v-list-item-title>
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
  components: {
    AddBlog: () => import('@/components/add-blog.vue'),
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
      {
        id: 2,
        title: 'js垃圾回收机制',
        subtitle: '深入介绍垃圾回收原理',
        content: 'xxxxxxxxxxxsdfsdfsdfssdfsfa',
        author: 'hxx',
        createTime: '2022-01-01 12:11:36',
        category: 'javascript',
      },
      {
        id: 3,
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
.add-blog {
  position: fixed;
  right: 50px;
  bottom: 50px;
}
.add-blog-content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  z-index: 9;
}
.content-box {
  margin: 0 auto;
  height: 100%;
  width: 100rem;
  border-radius: 8px;
  overflow: hidden;
  .list-item {
    background-color: #ffffff !important;
    transition: background-color, 0.3s linear;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0);
    &:hover {
      background-color: rgba($color: #f48fb1, $alpha: 0.9) !important;
      border-radius: 8px;
      box-shadow: 0 0 3px rgba(100, 100, 100, 0.8);
    }
  }
}
</style>
