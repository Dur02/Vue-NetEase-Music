<template>
  <div class="mod_categories">
    <categories title="单曲" :class="{'active':songAct}" @click="Slide(1)"></categories>
    <categories title="专辑" :class="{'active':albumAct}" @click="Slide(10)"></categories>
    <categories title="歌手" :class="{'active':artistsAct}" @click="Slide(100)"></categories>
    <categories title="歌单" :class="{'active':playlistAct}" @click="Slide(1000)"></categories>
    <categories title="MV" :class="{'active':MvAct}" @click="Slide(1004)"></categories>
  </div>
</template>

<script>
import categories from "@/components/categories/categories";
export default {
  name: "searchType",
  data() {
    return{
      songAct:false,
      albumAct:false,
      artistsAct:false,
      playlistAct:false,
      MvAct:false
    }
  },
  components:{
    categories
  },
  beforeMount() {
    // console.log(this.$route)
    if (this.$route.query.type === "1"){
      this.songAct = true
    }else if(this.$route.query.type === "10") {
      this.albumAct = true
    }else if(this.$route.query.type === "100") {
      this.artistsAct = true
    }else if(this.$route.query.type === "1000") {
      this.playlistAct = true
    }else if(this.$route.query.type === "1004") {
      this.MvAct = true
    }
  },
  methods:{
    Slide (type) {
      // console.log("1111",this.$route)
      this.$router.push({path:'/Search',query:{keywords:this.$route.query.keywords,type:type}})
    }
  }
}
</script>

<style scoped>
.mod_categories{
  display: flex;
  width: 65%;
  margin: 0 auto;
  position: relative;
  top: 140px;
  z-index: 1;
}
.active{
  color: #296fc7;
}
</style>