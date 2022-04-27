<template>
  <div class="mod_search">
    <div v-for="item in this.hotAlbums" class="mod_album">
      <div class="album_pic">
        <!--        <img :src="item.blurPicUrl" alt="加载失败" @click="toAlbumDetail(item.id)"/>-->
        <!--        上面方法获取的图片过大，加载过慢，加入参数减少请求量-->
        <img :src="getUrl(item)" alt="加载失败" @click="toAlbumDetail(item.id)">
      </div>
      <p class="album_name" @click="toAlbumDetail(item.id)">{{item.name}}</p>
      <p class="time" v-text="getTime(item.publishTime)"></p>
    </div>
    <el-pagination
        layout="prev, pager, next"
        class="pagination"
        :total="albumSize"
        v-model:current-page="currentPage"
        :page-size="30" />
  </div>
</template>

<script>
import {artistAlbum, artistDetail} from "@/plugin/axios";
import {formatDate} from "@/common/date";

export default {
  name: "album",
  data () {
    return{
      hotAlbums:[],
      offset:0,
      currentPage:1,
      albumSize:0
    }
  },
  methods:{
    toAlbumDetail (id) {
      // console.log(id)
      this.$router.push({path:'/Album',query:{id:id}})
    },
    getUrl (item) {
      // console.log(url)
      return item.blurPicUrl + "?param=180y180"
    },
    getTime (time) {
      let date1 = new Date(time)
      return formatDate(date1, 'yyyy年MM月dd日')
    }
  },
  beforeMount() {
    artistDetail(this.$route.query.id)
    .then(res=>{
      this.albumSize = res.data.data.artist.albumSize
    })
    artistAlbum(this.$route.query.id,0)
    .then(res=>{
      this.hotAlbums = res.data.hotAlbums
    })
    .catch(err=>{
      console.log(err)
    })
  },
  watch:{
    currentPage:function (newVal,oldVal) {
      artistAlbum(this.$route.query.id,(newVal-1)*30)
          .then(res=>{
            this.hotAlbums = res.data.hotAlbums
          })
          .catch(err=>{
            console.log(err)
          })
    },
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
  width: 100%;
  text-align: center;
  margin: 0 auto;
}
</style>
