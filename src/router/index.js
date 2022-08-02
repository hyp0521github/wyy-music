import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home.vue')
  },
  {
    path: '/playlist',
    name: 'Playlist',
    component: () => import('../views/playlist.vue')
  },
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;
