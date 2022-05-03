<template>
  <div class="mod_mv">
    <p class="icon-MV iconfont" style="color: #7c9aab">
      <span style="color: #000">{{mvDetail.name}}</span>
      <span @click="toArtist(mvDetail.artistId)">{{mvDetail.artistName}}</span>
      <el-button class="sub_btn" v-if="loginOrNot" type="primary" @click="mvSub">{{btnContent}}</el-button>
    </p>
    <video class="mv_play" :src="mvUrl" controls="controls" autoplay="autoplay" height="500" width="700">
      您的浏览器不支持 video 标签。
    </video>
  </div>
  <div class="mod_desc">
    <div class="collapse">
      <el-collapse>
        <el-collapse-item title="MV简介" name="1">
          <div class="description">
            <p>发布时间:  {{mvDetail.publishTime}}</p>
            <p>播放次数:  {{playCount}}</p>
            <p v-if="mvDetail.desc">{{mvDetail.desc}}</p>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import {getLoginStatus, mvDetail, mvSUb, mvSublist, mvUrl, userPlaylist} from "@/plugin/axios";
import {numberFix} from "@/common/date"
import { ElMessage } from 'element-plus'

export default {
  name: "mvBar",
  data () {
    return{
      mvDetail:"",
      mvUrl:"",
      playCount:"",
      btnContent:"收藏",
      loginOrNot:false,
    }
  },
  methods:{
    toArtist(id){
      this.$router.push({path:'/Artist',query:{id:id}})
    },
    mvSub(){
      if (this.btnContent === "收藏"){
        mvSUb(1,this.$route.query.id)
          .then(res=>{
            console.log(res)
            if (res.data.code === 200){
              this.btnContent = "取消收藏"
            }else {
              ElMessage(res.data.message)
            }
          })
      }else {
        mvSUb(0,this.$route.query.id)
            .then(res=>{
              console.log(res)
              if (res.data.code === 200){
                this.btnContent = "收藏"
              }else {
                ElMessage(res.data.msg)
              }
            })
      }
    }
    // stopMV(){
    //   this.$store.commit('mvStatus',false)
    // }
  },
  beforeMount() {
    getLoginStatus()
        .then(res=>{
          // console.log(res)
          if (res.data.data.account !== null){
            this.loginOrNot = true
            this.uid = res.data.data.account.id
            mvSublist()
                .then(res=>{
                  console.log(res)
                  const arr = res.data.data
                  arr.map(
                      (item)=>{
                        if (item.vid === this.$route.query.id){
                          this.btnContent = "取消收藏"
                        }
                      }
                  )
                })
                .catch(err=>{
                  console.log(err)
                })
          }
        })
        .catch(err=>{
          console.log(err)
        })
    // console.log(this.$route.query.id)
    mvDetail(this.$route.query.id)
      .then(res=>{
        // console.log(res)
        this.mvDetail = res.data.data
        // console.log(this.mvDetail)
        let num = this.mvDetail.playCount
        this.playCount = numberFix(num)
        // console.log(this.playCount)
        mvUrl(this.$route.query.id)
          .then(res=>{
            console.log(res)
            this.mvUrl = res.data.data.url
            // console.log(this.mvUrl)
          })
        .catch(err=>{
          console.log(err)
        })
      })
      .catch(err=>{
        console.log(err)
      })
  }
}
</script>

<style scoped>
.mod_mv{
  position: relative;
  /*width: 65%;*/
  /*background-color: #7c9aab;*/
  /*margin: 0 auto;*/
}
.mod_mv p , .mod_mv p span:nth-child(1){
  /*font-weight: bold;*/
  font-size: 27px;
  margin: 0;
  padding-top: 14px;
  padding-left: 20px;
}
.mod_mv p span:nth-child(2){
  font-size: 16px;
  color: #666666;
  padding-left: 20px;
}
.mod_mv p span:nth-child(even):hover{
  color: #296fc7;
  text-decoration: underline;
}
.mv_play{
  width: 90%;
  height: 100%;
  /*border: 1px solid #000;*/
  padding-top: 10px;
  margin: 0 auto;
  overflow: hidden;
  display: block;
  clear: both;
}
.sub_btn{
  float: right;
  margin-right: 20px;
}
.description{
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
