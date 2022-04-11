<template>
  <navbar></navbar>
  <music-bar></music-bar>
</template>

<script>
import Navbar from "@/components/navbar/navbar";
import {songUrl} from "@/plugin/axios";
import {songDetail} from "@/plugin/axios";
import MusicBar from "@/components/music/musicBar";
export default {
  name: "Music",
  components: {MusicBar, Navbar}
}
</script>

<style scoped>

</style>