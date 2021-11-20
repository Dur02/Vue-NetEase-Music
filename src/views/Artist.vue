<template>
  <navbar></navbar>
  <div class="mod_section">
    <div class="mod_block">
      <artist-bar></artist-bar>
      <div class="mod_sort">
        <categories title="热门作品" :class="{active:type===1}" @click="change(1)"></categories>
        <categories title="所有专辑" :class="{active:type===2}" @click="change(2)"></categories>
        <categories title="相关MV" :class="{active:type===3}" @click="change(3)"></categories>
        <categories title="艺人介绍" :class="{active:type===4}" @click="change(4)"></categories>
      </div>
      <song v-if="type===1"></song>
      <album v-if="type===2"></album>
      <description v-if="type===4"></description>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/navbar/navbar";
import Categories from "@/components/categories/categories";
import artistBar from "@/components/artist/artistBar";
import song from "@/components/artist/song";
import album from "@/components/artist/album";
import Description from "@/components/artist/description";

export default {
  name: "Artist",
  components: {Description, Categories, Navbar,artistBar,song,album},
  data () {
    return{
      type:1
    }
  },
  methods: {
    change(type){
      this.type = type
    }
  }
  // beforeMount() {
  //   artist(this.id)
  //   .then(res=>{
  //     // console.log(res)
  //   })
  //   // artistTop(this.id)
  //   // .then(res=>{
  //   //   console.log(res)
  //   // })
  //   // .catch(err=>{
  //   //   console.log(err)
  //   // })
  //   //
  //   // artistDesc(this.id)
  //   // .then(res=>{
  //   //   console.log(res)
  //   // })
  //   // .catch(err=>{
  //   //   console.log(err)
  //   // })
  //   //
  //   // artistDetail(this.id)
  //   // .then(res=>{
  //   //   console.log(res)
  //   // })
  //   // .catch(err=>{
  //   //   console.log(err)
  //   // })
  // }
}
</script>

<style scoped>
.mod_section{
  /*background-color: aquamarine;*/
  min-width: 1300px;
  background-image: linear-gradient(#f2f2f2,#fafafa);
}
.mod_sort{
  min-width: 1000px;
  /*width: 65%;*/
  /*background-color: rebeccapurple;*/
  /*margin: 0 auto;*/
  display: flex;
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