<template>
  <fail v-if="this.artistCount === 0"></fail>
  <div class="mod_search" v-if="this.artistCount !== 0">
    <div v-for="item in this.artists" :key="item.id" class="mod_artist">
      <div class="artist_pic">
<!--        <img :src="item.picUrl" alt="加载失败"/>-->
        <img :src="getUrl(item)" alt="加载失败" @click="getArtistTop(item.id)"/>
      </div>
      <p @click="getArtistTop(item.id)">{{item.name}}</p>
    </div>
    <el-pagination
        layout="prev, pager, next"
        :total="artistCount"
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
  name: "artist",
  data () {
    return{
      artists:[],
      artistCount:-1,
      currentPage:1
    }
  },
  components:{
    fail
  },
  methods:{
    getUrl (item) {
      let url = item.picUrl+"?param=180y180"
      // console.log(url)
      return url
    },
    getArtistTop (id) {
      // console.log(id)
      this.$router.push({path:'/Artist',query:{id:id}})
    },
  },
  beforeMount() {
    // console.log(this.$route)
    if (!this.$route.query.keywords){
      searchHot()
          .then(res=>{
            // console.log(res)
            search(res.data.result.hots[0].first,100,25,(this.currentPage-1)*25)
                .then(res=>{
                  // console.log(res)
                  this.artistCount = res.data.result.artistCount
                  this.artists = res.data.result.artists
                  // console.log(this.artists)
                })
                .catch(err=>{
                  console.log(err)
                })
          })
          .catch(err=>{
            this.artistCount = 0
            console.log(err)
          })
    }else{
      search(this.$route.query.keywords,100,25,(this.currentPage-1)*25)
          .then(res=>{
            // console.log(res)
            this.artistCount = res.data.result.artistCount
            this.artists = res.data.result.artists
            // console.log(this.artists)
          })
          .catch(err=>{
            this.artistCount = 0
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
              search(res.data.result.hots[0].first,100,25,(this.currentPage-1)*25)
                  .then(res=>{
                    // console.log(res)
                    this.artistCount = res.data.result.artistCount
                    this.artists = res.data.result.artists
                    // console.log(this.artists)
                  })
                  .catch(err=>{
                    console.log(err)
                  })
            })
            .catch(err=>{
              console.log(err)
            })
      }else{
        search(this.$route.query.keywords,100,25,(this.currentPage-1)*25)
            .then(res=>{
              // console.log(res)
              this.artistCount = res.data.result.artistCount
              this.artists = res.data.result.artists
              // console.log(this.artists)
            })
            .catch(err=>{
              console.log(err)
            })
      }
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
.mod_artist{
  display: inline-grid;
  width: 20%;
}
.artist_pic{
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
  margin: 15px auto;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /*background-color: red;*/
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
