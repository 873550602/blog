<template>
  <div class="edit-box text-right">
    <v-btn text color="primary" small class="mb-1" @click="changeEditor">{{
      editor === EditorType.markdown ? '使用文本编辑器' : '使用markdown'
    }}</v-btn>
    <markdown-editor
      @focus="isShowCommentBtn = true"
      @blur="commentContent.length || (isShowCommentBtn = false)"
      v-if="editor === EditorType.markdown"
      placeholder="请输入评论..."
      :plugins="plugins"
      v-model="commentContent"
    ></markdown-editor>
    <v-textarea
      v-else
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
          @click="$emit('save', commentContent, editor)"
          >发表评论</v-btn
        >
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import footnote from 'markdown-it-footnote';
import { EditorType } from '@/lib/enum';
export default Vue.extend({
  data() {
    return {
      plugins: [
        {
          plugin: footnote,
        },
      ],
      EditorType,
      editor: EditorType.text,
      commentContent: '',
      isShowCommentBtn: false,
    };
  },
  methods: {
    changeEditor() {
      this.commentContent = '';
      this.editor =
        this.editor === EditorType.markdown
          ? EditorType.text
          : EditorType.markdown;
    },
    clear() {
      this.commentContent = '';
      this.isShowCommentBtn = false;
    },
  },
  components: {
    MarkdownEditor: () => import('md-simple-editor'),
  },
});
</script>
<style lang="scss" scoped>
.markdown-editor {
  z-index: 9 !important;
}
.comment-fade-enter,
.comment-fade-leave-to {
  margin-top: -35px !important;
}

.comment-fade-enter-active,
.comment-fade-leave-active {
  transition: margin-top 0.3s ease-in;
}
.comment-textarea {
  z-index: 1;
  background-color: #ffffff;
}
</style>
