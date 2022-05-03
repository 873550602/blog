import Vue from 'vue';
import Vuex from 'vuex';
import { CurrUser } from '@/interface';

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
      state.currUser = val;
    },
  },
  actions: {},
  modules: {},
});
