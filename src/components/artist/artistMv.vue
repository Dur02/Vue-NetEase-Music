<template>
  <div class="mod_search">
    <div v-for="item in this.mvs" class="mod_album">
      <div class="album_pic">
        <img :src="getUrl(item)" alt="加载失败" @click="toMvDetail(item.id)">
      </div>
      <p class="album_name" @click="toMvDetail(item.id)">{{item.name}}</p>
      <p class="time" v-text="getTime(item.publishTime)"></p>
    </div>
    <el-pagination
        layout="prev, pager, next"
        :total="mvSize"
        class="pagination"
        :page-size="20"
        v-model:current-page="currentPage"
    />
  </div>
</template>

<script>
import {formatDate} from "@/common/date";
import {artistAllSongs, artistDetail, artistMv, songDetail} from "@/plugin/axios";

export default {
  name: "artistMV",
  data () {
    return{
      mvs:[],
      id:this.$route.query.id, //歌单id
      currentPage:1,
      mvSize:0
    }
  },
  methods:{
    toMvDetail(id){
      // console.log(id)
      this.$router.push({path:'/Mv',query:{id:id}})
    },
    getUrl (item) {
      // console.log(url)
      return item.imgurl + "?param=180y180"
    },
    getTime (time) {
      let date1 = new Date(time)
      return formatDate(date1, 'yyyy年MM月dd日')
    }
  },
  beforeMount() {
    artistDetail(this.$route.query.id)
        .then(res=>{
          this.mvSize = res.data.data.artist.mvSize
        })
    artistMv(this.$route.query.id,(this.currentPage-1)*20)
        .then(res=>{
          this.mvs = res.data.mvs
        })
        .catch(err=>{
          console.log(err)
        })
  },
  watch:{
    currentPage:function (newVal,oldVal) {
      artistMv(this.$route.query.id,(this.currentPage-1)*20)
          .then(res=>{
            this.mvs = res.data.mvs
          })
          .catch(err=>{
            console.log(err)
          })
    }
  }
}
</script>

<style scoped>
.mod_search{
  width: 100%;
  margin: 20px auto;
  position: relative;
}
.mod_album{
  display: inline-grid;
  width: 20%;
}
.album_pic{
  width: 150px;
  height: 150px;
  margin: 0 auto;
  overflow: hidden;
}
.mod_search img{
  width: 100%;
  height: 100%;
  margin: 0 auto ;
  transition: transform .75s;
  -webkit-transition: transform .75s;
}
.mod_search img:hover{
  transform: scale(1.1) translateZ(0);
  -webkit-transform: scale(1.1) translateZ(0);
}
.mod_search p{
  width: 150px;
  text-align: center;
  font-size: 12px;
  margin: 9px auto;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.time{
  color: #666666;
}
.album_name:hover{
  color: #296fc7;
  text-decoration: underline;
}
.pagination{
  text-align: center;
}
</style>
