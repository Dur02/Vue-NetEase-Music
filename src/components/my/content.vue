<template>
  <div class="content">
    <div
        class="arSub"
        key="item.id"
        v-for="(item,index) of arSublist"
        v-if="type === 1"
    >
      <el-avatar class="avatar" :src="getUrl(item)" :size="150" alt="加载失败" @click="getArtistTop(item.id)"></el-avatar>
      <div class="inf">
        <p class="artists" @click="getArtistTop(item.id)">{{item.name}}</p>
        <p style="color: #6d6d6d">{{item.albumSize}}张专辑</p>
        <p style="color: #6d6d6d">{{item.mvSize}}个MV</p>
      </div>
    </div>
    <div
        class="mvSub"
        v-if="type === 2"
        key="item.id"
        v-for="(item,index) of mvSublist"
    >
      <div class="mv_pic">
        <img :src="getUrl(item)" alt="加载失败" @click="toMvDetail(item.vid)">
      </div>
      <p @click="toMvDetail(item.id)">{{item.title}}</p>
      <p>
        <span v-for="(item2,index) in item.creator" :key="item2.id" class="name">
          <span class="artists" @click="getArtistTop(item2.userId)">
            {{item2.userName}}
          </span>
          <span v-if="index+1 !== item.creator.length">/</span>
        </span>
      </p>
    </div>
  </div>
  <t_content v-if="type === 3" :id="id"/>
</template>

<script>
import t_content from "@/components/home/toplist/content";
import {arSublist, mvSublist} from "@/plugin/axios";

export default {
  name: "content",
  components:{t_content},
  data(){
    return{
      arSublist:[],
      mvSublist:[],
    }
  },
  props:{
    type:Number,
    id:Number,
  },
  methods:{
    getUrl (item) {
      // console.log(url)
      if (item.img1v1Url){
        return item.img1v1Url + "?param=150y150"
      }else {
        return item.coverUrl + "?param=150y150"
      }
    },
    getArtistTop (id) {
      // console.log(id)
      this.$router.push({path:'/Artist',query:{id:id}})
    },
    toMvDetail(id){
      // console.log(id)
      this.$router.push({path:'/Mv',query:{id:id}})
    }
  },
  watch:{
    type:function (newVal,oldVal){
      if (this.type === 1){
        arSublist()
          .then(res=>{
            this.arSublist = res.data.data
          })
          .catch(err=>{
            console.log(err)
          })
      }else if (this.type === 2){
        mvSublist()
          .then(res=>{
            console.log(res)
            this.mvSublist = res.data.data
          })
          .catch(err=>{
            console.log(err)
          })
      }
    }
  },
}
</script>

<style scoped>
.content{
  float: left;
  width: 80%;
  margin-top: 20px;
  /*overflow: hidden;*/
}
.arSub{
  display: inline-block;
  width: 25%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.avatar{
  margin: 10px 60px;
  cursor: pointer;
}
.inf{
  text-align: center;
  /*margin: 10px 80px;*/
  font-size: 14px;
}
.mvSub{
  display: inline-block;
  width: 25%;
}
.mv_pic{
  width: 180px;
  height: 180px;
  margin: 0 auto;
  overflow: hidden;
}
.mvSub img{
  width: 100%;
  height: 100%;
  margin: 0 auto ;
  transition: transform .75s;
  -webkit-transition: transform .75s;
}
.mvSub img:hover{
  transform: scale(1.1) translateZ(0);
  -webkit-transform: scale(1.1) translateZ(0);
}
.mvSub p{
  width: 150px;
  text-align: center;
  font-size: 12px;
  margin: 9px auto;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.artists:hover{
  color: #296fc7;
  text-decoration: underline;
  cursor: pointer;
}
</style>
