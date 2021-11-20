<template>
  <div class="mod_section">
    <div class="mod_title">
      <h1>热门推荐</h1>
    </div>

    <div class="mod_title">
      <div v-for="(item,index) of hotPlaylist.slice(0,4)" class="mod_playList">
<!--        <img :src="item.picUrl" class="playList_pic" alt="加载失败" @click="toPlaylistDetail(item.id)">-->
        <img :src="getUrl(item)" class="playList_pic" alt="加载失败" @click="toPlaylistDetail(item.id)">
      </div>
    </div>
    <div class="mod_title">
      <span v-for="(item,index) of hotPlaylist.slice(0,4)" class="playList_desc" @click="toPlaylistDetail(item.id)">{{item.name}}</span>
    </div>

    <div class="mod_title">
      <div v-for="(item,index) of hotPlaylist.slice(4,8)" class="mod_playList">
        <img :src="getUrl(item)" class="playList_pic" alt="加载失败" @click="toPlaylistDetail(item.id)">
      </div>
    </div>
    <div class="mod_title">
      <span v-for="(item,index) of hotPlaylist.slice(4,8)" class="playList_desc" @click="toPlaylistDetail(item.id)">{{item.name}}</span>
    </div>

  </div>
</template>

<script>
import {personalized, playlistDetail} from "@/plugin/axios";
export default {
  name: "hotPlaylist",
  data () {
    return{
      hotPlaylist: [],
    }
  },
  components: {

  },
  methods:{
    toPlaylistDetail(id){
      this.$router.push({path:'/Playlist',query:{id:id}})
    },
    getUrl (item) {
      let url = item.picUrl+"?param=180y180"
      // console.log(url)
      return url
    }
  },
  beforeCreate() {
    personalized()
      .then(res => {
        // console.log(res)
        this.hotPlaylist =res.data.result;
        // console.log(this.hotPlaylist)
      })
      .catch(err=>{
        console.log(err)
      })
  }
}
</script>

<style scoped>
.mod_section{
  background-image: linear-gradient(#f2f2f2,#fafafa);
  min-width: 1300px;
  position: relative;
}
.mod_title{
  margin: 0 auto;
  width: 65%;
  display: flex;
}
.mod_title h1{
  margin: 30px auto 10px auto;
  font-family: "微軟正黑體 Light", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;
}
.mod_playList{
  width: 20%;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
}
.playList_pic{
  width: 100%;
  height: 100%;
  margin: 0 auto;
  transition: transform .75s;
  -webkit-transition: transform .75s;
  display: block;
}
.playList_pic:hover{
  transform: scale(1.1) translateZ(0);
  -webkit-transform: scale(1.1) translateZ(0);
}
.playList_desc{
  width: 21%;
  margin: 20px auto;
  font-size: 15px;
}
.playList_desc:hover{
  color: #296fc7;
  text-decoration: underline;
}
</style>