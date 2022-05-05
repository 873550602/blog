<template>
  <div class="main d-flex justify-center align-center">
    <v-sheet
      width="400"
      height="450"
      class="flex-grow-0 pa-10 d-flex flex-column"
      rounded
    >
      <div class="text-h4 text-center">修改密码</div>
      <v-form ref="formRef" class="flex-grow-1 mt-5">
        <v-text-field
          label="旧密码"
          :type="showOldPassword ? 'text' : 'password'"
          class="mt-2"
          :rules="userRules.oldPassword"
          v-model="user.oldPassword"
          placeholder="请输入旧密码"
        >
          <template #append>
            <v-btn icon>
              <v-icon @click="showOldPassword = !showOldPassword" size="18"
                >fas {{ showOldPassword ? 'fa-eye' : 'fa-eye-slash' }}</v-icon
              >
            </v-btn>
          </template>
        </v-text-field>
        <v-text-field
          label="新密码"
          :type="showPassword ? 'text' : 'password'"
          class="mt-2"
          :rules="userRules.password"
          v-model="user.password"
          placeholder="请输入新密码"
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
        <v-btn class="mt-5" color="primary" block @click="submit">确认</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>
<script lang="ts">
import { changePassword } from '@/lib/httpApi';
import md5 from 'md5';
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
export default Vue.extend({
  data() {
    return {
      showOldPassword: false,
      showRepassword: false,
      showPassword: false,
      rePassword: '',
      user: {
        oldPassword: '',
        password: '',
      },
      userRules: {
        oldPassword: [
          (v: string) => !!v || '密码不允许为空',
          (v: string) => (v && v.length >= 8) || '密码长度至少是8',
        ],
        password: [
          (v: string) => !!v || '密码不允许为空',
          (v: string) => (v && v.length >= 8) || '密码长度至少是8',
          (v: string) =>
            (v && v !== (this as any).user.oldPassword) ||
            '新密码不能和旧密码相同',
        ],
        rePassword: [
          (v: string) => !!v || '确认密码不允许为空',
          (v: string) => (v && v.length >= 8) || '确认密码长度至少是8',
          (v: string) =>
            (v && v === (this as any).user.password) || '确认密码和密码不相同',
        ],
      },
    };
  },
  computed: {
    ...mapState(['currUser']),
  },
  methods: {
    ...mapActions(['logout']),
    async submit() {
      if ((this.$refs.formRef as any).validate()) {
        console.log(this.user);
        const user = {
          id: this.currUser.user.id,
          newPassword: md5(this.user.password),
          oldPassword: md5(this.user.oldPassword),
        };
        const r = await changePassword(user);
        if (r.data.code === 0) {
          this.$toast.success('密码修改成功');
          this.logout();
          this.$router.push({ name: 'login' });
        }
      }
    },
  },
});
</script>
