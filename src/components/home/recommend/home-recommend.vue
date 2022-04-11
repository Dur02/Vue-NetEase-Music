<template>
  <div>
    <banner></banner>
    <hot-playlist></hot-playlist>
    <newest-album></newest-album>
    <toplist></toplist>
  </div>
</template>

<script>
import Banner from "@/components/banner/banner";
import hotPlaylist from "@/components/home/recommend/hotPlaylist";
import NewestAlbum from "@/components/home/recommend/newestAlbum";
import Toplist from "@/components/home/recommend/toplist";
export default {
  name: "home-recommend",
  components:{Banner,hotPlaylist,NewestAlbum,Toplist}
}
</script>

<style scoped>

</style>