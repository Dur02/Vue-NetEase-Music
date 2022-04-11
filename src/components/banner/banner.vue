<template>
  <div class="mod_section">
    <div class="mod_title">
      <el-carousel trigger="click" height="280px" type="card">
        <el-carousel-item v-for="(item,index) in bannerList" :key="index">
<!--          <h2>{{index}}</h2>-->
          <img :src="getUrl(item)" alt="加载失败" style="width: 700px" @click="toAdd(item.url)">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import {banner} from "@/plugin/axios";

export default {
  name: "banner",
  data() {
    return{
      bannerList:[]
    }
  },
  methods:{
    getUrl (item) {
      // console.log(url)
      return item.imageUrl + "?param=500y500"
    },
    toAdd (url) {
      //api未必有url，注意数据中的encodeId，之后处理
      // window.open(url,'_blank')
    }
  },
  beforeCreate() {
    banner()
    .then(res=>{
      // console.log(res)
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
  /*min-width: 1300px;*/
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