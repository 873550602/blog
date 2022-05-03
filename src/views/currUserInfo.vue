<template>
  <div class="main fill-height">
    <v-sheet class="d-flex justify-center py-16" rounded>
      <div class="edit-action" v-if="isEdit">
        <v-btn class="save mr-2" color="success" small @click="isEdit = false"
          >保存</v-btn
        >
        <v-btn class="cancel" small @click="isEdit = false">取消</v-btn>
      </div>
      <v-btn v-else color="primary" class="edit" icon @click="editUserInfo">
        <v-icon size="15">fa fa-pen-to-square</v-icon>
      </v-btn>
      <v-col cols="auto">
        <v-row class="justify-center">
          <v-avatar size="60" class="grey lighten-2 mt-n1">
            <v-img src="favicon1.ico">
              <template #placeholder>
                <v-icon>fa fa-user-tie</v-icon>
              </template>
            </v-img>
          </v-avatar>
        </v-row>
        <v-row class="mt-16">
          <span class="text-subtitle-2 label">账户</span>
          <span>{{ currUser.user.account }}</span>
        </v-row>
        <v-row class="mt-10">
          <template>
            <span class="text-subtitle-2 label">邮箱</span>
            <v-text-field
              type="email"
              dense
              v-if="isEdit"
              class="mt-n3"
              :rules="userRules.email"
              v-model="user.email"
            ></v-text-field>
            <span v-else>{{ currUser.user.email || '--' }}</span>
          </template>
        </v-row>
        <v-row class="mt-10">
          <span class="text-subtitle-2 label">手机号</span>
          <v-text-field
            dense
            v-if="isEdit"
            class="mt-n3"
            v-model="user.phoneNumbers"
            placeholder="多个手机号使用,或，分隔"
            :rules="userRules.phone"
          ></v-text-field>
          <span v-else>{{ currUser.user.phoneNumbers || '--' }}</span>
        </v-row>
        <v-row class="mt-10">
          <span class="text-subtitle-2 label">真实姓名</span>
          <span>{{ currUser.user.realName || '--' }}</span>
        </v-row>
        <v-row class="mt-10">
          <span class="text-subtitle-2 label">技术标签</span>
          <select-label
            v-if="isEdit"
            class="mt-n3"
            :items="labels"
            hide-selected
            chips
            multiple
            clearable
            dense
            clear-icon="fa-xmark"
            :rules="userRules.labels"
            v-model="user.labels"
            @change="labelChange"
            @update:close="deleteLabel"
          ></select-label>
          <div v-else>
            <v-chip
              class="mt-n1"
              color="secondary"
              small
              v-for="label of currUser.user.labels"
              :key="label"
              >{{ label }}</v-chip
            >
          </div>
        </v-row>
      </v-col>
    </v-sheet>
  </div>
</template>
<script lang="ts">
import { User } from '@/interface';
import Vue from 'vue';
import { mapState } from 'vuex';
import { labels } from '@/lib/dictionary';
import { deepClone, validEmail, validPhone } from '@/lib/utils';
import UserEntity from '@/entitys/user';
export default Vue.extend({
  data() {
    return {
      labels,
      user: {} as User,
      isEdit: false,
      userRules: {
        email: [(v: string) => (!!v && validEmail(v)) || '输入邮箱无效'],
        phone: [
          (v: string) => {
            if (v) {
              let vp;
              v.split(/,|，/).forEach((item) => {
                if (!validPhone(item)) {
                  vp = item;
                }
              });
              return !!vp && `手机号${vp}无效`;
            }
            return true;
          },
        ],
        labels: [
          (v: string[]) =>
            (!!v && v.length >= 1) || '至少选择1项且至多选项3项技术标签',
        ],
      },
    };
  },
  computed: {
    ...mapState(['currUser']),
  },
  methods: {
    editUserInfo() {
      this.user = deepClone(this.currUser.user) as User;
      this.isEdit = true;
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
<style lang="scss" scoped>
.main {
  .v-sheet {
    min-height: 100%;
    overflow: hidden;
    position: relative;
    .edit-action,
    .edit {
      position: absolute;
      top: 3rem;
      right: 3rem;
    }
    .v-avatar::after {
      display: block;
      top: 0;
      left: 0;
      right: 0;
      height: 0;
      line-height: 60px;
      font-size: 12px;
      content: '点击更换';
      background: rgba($color: #000000, $alpha: 0.5);
      position: absolute;
      overflow: hidden;
      color: #ffffff;
      transition: height 0.3s linear;
    }
    .v-avatar:hover::after {
      height: 100%;
    }
    .label {
      width: 10rem;
    }
  }
}
</style>
