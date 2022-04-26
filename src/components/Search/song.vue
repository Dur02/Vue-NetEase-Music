<template>
  <fail v-if="this.songCount === 0"></fail>
  <div class="mod_search" v-if="this.songCount !== 0">
    <ul>
      <li v-for="item in this.songs">
        <div class="inf">
          <span class="song" @click="hitMe(item.id)">{{item.name}}</span>
          <span class="artists">
            <span v-for="(item2,index) in item.artists" class="name" @click="toArtist(item2.id)">
              {{item2.name}}
              <span v-if="index+1 !== item.artists.length">/</span>
            </span>
          </span>
          <span class="album" @click="toAlbum(item.album.id)">{{item.album.name}}</span>
          <span class="duration">
<!--            化毫秒数为分钟和秒数-->
            {{Math.floor((Math.round(item.duration/1000))/60) < 10
              ? '0' + Math.floor((Math.round(item.duration/1000))/60)
              : Math.floor((Math.round(item.duration/1000))/60)}}
            :
            {{Math.floor((Math.round(item.duration/1000))%60) < 10
              ? '0' + Math.floor((Math.round(item.duration/1000))%60):
              Math.floor((Math.round(item.duration/1000))%60)}}
          </span>
        </div>
      </li>
    </ul>
    <el-pagination
        layout="prev, pager, next"
        :total="songCount"
        class="pagination"
        :page-size="50"
        v-model:current-page="currentPage"
    />
    <div style="width: 100%;height: 100px;position: absolute;"></div>
<!--    垫高使controller不遮挡内容-->
  </div>
</template>

<script>
import {artistAlbum, search, searchHot, songDetail, songUrl} from "@/plugin/axios";
import Fail from "@/components/Search/fail";
import * as Vue from "core-js";

export default {
  name: "song",
  components: {Fail},
  data () {
    return{
      songs:[], //渲染列表用
      songsData:[],
      songCount:-1,
      currentPage:1,
      songUrl:{},
      trackIds:""
      // artists:""
    }
  },
  beforeMount() {
    // console.log(this.$route)
    if (!this.$route.query.keywords){
      searchHot()
      .then(res=>{
        // console.log(res)
        search(res.data.result.hots[0].first,1,50,50)
            .then(res=>{
              this.songCount = res.data.result.songCount
              this.songs = res.data.result.songs
              let Ids = res.data.result.songs
              let length = res.data.result.songs.length
              for (let item of Ids){
                if (length !== 1){
                  this.trackIds += item.id + ","
                  length--
                }else{
                  this.trackIds += item.id
                }
              }
              songDetail(this.trackIds)
                  .then(res=>{
                    this.songsData = res.data.songs
                  })
                  .catch(err=>{
                    console.log(err)
                  })
              // console.log(this.songs)
            })
            .catch(err=>{
              console.log(err)
            })
      })
      .catch(err=>{
        console.log(err)
      })
    }else{
      search(this.$route.query.keywords,1,50,(this.currentPage-1)*50)
          .then(res=>{
            this.songCount = res.data.result.songCount
            this.songs = res.data.result.songs
            let Ids = res.data.result.songs
            let length = res.data.result.songs.length
            for (let item of Ids){
              if (length !== 1){
                this.trackIds += item.id + ","
                length--
              }else{
                this.trackIds += item.id
              }
            }
            songDetail(this.trackIds)
                .then(res=>{
                  this.songsData = res.data.songs
                })
                .catch(err=>{
                  console.log(err)
                })
            // console.log(this.songs)
          })
          .catch(err=>{
            console.log(err)
          })
    }
  },
  methods:{
    hitMe(id) {
      songUrl(this.trackIds)
          .then(res=>{
            console.log(res)
            console.log(this.songs)
            for (let item of res.data.data){

            }
            this.songUrl = res.data.data
            this.$store.commit('addSong',this.songUrl)
            this.$store.commit('markSong',id)
            this.$store.commit('insertList',this.songs)
            this.$store.commit('playOrStop',true)
            this.$store.commit('change_isPersonalFm',false)
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
    currentPage:function (newVal,oldVal) {
      if (!this.$route.query.keywords){
        searchHot()
            .then(res=>{
              // console.log(res)
              search(res.data.result.hots[0].first,1,50,50)
                  .then(res=>{
                    this.songCount = res.data.result.songCount
                    this.songs = res.data.result.songs
                    let Ids = res.data.result.songs
                    let length = res.data.result.songs.length
                    for (let item of Ids){
                      if (length !== 1){
                        this.trackIds += item.id + ","
                        length--
                      }else{
                        this.trackIds += item.id
                      }
                    }
                    songDetail(this.trackIds)
                        .then(res=>{
                          this.songsData = res.data.songs
                        })
                        .catch(err=>{
                          console.log(err)
                        })
                    // console.log(this.songs)
                  })
                  .catch(err=>{
                    console.log(err)
                  })
            })
            .catch(err=>{
              this.songCount = 0
              console.log(err)
            })
      }else{
        search(this.$route.query.keywords,1,50,(this.currentPage-1)*50)
            .then(res=>{
              this.songCount = res.data.result.songCount
              this.songs = res.data.result.songs
              let Ids = res.data.result.songs
              let length = res.data.result.songs.length
              for (let item of Ids){
                if (length !== 1){
                  this.trackIds += item.id + ","
                  length--
                }else{
                  this.trackIds += item.id
                }
              }
              songDetail(this.trackIds)
                  .then(res=>{
                    this.songsData = res.data.songs
                  })
                  .catch(err=>{
                    console.log(err)
                  })
              // console.log(this.songs)
            })
            .catch(err=>{
              this.songCount = 0
              console.log(err)
            })
      }
    },
  }
}
</script>

<style scoped>
.mod_search{
  width: 65%;
  margin: 20px auto;
  position: absolute;
  top: 190px;
  left: 17.5%;
}
.mod_search ul{
  list-style: none;
  /*text-align: center;*/
}
.mod_search ul li{
  line-height: 40px;
  height: 40px;
  font-size: 12px;
  margin-right: 3%;
  /*margin: 20px auto;*/
}
.mod_search ul li:nth-child(odd){
  background-color: #f7f7f7;
}
.mod_search ul li:nth-child(even){
  background-color: #ffffff;
}
.mod_search ul li:hover{
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
.pagination{
  width: 100%;
  text-align: center;
  margin: 0 auto;
}
</style>
