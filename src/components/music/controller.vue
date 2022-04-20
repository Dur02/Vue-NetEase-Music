<template>
  <div class="mod_section">
    <audio class="a"
           :src="songUrl"
           @timeupdate="timeUpdate"
           ref="audioRef"
           autoplay="autoplay"
           style="position: fixed;top: 0">
    </audio>

    <div class="controller">

      <div class="music_pic">
        <img :src=picUrl alt="" v-if="this.picUrl !== ''" @click="openLyric">
      </div>

      <div class="play_control">
        <span class="iconfont icon-shangyishou" v-if="this.$store.state.isPersonalFm === false" @click="changeSong(2)"></span>
        <span class="iconfont icon-zanting" v-if="isPlay" @click="playOrStop"></span>
        <span class="iconfont icon-bofang" v-else @click="playOrStop"></span>
        <span class="iconfont icon-xiayishou" @click="changeSong(1)"></span>
      </div>

      <div class="nowTime">{{playerNowTime}}</div>
      <div class="progress">
        <div class="music_inf">
          <p>
            <span class="music_title">
              {{musicInf.name}}
            </span>
            <span class="artists">
              <span v-for="(item,index) in musicInf.ar" :key="item.id" class="name" @click="toArtist(item.id)">
                {{item.name}}
                <span v-if="index+1 !== musicInf.ar.length">/</span>
              </span>
            </span>
          </p>

        </div>

        <el-slider @change="moveTransFormWidth"
                   :format-tooltip="formatTooltip"
                   v-model="transFromWidth"></el-slider>
      </div>
      <div class="allTime">{{playerAllTime}}</div>


      <div class="volume">
        <span v-if="volumeFlag" class="iconfont icon-shengyinfangda" @click="silentOrNot(0)"></span>
        <span v-else class="iconfont icon-jingyin" @click="silentOrNot(1)"></span>
      </div>
      <div class="volume_slider">
        <el-slider @change="moveTransFormVolume"
                   v-model="transFormVolume"
                   :show-tooltip="false"
                   height="5px"
        />
      </div>

      <div class="other" v-if="this.$store.state.isPersonalFm === false">
        <span @click="changePlayerMode(2)"
              v-if="playerMode === 1"
              class="iconfont icon-suijibofang"></span>
        <span @click="changePlayerMode(0)"
              v-else-if="playerMode === 2"
              class="iconfont icon-danquxunhuan"></span>
        <span @click="changePlayerMode(1)"
              v-else
              class="iconfont icon-23_shunxubofang"></span>
        <span class="iconfont icon-yinleliebiao" @click="openDrawer"></span>
      </div>
    </div>
  </div>
</template>

<script>
import {formatSecondTime} from "@/common/date";
import {songDetail} from "@/plugin/axios";

