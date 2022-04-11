<template>
  <div class="mod_section">
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
                    <span class="content">
                    {{item.content}}
                  </span>
                  </div>
                </el-col>
              </el-row>
              <el-row v-for="item2 of item.beReplied" v-if="item.beReplied.length !== 0">
                <el-card class="beReplied">
                  <div class="nickname">
                    {{item2.user.nickname}} :
                    <span class="content">
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
                <span class="content">
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
</template>

<script>
import {playlistComment, songComment} from "@/plugin/axios";
export default {
  name: "playlist-comment",
  data() {
    return {
      commentData:{},
      hotComments:[],
      comments:[],
      total:0,
      currentPage:1,
    }
  },
  methods:{
    getAvatarUrl(item){
      item = item.user.avatarUrl+'?param=80y80'
      return item
    }
  },
  beforeMount() {
    playlistComment(this.$route.query.id,(this.currentPage-1)*20)
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
  watch:{
    currentPage:function (newVal,oldVal) {
      playlistComment(this.$route.query.id,(newVal-1)*20)
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
.mod_section{
  border: #d5d5d5 1px solid;
  width: 65%;
  margin: 0 auto;
  background-color: #fff;
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
.content{
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