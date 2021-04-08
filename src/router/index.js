import Vue from 'vue'
import VueRouter from 'vue-router'
import Startseite from '../components/Startseite.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Startseite',
    component: Startseite
  },
  {
    path: '/wartung',
    name: 'Wartung',
    component: () => import("../components/Wartung.vue")
  },
  {
    path: '/stoerung',
    name: 'Stoerung',
    component: () => import("../components/Stoerung.vue")
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router