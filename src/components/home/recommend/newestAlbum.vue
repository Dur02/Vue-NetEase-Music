<template>
  <div class="mod_section">
    <div class="mod_title">
      <h1>最新专辑</h1>
    </div>

    <div class="mod_block">
      <div class="mod_playlist" v-for="(item,index) of newestAlbum" :key="item.id">
        <div class="mod_pic">
          <img :src="getUrl(item)" class="artist-pic" alt="加载失败" @click="toAlbumDetail(item.id)">
        </div>
        <div class="mod_name">
          <span class="artist-name" @click="toAlbumDetail(item.id)">{{item.name}}</span>
        </div>
        <div class="mod_artist">
          <span class="artist_inf" @click="getArtistTop(item.artist.id)">{{item.artist.name}}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {newestAlbum} from "@/plugin/axios";

export default {
  name: "newestAlbum",
  data () {
    return{
      newestAlbum: [],
    }
  },
  beforeCreate() {
    newestAlbum()
        .then(res => {
          // console.log(res)
          this.newestAlbum = res.data.albums
          // console.log("aaaaaaaa",this.newestAlbum)
        })
        .catch(err=>{
          console.log(err)
        })
  },
  methods:{
    toAlbumDetail(id){
      // console.log(id)
      this.$router.push({path:'/Album',query:{id:id}})
    },
    getUrl (item) {
      // console.log(url)
      return item.picUrl + "?param=180y180"
    },
    getArtistTop (id) {
      // console.log(id)
      this.$router.push({path:'/Artist',query:{id:id}})
    },
  }
}
</script>

<style scoped>
.mod_section{
  background-image: linear-gradient(#f2f2f2,#fafafa);
  /*height: 500px;*/
  min-width: 1300px;
  position: relative;
  /*background-color: #0077aa;*/
  /*background-color: red;*/
}
.mod_title{
  margin: 0 auto;
  /*background-color: aquamarine;*/
  width: 65%;
  /*display: flex;*/
  text-align: center;
}
.mod_title h1{
  /*font-size: px;*/
  margin: 0 auto 10px;
  padding-top: 30px;
  /*border: 1px solid #404040;*/
  font-family: "微軟正黑體 Light", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;
}
.mod_block{
  /*background-color: #296fc7;*/
  width: 70%;
  margin: 0 auto;
}
.mod_playlist{
  width: 20%;
  height: 100%;
  margin: 0 29px;
  overflow: hidden;
  display: inline-grid;
}
.mod_pic{
  width: 100%;
  height: 100%;
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
.mod_name,.mod_artist{
  text-align: center;
  width: 100%;
  margin: 7px auto 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.artist-name,.artist_inf{
  width: 21%;
  margin: 20px auto;
  font-size: 13px;
}
.artist-name:hover,.artist_inf:hover{
  color: #296fc7;
}
</style>
