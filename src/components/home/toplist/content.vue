<template>
  <div class="content">
    <div class="mod_section">
      <div class="mod_playlist">
        <div class="pic_block">
          <img class="playlist_pic" :src="getUrl(playlist)" alt="加载失败"/>
        </div>
        <div class="playlist_inf">
          <div class="title">
            <p>{{playlist.name}}</p>
          </div>
          <div class="creator">
            <img class="creator-avatar" :src="avatarUrl" alt="加载失败"/>
            <span class="creator-nickname">{{nickname}}</span>
            <span class="create_time">{{createTime}}创建</span>
            <span class="play_count">播放:&nbsp;<span>{{playlist.playCount}}</span>次</span>
          </div>
        </div>
      </div>
      <div class="mod_playlist">
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

    <div class="mod_sort">
      <categories title="详情" :class="{active:type===1}" @click="change(1)"></categories>
      <categories title="评论" :class="{active:type===2}" @click="change(2)"></categories>
    </div>

    <div class="mod_section" v-if="type ===1">
      <div class="mod_playlist">
        <ul>
          <li v-for="item in this.songs" :key="item.id">
            <div class="inf">
              <span class="song" @click="hitMe(item.id)">{{item.name}}</span>
              <span class="artists">
              <span v-for="(item2,index) in item.ar" :key="item2.id" class="name" @click="toArtist(item2.id)">
                {{item2.name}}
                <span v-if="index+1 !== item.ar.length">/</span>
              </span>
            </span>
              <span class="album" @click="toAlbum(item.al.id)">{{item.al.name}}</span>
              <span class="duration">
<!--            化毫秒数为分钟和秒数-->
            {{Math.floor((Math.round(item.dt/1000))/60) < 10
                  ? '0' + Math.floor((Math.round(item.dt/1000))/60)
                  : Math.floor((Math.round(item.dt/1000))/60)}}
            :
            {{Math.floor((Math.round(item.dt/1000))%60) < 10
                  ? '0' + Math.floor((Math.round(item.dt/1000))%60):
                  Math.floor((Math.round(item.dt/1000))%60)}}
          </span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="mod-comment" v-if="type === 2">
      <div class="mod_card">
        <el-divider />
        <h1>评论</h1>
        <span class="total">共{{total}}条评论</span>
        <el-divider />
        <b v-if="hotComments.length !== 0">精彩评论</b>
        <el-divider />
        <el-card v-for="item of hotComments" :key="item.commentId" v-if="hotComments.length !== 0" class="box-card">
          <div class="comment">
            <el-row>
              <el-col :span="1">
                <el-avatar shape="square" :size="50" :src=getAvatarUrl(item) />
              </el-col>
              <el-col :span="23">
                <el-row>
                  <el-col :span="24">
                    <div class="nickname">
                      {{item.user.nickname}} :
                      <span class="comment-content">
                    {{item.content}}
                  </span>
                    </div>
                  </el-col>
                </el-row>
                <el-row v-for="item2 of item.beReplied" v-if="item.beReplied.length !== 0">
                  <el-card class="beReplied">
                    <div class="nickname">
                      {{item2.user.nickname}} :
                      <span class="comment-content">
                    {{item2.content}}
                  </span>
                    </div>
                  </el-card>
                </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <p>{{item.timeStr}}</p>
              </el-col>
              <el-col :span="2" :offset="17" :push="1">
                <p>
                  <i class="iconfont icon-dianzan"></i>
                  ({{item.likedCount}})
                </p>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-divider v-if="hotComments.length !== 0" />
        <b v-if="comments.length !== 0" style="margin-top: 20px">全部评论</b>
        <el-divider />
        <el-card v-for="item of comments" :key="item.commentId" v-if="comments.length !== 0" class="box-card">
          <div class="comment">
            <el-row>
              <el-col :span="1">
                <el-avatar shape="square" :size="50" :src=getAvatarUrl(item) />
              </el-col>
              <el-col :span="23">
                <div class="nickname">
                  {{item.user.nickname}} :
                  <span class="comment-content">
                {{item.content}}
              </span>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <p>{{item.timeStr}}</p>
              </el-col>
              <el-col :span="2" :offset="17" :push="1">
                <p>
                  <i class="iconfont icon-dianzan"></i>
                  ({{item.likedCount}})
                </p>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>
    </div>
    <el-pagination
        layout="prev, pager, next"
        :total="total"
        class="pagination"
        :page-size="20"
        v-model:current-page="currentPage"
    />
    <div style="width: 100%;height: 100px;"></div>
  </div>
</template>

