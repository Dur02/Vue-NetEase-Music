<template>
  <div class="sider">
    <el-menu
        class="el-menu-vertical-demo"
        default-active="3-0"
    >
      <el-menu-item index="1" @click="chooseFun(1,0)">
        <span>我的歌手({{subCount.artistCount}})</span>
      </el-menu-item>

      <el-menu-item index="2" @click="chooseFun(2,0)">
        <span>我的视频({{subCount.mvCount}})</span>
      </el-menu-item>

<!--      <el-menu-item index="3">-->
<!--        <span>我的电台({{subCount.mvCount}}})</span>-->
<!--      </el-menu-item>-->

      <el-sub-menu index="3">
        <template #title>
          <span>创建的歌单({{subCount.createdPlaylistCount}})</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
              v-for="(item,index) of selfCreate"
              :index="'3-'+String(index)"
              class="playlist-inf"
              @click="chooseFun(3,item.id)"
          >
            <img :src="getUrl(item)" alt="加载失败">
            <div class="special">
              <p class="title">{{item.name}}</p>
              <p class="frequency">{{item.trackCount}}首</p>
            </div>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>

      <el-sub-menu index="4">
        <template #title>
          <span>收藏的歌单({{subCount.subPlaylistCount}})</span>
        </template>
        <el-menu-item-group style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
          <el-menu-item
              v-for="(item,index) of collection"
              :index="'4-'+String(index)"
              class="playlist-inf"
              @click="chooseFun(3,item.id)"
          >
            <img :src="getUrl(item)" alt="加载失败">
            <div class="special">
              <p class="title">{{item.name}}</p>
              <p class="frequency">{{item.trackCount}}首 By {{item.creator.nickname}}</p>
            </div>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script>
import {userPlaylist, userSubCount} from "@/plugin/axios";

export default {
  name: "sider",
  data(){
    return {
      subCount:{},
      selfCreate:[],
      collection:[],
    }
  },
  props:{
    uid:Number
  },
  methods:{
    getUrl(item){
      // console.log(url)
      return item.coverImgUrl + "?param=40y40"
    },
    chooseFun(type,id){
      // console.log(type,id)
      this.$emit('childrenValue',type,id)
    },
  },
  beforeMount() {
    userSubCount()
      .then(res=>{
        // console.log(res)
        this.subCount = res.data
      })
      .catch(err=>{
        console.log(err)
      })
    userPlaylist(this.uid,100,0) //做的是侧边栏，不方便做分页，先取100，后续可加大或者改样式
      .then(res=>{
        // console.log(res)
        this.selfCreate = res.data.playlist.filter(
            (item)=> item.creator.userId === this.uid
        )
        this.collection = res.data.playlist.filter(
            (item)=> item.creator.userId !== this.uid
        )
        this.chooseFun(3,res.data.playlist[0].id)
      })
      .catch(err=>{
        console.log(err)
      })
  },
}
</script>

<style scoped>
.sider{
  float: left;
  width: 18%;
  background-color: #f6f6f6;
}
.special{
  /*background: #7c9aab;*/
  display: inline-block;
  /*height: 60px;*/
  width: 100%;
  font-size: 13px;
  /*margin-bottom: 16px;*/
}
.title , .frequency{
  /*margin: 5px 0 0 8px;*/
  /*background: red;*/
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0 0 0 5px;
  height: 20px;
  line-height: 20px;
}
.frequency{
  color: #6d6d6d;
}
</style>
