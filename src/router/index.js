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
    name: '/wartung',
    component: () => import("../components/Wartung.vue")
  },
  {
    path: '/stoerung',
    name: '/stoerung',
    component: () => import("../components/Stoerung.vue")
  },
  {
    path: '/stoerungdetails/:id',
    name: 'StoerungDetails',
    component: () => import("../components/StoerungDetails.vue")
  },
  {
    path: '/performance',
    name: '/performance',
    component: () => import("../components/Performance.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router