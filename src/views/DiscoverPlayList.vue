<template>
  <navbar></navbar>
  <home-playlist/>
</template>

<script>
import Navbar from "@/components/navbar/navbar";
import HomePlaylist from "@/components/home/playlist/home-playlist";

export default {
  name: "DiscoverPlayList",
  components:{HomePlaylist, Navbar}
}
</script>

<style scoped>

</style>