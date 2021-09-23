<template>
  <div class="navBar">
    <div class="navBar_inner">
      <h1>
        <img src="@/assets/QQlogo.png">
      </h1>
      <div class="navBar_mod">
        <navbar-item title="发现音乐"></navbar-item>
        <navbar-item title="我的音乐"></navbar-item>
        <navbar-item title="好友"></navbar-item>
      </div>
      <div class="navBar_search">
        <navbar-search></navbar-search>
      </div>
      <div class="navBar_login">
        <navbar-login></navbar-login>
      </div>
    </div>
  </div>
</template>

<script>
import navbarItem from "@/components/navbar/navbarItem";
import '@/assets/iconfont/iconfont.css'
import navbarSearch from "@/components/navbar/navbarSearch";
import navbarLogin from "@/components/navbar/navbar_login";
export default {
  name: "navbar",
  components:{
    navbarItem,
    navbarSearch,
    navbarLogin
  }
}
</script>

<style scoped>
.navBar{
  min-width: 2000px;
  height: 150px;
  /*background-color: #000;*/
  align-items: center;
}
.navBar_inner{
  margin: 0 auto;
  width: 65%;
  height: 100px;
  /*background-color: aqua;*/
  display: flex;
  border-bottom: 1px solid rgb(231,231,231);
}
.navBar_inner img{
  margin: 5px 10px 0px 10px;
  /*border:1px solid black;*/
}
.navBar_inner img:hover{
  cursor: pointer;
}
.navBar_mod{
  height: 100px;
  background-color: pink;
  flex: 3;
  display: flex;
}
.navBar_search{
  flex: 3;
  background-color: darkred;
  text-align: center;
}
.navBar_login{
  flex:1;
  /*background-color: aquamarine;*/
  text-align: center;
}
</style>