import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import '@/assets/css/com.scss';
import simpToast from 'simp-toast'
import { MarkdownViewer } from 'md-simple-editor'
import moment from 'moment';
Vue.config.productionTip = false;
Vue.use(simpToast)
Vue.component('md-view', MarkdownViewer)
Vue.filter('formatDate', (d: number | string | Date, fmt = 'yyyy-MM-DD hh:mm:ss'):string => moment(new Date(d)).format(fmt))
const vm = new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
export const Toast = vm.$toast

