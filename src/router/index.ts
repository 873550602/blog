import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home.vue'),
  },
  {
    path: '/list/:category',
    name: 'list',
    props: ($route) => ({
      category: $route.params.category,
    }),
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/list.vue'),
  },
  {
    path: '/list/:category/:id',
    name: 'detail',
    props: ($route) => ({
      category: $route.params.category,
      id: $route.params.id,
    }),
    component: () =>
      import(/* webpackChunkName: "detail" */ '@/views/detail.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login.vue'),
  },
  {
    path: '/changePassword',
    name: 'changePassword',
    component: () =>
      import(
        /* webpackChunkName: "changePassword" */ '@/views/changePassword.vue'
      ),
  },
  {
    path: '/registry',
    name: 'registry',
    component: () =>
      import(/* webpackChunkName: "registry" */ '@/views/registry.vue'),
  },
  {
    path: '/currUserInfo',
    name: 'currUserInfo',
    component: () =>
      import(/* webpackChunkName: "currUserInfo" */ '@/views/currUserInfo.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