export default {
  name: "controller",
  data () {
    return{
      songUrl:"",
      transFromWidth:0,
      transFormVolume:100,
      isPlay:this.$store.state.isPlay,
      playerMode:0,
      playerAllTime:"00:00",
      playerNowTime:"00:00",
      volumeFlag:1,
      playing:-1,
      musicInf:{},
      picUrl:"",
    }
  },
  beforeMount() {
    if (this.$store.state.songUrl.length !== 0){
      // console.log(this.$store.state.songUrl.length)
      this.songUrl = this.$store.state.songUrl.filter(element => element.id === this.$store.state.playing)[0].url
      // console.log(this.songUrl)
    }
    this.playing = this.$store.state.playing
    songDetail(this.playing)
        .then(res=>{
          // console.log(res)
          this.musicInf = res.data.songs[0]
          this.picUrl = this.musicInf.al.picUrl + "?param=80y80"
        })
        .catch(err=>{
          console.log(err)
        })
    // console.log(this.playing)
  },
  methods: {
    playOrStop() {
      this.isPlay = !this.isPlay
      // this.isPlay ? this.$refs.audioRef.play() : this.$refs.audioRef.pause();
      this.$store.commit('playOrStop',this.isPlay)

    },
    timeUpdate() {
      // console.log(this.$refs.audioRef.currentTime)
      if (this.$refs.audioRef.currentTime != null) {
        // this.$emit("timeupdate", this.$refs.audioRef.currentTime)
        this.$store.commit("change_value",this.$refs.audioRef.currentTime)
      }
      this.playerAllTime = formatSecondTime(
          this.$refs.audioRef.duration
      )
      //获取当前播放时间戳
      this.playerNowTime = formatSecondTime(
          this.$refs.audioRef.currentTime
      )
      this.transFromWidth =
          (this.$refs.audioRef.currentTime / this.$refs.audioRef.duration) * 100;
      if (this.$refs.audioRef.currentTime === this.$refs.audioRef.duration) {
        if (this.playerMode === 2 || this.$store.state.userPlaylist.length === 1){
          this.$refs.audioRef.currentTime = 0
          this.$store.commit('playOrStop',true)
          this.$refs.audioRef.play()
        }else {
          this.changeSong(1)
        }
      }
    },
    changeSong(num){
      switch (num){
        case 1: //下一首
          if (this.$store.state.isPersonalFm === true){
            // console.log(this.$store.state.isPersonalFm)
            this.$store.commit('fmNextSong')
            break;
          }else {
            this.$store.commit('changeSong',1)
            break;
          }
          break;
        case 2:  //上一首
          this.$store.commit('changeSong',-1)
          break;
      }
      this.$store.commit('playOrStop',true)
    },
    moveTransFormWidth(val) {
      // val 拖拽条进度
      // console.log(val)
      if (!val && !this.$store.state.playing) return;

      this.transFromWidth = val;
      if (this.transFromWidth !== val) return;
      this.$refs.audioRef.currentTime =
          (this.transFromWidth / 100) * this.$refs.audioRef.duration;
      this.playerNowTime = formatSecondTime(
          this.$refs.audioRef.currentTime
      );
    },
    formatTooltip(val) {
      if (!val || !this.$store.state.playing || !this.$refs.audioRef) return;
      const time = (val / 100) * this.$refs.audioRef.duration;
      return formatSecondTime(time);
    },
    moveTransFormVolume(val) {
      this.transFormVolume = val;
      this.$refs.audioRef.volume = val / 100;
      if (this.volumeFlag === 0) this.volumeFlag = 1
    },
    silentOrNot(num){
      switch (this.volumeFlag){
        case 0:
          this.volumeFlag = num
          this.$refs.audioRef.volume = this.transFormVolume / 100
          break
        case 1:
          this.volumeFlag = num
          this.$refs.audioRef.volume = 0
          break
      }
    },
    changePlayerMode(num) {
      this.playerMode = num
    },
    toArtist(id){
      this.$router.push({path:'/Artist',query:{id:id}})
    },
    openDrawer(){
      this.$store.commit("set_drawerFlag",true)
    },
    openLyric(){
      this.$store.commit("set_lyricFlag",true)
    }
  },
  watch:{
    '$store.state.playing':function (){  //监听vuex中数据变化使audio标签的地址动态变化
      if (this.$store.state.songUrl.length !== 0){
        // console.log(this.$store.state.songUrl.length)
        this.songUrl = this.$store.state.songUrl.filter(element => element.id === this.$store.state.playing)[0].url
        // console.log(this.songUrl)
      }
      this.playing = this.$store.state.playing
      songDetail(this.playing)
      .then(res=>{
        // console.log(res)
        this.musicInf = res.data.songs[0]
        this.picUrl = this.musicInf.al.picUrl + "?param=80y80"
      })
      .catch(err=>{
        console.log(err)
      })
      // console.log(this.playing)
    },
    //playerMode(newVal,oldVal)
    playerMode:function (newVal,oldVal) {
      this.$store.commit("changePlayerMode",newVal)
    },
    '$store.state.isPlay':function (){
      this.isPlay = this.$store.state.isPlay
      this.isPlay ? this.$refs.audioRef.play() : this.$refs.audioRef.pause();
    }
  }
}
</script>

<style scoped>
.mod_section{
  margin: 0 auto;
  width: 80%;
  text-align: center;
}
.controller{
  position: fixed;
  bottom: 0;
  left: 0;
  height: 80px;
  z-index: 999;
  width: 100%;
  background-color: #fff;
  border-top: 1px solid #e9e9e9;
  display: flex;
}
.music_pic {
  flex: 0.5;
}
.play_control{
  height: 100%;
  padding-top: 18px;
  flex:0.7;
}
.other , .volume{
  height: 100%;
  padding-top: 24px;
}
.play_control span , .other span ,.volume span{
  font-size: 32px;
  margin: 0 10px;
  vertical-align: middle;
}
.play_control .icon-bofang , .play_control .icon-zanting{
  font-size: 50px;
}
.progress *{
  /*padding-top: 0px;*/
  width: 100%;
  margin: 0 auto;
}
.music_inf{
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  height: 20px;
  margin-top: 2px;
}
.music_inf p {
  text-align: left;
}
.music_title{
  font-size: 15px;
}
.artists{
  margin-left: 20px;
}
.name:hover{
  color: #296fc7;
}
.nowTime , .allTime{
  flex: 0.3;
  padding-top: 30px;
}
.volume{
  /*background-color: #63a35c;*/
  flex: 0.2;
}
.volume_slider{
  padding-top: 22px;
  flex: 0.5;
  /*background-color: #0077aa;*/
}
.el-slider{
  --el-slider-button-size: 14px;
}
.progress{
  flex: 3;
}
.other{
  flex: 0.5;
}
.iconfont{
  cursor: pointer;
}
.iconfont:hover{
  color: #0077aa;
}
</style>
