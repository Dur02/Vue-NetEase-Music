<template>
  <div class="mod_playlist">
    <el-drawer
        v-model="drawer"
        title="播放列表"
        direction="rtl"
        :before-close="drawerClose"
    >
      <ul>
        <li v-for="item in this.userPlaylist" :key="item.id">
          <div class="inf">
            <span class="song" @click="hitMe(item.id)">{{item.name}}</span>
            <span class="artists">
              <span v-for="(item2,index) in item.ar||item.artists" :key="item2.id" class="name" @click="toArtist(item2.id)">
                {{item2.name}}
                <span v-if="item.ar?index+1 !== item.ar.length:index+1 !== item.artists.length">/</span>
              </span>
            </span>
          </div>
        </li>
      </ul>
    </el-drawer>
  </div>
</template>

<script>

export default {
  name: "playlist-drawer",
  data(){
    return{
      drawer:this.$store.state.drawerFlag,
      userPlaylist:this.$store.state.userPlaylist
    }
  },
  methods:{
    drawerClose(){
      this.$store.commit("set_drawerFlag",false)
    },
    hitMe(songId) {
      this.$store.commit('markSong',songId)
      this.$store.commit('playOrStop',true)
    },
    toArtist(id){
      this.$router.push({path:'/Artist',query:{id:id}})
    }
  },
  watch:{
    '$store.state.drawerFlag':function () {
      this.drawer = this.$store.state.drawerFlag
    },
    '$store.state.userPlaylist':function () {
      this.userPlaylist = this.$store.state.userPlaylist
    }
  },
}
</script>

<style scoped>
.mod_playlist ul{
  list-style: none;
  /*border: 1px solid #000;*/
  width: 100%;
  z-index: 9999;
  /*text-align: center;*/
}
.mod_playlist ul li{
  line-height: 40px;
  height: 40px;
  font-size: 12px;
  margin-right: 3%;
  /*margin: 20px auto;*/
}
.mod_playlist ul li:nth-child(odd){
  background-color: #f7f7f7;
}
.mod_playlist ul li:nth-child(even){
  background-color: #ffffff;
}
.mod_playlist ul li:hover{
  background-color: #f2f2f2;
}
.inf{
  width: 100%;
}
.inf span{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0 1%;
}
.song{
  float: left;
  width: 48%;
}
.artists{
  float: left;
  width: 48%;
  margin-right: 10px;
}
.artists span{
  margin: 0;
}
.song:hover , .name:hover {
  color: #296fc7;
  text-decoration: underline;
}
</style>