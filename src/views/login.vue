<template>
  <div class="main d-flex justify-center align-center">
    <!-- <div class="text-h4">登录</div> -->
    <v-sheet
      width="400"
      height="350"
      class="flex-grow-0 pa-10 d-flex align-center"
      rounded
    >
      <v-form ref="formRef" class="flex-grow-1">
        <v-text-field
          class="mt-0"
          placeholder="请输入用户名"
          :rules="userRules.account"
          v-model="user.account"
        >
          <template #prepend>
            <v-icon size="20">fas fa-user</v-icon>
          </template>
        </v-text-field>
        <v-text-field
          :type="showPassword ? 'text' : 'password'"
          class="mt-2"
          :rules="userRules.password"
          v-model="user.password"
          placeholder="请输入密码"
        >
          <template #prepend>
            <v-icon size="20">fas fa-lock</v-icon>
          </template>
          <template #append>
            <v-btn icon>
              <v-icon @click="showPassword = !showPassword" size="18"
                >fas {{ showPassword ? 'fa-eye' : 'fa-eye-slash' }}</v-icon
              >
            </v-btn>
          </template>
        </v-text-field>
        <v-btn class="mt-5" color="primary" block @click="login">登陆</v-btn>
        <div class="mt-3 d-flex align-center">
          <v-btn text color="primary">忘记密码</v-btn>
          <v-spacer></v-spacer>
          没有账户
          <v-btn text color="secondary" :to="{ name: 'registry' }"
            >去注册</v-btn
          >
        </div>
      </v-form>
    </v-sheet>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { CurrUser, User } from '@/interface';
import { mapMutations } from 'vuex';
import UserEntity from '@/entitys/user';
export default Vue.extend({
  data() {
    return {
      showPassword: false,
      user: {
        account: '',
        password: '',
      },
      userRules: {
        account: [
          (v: string) => !!v || '用户名不允许为空',
          (v: string) => (v && v.length >= 6) || '用户名长度至少是6',
        ],
        password: [
          (v: string) => !!v || '用户名不允许为空',
          (v: string) => (v && v.length >= 8) || '用户名长度至少是8',
        ],
      },
    };
  },
  methods: {
    ...mapMutations(['setCurrUser']),
    login() {
      if ((this.$refs.formRef as any).validate()) {
        console.log(this.user);
        const user: User = {
          id: 1,
          labels: ['javascript'],
          account: this.user.account,
        };
        this.setCurrUser({
          isLogin: true,
          user: UserEntity.fromJson(user),
        } as CurrUser);
        this.$router.push({ name: 'home' });
      }
    },
  },
});
</script>
