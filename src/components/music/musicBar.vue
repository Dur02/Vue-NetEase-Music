<template>
  <div class="music_bar">
    <el-drawer
        v-model="drawer"
        direction="btt"
        :before-close="drawerClose"
        size='100%'
        :z-index="90"
        :with-header="false"
    >
      <i class="iconfont icon-guanbi_o close" @click="drawerClose" style="z-index: 99"></i>
      <div class="song_section">
        <div class="bg2" :style="bg"></div>
        <div class="nickname">
          <div class="info">
            <h2>{{name}}</h2>
            <!--        此处不知道为何，直接使用this.songs[0].name可以正常页面显示，但控制台报错，下方的ar也是一样的情况-->
            <!--        推断是proxy中的数组数据直接使用会导致此错误，playlistBar中也有此情况出现，目前直接把数据存入data中解决问题，原因待查明-->
            <img :src="imgUrl" alt="加载失败">
            <p v-for="(item,index) in this.ar" :key="item.id" class="name" @click="toArtist(item.id)">
              {{item.name}}
            </p>
          </div>
          <lyric :dt = this.dt v-if="flag"></lyric>
        </div>
      </div>
      <div>
        <song-comment></song-comment>
      </div>
      <div style="width: 100%;height: 100px;"></div>
    </el-drawer>
  </div>
</template>

<script>
import {songDetail} from "@/plugin/axios";
import Lyric from "@/components/music/lyric";
import SongComment from "@/components/comment/song-comment";
export default {
  name: "musicBar",
  components: {SongComment, Lyric},
  data () {
    return {
      songs:[],
      bg:"",
      imgUrl:"",
      name:"",
      ar:[],
      dt:-1,
      flag:false,
      drawer:this.$store.state.lyricFlag
    }
  },
  methods:{
    toArtist(id){
      this.$router.push({path:'/Artist',query:{id:id}})
    },
    drawerClose(){
      this.$store.commit("set_lyricFlag",false)
    },
  },
  watch:{
    '$store.state.lyricFlag':function () {
      this.drawer = this.$store.state.lyricFlag
    },
    '$store.state.userPlaylist':function () {
      this.userPlaylist = this.$store.state.userPlaylist
    },
    '$store.state.playing':function () {
      songDetail(this.$store.state.playing)
          .then(res=>{
            // console.log(res)
            // console.log(this.$store.state.playing)
            this.imgUrl = res.data.songs[0].al.picUrl + "?imageView&quality=20"
            this.bg = `background-image: url(\"${this.imgUrl}\");`
            this.songs = res.data.songs
            this.name =this.songs[0].name
            this.ar = this.songs[0].ar
            this.dt = this.songs[0].dt
            if (this.dt !== -1) {  //利用标志解决元素构建时不能先把值传入lyric组件再构建lyric组件的问题
              this.flag = true
            }
          })
          .catch(err=>{
            console.log(err)
          })
    }
  },
}
</script>

<style scoped>
.music_bar{
  width: 100%;
  margin-top: 40px;
  margin-bottom: 100px;
}
.song_section{
  position: relative;
}
.bg2{
  /*background-color: rgb(255, 255, 255);*/
  width:100%;
  height:90vh;
  z-index: -1;
  background-size: cover;
  background-repeat: no-repeat;
  filter: blur(40px);
}
.nickname{
  z-index: 1;
  justify-content: space-around;
  position: absolute;
  left: 18%;
  top: 10%;
}
.info{
  /*flex: 1;*/
  width: 300px;
  float: left;
  /*background-color: aquamarine;*/
  /*margin-left: 200px;*/
  margin-top: 0;
  text-align: center;
}
.info img{
  width: 250px;
  height: 250px;
  border: 1px solid #666666;
}
.info h2 , .info p{
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
}
.name:hover{
  color: #296fc7;
  text-decoration: underline;
}
.close{
  position: sticky;
  top: 0;
  left: 100%;
  font-size: 26px;
}
</style>
