<template>
  <div class="mod_bar">
    <div class="mod_searchBar">
      <navbar-search></navbar-search>
    </div>
  </div>
</template>

<script>
import navbarSearch from "@/components/navbar/navbarSearch";
export default {
  name: "SearchBar",
  components:{
    navbarSearch
  }
}
</script>

<style scoped>
.mod_bar{
  width: 100%;
  margin: 0 auto;
  position: absolute;
  height: 100px;
  /*background-color: #0077aa;*/
}
.mod_searchBar{
  width: 55%;
  /*height: 660px;*/
  overflow: hidden;
  margin: 20px auto;
  padding-top: 10px;
  position: relative;
  /*left: 20%;*/
  z-index: 90;
  /*background-color: aqua;*/
}
</style>