<template>
  <div class="search_form">
    <input type="text" placeholder="搜索音乐、MV、歌单" @click="refresh();getSearch()" @input="getSearch" v-model="keywords" @blur="searchBlur" @focus="searchFocus" @keyup.enter="Search">
    <i class="iconfont icon-iconfonticonfontsousuo1" @click="Search"></i>
  </div>
  <div class="mod_search">
    <div ref="showRes" :class="{'search_res_active':resActive,'search_res_hidden':!resActive}">
      <div class="search_res_sort" v-show="songsShow === true">
        <i class="iconfont icon-icon-- search_sort"><span>单曲</span></i>
        <ul>
          <li v-for="(item,index) in songsList" v-show="item" :key="item.id" @click="hitMe(item.id)"> {{item.name}} - <span v-for="(item2,index) in item.artists">{{item2.name}}<span v-if="index+1 !== item.artists.length">/</span></span></li>
        </ul>
      </div>
      <div class="search_res_sort" v-show="artistsShow === true">
        <i class="iconfont icon-renyuan search_sort"><span>歌手</span></i>
        <ul>
          <li v-for="(item,index) in artistsList" v-show="item" :key="item.id" @click="toArtist(item.id)"> {{item.name}}</li>
        </ul>
      </div>
      <div class="search_res_sort" v-show="albumsShow === true">
        <i class="iconfont icon-diepian search_sort"><span>专辑</span></i>
        <ul>
          <li v-for="(item,index) in albumsList" v-show="item" :key="item.id" @click="toAlbum(item.id)">{{item.name}} - {{item.artist.name}}</li>
        </ul>
      </div>
      <div class="search_res_sort" v-show="playlistShow === true">
        <i class="iconfont icon-diepian search_sort"><span>歌单</span></i>
        <ul>
          <li v-for="(item,index) in playlist" v-show="item" :key="item.id" @click="toPlaylist(item.id)">{{item.name}}</li>
        </ul>
      </div>
    </div>
    <div ref="showHot" :class="{'search_hot_active':hotActive,'search_hot_hidden':!hotActive}">
      <div class="search_res_sort">
       <i class="iconfont icon-remen search_sort"><span>热门</span></i>
        <ul>
         <li v-for="(item,index) of HotList" :key="item.id" @click="toSearch(item.first)"> {{item.first}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {searchAdvice, songUrl, songDetail} from "@/plugin/axios"
import  {searchHot} from "@/plugin/axios";

export default {
  name: "navbarSearch",
  data () {
    return{
      keywords:"",
      songsList:[],
      artistsList:[],
      albumsList:[],
      playlist:[],
      resActive:false,
      hotActive:false,
      HotList:[],
      songsShow:false,
      albumsShow:false,
      artistsShow:false,
      playlistShow:false,
      songUrl:{},
      songs:[]
    }
  },
  beforeMount() {
    if (this.$route.query.keywords) {
      // console.log(this.$route.query.keywords)
     this.keywords = this.$route.query.keywords
    }
  },
  methods:{
    refresh () {
      this.$refs.showRes.style.visibility='visible';
      this.$refs.showHot.style.visibility='visible';  //因为每次刷新搜索栏都会自动执行动画，所以每次刷新先隐藏然后显示，暂时的解决方案，需优化完善
      searchHot()
          .then(res => {
            // console.log(res)
            this.HotList = res.data.result.hots
            // console.log("a",this.HotList)
            this.HotList.length=5;
            this.hotActive = true
            // console.log("热门搜索数据：", this.HotList)
          })
          .catch(err => {
            console.log(err)
          })
    },
    getSearch () {
      if (this.keywords === ""){  //如果搜索输入框为空，把搜索建议隐藏
        this.resActive = false
        this.hotActive = true
      }
      if (this.keywords){
        this.resActive = true
        this.hotActive = true
        searchAdvice(this.keywords)
            .then(res => {
              // console.log(res)
              if (res.data.result.songs === undefined){
                this.songsShow = false
              }else {
                this.songsList = res.data.result.songs
                console.log(this.songsList)
                this.songsShow = true
              }
              if (res.data.result.albums === undefined){
                this.albumsShow = false
              }else {
                this.albumsList = res.data.result.albums
                this.albumsShow = true
              }
              if (res.data.result.artists === undefined){
                this.artistsShow = false
              }else {
                this.artistsList = res.data.result.artists
                this.artistsShow = true
              }
              if (res.data.result.playlists === undefined){
                this.playlistShow= false
              }else {
                this.playlist = res.data.result.playlists
                this.playlistShow= true
              }
            })
            .catch(err => {
              console.log(err)
            })
      }
    },
    searchBlur () {  //搜索框失焦时隐藏搜索建议
      this.resActive = false;
      this.hotActive =false;
    },
    searchFocus () {  //搜索框得到焦点时显示搜索建议
      if (this.keywords === ""){  //如果搜索输入框为空，把搜索建议隐藏
        this.resActive = false
        this.hotActive =true;
      }else
        this.resActive = true
        this.hotActive = true
    },
    Search () {  //跳至搜索页面
      if (this.keywords === ''){
        searchHot()
        .then(res=>{
          // console.log(res)
          this.keywords = res.data.result.hots[0].first;
          this.$router.push({path:'/Search',query:{keywords:this.keywords,type:1}})
        })
        .catch(err=>{
          console.log(err)
        })
      }else{
        this.$router.push({path:'/Search',query:{keywords:this.keywords,type:1}})
      }
    },
    toSearch(keywords){
      console.log(keywords)
      this.$router.push({path:'/Search',query:{keywords:keywords,type:1}})
    },
    hitMe(id) {
      songUrl(id)
          .then(res=>{
            this.songUrl = res.data.data
            this.$store.commit('addSong',this.songUrl)
            this.$store.commit('markSong',id)
            songDetail(id)
              .then(res=>{
               this.songs = res.data.songs
                console.log(this.songs)
                this.$store.commit('insertList',this.songs)
                this.$store.commit('playOrStop',true)
              })
          })
          .catch(err=>{
            console.log(err)
          })
    },
    toAlbum(id){
      console.log("album"+id)
      this.$router.push({path:'/Album',query:{id:id}})
    },
    toArtist(id){
      console.log("artist"+id)
      this.$router.push({path:'/Artist',query:{id:id}})
    },
    toPlaylist(id){
      console.log("playlist"+id)
      this.$router.push({path:'/Playlist',query:{id:id}})
    },
  }
}
</script>

<style scoped>
.search_form{
  width: 98%;
  height: 40px;
  margin: 28px auto 0;
  border: 1px solid rgb(231,231,231);
  background-color: white;
  border-radius: 5px;
  font-size: 16px;
  text-align: center;
}
.search_form input{
  width: 80%;
  margin-top: 2px;
  float: left;
  height: 85%;
  border: none;
  outline: none;
  font-size: 14px;
}
.icon-iconfonticonfontsousuo1{
  /*background-color: red;*/
  font-size: 20px;
  float: right;
  position: relative;
  top:9px;
  right: 3px;
}
.icon-iconfonticonfontsousuo1:hover{
  color: #7c9aab;
  cursor: pointer;
}
.search_res_active,.search_res_hidden{
  width: 98%;
  border: 1px solid rgb(231,231,231);
  background-color: rgba(255,255,255,1);
  /*background-color: aqua;*/
  border-radius: 5px;
  margin: 0 auto;
  border-top: none;
  border-bottom: none;
  font-size: 14px;
  text-align: left;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;  /*注释会发现，在内容不能填满动画最后的高度时，高度会回弹到内容的高度*/
  overflow: hidden;
}
.search_res_active{
  animation-name: active;
}
.search_res_hidden{
  visibility: hidden;
  animation-name: hidden;
}
.search_res_active ul , .search_res_hidden ul,
.search_hot_active ul , .search_hot_hidden ul{
  font-size: 14px;
  margin-bottom: 5px;
  position: relative;
  right: 40px;
  bottom: 5px;
}
.search_res_active li , .search_res_hidden li ,
.search_hot_active li , .search_hot_hidden li{
  width: 114%;
  /*background-color: red;*/
  padding-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
  cursor: pointer;
  line-height: 30px;
}
.search_res_active li:hover , .search_res_hidden li:hover,
.search_hot_active li:hover , .search_hot_hidden li:hover{
  background-color: #7c9aab;
  color: #fff;
}
.search_sort{
  display: block;
  margin:5px 0 0 5px;
  font-size: 20px;
  /*background-color: black;*/
}
.search_sort span{
  font-size: 14px;
  margin-left: 8px;
  color: #999999;
}
.search_res_sort{
  border-bottom:1px solid #e7e7e7;
  background-color: rgba(255,255,255,1);
  /*background-color: #296fc7;*/
  position: relative;
}
.search_hot_active,.search_hot_hidden{
  width: 98%;
  border: 1px solid rgb(231,231,231);
  /*background-color: aquamarine;*/
  background-color: rgb(255,255,255);
  border-radius: 5px;
  margin: 0 auto 3px auto;
  font-size: 14px;
  text-align: left;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;  /*注释会发现，在内容不能填满动画最后的高度时，高度会回弹到内容的高度*/
  overflow: hidden;
}
.search_hot_active{
  animation-name: hotActive;
}
.search_hot_hidden{
  visibility: hidden;
  border-top: none;
  margin: 0 auto;
  border-top: none;
  animation-name: hotHidden;
}
@keyframes active {
  from{
    max-height: 0;
  }
  to{
    /*background-color: red;*/
    /*min-height: 475px;*/
    max-height: 800px;
    /*483*/
  }
}
@keyframes hidden {
  0%{max-height: 800px;border: 1px solid rgb(231,231,231);border-top: none;}/*此处之所以设置border-top:none是因为在搜索建议框收起时*/
  99%{max-height: 1px;border: 1px solid rgb(231,231,231);border-top: none;} /*搜索栏下面由于border的存在会影响搜索栏下方产生阴影，本质是搜索建议框的border*/
  100%{max-height: 0;border: none;}                                       /*所以在动画中隐藏阴影，而尝试在css中去除上边框却无效，暂不清楚原因*/
                                                                        /*热门搜索建议同理*/
  /*from{*/
  /*  height: 540px;*/
  /*}*/
  /*to{*/
  /*  height: 0px;*/
  /*}*/
}
@keyframes hotActive {
  from{
    max-height: 0;
  }
  to{
    /*max-height: 245px;*/
    max-height: 400px;
    /*原本是210，发现点击不了最后一个热搜，长度不够所致*/
  }
}
@keyframes hotHidden {
  0%{max-height: 400px;border: 1px solid rgb(231,231,231);border-top: none;}
  99%{max-height: 1px;border: 1px solid rgb(231,231,231);border-top: none;}
  100%{max-height: 0;border: none;}
  /*from{*/
  /*  height: 210px;*/
  /*  !*border: 1px solid rgb(231,231,231);*!*/
  /*}*/
  /*to{*/
  /*  height: 0px;*/
  /*  !*border: none;*!*/
  /*}*/
}
.mod_search{
  position: relative;
  z-index: 999;
}
</style>