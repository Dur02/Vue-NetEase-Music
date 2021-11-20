import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: '主页面',
    redirect: Home
  },
  {
    path: '/Home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/Search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/Playlist',
    name: 'Playlist',
    component: () => import('../views/Playlist.vue')
  },
  {
    path: '/Album',
    name: 'Album',
    component: () => import('../views/Album.vue')
  },
  {
    path: '/Artist',
    name: 'Artist',
    component: () => import('../views/Artist.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
