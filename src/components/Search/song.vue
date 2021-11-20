<template>
  <fail v-if="this.songCount === 0"></fail>
  <div class="mod_search" v-if="this.songCount !== 0">
    <ul>
      <li v-for="item in this.songs" @click="hitme(item.id)">
        <div class="inf">
          <span class="song">{{item.name}}</span>
          <span class="artists">
            <span v-for="(item2,index) in item.artists">
              {{item2.name}}
              <span v-if="index+1 !== item.artists.length">/</span>
            </span>
          </span>
          <span class="album">{{item.album.name}}</span>
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
  </div>
</template>

<script>
import {search,searchHot} from "@/plugin/axios";
import Fail from "@/components/Search/fail";

export default {
  name: "song",
  components: {Fail},
  data () {
    return{
      songs:[],
      songCount:-1
      // artists:""
    }
  },
  beforeMount() {
    // console.log(this.$route)
    if (!this.$route.query.keywords){
      searchHot()
      .then(res=>{
        // console.log(res)
        search(res.data.result.hots[0].first,1)
            .then(res=>{
              this.songCount = res.data.result.songCount
              this.songs = res.data.result.songs
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
      search(this.$route.query.keywords,1)
          .then(res=>{
            this.songCount = res.data.result.songCount
            this.songs = res.data.result.songs
            // console.log(this.songs)
          })
          .catch(err=>{
            console.log(err)
          })
    }
  },
  methods:{
    hitme(id) {
      console.log(id)
    }
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

</style>