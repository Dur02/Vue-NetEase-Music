<template>
  <div class="mod_section">
    <div class="mod_playlist">
      <ul>
        <li v-for="item in this.songs" @click="hitme(item.id)">
          <div class="inf">
            <span class="song">{{item.name}}</span>
            <span class="artists">
              <span v-for="(item2,index) in item.ar">
                {{item2.name}}
                <span v-if="index+1 !== item.ar.length">/</span>
              </span>
            </span>
            <span class="album">{{item.al.name}}</span>
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
</template>

<script>
import {playlistDetail} from "@/plugin/axios";
import {songDetail} from "@/plugin/axios";

export default {
  name: "playlistSong",
  data() {
    return{
      id:this.$route.query.id,
      trackIds:"",
      songs:""
    }
  },
  beforeMount() {
    playlistDetail(this.id)
        .then(res=>{
          let Ids = res.data.playlist.trackIds
          let length = res.data.playlist.trackIds.length
          // console.log(Ids)
          for (let Id of Ids){
            if (length !== 1){
              this.trackIds += Id.id + ","
              length--
            }else{
              this.trackIds += Id.id
            }
          }
          // console.log(this.trackIds)
          songDetail(this.trackIds)
          .then(res=>{
            console.log(res)
            this.songs = res.data.songs
            console.log(this.songs)
          })
          .catch(err=>{
            console.log(err)
          })
        })
        .catch(err=>{
          console.log(err)
        })
  },
  methods:{
    hitme(id) {
      console.log(id)
    }
  }
}
</script>

<style scoped>
.mod_section{
  background-image: linear-gradient(#f6f6f6,#fafafa);
  /*background-color: rebeccapurple;*/
  min-width: 1300px;
  position: relative;
  /*height: 1000px;*/
}
.mod_playlist{
  width: 65%;
  /*height: 1000px;*/
  /*background-color: aqua;*/
  margin: 0 auto 20px auto;
  background-color: #fff;
  border-left: 1px solid #d5d5d5;
  border-right: 1px solid #d5d5d5;
  border-bottom: 1px solid #d5d5d5;
  /*border-top: 1px solid #d5d5d5;*/
  display: flex;
}
.mod_playlist div{
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
.album{
  float: left;
  width: 21%;
}
.duration{
  float: right;
  width: 6%;
}
</style>