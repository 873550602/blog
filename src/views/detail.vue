<template>
  <div class="main pt-12 pb-0">
    <div class="mr-8 left" style="width: 50px; position: sticky; top: 0px">
      <v-badge
        offset-x="20px"
        class="mt-5"
        overlap
        color="#90A4AEcc"
        :content="article.likeds?.toString()"
      >
        <v-sheet
          @click="likeArticle(likeArticle_)"
          class="d-flex justify-center align-center mouse-pointer"
          v-ripple
          elevation="1"
          width="50"
          height="50"
          rounded="circle"
        >
          <v-icon :color="likeColor" size="20">fa-solid fa-thumbs-up</v-icon>
        </v-sheet>
      </v-badge>
      <v-badge
        offset-x="20px"
        color="#90A4AEcc"
        class="mt-5"
        overlap
        :content="article.collectionVolume?.toString()"
      >
        <v-sheet
          @click="collectArticle(collectArticle_)"
          class="d-flex justify-center align-center mouse-pointer"
          v-ripple
          elevation="1"
          width="50"
          height="50"
          rounded="circle"
        >
          <v-icon :color="collectColor" size="20">fa-solid fa-heart</v-icon>
        </v-sheet>
      </v-badge>
      <v-badge
        offset-x="20px"
        color="#90A4AEcc"
        class="mt-5"
        overlap
        :content="comments.length.toString()"
      >
        <v-sheet
          @click="scrollToAllComment"
          class="d-flex justify-center align-center mouse-pointer"
          v-ripple
          elevation="1"
          width="50"
          height="50"
          rounded="circle"
        >
          <v-icon color="#999999" size="20">fa-solid fa-comment-dots</v-icon>
        </v-sheet>
      </v-badge>
      <v-sheet
        class="d-flex justify-center align-center mt-5 mouse-pointer"
        v-ripple
        elevation="1"
        width="50"
        height="50"
        rounded="circle"
      >
        <v-icon color="#999999" size="20">fa-solid fa-share</v-icon>
      </v-sheet>
    </div>
    <div class="box">
      <v-sheet rounded class="py-10 px-8 content-box">
        <div class="text-h2 text-center">{{ article.title }}</div>
        <div class="info-box d-flex mt-5">
          <v-avatar color="#eeeeee" rounded="50px">
            <v-img :src="articleUser.avatar"></v-img>
          </v-avatar>
          <div class="text-info flex-grow-1 ml-3 mt-1 d-flex flex-column">
            <div class="author-name font-weight-bold">
              {{ articleUser.account }}
            </div>
            <div class="datetime d-flex align-center text--secondary">
              {{ article.createTime | formatDate }}
              <span class="reading ml-1">阅读量：{{ article.reading }}</span>
              <v-spacer></v-spacer>
              <v-btn text color="secondary" @click="followUser(followUser_)">{{
                followText
              }}</v-btn>
            </div>
          </div>
        </div>
        <div class="text-content mt-3">
          <md-view :value="article.content || ''"></md-view>
        </div>
      </v-sheet>
      <v-sheet class="comment-box mt-5 py-5 px-5" rounded>
        <div class="text-h5 font-weight-black mb-5">评论</div>
        <div class="all-comment" style="min-height: 300px">
          <editor
            ref="articleCommentRef"
            class="comment-editor"
            @save="submitComment(article.id, ...arguments)"
          ></editor>
          <div class="hot-comment text-h6 py-10">
            热门评论
            <v-icon class="ml-1" color="error" small>fa-solid fa-fire</v-icon>
            <comment-list
              :comments="hotComments"
              @deleteItem="deleteComment"
              @likeItem="likeComment(likeComment_, ...arguments)"
              @createItem="createComment"
            ></comment-list>
          </div>
          <div class="text-h6 mt-5 mb-3 grey--text text--darken-3">
            全部评论<span class="ml-2">{{ totalCommentNumber }}</span>
            <comment-list
              :comments="comments"
              @deleteItem="deleteComment"
              @likeItem="likeComment(likeComment_, ...arguments)"
              @createItem="createComment"
            ></comment-list>
          </div>
        </div>
      </v-sheet>
    </div>

    <v-sheet rounded class="ml-5">1</v-sheet>
    <v-sheet rounded class="ml-5 mt-6">2</v-sheet>
    <v-sheet rounded class="ml-5 mt-6" style="position: sticky; top: 0px"
      >3</v-sheet
    >
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import {
  getArticleById,
  followUserById,
  getUserInfoById,
  likeArticleById,
  collectArticleById,
  incrementReading,
  getCommentsById,
  getHotCommentsById,
  createComment,
  likeCommentById,
  deleteComment,
} from '@/lib/httpApi';
import { mapMutations, mapState } from 'vuex';
import _, { bind } from 'lodash';
import { EditorType } from '@/lib/enum';
interface Comment_ extends Comment {
  isEdit?: boolean;
  children?: Comment[];
}
export default Vue.extend({
  props: {
    category: String,
    id: [String],
  },
  data() {
    return {
      EditorType,
      article: {
        likeds: 0,
      } as Article,
      articleUser: {} as User,
      comments: [] as Array<Comment_>,
      hotComments: [] as Array<Comment_>,
    };
  },
  computed: {
    ...mapState(['currUser']),
    followText(): string {
      const followeds = this.articleUser.followeds;
      if (!followeds) return '关注';
      return this.articleUser.followeds!.includes(this.currUser.user.id)
        ? '已关注'
        : '关注';
    },
    likeColor(): string {
      return this.article.likedIds?.includes(this.currUser.user.id)
        ? 'var(--v-secondary-base)'
        : '#999999';
    },
    collectColor(): string {
      return this.article.collectionIds?.includes(this.currUser.user.id)
        ? 'var(--v-secondary-base)'
        : '#999999';
    },
    totalCommentNumber(): number {
      let count = 0;
      this.comments.forEach((e: Comment_) => {
        count++;
        e.children!.forEach((v) => {
          count++;
        });
      });
      return count;
    },
  },
  methods: {
    ...mapMutations(['setCurrUser']),
    scrollToAllComment() {
      const el = document.querySelector('.comment-box');
      el?.scrollIntoView({ behavior: 'smooth' });
    },
    submitComment(id: string | number, content: string, editor: EditorType) {
      this.createComment(id, content, editor, () => {
        (this.$refs.articleCommentRef as any).clear();
      });
    },
    async getArticle() {
      const r1 = await getArticleById(this.id);
      if (r1.data.code !== 0) return;
      this.article = r1.data.data!;
      this.incrementReading();
      this.getComment(this.article.id);
      this.getHotComment(this.article.id);
      const r2 = await getUserInfoById(r1.data.data!.author);
      if (r2.data.code !== 0) return;
      this.articleUser = r2.data.data!;
    },
    async incrementReading() {
      let reading = this.article.reading || 0;
      const r = await incrementReading(this.article.id);
      if (r.data.code === 0) {
        this.article.reading = ++reading;
      }
    },
    async getComment(id: string | number) {
      const r = await getCommentsById(id);
      if (r.data.code === 0) {
        this.comments = r.data.data!;
      }
    },
    async getHotComment(id: string | number) {
      const r = await getHotCommentsById(id);
      if (r.data.code === 0) {
        this.hotComments = r.data.data!;
      }
    },
    async createComment(
      id: string | number,
      content: string,
      commentType: EditorType,
      success?: () => void
    ) {
      const r = await createComment({
        type: commentType,
        commentator: this.currUser.user.id,
        commented: id,
        content: content,
      });
      if (r.data.code === 0) {
        success && success();
        this.getComment(this.article.id);
        this.getHotComment(this.article.id);
      }
    },
    async followUser_() {
      this.articleUser.followeds ??= [];
      const followeds = this.articleUser.followeds;
      const authorId = this.articleUser.id;
      const r = await followUserById(authorId);
      if (r.data.code === 0) {
        if (followeds.includes(authorId)) {
          _.remove(followeds, (id: string) => id === authorId);

          this.articleUser.followeds = [];
          this.$nextTick(() => {
            this.articleUser.followeds = followeds;
          });
        } else {
          followeds.push(authorId);
        }
      }
    },
    async likeArticle_() {
      const article = { ...this.article };
      let count = article.likeds || 0;
      const likes = article.likedIds || [];
      const articleId = article.id;
      const r = await likeArticleById(articleId);
      const userId = this.currUser.user.id;
      if (r.data.code === 0) {
        if (likes.includes(userId)) {
          _.remove(likes, (id: string) => id === userId);
          this.$set(article, 'likeds', --count);
        } else {
          likes.push(userId);
          this.$set(article, 'likeds', ++count);
        }
        this.$nextTick(() => {
          this.article = article;
        });
      }
    },
    async likeComment_(id: string) {
      const r = await likeCommentById(id);
      if (r.data.code === 0) {
        this.likeById(id, this.comments);
        this.likeById(id, this.hotComments);
        const comments = [...this.comments];
        const hotComments = [...this.hotComments];
        this.comments = comments;
        this.hotComments = hotComments;
      }
    },
    async deleteComment(id: string) {
      const r = await deleteComment(id);
      if (r.data.code === 0) {
        this.removeById(id, this.comments);
        this.removeById(id, this.hotComments);
        const comments = [...this.comments];
        const hotComments = [...this.hotComments];
        this.comments = comments;
        this.hotComments = hotComments;
      }
    },
    likeById(id: string, list: Comment_[]): boolean {
      for (const item of list) {
        if (item.id === id) {
          if (item.likedIds.includes(this.currUser.user.id)) {
            item.likeds--;
            _.remove(item.likedIds, (id) => id === this.currUser.user.id);
          } else {
            item.likeds++;
            item.likedIds.push(this.currUser.user.id);
          }
          return true;
        }
        const r = this.likeById(id, item.children!);
        if (r) return r;
      }
      return false;
    },
    removeById(id: string, list: Comment_[]): boolean {
      for (const item of list) {
        if (item.id === id) {
          _.remove(list, (e1) => e1.id === id);
          return true;
        }
        if (item.children!.length > 0) {
          const r = this.removeById(id, item.children!);
          if (r) return true;
        }
      }
      return false;
    },
    async collectArticle_() {
      let count = this.article.collectionVolume || 0;
      const collects = this.article.collectionIds || [];
      const userId = this.currUser.user.id;
      const articleId = this.article.id;
      const r = await collectArticleById(articleId);
      if (r.data.code === 0) {
        if (collects.includes(userId)) {
          _.remove(collects, (id: string) => id === userId);
          this.$set(this.article, 'collectionVolume', --count);
        } else {
          collects.push(userId);
          this.$set(this.article, 'collectionVolume', ++count);
        }
        this.article.collectionIds = [];
        this.$nextTick(() => {
          this.article.collectionIds = collects;
        });
      }
    },
    likeArticle: _.debounce(
      function (fun) {
        fun();
      },
      3000,
      { leading: true, trailing: false }
    ),
    likeComment: _.debounce(
      function (fun, id: string) {
        fun(id);
      },
      3000,
      { leading: true, trailing: false }
    ),
    collectArticle: _.debounce(
      function (fun) {
        fun();
      },
      3000,
      { leading: true, trailing: false }
    ),
    followUser: _.debounce(
      function (fun) {
        fun();
      },
      3000,
      {
        leading: true,
        trailing: false,
      }
    ),
  },
  components: {
    Editor: () => import('@/components/editor.vue'),
    CommentList: () => import('@/components/commentList.vue'),
  },
  created() {
    this.getArticle();
  },
});
</script>
<style lang="scss" scoped>
.main {
  padding: 0;
  display: grid;
  justify-content: center;
  grid-template-columns: 80px minmax(500px, min(50%, 1000px)) 300px;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    'a b c'
    'a b d'
    'a b e';
  height: calc(100vh - 35px);
  overflow: auto;
}
.left {
  grid-area: a;
}
.box {
  min-height: 500px;
  grid-area: b;
}
.content-box {
  min-height: 400px;
}

::v-deep .comment-editor .v-input {
  font-size: 14px !important;
}
</style>
