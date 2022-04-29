<template>
  <div class="mod-section">
    <div class="catlist-area">
      <span style="margin-left: 28px;" :class="{'actice':tag === '全部歌单'}" @click="changeTag('全部歌单')">全部歌单</span>
      <div style="margin-left: 30px" v-for="(value,key) in categories">
        <h3>
          <i class="iconfont"
             :class="{
          'icon-diqiu':value === '语种',
          'icon-gangqin':value === '风格',
          'icon-kafei':value === '场景',
          'icon-xiaolian':value === '情感',
          'icon-yinyue':value === '主题',
          }"
             style="font-size: 20px"
          >
          </i>
          {{ value }}
        </h3>
        <span v-for="item of sub">
          <span v-if="item.category === parseInt(key)">
            <span class="tag" :class="{'actice':item.name === tag}" @click="changeTag(item.name)">{{item.name}}</span><span class="block">|</span>
          </span>
        </span>
      </div>
    </div>

    <div class="mod_block">
      <div class="mod_playlist" v-for="item of dataSource" :key="item.id">
        <div class="mod_pic">
          <img :src="getUrl(item)" class="artist-pic" alt="加载失败" @click="toPlaylistDetail(item.id)">
        </div>
        <div class="mod_name">
          <span class="artist-name" @click="toPlaylistDetail(item.id)">{{item.name}}</span>
        </div>
      </div>
    </div>
    <el-pagination
        layout="prev, pager, next"
        :total="total"
        class="pagination"
        :page-size="30"
        v-model:current-page="currentPage"
    />
  </div>
</template>

<script>
import {catlist, topPlaylist} from "@/plugin/axios";

export default {
  name: "home-playlist",
  data(){
    return {
      categories:{},
      sub:[],
      dataSource:[],
      total:0,
      currentPage:1,
      tag:"全部歌单"
    }
  },
  beforeMount() {
    catlist()
      .then(res=>{
        this.categories = res.data.categories
        this.sub = res.data.sub
      })
    .catch(err=>{
      console.log(err)
    })
    topPlaylist('hot',this.tag,35,0)
      .then(res=>{
        console.log(res)
        this.dataSource = res.data.playlists
        this.total = res.data.total
      })
      .catch(err=>{
        console.log(err)
      })
  },
  methods:{
    toPlaylistDetail(id){
      this.$router.push({path:'/Playlist',query:{id:id}})
    },
    getUrl(item){
      // console.log(url)
      return item.coverImgUrl + "?param=180y180"
    },
    changeTag(tag){
      if (tag === 'R&B/Soul'){
        tag = 'R%26B%2FSoul'
        //此tag带&需特殊处理
      }
      console.log(tag)
      this.tag = tag
      this.currentPage = 1
      topPlaylist('hot',tag,35,0)
        .then(res=>{
          this.dataSource = res.data.playlists
          console.log(this.dataSource)
        })
        .catch(err=>{
          console.log(err)
        })
    }
  },
  watch:{
    currentPage:function (newVal,oldVal) {
      topPlaylist('hot',this.tag,35,(this.currentPage-1)*35)
          .then(res=>{
            this.dataSource = res.data.playlists
            console.log(this.dataSource)
          })
          .catch(err=>{
            console.log(err)
          })
    },
  }
}
</script>

<style scoped>
.mod-section{
  min-width: 1300px;
  background-image: linear-gradient(#f2f2f2,#fafafa);
  position: relative;
  bottom: 0.5em;
}
.catlist-area{
  width: 80%;
  margin: 0 auto;
  background-color: #fff;
}
.tag:hover{
  color: #296fc7;
  text-decoration: underline;
}
.actice{
  color: #296fc7;
}
.block{
  margin: 0 10px;
  color: #d8d8d8;
}
.mod_block{
  /*background-color: aqua;*/
  width: 80%;
  margin: 0 auto;
}
.mod_playlist{
  width: 20%;
  height: 100%;
  /*background-color: wheat;*/
  margin: 10px auto;
  overflow: hidden;
  display: inline-grid;
}
.mod_pic{
  width: 90%;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
}
.artist-pic{
  width: 100%;
  height: 100%;
  margin: 0 auto;
  transition: transform .75s;
  -webkit-transition: transform .75s;
  display: block;
}
.artist-pic:hover{
  transform: scale(1.1) translateZ(0);
  -webkit-transform: scale(1.1) translateZ(0);
}
.mod_name{
  width: 90%;
  margin: 10px auto;
}
.artist-name{
  width: 21%;
  font-size: 15px;
}
.artist-name:hover{
  color: #296fc7;
}
.pagination{
  width: 100%;
  font-size: 16px;
  text-align: center;
}
</style>
