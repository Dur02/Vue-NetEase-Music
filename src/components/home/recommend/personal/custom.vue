<template>
  <div class="mod_section" v-if="status">
    <div class="personal_fm">
      <div class="personal_fm_center">
        <div>
          <h3>私人Fm</h3>
          <div class="bg2" @click="personalFm" :style="bg1">
            <i
                class="iconfont icon-diantai description"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="recommend_songs">
      <div class="recommend_songs_center">
        <div>
          <h3>每日歌曲推荐</h3>
          <div class="bg2" @click="toCustomSong" :style="bg2">
            <i
                class="iconfont description"
                :class="'icon-rili'+(date-1)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getLoginStatus,
  personalFm,
  recommendSongs, songDetail, songUrl
} from "@/plugin/axios";

export default {
  name: "personal",
  data(){
    return {
      playlist:[],
      status:false,
      date:0,
      trackIds:"",
      imgUrl:"",
      bg1:"",
      bg2:"",
      songs:[],
      songUrl:[]
    }
  },
  methods:{
    toCustomSong(){
      this.$router.push('/Recommend_Song')
    },
    personalFm(){
      songDetail(this.trackIds)
          .then(res=>{
            // console.log(res)
            this.songs = res.data.songs
            songUrl(this.trackIds)
                .then(res=>{
                  // console.log(this.songs)
                  this.songUrl = res.data.data
                  this.$store.commit('addSong',this.songUrl)
                  this.$store.commit('markSong',this.songs[0].id)
                  this.$store.commit('insertList',this.songs)
                  this.$store.commit('playOrStop',true)
                  this.$store.commit('change_isPersonalFm',true)
                  this.$store.commit('changePlayerMode',0)
                  // console.log(this.songUrl)
                })
                .catch(err=>{
                  console.log(err)
                })
          })
          .catch(err=>{
            console.log(err)
          })
    }
  },
  beforeMount() {
    this.date = new Date().getDate()
    getLoginStatus()
      .then(res=>{
        if (res.data.data.account !== null){
          this.status = true
          recommendSongs()
            .then(res=>{
              // console.log(res)
              this.imgUrl = res.data.data.dailySongs[0].al.picUrl + "?param=300y300"
              this.bg2 = `background-image: url(\"${this.imgUrl}\");`
            })
            .catch(err=>{
              console.log(err)
            })
          personalFm()
            .then(res=>{
              console.log(res)
              this.imgUrl = res.data.data[0].album.blurPicUrl + "?param=300y300"
              this.bg1 = `background-image: url(\"${this.imgUrl}\");`
              this.trackIds += res.data.data.map((item)=>{
                return (item.id)
              })
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
}
</script>

<style scoped>
.mod_section{
  background-image: linear-gradient(#f2f2f2,#fafafa);
  height: 500px;
  min-width: 1300px;
  position: relative;
}
.personal_fm , .recommend_songs{
  height: 500px;
  width: 50%;
  float: left;
}
.personal_fm_center , .recommend_songs_center{
  height: 500px;
  width: 50%;
  padding-top: 30px;
  position: relative;
  text-align: center;
}
.personal_fm_center{
  left: 31%;
}
.recommend_songs_center{
  left: 19%;
}
.bg2{
  position: relative;
  height: 300px;
  width: 70%;
  margin: 0 auto;
  background-size: cover;
  background-repeat: no-repeat;
}
.description{
  height: 300px;
  line-height:300px;
  font-size: 150px;
  margin: 0;
  color: #7c9aab;
}
.description:hover{
  cursor: pointer;
}
</style>
