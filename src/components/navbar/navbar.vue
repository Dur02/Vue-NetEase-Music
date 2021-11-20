<template>
  <div class="navbar">
    <div class="navbar_inner">
      <h1>
        <img src="@/assets/BearBeat.png">
      </h1>
      <div class="navbar_mod">
        <navbar-item title="发现音乐" :class="{'active':home}" @click="toHome"></navbar-item>
        <navbar-item title="我的音乐" :class="{'active':mine}"></navbar-item>
        <navbar-item title="好友" :class="{'active':friend}"></navbar-item>
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
        <categories title="推荐" :class="{'cat_active':home}"></categories>
        <categories title="排行榜"></categories>
        <categories title="歌单"></categories>
        <categories title="主播电台"></categories>
        <categories title="歌手"></categories>
        <categories title="新碟上架"></categories>
      </div>
    </div>
  </div>
  <login></login>
</template>

<script>
import navbarItem from "@/components/navbar/navbarItem";
import '@/assets/iconfont/iconfont.css'
import navbarSearch from "@/components/navbar/navbarSearch";
import navbarLogin from "@/components/navbar/navbarLogin";
import categories from "@/components/categories/categories";
import Login from "@/components/login/login";

export default {
  name: "navbar",
  data () {
    return{
      home:false,
      mine:false,
      friend:false
    }
  },
  components:{
    Login,
    navbarItem,
    navbarSearch,
    navbarLogin,
    categories
  },
  beforeMount() {
    // console.log(this.$route)
    if (this.$route.path === '/Home' || this.$route.path === '/Search' || this.$route.path === '/Playlist'
        || this.$route.path === '/Album' || this.$route.path === '/Artist')
    {
      this.home = true
      this.mine = false
      this.friend = false
    }
    if (this.$route.path === '/Mine'){
      this.mine = true
      this.home = false
      this.friend = false
    }
    if (this.$route.path === '/Friend'){
      this.friend = true
      this.mine = false
      this.home = false
    }
  },
  methods:{
    toHome () {
      this.$router.push('/Home')
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
.cat_active{
  color: #296fc7;
}
.navbar{
  min-width: 1300px;
  height: 150px;
  /*background-color: #000;*/
  align-items: center;
}
.navbar_inner{
  margin: 0 auto;
  width: 85%;
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
  flex: 3;
  display: flex;
}
.navbar_search{
  flex: 3;
  height: 660px;
  overflow-x: hidden;
  overflow-y: auto;
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
</style>