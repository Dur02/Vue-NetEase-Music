<template>
  <div class="mod_section" v-if="status">
    <div class="personal_fm">
      <div class="a">

      </div>
    </div>
    <div class="recommend_songs">
      <div class="b">

      </div>
    </div>
  </div>
</template>

<script>
import {
  getLoginStatus,
  historyRecommend,
  historyRecommendSongs,
  personalFm,
  recommendSongs
} from "@/plugin/axios";

export default {
  name: "personal",
  data(){
    return {
      playlist:[],
      status:false
    }
  },
  beforeMount() {
    getLoginStatus()
      .then(res=>{
        if (res.data.data.account !== null){
          this.status = true
          recommendSongs()
            .then(res=>{
              console.log(res)
            })
            .catch(err=>{
              console.log(err)
            })
          historyRecommend()
            .then(res=>{
              console.log(res)
            })
            .catch(err=>{
              console.log(err)
            })
          historyRecommendSongs()
              .then(res=>{
                console.log(res)
              })
              .catch(err=>{
                console.log(err)
              })
          personalFm()
            .then(res=>{
              console.log(res)
            })
            .catch(err=>{
               console.log(err)
            })
          }else {
            this.status = false
          }
        })
        .catch(err=>{
          console.log(err)
        })
  },
}
</script>

<style scoped>
.mod_section{
  background-image: linear-gradient(#f2f2f2,#fafafa);
  height: 500px;
  min-width: 1300px;
  position: relative;
}
.personal_fm{
  height: 500px;
  background-color: aqua;
  width: 50%;
  float: left;
}
.recommend_songs{
  height: 500px;
  background-color: aquamarine;
  width: 50%;
  float: left;
}
.a{
  height: 500px;
  background-color: #296fc7;
  width: 50%;
  position: relative;
  left: 30%;
}
.b{
  height: 500px;
  background-color: #e9e9e9;
  width: 50%;
  position: relative;
  left: 20%;
}
</style>