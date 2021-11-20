<template>
  <navbar></navbar>
  <playlist-bar></playlist-bar>
  <playlist-song></playlist-song>
</template>

<script>
import Navbar from "@/components/navbar/navbar";
import PlaylistBar from "@/components/playlist/playlistBar";
import PlaylistSong from "@/components/playlist/playlistSong";
export default {
  name: "Playlist",
  data() {
    return{

    }
  },
  components: {PlaylistSong, PlaylistBar, Navbar}
}
</script>

<style scoped>

</style>