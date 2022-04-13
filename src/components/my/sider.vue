<template>
  <div class="sider" @click="">
    <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
    >
      <el-menu-item index="1">
        <span>我的歌手({{subCount.artistCount}})</span>
      </el-menu-item>

      <el-menu-item index="2">
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
          <el-menu-item v-for="count in subCount.createdPlaylistCount" :index="'3-'+String(count)">{{count}}</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>

      <el-sub-menu index="4">
        <template #title>
          <span>收藏的歌单({{subCount.subPlaylistCount}})</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="count in subCount.subPlaylistCount" :index="'4-'+String(count)">{{count}}</el-menu-item>
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
      collection:[]
    }
  },
  props:{
    uid:Number
  },
  beforeMount() {
    userSubCount()
      .then(res=>{
        console.log(res)
        this.subCount = res.data
      })
      .catch(err=>{
        console.log(err)
      })
    userPlaylist(this.uid,100,0) //做的是侧边栏，不方便做分页，先取100，后续可加大或者改样式
      .then(res=>{
        console.log(res)
        let a = res.data.playlist.filter(
            (item)=>{
              return (
                  item.creator.userId === this.uid
              )
            }
        )
        console.log(a)
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
</style>
