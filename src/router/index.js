import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'PrizeListPage',
    component: () => import('../views/PrizeListPage.vue')
  },
  {
    path: '/free-pass',
    name: 'FreePassPage',
    component: () => import('../views/FreePassPage.vue')
  },
  {
    path: '/pvp-stat',
    name: 'PvpStatPage',
    component: () => import('../views/PvpStatPage.vue')
  },
  {
    path: '/progress',
    name: 'ProgressPage',
    component: () => import('../views/ProgressPage.vue')
  },
  {
    path: '/shop',
    name: 'ShopPage',
    component: () => import('../views/ShopPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});



export default router
