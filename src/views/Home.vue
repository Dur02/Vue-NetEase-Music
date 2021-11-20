<template>
  <navbar></navbar>
  <banner></banner>
  <hot-playlist></hot-playlist>
  <newest-album></newest-album>
  <toplist></toplist>
</template>

<script>
import navbar from "@/components/navbar/navbar";
import login from "@/components/login/login";
import hotPlaylist from "@/components/recommend/hotPlaylist";
import Banner from "@/components/banner/banner";
import NewestAlbum from "@/components/recommend/newestAlbum";
import Toplist from "@/components/recommend/toplist";

export default {
  name: 'Home',
  components: {
    Toplist,
    NewestAlbum,
    Banner,
    login,
    navbar,
    hotPlaylist
  }
}
</script>
