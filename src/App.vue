<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <logo
        style="width: 8rem; cursor: pointer"
        @click.native="$router.push({ name: 'home' })"
      />
      <v-container class="py-0 fill-height">
        <v-btn
          v-for="link in links"
          :key="link"
          text
          :to="{ name: 'list', params: { category: link } }"
        >
          {{ link }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
        <div v-if="isLogin">
          <v-avatar class="ml-10" color="grey lighten-2" size="32">
            <v-img :src="currUser.user.avatar">
              <template #placeholder>
                <v-icon class="grey--text text--darken-2"
                  >fa-solid fa-user-tie</v-icon
                >
              </template>
            </v-img>
          </v-avatar>
          <v-menu offset-y>
            <template #activator="{ on, attr }">
              <v-btn class="ml-1" small text v-bind="attr" v-on="on">
                {{ currUser.user.account }}
                <v-icon size="15" class="ml-1 mt-n1 grey--text text--darken-2"
                  >fa fa-caret-down</v-icon
                >
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item :to="{ name: 'currUserInfo' }">
                <v-icon size="12" class="mr-2 grey--text text--darken-1"
                  >fa fa-user</v-icon
                >
                个人信息
              </v-list-item>
              <v-list-item :to="{ name: 'changePassword' }">
                <v-icon size="12" class="mr-2 grey--text text--darken-1"
                  >fa fa-unlock</v-icon
                >
                修改密码
              </v-list-item>
              <v-list-item
                class="red red--lighten-4 white--text"
                @click="_logout"
              >
                <v-icon size="12" class="mr-2 white--text"
                  >fa fa-arrow-right-from-bracket</v-icon
                >
                退出登陆
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <v-btn v-else class="ml-10" text color="primary" :to="{ name: 'login' }"
          >登录</v-btn
        >
        <v-btn class="ml-10" text color="primary" @click="showMessage"
          >message</v-btn
        >
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <router-view />
    </v-main>
  </v-app>
</template>
<script lang="ts">
import { labels } from '@/lib/dictionary';
import { logout, test } from '@/lib/httpApi';
import Vue from 'vue';
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import Constant from './lib/const';
import StorageFactory from './lib/storage';
export default Vue.extend({
  data() {
    return {
      links: labels,
    };
  },
  methods: {
    ...mapMutations(['setCurrUser']),
    ...mapActions(['logout']),
    initUserInfo() {
      const user = StorageFactory.sessionStorage.get(Constant.userInfoKey);
      if (user) this.setCurrUser(user);
    },
    async _logout() {
      const r = await logout(this.currUser.user.id);
      if (r.data.code === 0) {
        this.logout();
        this.$router.push({ name: 'home' });
      }
    },
    showMessage() {
      // test()
      const id = this.$toast.error('xxxxx', {
        // close: true,
        // duration: -1,
        // showCount: -1,
        // deep: 1,
        // position: 'ct',
      });
    },
  },
  computed: {
    ...mapState(['currUser']),
    ...mapGetters(['isLogin']),
  },
  components: {
    Logo: () => import('@/components/logo.vue'),
  },
  created() {
    // 从本地缓存初始化用户信息
    this.initUserInfo();
  },
});
</script>
