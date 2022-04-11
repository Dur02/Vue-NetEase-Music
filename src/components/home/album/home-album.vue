<template>
  <div class="mod-section">
    <div class="album-area">
      <div class="newestAlbum">
        <h2>热门新碟</h2>
        <div class="mod_block">
          <div class="mod_playlist" v-for="(item,index) of newestAlbum.slice(0,10)" :key="item.id">
            <div class="mod_pic">
              <img :src="getUrl(item)" class="artist-pic" alt="加载失败" @click="toAlbumDetail(item.id)">
            </div>
            <div class="mod_name">
              <span class="artist-name" @click="toAlbumDetail(item.id)">{{item.name}}</span>
            </div>
            <div class="mod_artist">
              <span class="artist_inf" @click="getArtistTop(item.artist.id)">{{item.artist.name}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="newestAlbum">
        <h2>全部新碟</h2>
        <div style="margin-left: 30px">
        <span v-for="(value,key) in area">
          <span class="tag" :class="{'actice':key === areaTag}" @click="changeTag(key)">
            {{value}}
          </span><span class="block">|</span>
        </span>
        </div>
        <div class="mod_block">
          <div class="mod_playlist" v-for="(item,index) of allAlbum" :key="item.id">
            <div class="mod_pic">
              <img :src="getUrl(item)" class="artist-pic" alt="加载失败" @click="toAlbumDetail(item.id)">
            </div>
            <div class="mod_name">
              <span class="artist-name" @click="toAlbumDetail(item.id)">{{item.name}}</span>
            </div>
            <div class="mod_artist">
              <span class="artist_inf" @click="getArtistTop(item.artist.id)">{{item.artist.name}}</span>
            </div>
          </div>
          <el-pagination
              layout="prev, pager, next"
              :total="total"
              class="pagination"
              :page-size="35"
              v-model:current-page="currentPage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {allAlbum, newestAlbum, topPlaylist} from "@/plugin/axios";
import NewestAlbum from "@/components/home/recommend/newestAlbum";

export default {
  name: "home-album",
  components: {NewestAlbum},
  data(){
    return{
      newestAlbum:[],
      area:{"All":"全部","ZH":"华语","EA":"欧美","KR":"韩国","JP":"日本"},
      areaTag:"All",
      allAlbum:[],
      total:0,
      currentPage:1,
    }
  },
  beforeMount() {
    newestAlbum()
        .then(res=>{
          console.log(res)
          this.newestAlbum = res.data.albums
        })
        .catch(err=>{
          console.log(err)
        })
    allAlbum(this.areaTag,35,0)
      .then(res=>{
        console.log(res)
        this.allAlbum = res.data.albums
        this.total = res.data.total
      })
      .catch(err=>{
        console.log(err)
      })
  },
  methods:{
    toAlbumDetail(id){
      this.$router.push({path:'/Album',query:{id:id}})
    },
    getUrl (item) {
      return item.picUrl + "?param=180y180"
    },
    getArtistTop (id) {
      this.$router.push({path:'/Artist',query:{id:id}})
    },
    changeTag(tag){
      this.areaTag = tag
      this.currentPage = 1
      allAlbum(this.areaTag,35,0)
          .then(res=>{
            console.log(res)
            this.allAlbum = res.data.albums
            this.total = res.data.total
          })
          .catch(err=>{
            console.log(err)
          })
    },
  },
  watch:{
    currentPage:function (newVal,oldVal) {
      allAlbum(this.areaTag,35,(this.currentPage-1)*35)
          .then(res=>{
            console.log(res)
            this.allAlbum = res.data.albums
            this.total = res.data.total
          })
          .catch(err=>{
            console.log(err)
          })
    },
  }
}
</script>

<style scoped>
.actice{
  color: #296fc7;
}
h2{
  padding-top: 20px;
  padding-left: 28px;
}
.mod-section{
  min-width: 1300px;
  background-image: linear-gradient(#f2f2f2,#fafafa);
  position: relative;
  bottom: 0.5em;
}
.album-area{
  width: 80%;
  margin: 0 auto;
  background-color: #fff;
}
.mod_block{
  /*background-color: #296fc7;*/
  width: 100%;
  margin: 0 auto;
}
.mod_playlist{
  width: 15%;
  height: 100%;
  margin: 20px 30px;
  overflow: hidden;
  display: inline-grid;
}
.mod_pic{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.artist-pic{
  width: 100%;
  height: 100%;
  margin: 0 auto;
  transition: transform .75s;
  -webkit-transition: transform .75s;
  display: block;
}
.artist-pic:hover{
  transform: scale(1.1) translateZ(0);
  -webkit-transform: scale(1.1) translateZ(0);
}
.mod_name,.mod_artist{
  text-align: center;
  width: 100%;
  margin: 7px auto 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.artist-name,.artist_inf{
  width: 21%;
  margin: 20px auto;
  font-size: 13px;
}
.artist-name:hover,.artist_inf:hover{
  color: #296fc7;
}
.block{
  margin: 0 10px;
  color: #d8d8d8;
}
.tag:hover{
  color: #296fc7;
  text-decoration: underline;
}
.pagination{
  width: 100%;
  font-size: 16px;
  text-align: center;
}
</style>