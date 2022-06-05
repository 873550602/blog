<template>
  <div class="main fill-height">
    <v-sheet class="d-flex justify-center py-16" rounded>
      <div class="edit-action" v-if="isEdit">
        <v-btn class="save mr-2" color="success" small @click="saveUserInfo"
          >保存</v-btn
        >
        <v-btn class="cancel" small @click="cancelEdit">取消</v-btn>
      </div>
      <v-btn v-else color="primary" class="edit" icon @click="editUserInfo">
        <v-icon size="15">fa fa-pen-to-square</v-icon>
      </v-btn>
      <v-col cols="auto">
        <v-row class="justify-center">
          <input
            type="file"
            name="file"
            ref="uploadRef"
            @change="selectedAvatar"
            accept="image/png, image/jpeg, image/jpg"
            v-show="false"
          />
          <div class="avatar-box">
            <v-avatar
              @click="$refs.uploadRef.click()"
              size="60"
              class="grey lighten-2 mt-n1"
            >
              <v-img :src="tempAvatar || userInfo.avatar">
                <template #placeholder>
                  <v-icon>fa fa-user-tie</v-icon>
                </template>
              </v-img>
            </v-avatar>
            <template v-if="tempAvatar">
              <v-btn
                @click="removeAvatarAndFile"
                class="img-close"
                color="grey"
                x-small
                icon
              >
                <v-icon color="error" size="10">fa fa-close</v-icon>
              </v-btn>
              <v-btn
                @click="_saveAvatar"
                class="img-save"
                color="grey"
                x-small
                icon
              >
                <v-icon color="success" size="10">fa fa-check</v-icon>
              </v-btn>
            </template>
          </div>
        </v-row>
        <v-form ref="userForm">
          <v-row class="mt-16">
            <span class="text-subtitle-2 label">账户</span>
            <span>{{ userInfo.account }}</span>
          </v-row>
          <v-row class="mt-10">
            <template>
              <span class="text-subtitle-2 label">性别</span>
              <v-radio-group
                dense
                row
                v-if="isEdit"
                v-model="tempUserInfo.sex"
                style="margin-top: -10px"
              >
                <v-radio :value="1" label="男"></v-radio>
                <v-radio :value="0" label="女"></v-radio>
              </v-radio-group>
              <span v-else>{{
                sexes.find((item) => item.code === userInfo.sex)?.text || '--'
              }}</span>
            </template>
          </v-row>
          <v-row class="mt-10">
            <template>
              <span class="text-subtitle-2 label">年龄</span>
              <v-text-field
                type="email"
                dense
                v-if="isEdit"
                class="mt-n3"
                :rules="userRules.age"
                v-model.number="tempUserInfo.age"
              ></v-text-field>
              <span v-else>{{ userInfo.age || '--' }}</span>
            </template>
          </v-row>
          <v-row class="mt-10">
            <template>
              <span class="text-subtitle-2 label">邮箱</span>
              <span>{{ userInfo.email || '--' }}</span>
            </template>
          </v-row>
          <v-row class="mt-10">
            <span class="text-subtitle-2 label">手机号</span>
            <span>{{ userInfo.phoneNumbers || '--' }}</span>
          </v-row>
          <v-row class="mt-10">
            <span class="text-subtitle-2 label">真实姓名</span>
            <span>{{ userInfo.realName || '--' }}</span>
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
              v-model="tempUserInfo.labels"
              @change="labelChange"
              @update:close="deleteLabel"
            ></select-label>
            <div v-else>
              <v-chip
                class="mt-n1 ml-1"
                color="secondary"
                small
                v-for="label of userInfo.labels"
                :key="label"
                >{{ label }}</v-chip
              >
            </div>
          </v-row>
        </v-form>
      </v-col>
    </v-sheet>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { mapMutations, mapState } from 'vuex';
import { labels, sexes } from '@/lib/dictionary';
import { deepClone, validEmail, validPhone } from '@/lib/utils';
import { changeUserInfo, getUserInfoById, saveAvatar } from '@/lib/httpApi';
export default Vue.extend({
  data(): { [key: string]: any; user: User | null } {
    return {
      // 临时头像文件
      tempAvatar: null,
      // 修改信息时的临时对象
      tempUserInfo: {},
      // 用户信息对象
      userInfo: {} as User,
      sexes,
      labels,
      user: null,
      isEdit: false,
      userRules: {
        avatar: [
          (v: any) => v?.size <= 1024 * 30 || '上传文件过大，建议小于30k',
        ],
        age: [(v: any) => (v && v <= 120) || '输入年龄过大'],
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
    ...mapMutations(['setCurrUser']),
    async getUserInfo(id: string) {
      const r = await getUserInfoById(id);
      if (r.data.code === 0) {
        this.userInfo = r.data.data;
      }
    },
    selectedAvatar() {
      // 限制上传图片大小30kb
      const file = (this.$refs.uploadRef as any).files[0];
      if (file.size >= 100 * 1024) {
        this.$toast.info('上传图片过大，建议上传30kb以内的图片');
        this.removeTempFile(this.$refs.uploadRef);
        return;
      }
      // 设置临时头像文件
      const fr = new FileReader();
      fr.readAsDataURL(file);
      fr.onloadend = () => {
        this.tempAvatar = fr.result;
      };
      // debugger;
    },
    removeAvatarAndFile() {
      this.removeTempAvatar();
      this.removeTempFile(this.$refs.uploadRef);
    },
    // 移除临时图片
    removeTempAvatar() {
      this.tempAvatar = null;
    },
    // 移出缓存文件
    removeTempFile(el: any) {
      el.value = null;
    },
    async _saveAvatar() {
      const file = (this.$refs.uploadRef as any).files[0];
      const formData = new FormData();
      formData.append('file', file);
      const r = await saveAvatar(this.currUser.user.id, formData);
      if (r.data.code === 0) {
        this.$toast.success('头像跟换成功');
        this.userInfo.avatar = r.data.data?.path;
        // 更新store的头像
        const currUser = this.currUser;
        currUser.user.avatar = r.data.data?.path;
        this.setCurrUser(currUser);

        this.removeAvatarAndFile();
      }
    },
    editUserInfo() {
      this.user = deepClone(this.currUser.user) as User;
      this.tempUserInfo.age = this.userInfo.age;
      this.tempUserInfo.sex = this.userInfo.sex;
      this.tempUserInfo.labels = [...this.userInfo.labels];
      this.isEdit = true;
    },
    cancelEdit() {
      this.isEdit = false;
      this.tempUserInfo = {};
    },
    async saveUserInfo() {
      if ((this.$refs.userForm as any).validate()) {
        const r = await changeUserInfo({
          id: this.currUser.user.id,
          ...this.tempUserInfo,
        });
        if (r.data.code === 0) {
          Object.assign(this.userInfo, this.tempUserInfo);
          this.tempUserInfo = {};
          this.isEdit = false;
        }
      }
    },
    labelChange(list: string[]) {
      if (list.length > 3) list.pop();
    },
    deleteLabel(index: number) {
      this.tempUserInfo?.labels?.splice(index, 1);
    },
  },
  components: {
    SelectLabel: () => import('@/components/select_label.vue'),
  },
  created() {
    this.getUserInfo(this.currUser.user.id);
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
    .avatar-box {
      position: relative;
      .img-save,
      .img-close {
        position: absolute;
        color: #ffffff;
        z-index: 1;
      }
      .img-close {
        bottom: -25px;
        left: 5px;
      }
      .img-save {
        bottom: -25px;
        right: 5px;
      }
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
      cursor: pointer;
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
