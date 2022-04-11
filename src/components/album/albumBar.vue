<template>
  <div class="mod_section">
    <div class="mod_album">
      <div class="pic_block">
<!--        <img class="album_pic" :src="album.blurPicUrl"/>-->
        <img class="album_pic" :src="getUrl(album)" alt="加载失败"/>
      </div>
      <div class="album_inf">
        <div class="name">
          <p>{{album.name}}</p>
        </div>
        <div class="artist">
          <span>歌手:
            <span v-for="(item,index) in artists">
              <span class="artist_name">{{item.name}}</span>
              <span v-if="index+1 !== artists.length">/</span>
            </span>
          </span>
        </div>
        <div class="public_time">
          <span>发行时间: {{publishTime}}</span>
        </div>
        <div class="company">
          <span>发行公司: {{album.company}}</span>
        </div>
        <div class="type">
          <span>类型: {{album.type}}</span>
        </div>
      </div>
    </div>
    <div class="mod_album">
      <div class="collapse">
        <el-collapse>
          <el-collapse-item title="介绍" name="1">
            <div class="description">
              {{description}}
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import {album} from "@/plugin/axios";
import {formatDate} from "@/common/date";

export default {
  name: "albumBar",
  data() {
    return{
      id:this.$route.query.id,
      album:"",
      artists:[],
      publishTime:"",
      description:"暂无介绍"
    }
  },
  methods:{
    getUrl (item) {
      // console.log(url)
      return item.blurPicUrl + "?param=180y180"
    }
  },
  beforeMount() {
    album(this.id)
    .then(res=>{
      // console.log(res)
      this.album = res.data.album
      this.artists = this.album.artists
      this.publishTime = this.album.publishTime
      let date = new Date(this.publishTime)
      this.publishTime = formatDate(date,'yyyy年MM月dd日')
      // this.description = this.album.description.replace(/\n/g,'<br>').replace(/\s/g,"&nbsp;")
      this.description = this.album.description
      // console.log(this.album)
    })
    .catch(err=>{
      console.log(err)
    })
  }
}
</script>

<style scoped>
.mod_section{
  background-image: linear-gradient(#f2f2f2,#f6f6f6);
  min-width: 1300px;
  position: relative;
}
.mod_album{
  width: 65%;
  /*background-color: aqua;*/
  margin: 0 auto;
  background-color: #fff;
  border-left: 1px solid #d5d5d5;
  border-right: 1px solid #d5d5d5;
  border-top: 1px solid #d5d5d5;
  display: flex;
}
.collapse{
  width: 100%;
}
.pic_block{
  width: 300px;
  height: 300px;
  /*background-color: red;*/
}
.album_pic{
  width: 250px;
  height: 250px;
  margin: 20px 20px;
}
.name{
  /*background-color: red;*/
  text-align: center;
}
.name p{
  font-size: 23px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /*font-weight: bold;*/
}
.album_inf{
  width: calc(100% - 300px);
  /*background-color: aquamarine;*/
}
.artist,.public_time,.company,.type{
  /*background-color: #0077aa;*/
  overflow: hidden;
  cursor: pointer;
  line-height: 44px;
  font-size: 14px;
}
.artist_name:hover{
  color: #296fc7;
  text-decoration: underline;
}
.description{
  white-space: pre-wrap;
  word-break: break-all;
}
</style>