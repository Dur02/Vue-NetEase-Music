<template>
  <navbar></navbar>
  <div class="mod_section">
    <div class="mod_block">
      <album-bar></album-bar>
      <div class="mod_sort">
        <categories title="详情" :class="{active:type===1}" @click="change(1)"></categories>
        <categories title="评论" :class="{active:type===2}" @click="change(2)"></categories>
      </div>
      <album-song v-if="type === 1"></album-song>
      <album-comment v-if="type === 2"></album-comment>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/navbar/navbar";
import AlbumBar from "@/components/album/albumBar";
import AlbumSong from "@/components/album/albumSong";
import Categories from "@/components/categories/categories"
import AlbumComment from "@/components/comment/album-comment"
export default {
  name: "Album",
  components: {AlbumSong, AlbumBar, Navbar, Categories, AlbumComment},
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
}
</script>

<style scoped>
.mod_section{
  background-image: linear-gradient(#f6f6f6,#fafafa);
  min-width: 1300px;
  position: relative;
}
.mod_sort{
  width: 65%;
  border-left: #d5d5d5 1px solid;
  border-right: #d5d5d5 1px solid;
  margin: 0 auto;
  background-color: #fff;
  display: flex;
}
.active{
  color: #296fc7;
}
</style>