<template>
  <fail v-if="this.albumCount === 0"></fail>
  <div class="mod_search" v-if="this.albumCount !== 0">
    <div v-for="item in this.albums" :key="item.id" class="mod_album">
      <div class="album_pic">
<!--        <img :src="item.blurPicUrl" alt="加载失败" @click="toAlbumDetail(item.id)"/>-->
<!--        上面方法获取的图片过大，加载过慢，加入参数减少请求量-->
        <img :src="getUrl(item)" alt="加载失败" @click="toAlbumDetail(item.id)">
      </div>
      <p @click="toAlbumDetail(item.id)">{{item.name}}</p>
      <p class="artist" @click="getArtistTop(item.artist.id)">{{item.artist.name}}</p>
    </div>
    <el-pagination
        layout="prev, pager, next"
        :total="albumCount"
        class="pagination"
        :page-size="25"
        v-model:current-page="currentPage"
    />
    <div style="width: 100%;height: 100px;position: absolute;"></div>
  </div>
</template>

<script>
import {search, searchHot} from "@/plugin/axios";
import fail from "@/components/Search/fail";

export default {
  name: "album",
  data () {
    return{
      albums:[],
      albumCount:-1,
      currentPage:1
    }
  },
  components:{
    fail
  },
  methods:{
    toAlbumDetail(id){
      // console.log(id)
      this.$router.push({path:'/Album',query:{id:id}})
    },
    getUrl (item) {
      // console.log(url)
      return item.blurPicUrl + "?param=180y180"
    },
    getArtistTop (id) {
      console.log(id)
      this.$router.push({path:'/Artist',query:{id:id}})
    },
  },
  beforeMount() {
    // console.log(this.$route)
    if (!this.$route.query.keywords){
      searchHot()
          .then(res=>{
            // console.log(res)
            search(res.data.result.hots[0].first,10,25,(this.currentPage-1)*25)
                .then(res=>{
                  // console.log(res)
                  this.albumCount = res.data.result.albumCount
                  this.albums = res.data.result.albums
                  // console.log(this.albums)
                })
                .catch(err=>{
                  console.log(err)
                })
          })
          .catch(err=>{
            this.albumCount = 0
            console.log(err)
          })
    }else{
      search(this.$route.query.keywords,10,25,(this.currentPage-1)*25)
          .then(res=>{
            // console.log(res)
            this.albumCount = res.data.result.albumCount
            this.albums = res.data.result.albums
            // console.log(this.albums)
          })
          .catch(err=>{
            this.albumCount = 0
            console.log(err)
          })
    }
  },
  watch:{
    currentPage:function (newVal,oldVal) {
      if (!this.$route.query.keywords){
        searchHot()
            .then(res=>{
              // console.log(res)
              search(res.data.result.hots[0].first,10,25,(this.currentPage-1)*25)
                  .then(res=>{
                    // console.log(res)
                    this.albumCount = res.data.result.albumCount
                    this.albums = res.data.result.albums
                    // console.log(this.albums)
                  })
                  .catch(err=>{
                    console.log(err)
                  })
            })
            .catch(err=>{
              console.log(err)
            })
      }else{
        search(this.$route.query.keywords,10,25,(this.currentPage-1)*25)
            .then(res=>{
              // console.log(res)
              this.albumCount = res.data.result.albumCount
              this.albums = res.data.result.albums
              // console.log(this.albums)
            })
            .catch(err=>{
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
.artist{
  color: #666666;
}
.mod_search p:hover{
  color: #296fc7;
  text-decoration: underline;
}
.pagination{
  width: 100%;
  text-align: center;
  margin: 0 auto;
}
</style>
