<template>
  <div class="mod_section">
    <div class="mod_playlist">
      <div class="pic_block">
<!--        <img class="playlist_pic" :src="playlist.coverImgUrl"/>-->
        <img class="playlist_pic" :src="getUrl(playlist)" alt="加载失败"/>
      </div>
      <div class="playlist_inf">
        <div class="name">
          <p>{{playlist.name}}</p>
        </div>
        <div class="creator">
          <img class="comment" :src="avatarUrl" alt="加载失败"/>
          <span class="nickname">{{nickname}}</span>
          <span class="create_time">{{createTime}}创建</span>
          <span class="play_count">播放:&nbsp;<span>{{playlist.playCount}}</span>次</span>
        </div>
      </div>
    </div>
    <div class="mod_playlist">
      <div class="collapse">
        <el-collapse>
          <el-collapse-item title="介绍" name="1">
            <div class="description">
              {{description}}
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import {playlistDetail} from "@/plugin/axios";
import {formatDate} from "@/common/date";

export default {
  name: "playlistBar",
  data() {
    return{
      id:this.$route.query.id,
      playlist:"",
      avatarUrl:"",
      nickname:"",
      createTime:"",
      description:"暂无介绍"
    }
  },
  methods:{
    getUrl (item) {
      // console.log(url)
      return item.coverImgUrl + "?param=180y180"
    }
  },
  beforeMount() {
    playlistDetail(this.id)
    .then(res=>{
      // console.log(res)
      this.playlist = res.data.playlist
      this.nickname = this.playlist.creator.nickname
      this.avatarUrl = this.playlist.creator.avatarUrl
      if (this.playlist.description !== ""){
        this.description = this.playlist.description
      }
      this.createTime = this.playlist.createTime
      let date = new Date(this.createTime)
      this.createTime = formatDate(date,'yyyy年MM月dd日')
      // this.createTime = new Date(parseInt(this.createTime) ).toLocaleString().split(' ')[0].replace('/', '年').replace('/', '月')+'日'
    })
    .catch(err=>{
      console.log(err)
    })
  }
}
</script>

<style scoped>
.mod_section{
  background-image: linear-gradient(#f2f2f2,#f6f6f6);
  min-width: 1300px;
  position: relative;
}
.mod_playlist{
  width: 65%;
  /*background-color: aqua;*/
  margin: 0 auto;
  background-color: #fff;
  border-left: 1px solid #d5d5d5;
  border-right: 1px solid #d5d5d5;
  border-top: 1px solid #d5d5d5;
  display: flex;
}
.pic_block{
  width: 300px;
  height: 300px;
  /*background-color: red;*/
}
.playlist_pic{
  width: 250px;
  height: 250px;
  margin: 20px 20px;
}
.name{
  /*background-color: red;*/
  text-align: center;
}
.name p{
  font-size: 23px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /*font-weight: bold;*/
}
.playlist_inf{
  width: calc(100% - 300px);
  /*background-color: aquamarine;*/
}
.creator{
  /*background-color: aquamarine;*/
  height: 40px;
}
.comment{
  width: 40px;
  height: 40px;
}
.nickname,.create_time,.play_count{
  height: 40px;
  line-height: 40px;
  /*background-color: red;*/
  position: relative;
  color: #666666;
  bottom: 12px;
  left: 10px;
  margin-right: 50px;
}
/*.create_time{*/
/*  left: 50px;*/
/*}*/
/*.play_count{*/
/*  left: 100px;*/
/*}*/
.play_count span{
  color: #c20c0c;
}
.collapse{
  width: 100%;
}
.description{
  /*background-color: aquamarine;*/
  /*height: 168px;*/
  /*overflow: hidden;*/
  /*white-space: nowrap;*/
  /*text-overflow: ellipsis;*/
  white-space: pre-wrap;
  word-break: break-all;
}
/*.description p{*/
/*  white-space: pre-wrap;     !*防止描述中带有回车，使用white-space: pre-wrap;并用v-html输出就可带回车输出正确的内容*!*/
/*  font-size: 14px;*/
/*  color: #666;*/
/*  !*background-color: red;*!*/
/*  overflow: hidden;*/
/*  text-overflow: ellipsis;*/
/*}*/
</style>