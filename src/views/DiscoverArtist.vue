<template>
  <navbar/>
  <home-artist/>
</template>

<script>
import HomeArtist from "@/components/home/artist/home-artist";
import Navbar from "@/components/navbar/navbar";
export default {
  name: "DiscoverArtist",
  components: {Navbar, HomeArtist}
}
</script>

<style scoped>

</style>