<template>
  <div>
    <banner></banner>
<!--    <personal/>-->
    <recommend-resource/>
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
import RecommendResource from "@/components/home/recommend/recommendResource";
import Personal from "@/components/home/recommend/personal";
export default {
  name: "home-recommend",
  components:{Personal, RecommendResource, Banner,hotPlaylist,NewestAlbum,Toplist}
}
</script>

<style scoped>

</style>