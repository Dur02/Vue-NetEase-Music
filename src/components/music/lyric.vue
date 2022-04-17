<template>
  <div class="mod_section">
    <ul class="lyric" v-show="isShowMusicList" ref="lyric">
      <li :class="{each:true, choose: (index === lyricIndex)}"
          v-for="(item, key, index) in currentMusicLyric"
          :key="key">
        {{item}}
      </li>
    </ul>
  </div>
</template>

<script>
import {lyric, songUrl} from "@/plugin/axios";
export default {
  name: "lyric",
  data () {
    return{
      currentMusicLyric:{},
      lyricIndex:-1,
      isShowMusicList:true,
      value:-1,
      lyricArr:[],
      flag:0
    }
  },
  inject:['reload'],
  props:{
    dt:Number
  },
  beforeMount() {
    lyric(this.$store.state.playing)  //获取歌词并修改格式
        .then(res=>{
          // console.log(res)
          let lyricArr = res.data.lrc.lyric.split('[').slice(1); // 先以[进行分割
          let lrcObj = {};
          lyricArr.forEach(item => {
            let arr = item.split(']');	// 再分割右括号
            // 时间换算成秒
            let m = parseInt(arr[0].split(':')[0])
            let s = parseInt(arr[0].split(':')[1])
            arr[0] = m*60 + s;
            if (arr[1] !== '\n') { // 去除歌词中的换行符
              lrcObj[arr[0]] = arr[1];
            }
          })
          // 存储数据
          this.currentMusicLyric = lrcObj;
          // console.log(this.currentMusicLyric)
          for (let key in this.currentMusicLyric) {
            // key表示歌词对象中的时间，如果key等于歌曲进度value，改变当前歌词进度		lyricIndex
            this.lyricArr.push(key)
          }
          // console.log(this.lyricArr)
        })
        .catch(err=>{
          console.log(err)
          this.isShowMusicList = false
        })
  },
  watch :{
    '$store.state.playing':function () {
      // console.log(this.dt)
      this.$refs.lyric.scrollTop = 0
      this.flag = 0
      this.lyricArr = []  //切换歌曲时，把所有歌词状态的标志清空，
      this.lyricIndex = -1  //否则切换后原循环还在进行，歌词会上下跳动，对不上旋律
      lyric(this.$store.state.playing)  //获取歌词并修改格式
          .then(res=>{
            console.log(res)
            let lyricArr = res.data.lrc.lyric.split('[').slice(1); // 先以[进行分割
            let lrcObj = {};
            lyricArr.forEach(item => {
              let arr = item.split(']');	// 再分割右括号
              // 时间换算成秒
              let m = parseInt(arr[0].split(':')[0])
              let s = parseInt(arr[0].split(':')[1])
              // let ms = parseInt(arr[0].split(':')[2])
              arr[0] = m*60 + s ;
              if (arr[1] !== '\n') { // 去除歌词中的换行符
                lrcObj[arr[0]] = arr[1];
              }
            })
            // 存储数据
            this.currentMusicLyric = lrcObj;
            // console.log(this.currentMusicLyric)
            for (let key in this.currentMusicLyric) {
              // key表示歌词对象中的时间，如果key等于歌曲进度value，改变当前歌词进度		lyricIndex
              this.lyricArr.push(key)
            }
            // console.log(this.lyricArr)
          })
          .catch(err=>{
            console.log(err)
            this.isShowMusicList = false
          })
    },
    '$store.state.value':function () {  //监听歌曲播放进度滚动歌词
      // console.log("index",this.lyricIndex)
      // console.log("flag",this.flag)
      for (this.flag =0;this.flag<=this.lyricArr.length;this.flag++){
        // console.log("flag",this.flag)
        // console.log("value",this.$store.state.value.toFixed(2))
        if (this.$store.state.value.toFixed(0) == null){
          return
        }
        if (this.$store.state.value.toFixed(0) === this.lyricArr[this.flag]){
          this.lyricIndex = this.flag
          if (this.lyricIndex > 5) {
            this.$refs.lyric.scrollTop = 28*(this.lyricIndex - 5);
          }
        }
      }
    }
  }

}
</script>

<style scoped>
.mod_section{
  /*flex: 5;*/
  float: left;
}
.lyric {
  width: 700px;
  height: 500px;
  background-color: #000;
  /* 滚动条*/
  overflow: auto;
  color: #ddd;
  font-size: 10px;
  font-weight: normal;
  padding: 5px 10px;
  /*border: 1px solid #000;*/
  border-left: none;
}
.each {
  height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /*border: 1px solid #000;*/
  line-height: 30px;
  text-align: center;
  list-style: none;
}
.choose {
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  color: #296fc7;
}
/* 修改滚动条样式*/
.lyric::-webkit-scrollbar {
  width: 3px;
  height: 1px;
}
/*滑块部分*/
.lyric::-webkit-scrollbar-thumb {
  background-color: #eee;
}
/*轨道部分*/
.lyric::-webkit-scrollbar-track {
  background-color: #333;
}
</style>