<template>
  <div class="search_form">
    <input type="text" placeholder="搜索音乐、MV、歌单、用户" @input="getSearch" v-model="keywords">
    <i class="iconfont icon-iconfonticonfontsousuo1"></i>
  </div>
  <div class="search_res">
    <p>wwww</p>
    <p>wwww</p>
    <p>wwww</p>
    <p>wwww</p>
  </div>
</template>

<script>
import axios from "@/plugin/axios";
export default {
  name: "navbarSearch",
  data(){
    return{
      keywords:""
    }
  },
  methods:{
    getSearch () {
      axios({
        url: '/cloudsearch?keywords='+this.keywords,  /*热门歌单接口地址*/
        method: 'get'
      })
          .then(res => {
            let result = res.data.result.songs;
            result.length = 4;
            console.log("获取的数据：", result)
          })
          .catch(err => {
            console.log(err)
          })
    },
    // getKeyword () {
      // console.log(this.keywords);
      // console.log(this.$ref.searchKeyword.value)
      // console.log(this.input);
      // let value = $event.target.value();
      // console.log(value);
    // }
  },
}
</script>

<style scoped>
.search_form{
  background-color: blue;
  width: 50%;
  height: 40px;
  /*margin-top: 28px;*/
  margin: 28px auto 0px;
  border: 1px solid rgb(231,231,231);
  border-radius: 5px;
  font-size: 20px;
  text-align: center;
}
.search_form input{
  width: 80%;
  margin-top: 2px;
  height: 85%;
  background-color: aquamarine;
  border: none;
  outline: none;
}
.icon-iconfonticonfontsousuo1{
  background-color: red;
  font-size: 20px;
}
.icon-iconfonticonfontsousuo1:hover{
  color: #7c9aab;
  cursor: pointer;
}
.search_res{
  width: 50%;
  height: 350px;
  background-color: aquamarine;
  border: 1px solid rgb(231,231,231);
  margin: 0px auto;
  /*display: none;*/
}
</style>