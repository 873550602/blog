import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        currUser: {},
    },
    getters: {
        isLogin: (state) => !!state.currUser && !!state.currUser.isLogin,
    },
    mutations: {
        setCurrUser(state, val) {
            state.currUser = val;
        },
    },
    actions: {},
    modules: {},
});
//# sourceMappingURL=index.js.map