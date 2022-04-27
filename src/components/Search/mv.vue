<template>
  <fail v-if="this.mvCount === 0"></fail>
  <div class="mod_search" v-if="this.mvCount !== 0">
    <div v-for="item in this.mvs" class="mod_mv">
      <div class="mv_pic">
        <!--        <img :src="item.blurPicUrl" alt="加载失败" @click="toAlbumDetail(item.id)"/>-->
        <!--        上面方法获取的图片过大，加载过慢，加入参数减少请求量-->
        <img :src="getUrl(item)" alt="加载失败" @click="toMvDetail(item.id)">
      </div>
      <p @click="toMvDetail(item.id)">{{item.name}}</p>
      <p class="artist" @click="getArtistTop(item.artistId)">{{item.artistName}}</p>
    </div>
    <el-pagination
        layout="prev, pager, next"
        :total="mvCount"
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
  name: "mv",
  data () {
    return{
      mvs:[],
      mvCount:-1,
      currentPage:1
    }
  },
  components:{
    fail
  },
  methods:{
    toMvDetail(id){
      // console.log(id)
      this.$router.push({path:'/Mv',query:{id:id}})
    },
    getUrl (item) {
      // console.log(url)
      return item.cover + "?param=180y180"
      // return item.cover
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
            search(res.data.result.hots[0].first,1004,25,(this.currentPage-1)*25)
                .then(res=>{
                  // console.log(res)
                  this.mvCount = res.data.result.mvCount
                  this.mvs = res.data.result.mvs
                  // console.log(this.mvs)
                })
                .catch(err=>{
                  this.mvCount = 0
                  console.log(err)
                })
          })
          .catch(err=>{
            console.log(err)
          })
    }else{
      search(this.$route.query.keywords,1004,25,(this.currentPage-1)*25)
          .then(res=>{
            // console.log(res)
            this.mvCount = res.data.result.mvCount
            this.mvs = res.data.result.mvs
            // console.log(this.mvs)
          })
          .catch(err=>{
            this.mvCount = 0
            console.log(err)
          })
    }
  },
  watch:{
    currentPage:function (newVal,oldVal) {
      if (!this.$route.query.keywords) {
        searchHot()
            .then(res => {
              // console.log(res)
              search(res.data.result.hots[0].first, 1004, 25, (this.currentPage - 1) * 25)
                  .then(res => {
                    // console.log(res)
                    this.mvCount = res.data.result.mvCount
                    this.mvs = res.data.result.mvs
                    // console.log(this.mvs)
                  })
                  .catch(err => {
                    console.log(err)
                  })
            })
            .catch(err => {
              console.log(err)
            })
      } else {
        search(this.$route.query.keywords, 1004,25, (this.currentPage - 1) * 25)
            .then(res => {
              // console.log(res)
              this.mvCount = res.data.result.mvCount
              this.mvs = res.data.result.mvs
              // console.log(this.mvs)
            })
            .catch(err => {
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
.mod_mv{
  display: inline-grid;
  width: 25%;
}
.mv_pic{
  width: 180px;
  height: 180px;
  margin: 0 auto;
  overflow: hidden;
}
.mod_mv img{
  width: 100%;
  height: 100%;
  margin: 0 auto ;
  transition: transform .75s;
  -webkit-transition: transform .75s;
}
.mod_mv img:hover{
  transform: scale(1.1) translateZ(0);
  -webkit-transform: scale(1.1) translateZ(0);
}
.mod_mv p{
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
.mod_mv p:hover{
  color: #296fc7;
  text-decoration: underline;
}
.pagination{
  width: 100%;
  text-align: center;
  margin: 0 auto;
}
</style>
