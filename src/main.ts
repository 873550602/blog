import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import '@/assets/css/com.scss';
// import toast from '@/plugins/simple-toast/src/index'
import toast from 'simp-toast'
Vue.config.productionTip = false;

Vue.use((toast as any))
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
