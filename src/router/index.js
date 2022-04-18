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
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    meta:{title:'首页',keepAlive:true},
  },
  {
    path: '/Search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
    meta:{title:'搜索',keepAlive:true},
  },
  {
    path: '/Playlist',
    name: 'Playlist',
    component: () => import('../views/Playlist.vue'),
    meta:{title:'歌单',keepAlive:true},
  },
  {
    path: '/Album',
    name: 'Album',
    component: () => import('../views/Album.vue'),
    meta:{title:'专辑',keepAlive:true},
  },
  {
    path: '/Artist',
    name: 'Artist',
    component: () => import('../views/Artist.vue'),
    // meta:{title:'歌手',keepAlive:true},
  },
  {
    path: '/Mv',
    name: 'Mv',
    component: () => import('../views/Mv.vue'),
    // meta:{title:'MV',keepAlive:true},
  },
  {
    path: '/TopList',
    name: 'TopList',
    component: () => import('../views/TopList.vue'),
    // meta:{title:'排行榜',keepAlive:true},
  },
  {
    path: '/Music',
    name: 'Music',
    component: () => import('../views/Music.vue'),
    // meta:{title:'音乐',keepAlive:true},
  },
  {
    path: '/DiscoverTopList',
    name: 'DiscoverTopList',
    component: () => import('../views/DiscoverTopList.vue'),
  },
  {
    path: '/DiscoverPlayList',
    name: 'DiscoverPlayList',
    component: () => import('../views/DiscoverPlayList.vue'),
  },
  {
    path: '/DiscoverArtist',
    name: 'DiscoverArtist',
    component: () => import('../views/DiscoverArtist.vue'),
  },
  {
    path: '/DiscoverAlbum',
    name: 'DiscoverAlbum',
    component: () => import('../views/DiscoverAlbum.vue'),
  },
  {
    path: '/My',
    name: 'My',
    component: () => import('../views/My.vue'),
  },
  {
    path: '/Recommend_Song',
    name: 'Recommend_Song',
    component: () => import('../views/Recommend_Song'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
