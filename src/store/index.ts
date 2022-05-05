import Constant from '@/lib/const';
import StorageFactory from '@/lib/storage';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currUser: {} as CurrUser,
  },
  getters: {
    isLogin: (state) => !!state.currUser && !!state.currUser.isLogin,
  },
  mutations: {
    setCurrUser(state, val: CurrUser) {
      // 本地缓存
      StorageFactory.sessionStorage.set(Constant.userInfoKey, val)
      state.currUser = val;
    },
  },
  actions: {
    logout({ commit }) {
      commit('setCurrUser', {})
    }
  },
  modules: {},
});
