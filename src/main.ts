import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import '@/assets/css/com.scss';
import simpToast from 'simp-toast'
import markdownIt from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'
Vue.config.productionTip = false;
Vue.use(simpToast)
// markdown-it
Vue.component('markdown-it',Vue.extend(markdownIt))


const vm = new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
export const Toast = vm.$toast 

