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
        :content="article.commentVolume?.toString()"
      >
        <v-sheet
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
            <v-img src="@/assets/logo.png"></v-img>
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
        <div class="edit-box text-right">
          <v-btn text color="primary" small class="mb-1">使用markdown</v-btn>
          <v-textarea
            class="comment-textarea"
            @focus="isShowCommentBtn = true"
            @blur="commentContent.length || (isShowCommentBtn = false)"
            hide-details
            outlined
            cols="30"
            rows="5"
            v-model="commentContent"
            placeholder="请输入评论..."
          ></v-textarea>
          <transition name="comment-fade">
            <div class="bottom-bar text-right mt-3" v-show="isShowCommentBtn">
              <v-btn
                class="comment-btn"
                color="primary"
                :disabled="!commentContent.length"
                @click="createComment(article.id)"
                >发表评论</v-btn
              >
            </div>
          </transition>
        </div>
        <div class="all-comment" style="height: 1500px">
          <div
            class="text-6 mt-5 mb-3 font-weight-bold grey--text text--darken-3"
          >
            全部评论<span class="ml-2">0</span>
            <div class="comment-list mt-5">
              <div
                class="comment-item my-5"
                v-for="comment of comments"
                :key="comment.id"
              >
                <div class="d-flex align-center mb-3">
                  <v-avatar size="40">
                    <v-img :src="comment.commentator.avatar"></v-img>
                  </v-avatar>
                  <span class="ml-2">{{ comment.commentator.account }}</span>
                  <v-spacer></v-spacer>
                  <span class="text--secondary font-weight-light">{{
                    comment.createTime | formatDate('yyyy-MM-DD')
                  }}</span>
                </div>
                <div
                  class="
                    mt-3
                    ml-12
                    pa-3
                    grey
                    lighten-4
                    comment-box
                    text-subtitle-1
                  "
                >
                  {{ comment.content }}
                </div>
              </div>
            </div>
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
import Vue, { VueConstructor } from 'vue';
import {
  getArticleById,
  followUserById,
  getUserInfoById,
  likeArticleById,
  collectArticleById,
  incrementReading,
  getCommentById,
  createComment,
} from '@/lib/httpApi';
import { mapMutations, mapState } from 'vuex';
import _ from 'lodash';
export default Vue.extend({
  props: {
    category: String,
    id: [String],
  },
  data() {
    return {
      commentType: 1 as 1 | 2,
      article: {
        likeds: 0,
      } as Article,
      articleUser: {} as User,
      commentContent: '',
      isShowCommentBtn: false,
      content: '# contente',
      comments: [] as Array<Comment>,
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
      return this.currUser.user.likes.includes(this.article.id)
        ? 'var(--v-secondary-base)'
        : '#999999';
    },
    collectColor(): string {
      return this.article.collectionIds?.includes(this.currUser.user.id)
        ? 'var(--v-secondary-base)'
        : '#999999';
    },
  },
  methods: {
    ...mapMutations(['setCurrUser']),
    async getArticle() {
      const r1 = await getArticleById(this.id);
      if (r1.data.code !== 0) return;
      this.article = r1.data.data!;
      this.incrementReading();
      this.getComment(this.article.id);
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
      const r = await getCommentById(id);
      if (r.data.code === 0) {
        this.comments = r.data.data!;
      }
    },
    async createComment(id: string | number) {
      const r = await createComment({
        type: this.commentType,
        commentator: this.currUser.user.id,
        commented: id,
        content: this.commentContent,
      });
      if (r.data.code === 0) {
        this.commentContent = '';
        this.getComment(id);
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
      let count = this.article.likeds || 0;
      const likes = this.currUser.user.likes || [];
      const articleId = this.article.id;
      const r = await likeArticleById(articleId);
      if (r.data.code === 0) {
        if (likes.includes(articleId)) {
          _.remove(likes, (id: string) => id === articleId);
          this.$set(this.article, 'likeds', --count);
        } else {
          likes.push(articleId);
          this.$set(this.article, 'likeds', ++count);
        }
        this.currUser.user.likes = [];
        this.setCurrUser(this.currUser);
        this.$nextTick(() => {
          this.currUser.user.likes = likes;
          this.setCurrUser(this.currUser);
        });
      }
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
  created() {
    this.getArticle();
  },
});
</script>
<style lang="scss" scoped>
.main {
  display: grid;
  grid-template-columns: 80px 800px 300px;
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

.comment-textarea {
  z-index: 1;
  background-color: #ffffff;
}

.comment-list {
  .comment-item {
    .comment-box {
      border-radius: 4px;
    }
  }
}

.comment-fade-enter,
.comment-fade-leave-to {
  margin-top: -35px !important;
}

.comment-fade-enter-active,
.comment-fade-leave-active {
  transition: margin-top 0.3s ease-in;
}
</style>
