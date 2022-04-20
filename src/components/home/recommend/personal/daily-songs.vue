<template>
  <div class="mod_section">
    <div class="mod_block">
      <i
          class="iconfont description"
          :class="'icon-rili'+(date-1)"
      />
      <div style="display: inline-block;">
        <h2 class="area_description">每日歌曲推荐</h2>
        <p>根据你的音乐口味生成，每天6:00更新</p>
      </div>
      <div class="mod_playlist">
        <ul>
          <li v-for="item of playlist" :key="item.id">
            <div class="inf">
              <span class="song" @click="hitMe(item.id)">{{item.name}}</span>
              <span class="artists">
                <span v-for="(item2,index) in item.ar" :key="item2.id" class="name" @click="toArtist(item2.id)">
                  {{item2.name}}
                  <span v-if="index+1 !== item.ar.length">/</span>
                </span>
              </span>
              <span class="album" @click="toAlbum(item.al.id)">{{item.al.name}}</span>
              <span class="duration">
<!--            化毫秒数为分钟和秒数-->
            {{Math.floor((Math.round(item.dt/1000))/60) < 10
                  ? '0' + Math.floor((Math.round(item.dt/1000))/60)
                  : Math.floor((Math.round(item.dt/1000))/60)}}
            :
            {{Math.floor((Math.round(item.dt/1000))%60) < 10
                  ? '0' + Math.floor((Math.round(item.dt/1000))%60):
                  Math.floor((Math.round(item.dt/1000))%60)}}
          </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {getLoginStatus, personalFm, recommendSongs, songUrl} from "@/plugin/axios";

export default {
  name: "daily-songs",
  data(){
    return {
      playlist:[],
      trackIds:"",
      songUrl:{}
    }
  },
  beforeMount() {
    this.date = new Date().getDate()
    // console.log(this.date)
    getLoginStatus()
        .then(res=>{
          if (res.data.data.account !== null){
            this.status = true
            recommendSongs()
                .then(res=>{
                  console.log(res)
                  this.playlist = res.data.data.dailySongs
                  this.trackIds += this.playlist.map((item)=>{
                    return (item.id)
                  })
                  // console.log(this.trackIds)
                })
                .catch(err=>{
                  console.log(err)
                })
          }else {
            this.status = false
          }
        })
        .catch(err=>{
          console.log(err)
        })
  },
  methods:{
    hitMe(songId) {
      songUrl(this.trackIds)
          .then(res=>{
            this.songUrl = res.data.data
            this.$store.commit('addSong',this.songUrl)
            this.$store.commit('markSong',songId)
            this.$store.commit('insertList',this.playlist)
            this.$store.commit('playOrStop',true)
            this.$store.commit('change_isPersonalFm',false)
            // console.log("11111")
            // console.log(this.playlist)
            // console.log("22222")
            // console.log(this.songUrl)
          })
          .catch(err=>{
            console.log(err)
          })
    },
    toAlbum(id){
      this.$router.push({path:'/Album',query:{id:id}})
    },
    toArtist(id){
      this.$router.push({path:'/Artist',query:{id:id}})
    }
  }
}
</script>

<style scoped>
.mod_section{
  background-image: linear-gradient(#f2f2f2,#fafafa);
  min-width: 1300px;
  position: relative;
}
.mod_block{
  width: 70%;
  margin: 0 auto;
  background: #fff;
}
.mod_block i{
  font-size: 150px;
  color: #7c9aab;
  padding-left: 20px;
}
.mod_playlist{
  width: 100%;
  /*height: 1000px;*/
  /*background-color: aqua;*/
  margin: 0 auto 20px auto;
  background-color: #fff;
  border-left: 1px solid #d5d5d5;
  border-right: 1px solid #d5d5d5;
  border-bottom: 1px solid #d5d5d5;
  /*border-top: 1px solid #d5d5d5;*/
  display: flex;
}
.mod_playlist ul{
  list-style: none;
  /*border: 1px solid #000;*/
  width: 100%;
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
  width: 32%;
}
.artists{
  float: left;
  width: 32%;
  margin-right: 10px;
}
.artists span{
  margin: 0;
}
.album{
  float: left;
  width: 21%;
}
.duration{
  float: right;
  width: 6%;
}
.song:hover , .name:hover , .album:hover{
  color: #296fc7;
  text-decoration: underline;
}
</style>
