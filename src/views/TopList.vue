<template>
  <navbar></navbar>
  <div class="mod_section">
    <div class="mod_block">
      <playlist-bar></playlist-bar>
      <div class="mod_sort">
        <categories title="详情" :class="{active:type===1}" @click="change(1)"></categories>
        <categories title="评论" :class="{active:type===2}" @click="change(2)"></categories>
      </div>
      <playlist-song v-if="type === 1"></playlist-song>
      <playlist-comment v-if="type === 2"></playlist-comment>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/navbar/navbar";
import PlaylistSong from "@/components/playlist/playlistSong";
import PlaylistBar from "@/components/playlist/playlistBar";
import PlaylistComment from "@/components/comment/playlist-comment";
import Categories from "@/components/categories/categories";
export default {
  name: "Toplist",
  data() {
    return{
      type:1
    }
  },
  components: {PlaylistComment, PlaylistSong, PlaylistBar, Navbar, Categories},
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
  width: 70%;
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
