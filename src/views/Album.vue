<template>
  <navbar></navbar>
  <album-bar></album-bar>
  <album-song></album-song>
</template>

<script>
import Navbar from "@/components/navbar/navbar";
import AlbumBar from "@/components/album/albumBar";
import AlbumSong from "@/components/album/albumSong";
export default {
  name: "Album",
  components: {AlbumSong, AlbumBar, Navbar},
  data () {
    return{
      id:this.$route.query.id
    }
  },
}
</script>

<style scoped>

</style>