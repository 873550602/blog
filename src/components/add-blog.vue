<template>
  <div class="main full">
    <div class="edit-content">
      <div class="title">
        <v-text-field
          v-model="article.title"
          outlined
          dense
          placeholder="请输入文章标题"
        >
          <template #append>
            <v-btn color="primary" class="mb-2" @click="submit">发布</v-btn>
            <v-btn color="#ddd" class="mb-2 ml-1" @click="close">返回</v-btn>
          </template>
        </v-text-field>
      </div>
      <div class="d-flex" style="height: 100%">
        <div class="editor-box">
          <markdown-editor
            v-model="article.content"
            placeholder="请输入文章内容..."
            :plugins="plugins"
          ></markdown-editor>
        </div>
        <div class="right ml-5 px-5 pt-14">
          <div class="top-bar">额外信息</div>
          <v-form ref="formRef">
            <v-select
              :rules="rules.label"
              v-model="article.label"
              :items="labels"
              dense
              label="标签"
            ></v-select>
            <v-textarea
              :rules="rules.summary"
              rows="10"
              class="mt-5"
              outlined
              label="摘要"
              v-model="article.summary"
            ></v-textarea>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import footnote from 'markdown-it-footnote';
import MarkdownEditor from 'md-simple-editor';
import { labels } from '@/lib/dictionary';
import { createArticle } from '@/lib/httpApi';
export default Vue.extend({
  data() {
    return {
      labels,
      rules: {
        label: [(v: string) => !!v || '请选择标签'],
        summary: [(v: string) => !!v || '请输入摘要'],
      },
      plugins: [
        {
          plugin: footnote,
        },
      ],
      article: {
        title: '',
        content: '',
        summary: '',
        label: '',
      },
      options: {},
    };
  },
  methods: {
    async submit() {
      if (this.article.title.trim() === '') {
        this.$toast.info('还没有输入标题哦');
        return;
      }
      if (this.article.content.trim() === '') {
        this.$toast.info('你还没有开始写文章呢');
        return;
      }
      if ((this.$refs.formRef as any).validate()) {
        const r = await createArticle(this.article);
        if (r.data.code === 0) {
          this.$toast.success('发布成功');
          this.$emit('close', true);
        }
      }
    },
    close() {
      this.confirmOut();
    },
    confirmOut() {
      if (this.article.content) {
        const r = confirm('还有尚未保存的文章，确定退出吗？');
        if (r) {
          this.$emit('close');
        }
      } else {
        this.$emit('close');
      }
    },
    handlePopstate() {
      history.pushState(null, '', document.URL);
      this.confirmOut();
    },
  },
  components: {
    MarkdownEditor,
  },
  mounted() {
    history.pushState(null, '', document.URL);
    window.addEventListener('popstate', this.handlePopstate, false);
  },
  beforeDestroy() {
    window.removeEventListener('popstate', this.handlePopstate);
    history.back();
  },
});
</script>
<style lang="scss" scoped>
.main {
  padding: 30px 60px;
}
.right,
.editor-box {
  height: calc(100% - 70px);
}
.right {
  position: relative;
  flex: 0 0 300px;
  border: 1px solid #cccccc;
  border-radius: 4px;
}
.top-bar {
  background: #edeff1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding: 0 12px;
  font-size: 15px;
  color: #666666;
  border-bottom: 1px solid #cccccc;
}
.edit-content {
  height: 100%;
}
.editor-box {
  flex: 1 1 auto;
}
</style>