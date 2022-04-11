<template>
  <navbar></navbar>
  <div class="mod_section">
    <div class="mod_block">
      <mv-bar></mv-bar>
      <mv-comment></mv-comment>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/navbar/navbar";
import MvBar from "@/components/mv/mvBar";
import MvComment from "@/components/comment/mv-comment";
export default {
  name: "Mv",
  components: {MvComment, MvBar, Navbar}
}
</script>

<style scoped>
.mod_section{
  /*background-color: aquamarine;*/
  min-width: 1300px;
  position: relative;
  background-image: linear-gradient(#f2f2f2,#fafafa);
}
.mod_block{
  width: 65%;
  border: 1px solid #d5d5d5;
  margin: 0 auto;
  background-color: #fff;
}
.active{
  color: #296fc7;
}
</style>