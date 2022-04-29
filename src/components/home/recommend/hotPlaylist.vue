<template>
  <div class="mod_section">
    <div class="mod_title">
      <h1>热门歌单</h1>
    </div>

    <div class="mod_block">
      <div class="mod_playlist" v-for="(item,index) of hotPlaylist" :key="item.id">
        <div class="mod_pic">
          <img :src="getUrl(item)" class="artist-pic" alt="加载失败" @click="toPlaylistDetail(item.id)">
        </div>
        <div class="mod_name">
          <span class="artist-name" @click="toPlaylistDetail(item.id)">{{item.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getLoginStatus, personalized, recommendResource} from "@/plugin/axios";

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
      // console.log(url)
      return item.picUrl + "?param=180y180"
    }
  },
  beforeCreate() {
    personalized()
      .then(res => {
        this.hotPlaylist =res.data.result;
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
  text-align: center;
}
.mod_title h1{
  margin: 0 auto 10px auto;
  font-family: "微軟正黑體 Light", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;
}
.mod_block{
  /*background-color: red;*/
  width: 70%;
  margin: 0 auto;
}
.mod_playlist{
  width: 25%;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
  display: inline-grid;
}
.mod_pic{
  width: 95%;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
}
.artist-pic{
  width: 100%;
  height: 100%;
  margin: 0 auto;
  transition: transform .75s;
  -webkit-transition: transform .75s;
  display: block;
}
.artist-pic:hover{
  transform: scale(1.1) translateZ(0);
  -webkit-transform: scale(1.1) translateZ(0);
}
.mod_name{
  width: 95%;
  margin: 10px auto;
}
.artist-name{
  width: 21%;
  margin: 20px auto;
  font-size: 15px;
}
.artist-name:hover{
  color: #296fc7;
}
</style>
