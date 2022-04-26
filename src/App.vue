<template>
  <div>
    <router-link to="Home"></router-link>
    <!--  <router-view></router-view>-->
    <router-view :key="$route.fullPath"></router-view>
    <!--  使用key控制搜索功能页面push自身时页面不刷新的问题，也可设置中转页面-->
    <div style="width: 100%;height: 100px;"></div>
    <!--    垫高内容使controller不遮挡内容，Search页面的使用的是绝对定位，特殊处理，后续可考虑更简单的处理方式-->
    <playlist-drawer></playlist-drawer>
    <music-bar></music-bar>
    <!--  drawer组件要和触发抽屉的组件再同一地方-->
    <controller v-if="this.$route.path !== '/Mv' && this.$store.state.playing !== -1"/>
    <!--  MV页面和没有播放列表时隐藏控制器-->
  </div>
</template>

<script>
import Controller from "@/components/music/controller";
import PlaylistDrawer from "@/components/music/playlist-drawer";
import MusicBar from "@/components/music/musicBar";
export default {
  components: {MusicBar, PlaylistDrawer, Controller},
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isShow: true
    }
  },
  methods: {
    reload () {
      this.isShow= false
      this.$nextTick(function () {
        this.isShow= true
      })
    }
  }
}
</script>

<style>
body{
  margin: 0px auto;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
.el-drawer__body{
  /*background-color: aqua;*/
  overflow: auto;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
/*2.隐藏滚动条，太丑了*/
.el-drawer ::-webkit-scrollbar{
  display: none; /* Chrome Safari */
}
.el-card__body{
  font-size: 14px;
}
.el-slider{
  width: 90%;
}
</style>
