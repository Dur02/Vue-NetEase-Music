<template>
  <div class="mod_artist">
    <p>
      {{artist.name}}
      <span v-if="artist.alias" v-for="item of artist.alias">
        <span>
          {{item}}&nbsp;
        </span>
      </span>
      <span v-if="artist.transNames" v-for="item of artist.transNames">
        <span>
          {{item}}&nbsp;
        </span>
      </span>
    </p>
    <div class="mod_pic">
      <img :src="picUrl" alt="加载失败" class="artist_pic">
    </div>
  </div>
</template>

<script>
import {artist} from "@/plugin/axios";

export default {
  name: "artistBar",
  data () {
    return{
      picUrl:"",
      artist:""
    }
  },
  beforeMount() {
    artist(this.$route.query.id)
    .then(res=>{
      this.artist = res.data.artist
      this.picUrl = this.artist.picUrl + "?param180=640y300"
      // console.log(this.artist)
    })
    .catch(err=>{
      console.log(err)
    })
  }
}
</script>

<style scoped>
.mod_artist{
  position: relative;
  /*width: 65%;*/
  /*background-color: #7c9aab;*/
  /*margin: 0 auto;*/
}
.mod_artist p{
  /*font-weight: bold;*/
  font-size: 27px;
  margin: 0;
  padding-top: 14px;
  padding-left: 20px;
}
.mod_artist p span{
  font-size: 16px;
  color: #666666;
}
.mod_pic{
  text-align: center;
  margin-top: 10px;
}
.artist_pic{
  width: 405px;
  height: 328px;
  border: 1px solid #d5d5d5;
  /*width: 810px;*/
  /*height: 656px;*/
  /*原宽高 1080 877*/
}
</style>