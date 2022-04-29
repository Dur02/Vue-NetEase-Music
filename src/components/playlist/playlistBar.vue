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
          <span class="play_count">歌曲:{{playlist.trackCount}}</span>
          <span class="play_count">播放:&nbsp;<span>{{playlist.playCount}}</span>次</span>
        </div>
        <div class="tags">
          <el-tag v-for="item of tag" size="small" effect="dark" type="danger" style="margin-right: 10px">{{item}}</el-tag>
        </div>
        <el-button v-if="loginOrNot" @click="plSub" type="primary" plain>{{subTip}}</el-button>
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
import {getLoginStatus, playlistDetail, plSub, userPlaylist} from "@/plugin/axios";
import {formatDate} from "@/common/date";
import { ElMessage } from 'element-plus'

export default {
  name: "playlistBar",
  data() {
    return{
      id:this.$route.query.id,
      playlist:"",
      avatarUrl:"",
      nickname:"",
      createTime:"",
      tag:[],
      description:"暂无介绍",
      subTip:"收藏",
      loginOrNot:false
    }
  },
  methods:{
    getUrl (item) {
      // console.log(url)
      return item.coverImgUrl + "?param=180y180"
    },
    plSub(){
      plSub(this.subTip === "收藏"?1:2,this.id)
        .then(res=>{
          // console.log(res)
          if (res.data.code === 200){
            switch (this.subTip){
              case "收藏":
                this.subTip = "取消收藏"
                break
              case "取消收藏":
                this.subTip = "收藏"
                break
            }
          }else {
            ElMessage("发生错误，请稍后重试")
          }
        })
    }
  },
  beforeMount() {
    getLoginStatus()
        .then(res=>{
          // console.log(res)
          if (res.data.data.account !== null){
            this.loginOrNot = true
            this.uid = res.data.data.account.id
            userPlaylist(this.uid,1000,0) //做的是侧边栏，不方便做分页，先取1000，后续可加大或者改样式
                .then(res=>{
                  console.log(res)
                  for (let item of res.data.playlist){
                    if (item.id === parseInt(this.id)){
                      console.log(this.id)
                      this.subTip = "取消收藏"
                    }
                  }
                })
                .catch(err=>{
                  console.log(err)
                })
          }
        })
        .catch(err=>{
          console.log(err)
        })
    playlistDetail(this.id)
      .then(res=>{
        console.log(res)
        this.playlist = res.data.playlist
        this.nickname = this.playlist.creator.nickname
        this.avatarUrl = this.playlist.creator.avatarUrl
        this.tag = this.playlist.tags
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
  width: 70%;
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
  /*background-color: aqua;*/
  /*height: 40px;*/
}
.comment{
  width: 40px;
  height: 40px;
}
.nickname,.create_time,.play_count,.play_count{
  height: 40px;
  line-height: 40px;
  /*background-color: red;*/
  position: relative;
  color: #666666;
  bottom: 12px;
  left: 10px;
  margin-right: 20px;
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
.tags{
  margin: 10px 0;
}
.collapse{
  width: 100%;
}
.description{
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
