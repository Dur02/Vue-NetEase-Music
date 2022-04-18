<template>
  <div class="mod_section">
    <div class="mod_block">
      <i
          class="iconfont description"
          :class="'icon-rili'+(date-1)"
          @click="toCustomSong"
      />
    </div>
  </div>
</template>

<script>
import {getLoginStatus, personalFm, recommendSongs} from "@/plugin/axios";

export default {
  name: "daily-songs",
  beforeMount() {
    this.date = new Date().getDate()
    // console.log(this.date)
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
          }else {
            this.status = false
          }
        })
        .catch(err=>{
          console.log(err)
        })
  }
}
</script>

<style scoped>
.mod_section{
  background-image: linear-gradient(#f2f2f2,#fafafa);
  height: 500px;
  min-width: 1300px;
  position: relative;
}
.mod_block{
  width: 70%;
  margin: 0 auto;
  background: #fff;
}
.mod_block i{
  font-size: 150px;
  color: #7c9aab;
}
</style>
