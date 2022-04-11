<template>
  <div class="artist_song">
    <ul>
      <li v-for="item in this.hotSongs" :key="item.id" @click="hitMe(item.id)">
        <div class="inf">
          <span class="song">{{item.name}}</span>
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
    <el-pagination
        layout="prev, pager, next"
        :total="musicSize"
        class="pagination"
        :page-size="30"
        v-model:current-page="currentPage"
    />
  </div>
</template>

<script>
import {artistAlbum, artistAllSongs, artistDetail, songDetail, songUrl} from "@/plugin/axios";

export default {
  name: "song",
  data () {
    return{
      hotSongs:[],  //渲染用，存储单曲的信息，并无url
      id:this.$route.query.id, //歌单id
      trackIds:"", //用字符串几下歌曲全部id，一次请求获取全部地址
      songs:[],
      songUrl:{},
      currentPage:1,
      musicSize:0
    }
  },
  methods:{
    hitMe(id){
      songUrl(this.trackIds)
          .then(res=> {
            this.songUrl = res.data.data
            this.$store.commit('addSong', this.songUrl)
            this.$store.commit('markSong', id)
            this.$store.commit('insertList', this.songs)
            this.$store.commit('playOrStop', true)
          })
    },
    toAlbum(id){
      this.$router.push({path:'/Album',query:{id:id}})
    },
    toArtist(id){
      this.$router.push({path:'/Artist',query:{id:id}})
    }
  },
  beforeMount() {
    artistDetail(this.$route.query.id)
        .then(res=>{
          this.musicSize = res.data.data.artist.musicSize
        })
    artistAllSongs(this.$route.query.id, 54 , (this.currentPage-1)*54)
    .then(res=>{
      this.hotSongs = res.data.songs
      let length = this.hotSongs.length
      for (let item of this.hotSongs){
        if (length !== 1){
          this.trackIds += item.id + ","
          length--
        }else{
          this.trackIds += item.id
        }
      }
      songDetail(this.trackIds)
          .then(res=>{
            this.songs = res.data.songs
          })
          .catch(err=>{
            console.log(err)
          })
      // console.log(this.hotSongs)
    })
    .catch(err=>{
      console.log(err)
    })
  },
  watch:{
    currentPage:function (newVal,oldVal) {
      console.log(this.trackIds)
      artistAllSongs(this.$route.query.id, 54, (this.currentPage - 1) * 54)
          .then(res => {
            this.hotSongs = res.data.songs
            let length = this.hotSongs.length
            for (let item of this.hotSongs) {
              if (length === this.hotSongs.length){
                this.trackIds += ","+ item.id + ","
                length--
              }else if (length !== 1) {
                this.trackIds += item.id + ","
                length--
              } else {
                this.trackIds += item.id
              }
            }
            songDetail(this.trackIds)
                .then(res => {
                  this.songs = res.data.songs
                })
                .catch(err => {
                  console.log(err)
                })
            // console.log(this.hotSongs)
          })
          .catch(err => {
            console.log(err)
          })
    }
  }
}
</script>

<style scoped>
.artist_song{
  width: 100%;
  margin: 20px auto;
  position: relative;
}
.artist_song ul{
  list-style: none;
  /*text-align: center;*/
}
.artist_song ul li{
  line-height: 40px;
  height: 40px;
  font-size: 12px;
  margin-right: 3%;
  /*margin: 20px auto;*/
}
.artist_song ul li:nth-child(odd){
  background-color: #f7f7f7;
}
.artist_song ul li:nth-child(even){
  background-color: #ffffff;
}
.artist_song ul li:hover{
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
  text-align: center;
}
</style>