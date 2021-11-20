<template>
  <div class="mod_section">
    <div class="mod_title">
      <h1>最新专辑</h1>
    </div>
    <div class="mod_title">
      <el-carousel trigger="click" height="320px" indicator-position="outside" :autoplay="false">

        <el-carousel-item>
          <div class="mod_index">
            <div v-for="(item,index) of newestAlbum.slice(0,4)" class="mod_Album" @click="toPlaylistDetail(item.id)">
              <img :src="getUrl(item)" class="album_pic" @click="toAlbumDetail(item.id)">
            </div>
          </div>
          <div class="mod_index">
            <span v-for="(item,index) of newestAlbum.slice(0,4)" class="album_inf" @click="toAlbumDetail(item.id)">{{item.name}}</span>
          </div>
          <div class="mod_index">
            <span v-for="(item,index) of newestAlbum.slice(0,4)" class="artist_inf" @click="getArtistTop(item.artist.id)">{{item.artist.name}}</span>
          </div>
        </el-carousel-item>

        <el-carousel-item>
          <div class="mod_index">
            <div v-for="(item,index) of newestAlbum.slice(4,8)" class="mod_Album">
<!--              <img :src="item.picUrl" class="album_pic" @click="toPlaylistDetail(item.id)">-->
              <img :src="getUrl(item)" class="album_pic" @click="toAlbumDetail(item.id)">
            </div>
          </div>
          <div class="mod_index">
            <span v-for="(item,index) of newestAlbum.slice(4,8)" class="album_inf" @click="toAlbumDetail(item.id)">{{item.name}}</span>
          </div>
          <div class="mod_index">
            <span v-for="(item,index) of newestAlbum.slice(4,8)" class="artist_inf" @click="getArtistTop(item.artist.id)">{{item.artist.name}}</span>
          </div>
        </el-carousel-item>

        <el-carousel-item>
          <div class="mod_index">
            <div v-for="(item,index) of newestAlbum.slice(8,12)" class="mod_Album">
              <img :src="getUrl(item)" class="album_pic" @click="toAlbumDetail(item.id)">
            </div>
          </div>
          <div class="mod_index">
            <span v-for="(item,index) of newestAlbum.slice(8,12)" class="album_inf" @click="toAlbumDetail(item.id)">{{item.name}}</span>
          </div>
          <div class="mod_index">
            <span v-for="(item,index) of newestAlbum.slice(8,12)" class="artist_inf" @click="getArtistTop(item.artist.id)">{{item.artist.name}}</span>
          </div>
        </el-carousel-item>

      </el-carousel>
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
      let url = item.picUrl+"?param=180y180"
      // console.log(url)
      return url
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
  margin: 0px auto;
  /*background-color: aquamarine;*/
  width: 65%;
  /*display: flex;*/
  text-align: center;
}
.mod_title h1{
  /*font-size: px;*/
  margin: 0px auto 10px auto;
  padding-top: 30px;
  /*border: 1px solid #404040;*/
  font-family: "微軟正黑體 Light", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;
}
.mod_index{
  display: flex;
  width: 100%;
}
.mod_Album{
  width: 20%;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
}
.album_pic{
  width: 100%;
  height: 100%;
  margin: 0px auto;
  transition: transform .75s;
  display: block;
}
.album_pic:hover{
  transform: scale(1.1) translateZ(0);
}
.album_inf,.artist_inf{
  width: 20%;
  margin: 10px auto;
  font-size: 14px;
}
.album_inf:hover , .artist_inf:hover{
  color: #296fc7;
  text-decoration: underline;
}
.artist_inf{
  color: #888888;
}
</style>