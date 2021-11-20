<template>
  <div class="mod_section">
    <div class="mod_title">
      <el-carousel height="280px" trigger="click" type="card">
        <el-carousel-item v-for="item in bannerList" :key="item">
          <img :src="getUrl(item)" style="width: 700px" @click="toAdd(item.url)">
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
      let url = item.imageUrl+"?param=500y500"
      // console.log(url)
      return url
    },
    toAdd (url) {
      //api未必有url，注意数据中的encodeId，之后处理
      // window.open(url,'_blank')
    }
  },
  beforeCreate() {
    banner()
    .then(res=>{
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
  position: relative;
  z-index: 1;
  /*margin-top: 20px;*/
  /*background-image: linear-gradient(#f2f2f2,#fafafa);*/
}
.mod_title{
  margin: 0 3%;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

</style>