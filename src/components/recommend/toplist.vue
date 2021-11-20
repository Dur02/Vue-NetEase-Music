<template>
  <div class="mod_section">
    <div class="mod_title">
      <h1>排行榜</h1>
    </div>
    <div class="mod_index">
      <div class="mod_list" v-for="(item,index) of toplist" :key="index">
        <img :src="item.coverImgUrl">
        <div class="list_rank">
          <div v-for="(item2,index) in item.tracks">
            <p class="rank_song">{{index+1}}.{{item2.first}}</p>
            <p class="rank_artist">&nbsp;&nbsp;&nbsp;{{item2.second}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {topListDetail} from "@/plugin/axios";
export default {
  name: "toplist",
  data () {
    return{
      toplist:[]
    }
  },
  beforeCreate() {
    topListDetail()
    .then(res=>{
      this.toplist = res.data.list.slice(0,4)
      // console.log(this.toplist)
    })
    .catch(err=>{
      console.log(err)
    })
  }
}
</script>

<style scoped>
.mod_section{
  background-image: linear-gradient(#f2f2f2,#fafafa);
  /*height: 500px;*/
  min-width: 1300px;
  position: relative;
  /*z-index: -1;*/
  /*background-color: #0077aa;*/
  /*background-color: red;*/
}
.mod_title{
  margin: 0 auto;
  width: 65%;
  display: flex;
}
.mod_index{
  /*height: 500px;*/
  /*background-color: aquamarine;*/
  width: 65%;
  margin: 0 auto;
  display: flex;
}
.mod_list{
  width: 20%;
  margin: 0 auto;
}
.list_rank{
  height: 250px;
  /*background-color: aqua;*/
  border: 1px solid #7c9aab;
  margin: 0 auto;
  position: relative;
  bottom: 5px;
  font-size: 14px;
  overflow: hidden;
}
.rank_song,.rank_artist{
  margin-left: 40px;
}
.rank_artist{
  color: #888888;
}
.mod_list img{
  width: 100%;
}
.mod_title h1{
  /*font-size: px;*/
  margin: 30px auto 10px auto;
  /*border: 1px solid #404040;*/
  font-family: "微軟正黑體 Light", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;
}
</style>