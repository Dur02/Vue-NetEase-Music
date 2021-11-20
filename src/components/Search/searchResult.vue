<template>
  <song v-if="type === '1'"></song>
  <album v-if="type === '10'"></album>
  <artist v-if="type === '100'"></artist>
  <playlist v-if="type === '1000'"></playlist>
  <mv v-if="type === '1004'"></mv>
</template>

<script>
import song from "@/components/Search/song";
import album from "@/components/Search/album";
import Artist from "@/components/Search/artist";
import Playlist from "@/components/Search/playlist";
import mv from "@/components/Search/mv";

export default {
  name: "searchResult",
  data() {
    return{
      type:this.$route.query.type
    }
  },
  components:{
    Playlist,
    Artist,
    mv,
    song,
    album
  }
}
</script>

<style scoped>
</style>