<template>
 <div class="navbarItem">
    <p>{{title}}</p>
 </div>
</template>

<script>
export default {
  name: "navBarItem",
  props:{
    title:String
  },

}
</script>

<style scoped>
.navbarItem{
  height: 100px;
  /*width: 33.33%;*/
  flex: 1;
  background-color: #fff;
  text-align: center;
}
.navbarItem p{
  line-height: 65px;
  font-size: 18px;
}
.navbarItem:hover{
  background-color: #7c9aab;
  color: white;
  cursor: pointer;
}
</style>