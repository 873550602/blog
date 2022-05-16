<template>
  <div class="main">
    <v-btn color="primary" fab class="add-blog" @click="isOpen = true">
      <v-icon>fa fa-plus</v-icon>
    </v-btn>
    <transition :duration="1000" name="scale">
      <add-blog v-if="isOpen" class="add-blog-content" @close="closeEvent">
      </add-blog>
    </transition>
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
            <v-list-item-subtitle>{{ article.summary }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action-text>{{
            article.createTime | formatDate
          }}</v-list-item-action-text>
        </v-list-item>
      </v-list>
    </v-sheet>
  </div>
</template>
<script lang="ts">
import { getArticles } from '@/lib/httpApi';
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
      isOpen: false,
      articles: [] as Article[] | undefined,
      articlePageObj: {
        curr: 1,
        rows: 10,
        object: {
          label: this.category,
        },
      } as Page<{ label: string }>,
    };
  },
  methods: {
    async getArticles() {
      const r = await getArticles(this.articlePageObj);
      this.articles = r.data.data?.list;
    },
    closeEvent(v?: boolean) {
      this.isOpen = false;
      if (v) {
        this.getArticles();
      }
    },
  },
  components: {
    AddBlog: () => import('@/components/add-blog.vue'),
  },
  created() {
    this.getArticles();
  },
  beforeRouteUpdate(to, from, next) {
    this.articlePageObj.object.label = to.params.category;
    this.getArticles();
    next();
  },
});
</script>
<style lang="scss" scoped>
.add-blog {
  position: fixed;
  right: 10%;
  bottom: 15%;
}
.add-blog-content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  z-index: 9;
  overflow: hidden;
  transform-origin: 88% 80%;
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
.scale-enter-active,
.scale-leave-active {
  transform-origin: right 50px bottom 50px;
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
}
.scale-enter,
.scale-leave-to {
  transform: scale(0, 0);
  opacity: 0;
}
</style>
