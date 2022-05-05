<template>
  <div class="main d-flex justify-center align-center">
    <v-sheet
      width="400"
      height="600"
      class="flex-grow-0 pa-10 d-flex flex-column"
      rounded
    >
      <div class="text-h4 text-center">注册</div>
      <v-form ref="formRef" class="flex-grow-1 mt-5">
        <v-text-field
          label="用户名"
          class="mt-0"
          placeholder="请输入用户名"
          :rules="userRules.account"
          v-model="user.account"
        ></v-text-field>
        <v-text-field
          label="密码"
          :type="showPassword ? 'text' : 'password'"
          class="mt-2"
          :rules="userRules.password"
          v-model="user.password"
          placeholder="请输入密码"
        >
          <template #append>
            <v-btn icon>
              <v-icon @click="showPassword = !showPassword" size="18"
                >fas {{ showPassword ? 'fa-eye' : 'fa-eye-slash' }}</v-icon
              >
            </v-btn>
          </template>
        </v-text-field>
        <v-text-field
          label="确认密码"
          :type="showRepassword ? 'text' : 'password'"
          class="mt-2"
          :rules="userRules.rePassword"
          v-model="rePassword"
          placeholder="请输入确认密码"
        >
          <template #append>
            <v-btn icon>
              <v-icon @click="showRepassword = !showRepassword" size="18"
                >fas {{ showRepassword ? 'fa-eye' : 'fa-eye-slash' }}</v-icon
              >
            </v-btn>
          </template>
        </v-text-field>
        <v-text-field
          label="真实姓名"
          class="mt-0"
          placeholder="请输入真实姓名"
          v-model="user.realName"
        ></v-text-field>
        <select-label
          label="标签"
          :items="labels"
          hide-selected
          chips
          multiple
          clearable
          clear-icon="fa-xmark"
          :rules="userRules.labels"
          v-model="user.labels"
          @change="labelChange"
          @update:close="deleteLabel"
        ></select-label>
        <v-btn class="mt-5" color="primary" block @click="login">注册</v-btn>
        <div class="mt-3 d-flex align-center">
          <v-spacer></v-spacer>
          已有账户
          <v-btn text color="secondary" :to="{ name: 'login' }">去登陆</v-btn>
        </div>
      </v-form>
    </v-sheet>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { labels } from '@/lib/dictionary';
import { registry } from '@/lib/httpApi';
import md5 from 'md5';
export default Vue.extend({
  data() {
    return {
      labels,
      showRepassword: false,
      showPassword: false,
      rePassword: '',
      user: {
        account: '',
        password: '',
        realName: '',
        labels: [],
      },
      userRules: {
        account: [
          (v: string) => !!v || '用户名不允许为空',
          (v: string) => (v && v.length >= 6) || '用户名长度至少是6',
        ],
        password: [
          (v: string) => !!v || '密码不允许为空',
          (v: string) => (v && v.length >= 8) || '密码长度至少是8',
        ],
        rePassword: [
          (v: string) => !!v || '确认密码不允许为空',
          (v: string) => (v && v.length >= 8) || '确认密码长度至少是8',
          (v: string) =>
            (v && v === (this as any).user.password) || '确认密码和密码不相同',
        ],
        labels: [
          (v: string[]) =>
            (!!v && v.length >= 1) || '至少选择1项且至多选项3项技术标签',
        ],
      },
    };
  },
  methods: {
    async login() {
      if ((this.$refs.formRef as any).validate()) {
        const user = {
          ...this.user,
        };
        user.password = md5(user.password);
        const r = await registry(user);
        if(r?.data.code === 0){
          this.$toast.success("注册成功")
          this.$router.push({name:'login'})
        }
      }
    },
    labelChange(list: string[]) {
      if (list.length > 3) list.pop();
    },
    deleteLabel(index: number) {
      this.user.labels.splice(index, 1);
    },
  },
  components: {
    SelectLabel: () => import('@/components/select_label.vue'),
  },
});
</script>
