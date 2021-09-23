<template>
 <div class="navBarItem">
    <p>{{title}}</p>
 </div>
</template>

<script>
export default {
  name: "navBarItem",
  props:{
    title:String
  }
}
</script>

<style scoped>
.navBarItem{
  height: 100px;
  width: 33.33%;
  background-color: #fff;
  text-align: center;
}
.navBarItem p{
  line-height: 55px;
  font-size: 18px;
}
.navBarItem:hover{
  background-color: #7c9aab;
  color: white;
  cursor: pointer;
}
</style>