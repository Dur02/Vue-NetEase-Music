<template>
  <div class="mod_artist">
    <p>
      {{artist.name}}
      <span v-if="artist.alias" v-for="item of artist.alias">
        <span>
          {{item}}&nbsp;
        </span>
      </span>
      <span v-if="artist.transNames" v-for="item of artist.transNames">
        <span>
          {{item}}&nbsp;
        </span>
      </span>
      <el-button class="sub_btn" v-if="loginOrNot" type="primary" @click="arSub">{{btnContent}}</el-button>
    </p>
    <div class="mod_pic">
      <img :src="picUrl" alt="加载失败" class="artist_pic">
    </div>
  </div>
</template>

<script>
import {arSub, arSublist, artist, getLoginStatus, mvSUb, mvSublist, userPlaylist} from "@/plugin/axios";
import {ElMessage} from "element-plus";

export default {
  name: "artistBar",
  data () {
    return{
      picUrl:"",
      artist:"",
      btnContent:"收藏",
      loginOrNot:false
    }
  },
  methods:{
    arSub(){
      if (this.btnContent === "收藏"){
        arSub(1,this.$route.query.id)
            .then(res=>{
              console.log(res)
              if (res.data.code === 200){
                this.btnContent = "取消收藏"
              }else {
                ElMessage(res.data.message)
              }
            })
      }else {
        arSub(0,this.$route.query.id)
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
  },
  beforeMount() {
    getLoginStatus()
        .then(res=>{
          // console.log(res)
          if (res.data.data.account !== null){
            this.loginOrNot = true
            this.uid = res.data.data.account.id
            arSublist()
                .then(res=>{
                  console.log(res)
                  const arr = res.data.data
                  arr.map(
                      (item)=>{
                        if (item.id === parseInt(this.$route.query.id)){
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
    artist(this.$route.query.id)
    .then(res=>{
      this.artist = res.data.artist
      this.picUrl = this.artist.picUrl + "?param120y120"
      // console.log(this.artist)
    })
    .catch(err=>{
      console.log(err)
    })
  }
}
</script>

<style scoped>
.mod_artist{
  position: relative;
  /*width: 65%;*/
  /*background-color: #7c9aab;*/
  /*margin: 0 auto;*/
}
.mod_artist p{
  /*font-weight: bold;*/
  font-size: 27px;
  margin: 0;
  padding-top: 14px;
  padding-left: 20px;
}
.mod_artist p span{
  font-size: 16px;
  color: #666666;
}
.mod_pic{
  text-align: center;
  margin-top: 10px;
}
.sub_btn{
  float: right;
  margin-right: 20px;
}
.artist_pic{
  width: 405px;
  height: 328px;
  border: 1px solid #d5d5d5;
  /*width: 810px;*/
  /*height: 656px;*/
  /*原宽高 1080 877*/
}
</style>
