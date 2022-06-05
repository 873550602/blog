<template>
  <div v-if="show" class="comment-list mt-5">
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
      <div class="ml-12 comment-box">
        <markdown-viewer
          v-if="comment.type === EditorType.markdown"
          :value="comment.content"
        ></markdown-viewer>
        <span v-else class="font-weight-normal">
          {{ comment.content }}
        </span>
        <div class="bottom-bar d-flex align-center" style="color: #999999">
          <v-btn
            class="like-btn"
            @click="likeComment(comment.id)"
            v-like-color="{
              userId: currUser.user.id,
              likes: comment.likedIds,
            }"
            small
            icon
          >
            <v-icon size="12">fa-solid fa-thumbs-up</v-icon>
          </v-btn>
          {{ comment.likeds || 0 }}
          <v-btn
            v-if="comment?.isEdit"
            @click="toggleCommentEditor(comment)"
            class="ml-3"
            text
            color="primary"
            small
            >取消编辑</v-btn
          >
          <template v-else>
            <v-btn
              @click="toggleCommentEditor(comment)"
              class="ml-3"
              small
              color="#999999"
              icon
            >
              <v-icon size="12">fa-solid fa-comment-dots</v-icon>
            </v-btn>
            {{ comment.children.length }}
          </template>
          <v-spacer></v-spacer>
          <v-btn
            @click="deleteComment(comment.id)"
            class="delete-btn"
            color="error"
            icon
          >
            <v-icon size="12">fa-solid fa-trash-can</v-icon>
          </v-btn>
        </div>
      </div>
      <editor
        @save="submitCommentToComent(comment, ...arguments)"
        v-if="comment?.isEdit"
        class="comment-editor"
      ></editor>
      <div
        v-if="comment.children.length > 0"
        class="mt-3 ml-12 pa-3 grey lighten-4 comment-box text-subtitle-1"
      >
        <div
          class="mt-3 comment-item-box"
          v-for="comment_1 of comment.children"
          :key="comment_1.id"
        >
          <div class="d-flex align-center mb-3">
            <v-avatar size="20">
              <v-img :src="comment_1.commentator.avatar"></v-img>
            </v-avatar>
            <span class="ml-2 font-weight-bold"
              >{{ comment_1.commentator.account }}
              <span v-if="comment_1.deep > 2"
                >回复
                <span class="font-weight-bold">
                  {{
                    comment.children.find((e) => {
                      return e.id === comment_1.commented;
                    })?.commentator?.account
                  }}
                </span>
              </span></span
            >
            <v-spacer></v-spacer>
            <span class="text--secondary font-weight-light">{{
              comment_1.createTime | formatDate('yyyy-MM-DD')
            }}</span>
          </div>
          <div class="ml-7">
            <markdown-viewer
              v-if="comment_1.type === EditorType.markdown"
              :value="comment_1.content"
            ></markdown-viewer>
            <span v-else class="font-weight-normal">
              {{ comment_1.content }}
            </span>
            <div
              class="bottom-bar d-flex align-center"
              style="color: #999999; height: 30px"
            >
              <v-btn
                @click="likeComment(comment_1.id)"
                v-like-color="{
                  userId: currUser.user.id,
                  likes: comment_1.likedIds,
                }"
                class="like-btn"
                small
                icon
              >
                <v-icon size="12">fa-solid fa-thumbs-up</v-icon>
              </v-btn>
              {{ comment_1.likeds || 0 }}
              <v-btn
                v-if="comment_1?.isEdit"
                @click="toggleCommentEditor(comment_1)"
                class="ml-3"
                text
                color="primary"
                small
                >取消编辑</v-btn
              >
              <template v-else>
                <v-btn
                  @click="toggleCommentEditor(comment_1)"
                  class="ml-3"
                  small
                  color="#999999"
                  icon
                >
                  <v-icon size="12">fa-solid fa-comment-dots</v-icon>
                </v-btn>
              </template>
              <v-spacer></v-spacer>
              <v-btn
                @click="deleteComment(comment_1.id)"
                class="delete-btn"
                color="error"
                icon
              >
                <v-icon size="12">fa-solid fa-trash-can</v-icon>
              </v-btn>
            </div>
            <editor
              @save="submitCommentToComent(comment_1, ...arguments)"
              v-if="comment_1?.isEdit"
              class="comment-editor"
            ></editor>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { EditorType } from '@/lib/enum';
import Vue from 'vue';
import { mapState } from 'vuex';
import { MarkdownViewer } from 'md-simple-editor';
import _ from 'lodash';
interface Comment_ extends Comment {
  isEdit?: boolean;
  children?: Comment[];
}
export default Vue.extend({
  props: {
    comments: {
      type: Array,
    },
  },
  data() {
    return {
      EditorType,
      show: true,
    };
  },
  computed: {
    ...mapState(['currUser']),
  },
  methods: {
    deleteComment(id: string) {
      this.$emit('deleteItem', id);
    },
    likeComment(id: string) {
      this.$emit('likeItem', id);
    },
    submitCommentToComent(
      comment: Comment_,
      content: string,
      editor: EditorType
    ) {
      this.$emit('createItem', comment.id, content, editor, () => {
        this.toggleCommentEditor(comment);
      });
    },
    toggleCommentEditor(comment: Comment_) {
      this.comments.forEach((item: any) => {
        if (item !== comment) {
          item.isEdit = false;
        }
      });
      comment.isEdit = !comment.isEdit;
      this.reload();
    },
    reload() {
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  components: {
    Editor: () => import('@/components/editor.vue'),
    MarkdownViewer,
  },
  directives: {
    likeColor: {
      inserted(el: any, binding: StringObj) {
        const { userId, likes } = binding.value;
        if (likes.includes(userId)) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      },
      update(el: any, binding: StringObj) {
        const { userId, likes } = binding.value;
        if (likes.includes(userId)) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      },
    },
  },
});
</script>
<style lang="scss" scoped>
.comment-list {
  .comment-item {
    .bottom-bar {
      height: 30px;
    }
    .delete-btn {
      display: none;
    }
    .comment-box:hover {
      .delete-btn {
        display: block;
      }
    }
    .comment-box {
      border-radius: 4px;
      .comment-item-box {
        .delete-btn {
          display: none;
        }
        &:hover {
          .delete-btn {
            display: block;
          }
        }
      }
    }
  }
}
.like-btn {
  color: #999999;
  &.active {
    color: var(--v-secondary-base);
  }
}
</style>
