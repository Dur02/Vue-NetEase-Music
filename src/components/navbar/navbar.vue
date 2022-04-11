<template>
  <div class="navbar">
    <div class="navbar_inner">
      <h1>
        <img src="@/assets/BearBeat.png" alt="加载失败"/>
      </h1>
      <div class="navbar_mod">
        <navbar-item title="发现音乐" :class="{'active':navItem === 'home'}" @click="toHome"></navbar-item>
        <navbar-item title="我的音乐" :class="{'active':navItem === 'my'}" @click="toMy"></navbar-item>
      </div>
      <div class="navbar_search">
        <navbar-search></navbar-search>
      </div>
      <div class="navbar_login">
        <navbar-login></navbar-login>
      </div>
    </div>
    <div class="navbar_lower">
      <div class="categories_index">
        <categories title="推荐" :class="{'low-active':flag === 'recommend'}" @click="jump('/Home')"></categories>
        <categories title="排行榜" :class="{'low-active':flag === 'toplist'}" @click="jump('/DiscoverTopList')"></categories>
        <categories title="歌单" :class="{'low-active':flag === 'playlist'}" @click="jump('/DiscoverPlayList')"></categories>
        <categories title="歌手" :class="{'low-active':flag === 'artist'}" @click="jump('/DiscoverArtist')"></categories>
        <categories title="新碟上架" :class="{'low-active':flag === 'album'}" @click="jump('/DiscoverAlbum')"></categories>
      </div>
    </div>
  </div>
  <login></login>
<!--  <controller></controller>-->
</template>

<script>
import navbarItem from "@/components/navbar/navbarItem";
import '@/assets/iconfont/iconfont.css'
import navbarSearch from "@/components/navbar/navbarSearch";
import navbarLogin from "@/components/navbar/navbarLogin";
import categories from "@/components/categories/categories";
import Login from "@/components/login/login";
import Controller from "@/components/music/controller";

export default {
  name: "navbar",
  data () {
    return{
      navItem:"home",
      flag:'recommend'
    }
  },
  components:{
    Controller,
    Login,
    navbarItem,
    navbarSearch,
    navbarLogin,
    categories
  },
  beforeMount() {
    switch (this.$route.path){
      case '/Home':
        this.flag = 'recommend'
        this.navItem = 'home'
        break
      case '/DiscoverTopList':
        this.flag = 'toplist'
        this.navItem = 'home'
        break
      case '/DiscoverPlayList':
        this.flag = 'playlist'
        this.navItem = 'home'
        break
      case '/DiscoverArtist':
        this.flag = 'artist'
        this.navItem = 'home'
        break
      case '/DiscoverAlbum':
        this.flag = 'album'
        this.navItem = 'home'
        break
      case '/My':
        this.flag = ""
        this.navItem = 'my'
        break
      default:
        this.flag = ''
        this.navItem = ''
        break
    }
  },
  methods:{
    toHome () {
      this.$router.push('/Home')
    },
    toMy () {
      this.$router.push('/My')
    },
    setFlag(identify) {
      this.flag = identify
    },
    jump(route){
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
.active{
  background-color: #7c9aab;
  color: white;
  cursor: pointer;
}
.navbar{
  min-width: 1300px;
  height: 150px;
  /*background-color: #000;*/
  align-items: center;
}
.navbar_inner{
  margin: 0 auto;
  width: 75%;
  height: 100px;
  /*background-color: antiquewhite;*/
  display: flex;
  border-bottom: 1px solid rgb(231,231,231);
}
.navbar_inner img{
  margin: 5px 10px 0 10px;
  height: 50px
  /*border:1px solid black;*/
}
.navbar_inner img:hover{
  cursor: pointer;
}
.navbar_mod{
  height: 100px;
  /*background-color: pink;*/
  flex: 1;
  display: flex;
}
.navbar_search{
  flex: 1;
  height: 728px;
  overflow-x: hidden;
  overflow-y: hidden;
  /*background-color: darkred;*/
  text-align: center;
}
.navbar_login{
  flex:1;
  /*background-color: aquamarine;*/
  text-align: center;
}
.navbar_lower{
  height: 50px;
  /*background-color: #888888;*/
  /*align-items: center;*/
}
.categories_index{
  margin: 0 auto;
  /*background-color: aqua;*/
  width: 65%;
  height: 100%;
  display: flex;
}
.low-active{
  color: #296fc7;
  cursor: pointer;
}
</style>