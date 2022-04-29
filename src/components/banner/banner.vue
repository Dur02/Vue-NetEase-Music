<template>
  <div class="mod_section">
    <div class="mod_title">
      <el-carousel trigger="click" height="280px" type="card">
        <el-carousel-item v-for="(item,index) in bannerList" :key="index" @click="toAdd(item)">
<!--          <h2>{{index}}</h2>-->
          <img :src="getUrl(item)" alt="加载失败" style="width: 700px" >
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import {banner, songDetail, songUrl} from "@/plugin/axios";
import {ElMessage} from "element-plus";

export default {
  name: "banner",
  data() {
    return{
      bannerList:[],
      songs:[],
      songUrl:[],
    }
  },
  methods:{
    getUrl (item) {
      // console.log(url)
      return item.imageUrl + "?imageView&quality=89"
    },
    async toAdd(item) {
      switch (item.targetType) {
        case 1:
          await songUrl(item.targetId)
              .then(res => {
                // console.log(res)
                this.songUrl = res.data.data
              })
          await songDetail(item.targetId)
              .then(res => {
                // console.log(res)
                this.songs = res.data.songs
              })
          //等上方两个异步函数执行完再commit才有数据
          this.$store.commit('addSong',this.songUrl)
          this.$store.commit('markSong',this.songs[0].id)
          this.$store.commit('insertList',this.songs)
          this.$store.commit('playOrStop',true)
          this.$store.commit('change_isPersonalFm',false)
          break
        case 3000:  //专辑
          if (item.typeTitle === "数字专辑"){
            const id = item.url.split('=')[1]
            await this.$router.push({path: '/Album', query: {id: id}})
          }else if(item.typeTitle === "独家策划"){
            ElMessage.warning('暂不支持此种类型，正在为你创建新窗口打开')
            setTimeout(
                ()=>{
                  window.open(item.url, '_blank')
                },
                1000
            )
          }
          break
        default:
          ElMessage.error('暂不支持此种类型')
          break
      }
    }
  },
  beforeCreate() {
    banner()
    .then(res=>{
      console.log(res)
      this.bannerList = res.data.banners
      // console.log(this.bannerList)
    })
    .catch(err=>{
      console.log(err)
    })
  }
}
</script>

<style scoped>
.mod_section{
  min-width: 1300px;
  width: 98%;
  margin: 0 auto;
  position: relative;
  display: flex;
  justify-content: space-around;
  /*margin-top: 20px;*/
  /*background: #296fc7;*/
  /*background-image: linear-gradient(#f2f2f2,#fafafa);*/
}
.mod_title{
  width: 100%;
}
</style>
