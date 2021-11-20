<template>
<!--  <audio src="http://m8.music.126.net/20211009190753/89b3456ed025b1824aaabb78a75490c3/ymusic/6150/1bad/460b/bbbcd0d7ac04492412dcfbcc52f87093.mp3" controls="controls"></audio>-->
<!--  <audio controls="controls" src="http://m7.music.126.net/20211009190400/1c1ee2cf3ac4c294cdeba47bdb27dbc1/ymusic/f6f4/3071/4796/81584cd09182322cc3201eeada7808e8.mp3"></audio>-->
  <router-link to="Home"></router-link>
<!--  <router-view></router-view>-->
  <router-view :key="$route.fullPath"></router-view>
<!--  使用key控制搜索功能页面push自身时页面不刷新的问题，也可设置中转页面-->
</template>

<style>
  body{
    margin: 0px auto;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }
</style>
