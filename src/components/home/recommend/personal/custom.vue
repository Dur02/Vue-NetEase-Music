<template>
  <div class="mod_section" v-if="status">
    <div class="personal_fm">
      <div class="personal_fm_center">
        <div>
          <h3>私人Fm</h3>
          <div class="fun_area">
            <p class="description">{{date}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="recommend_songs">
      <div class="recommend_songs_center">
        <div>
          <h3>每日歌曲推荐</h3>
          <div class="bg" @click="toCustomSong" :style="bg">
            <i
                class="iconfont description"
                :class="'icon-rili'+(date-1)"
                @click="toCustomSong"
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
  recommendSongs, songDetail
} from "@/plugin/axios";

export default {
  name: "personal",
  data(){
    return {
      playlist:[],
      status:false,
      date:0,
      id:-1,
      imgUrl:"",
      bg:""
    }
  },
  methods:{
    toCustomSong(){
      this.$router.push('/Recommend_Song')
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
                console.log(res)
                this.id = res.data.data.dailySongs[0].id
                songDetail(this.id)
                  .then(res=>{
                    this.imgUrl = res.data.songs[0].al.picUrl + "?param=100y100"
                    this.bg = `background-image: url(\"${this.imgUrl}\");`
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
.bg{
  position: relative;
  height: 300px;
  width: 70%;
  margin: 0 auto;
}
.description{
  height: 300px;
  line-height:300px;
  font-size: 150px;
  margin: 0;
  color: #7c9aab;
  background-size: cover;
  background-repeat: no-repeat;
}
.description:hover{
  cursor: pointer;
}
</style>