<script>
import PlaylistBar from "@/components/playlist/playlistBar";
import PlaylistSong from "@/components/playlist/playlistSong";
import Categories from "@/components/categories/categories";
import {playlistDetail, songDetail, songUrl, playlistComment} from "@/plugin/axios";
import {formatDate} from "@/common/date";
export default {
  name: "content",
  components: {PlaylistSong, PlaylistBar, Categories},
  data() {
    return{
      playlist:"",
      avatarUrl:"",
      nickname:"",
      createTime:"",
      description:"暂无介绍",
      trackIds:"", //用字符串几下歌曲全部id，一次请求获取全部地址
      songs:[],
      songUrl:{},
      type:1,
      commentData:{},
      hotComments:[],
      comments:[],
      total:0,
      currentPage:1,
    }
  },
  props:{
    list:Array,
    id:Number
  },
  methods:{
    getUrl (item) {
      // console.log(url)
      return item.coverImgUrl + "?param=180y180"
    },
    getAvatarUrl(item){
      item = item.user.avatarUrl+'?param=80y80'
      return item
    },
    change(type){
      this.type = type
      this.currentPage = 1
    },
    hitMe(songId) {
      songUrl(this.trackIds)
          .then(res=>{
            this.songUrl = res.data.data
            this.$store.commit('addSong',this.songUrl)
            this.$store.commit('markSong',songId)
            this.$store.commit('insertList',this.songs)
            this.$store.commit('playOrStop',true)
            this.$store.commit('change_isPersonalFm',false)
            console.log(this.songUrl)
          })
          .catch(err=>{
            console.log(err)
          })
    },
    toAlbum(id){
      this.$router.push({path:'/Album',query:{id:id}})
    },
    toArtist(id){
      this.$router.push({path:'/Artist',query:{id:id}})
    }
  },
  watch:{
    id:function (newVal,oldVal){
      playlistDetail(this.id)
          .then(res=>{
            this.currentPage = 1
            this.trackIds = ""
            //上部处理
            this.playlist = res.data.playlist
            this.nickname = this.playlist.creator.nickname
            this.avatarUrl = this.playlist.creator.avatarUrl
            if (this.playlist.description !== ""){
              this.description = this.playlist.description
            }
            this.createTime = this.playlist.createTime
            let date = new Date(this.createTime)
            this.createTime = formatDate(date,'yyyy年MM月dd日')

            //下部处理
            // console.log(res)
            let Ids = res.data.playlist.trackIds
            let length = res.data.playlist.trackIds.length
            // console.log(Ids)
            for (let item of Ids){
              if (length !== 1){
                this.trackIds += item.id + ","
                length--
              }else{
                this.trackIds += item.id
              }
            }
            // console.log(this.trackIds)
            songDetail(this.trackIds)
                .then(res=>{
                  // console.log(res)
                  this.songs = res.data.songs
                })
                .catch(err=>{
                  console.log(err)
                })
          })
          .catch(err=>{
            console.log(err)
          })
      playlistComment(this.id,(this.currentPage-1)*20)
          .then(res=>{
            console.log(res)
            this.commentData = res.data
            this.total = this.commentData.total
            if (res.data.hotComments){
              this.hotComments = this.commentData.hotComments
            }else{
              this.hotComments = []
            }
            this.comments = this.commentData.comments
          })
    },
    currentPage:function (newVal,oldVal) {
      playlistComment(this.id,(newVal-1)*20)
          .then(res=>{
            console.log(res)
            this.commentData = res.data
            this.total = this.commentData.total
            if (res.data.hotComments){
              this.hotComments = this.commentData.hotComments
            }else{
              this.hotComments = []
            }
            this.comments = this.commentData.comments
          })
    },
  }
}
</script>

<style scoped>
.content{
  float: left;
  width: 80%;
  /*overflow: hidden;*/
}
.mod_section{
  background-image: linear-gradient(#f2f2f2,#f6f6f6);
  position: relative;
}
.mod_playlist{
  width: 100%;
  /*background-color: aqua;*/
  background-color: #fff;
  border: 1px solid #d5d5d5;
  display: flex;
}
.pic_block{
  width: 300px;
  height: 300px;
  /*background-color: red;*/
}
.playlist_pic{
  width: 250px;
  height: 250px;
  margin: 20px 20px;
}
.title{
  text-align: center;
}
.title p{
  font-size: 23px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /*font-weight: bold;*/
}
.playlist_inf{
  width: calc(100% - 300px);
  /*background-color: aquamarine;*/
}
.creator{
  /*background-color: aquamarine;*/
  height: 40px;
}
.creator-avatar{
  width: 40px;
  height: 40px;
}
.creator-nickname,.create_time,.play_count{
  height: 40px;
  line-height: 40px;
  position: relative;
  color: #666666;
  bottom: 12px;
  left: 10px;
  margin-right: 50px;
}
.play_count span{
  color: #c20c0c;
}
.collapse{
  width: 100%;
}
.description{
  white-space: pre-wrap;
  word-break: break-all;
}
.mod_sort{
  width: 100%;
  border-left: #d5d5d5 1px solid;
  border-right: #d5d5d5 1px solid;
  margin: 0 auto;
  background-color: #fff;
  display: flex;
}
.active{
  color: #296fc7;
}
.mod_playlist ul{
  list-style: none;
  /*border: 1px solid #000;*/
  width: 100%;
  /*text-align: center;*/
}
.mod_playlist ul li{
  line-height: 40px;
  height: 40px;
  font-size: 12px;
  margin-right: 3%;
  /*margin: 20px auto;*/
}
.mod_playlist ul li:nth-child(odd){
  background-color: #f7f7f7;
}
.mod_playlist ul li:nth-child(even){
  background-color: #ffffff;
}
.mod_playlist ul li:hover{
  background-color: #f2f2f2;
}
.inf{
  width: 100%;
}
.inf span{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0 1%;
}
.song{
  float: left;
  width: 32%;
}
.artists{
  float: left;
  width: 32%;
  margin-right: 10px;
}
.artists span{
  margin: 0;
}
.album{
  float: left;
  width: 21%;
}
.duration{
  float: right;
  width: 6%;
}
.song:hover , .name:hover , .album:hover{
  color: #296fc7;
  text-decoration: underline;
}

.mod-comment{
  width: 100%;
}
.mod_card{
  width: 98%;
  margin: 0 auto;
}
.mod_section h1{
  display: inline
}
.total{
  margin-left: 20px
}
.nickname{
  position: relative;
  color: #0077aa;
  left: 20px;
  display: inline-block;
}
.comment-content{
  color: black;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
}
.beReplied{
  background-color: #f2f2f2;
  width: 100%;
}
.pagination{
  width: 100%;
  font-size: 16px;
  text-align: center;
}
</style>
