<template>
  <div class="artist_song">
    <ul>
      <li v-for="item in this.hotSongs" @click="hitme(item.id)">
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
</template>

<script>
import {artist} from "@/plugin/axios";

export default {
  name: "song",
  data () {
    return{
      hotSongs:[]
    }
  },
  beforeMount() {
    artist(this.$route.query.id)
    .then(res=>{
      this.hotSongs = res.data.hotSongs
      // console.log(this.hotSongs)
    })
    .catch(err=>{
      console.log(err)
    })
  }
}
</script>

<style scoped>
.artist_song{
  width: 100%;
  margin: 20px auto;
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
</style>