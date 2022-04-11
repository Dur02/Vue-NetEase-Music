<template>
  <navbar/>
  <home-album/>
</template>

<script>
import Navbar from "@/components/navbar/navbar";
import HomeAlbum from "@/components/home/album/home-album";

export default {
  name: "DiscoverAlbum",
  components: {Navbar,HomeAlbum}
}
</script>

<style scoped>

</style>