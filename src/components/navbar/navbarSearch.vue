<template>
  <div class="search_form">
    <input type="text" placeholder="搜索音乐、MV、歌单、用户" @click="refresh" @input="getSearch" v-model="keywords" @blur="searchBlur" @focus="searchFocus">
    <i class="iconfont icon-iconfonticonfontsousuo1"></i>
  </div>
  <div ref="showRes" :class="{'search_res_active':resActive,'search_res_hidden':!resActive}">
    <div class="search_res_sort">
      <i class="iconfont icon-icon-- search_sort"><span>单曲</span></i>
      <ul>
        <li v-for="(item,index) in songsList" :key="index"> {{item.name}} —— {{item.ar[0].name}}</li>
      </ul>
    </div>
<!--    <p v-for="(item,index) in resList" :key="index"> {{item.name}} - {{item.ar[0].name}}</p>-->
    <div class="search_res_sort">
      <i class="iconfont icon-renyuan search_sort"><span>歌手</span></i>
      <ul>
        <li v-for="(item,index) in artistsList" :key="index"> {{item.name}}</li>
      </ul>
    </div>
    <div class="search_res_sort">
      <i class="iconfont icon-diepian search_sort"><span>专辑</span></i>
      <ul>
        <li v-for="(item,index) in albumsList" :key="index"> {{item.name}}</li>
      </ul>
    </div>
    <div class="search_res_sort">
      <i class="iconfont icon-film search_sort"><span>MV</span></i>
      <ul>
        <li v-for="(item,index) in MVsList" :key="index"> {{item.name}}</li>
      </ul>
    </div>
  </div>

  <div ref="showHot" :class="{'search_hot_active':hotActive,'search_hot_hidden':!hotActive}">
    <div class="search_res_sort">
      <i class="iconfont icon-remen search_sort"><span>热门</span></i>
      <ul>
        <li v-for="(item,index) of HotList" :key="index"> {{item.first}}</li>
      </ul>
    </div>
  </div>

</template>

<script>
import axios from "@/plugin/axios";
// import {getSongs} from "@/plugin/axios";
export default {
  name: "navbarSearch",
  data () {
    return{
      keywords:"",
      songsList:[],
      artistsList:[],
      albumsList:[],
      MVsList:[],
      resActive:false,
      hotActive:false,
      HotList:[]
    }
  },
  methods:{
    refresh () {
      // setTimeout("console.log(this)",1000)
      this.$refs.showRes.style.visibility='visible';
      this.$refs.showHot.style.visibility='visible';
      axios({
        url: '/search/hot',  //热门搜索
        method: 'get'
      })
          .then(res => {
            this.HotList = res.data.result.hots
            this.HotList.length=5;
            console.log("热门搜索数据：", this.HotList)
          })
          .catch(err => {
            console.log(err)
          })
    },
    getSearch () {
      if (this.keywords === ""){  //如果搜索输入框为空，把搜索建议隐藏
        this.resActive = false
        this.hotActive = true
      }
      if (this.keywords){
        this.resActive = true
        axios({
          url: '/cloudsearch?keywords='+this.keywords+"&type=1",  //搜索单曲api
          method: 'get'
        })
            .then(res => {
              this.songsList = res.data.result.songs;
              this.songsList.length=4;
              // console.log("获取的单曲数据：", res)
            })
            .catch(err => {
              console.log(err)
            })

        axios({
          url: '/cloudsearch?keywords='+this.keywords+"&type=100",  //搜索歌手api
          method: 'get'
        })
            .then(res => {
              this.artistsList = res.data.result.artists;
              this.artistsList.length=2;
              // console.log("获取的歌手数据：", this.artistsList)
            })
            .catch(err => {
              console.log(err)
            })

        axios({
          url: '/cloudsearch?keywords='+this.keywords+"&type=10",  //搜索专辑api
          method: 'get'
        })
            .then(res => {
              this.albumsList = res.data.result.albums;
              this.albumsList.length=2;
              // console.log("获取的专辑数据：", this.albumsList)
            })
            .catch(err => {
              console.log(err)
            })

        axios({
          url: '/cloudsearch?keywords='+this.keywords+"&type=1006",  //搜索MVapi
          method: 'get'
        })
            .then(res => {
              this.MVsList = res.data.result.songs;
              this.MVsList.length=2;
              // console.log("获取的MV数据：", this.MVsList)
            })
            .catch(err => {
              console.log(err)
            })
        // getSongs({
        //   url:'/cloudsearch?keywords='+this.keywords+'&type=1',
        //   method: 'get'
        // })
        //     .then(res => {
        //       this.resList = res.data.result.songs;
        //       this.resList.length=4;
        //       // result.length = 4;
        //       // this.resList = result;
        //       console.log("获取的数据：", this.resList)
        //     })
        //     .catch(err => {
        //       console.log(err)
        //     })   //另一种方法，也许类似的可以在@/plugin/axios.js中能封装更多的请求方法？只传入keyword和type是否可行？
        //也许能剩下复制粘贴改代码的功夫，待改进
      }
    },
    searchBlur () {  //搜索框失焦时隐藏搜索建议
      this.resActive = false;
      this.hotActive =false;
    },
    searchFocus () {  //搜索框得到焦点时显示搜索建议
      if (this.keywords === ""){  //如果搜索输入框为空，把搜索建议隐藏
        this.resActive = false
        this.hotActive =true;
      }else
        this.resActive = true
    }
  }
}
</script>

<style scoped>
.search_form{
  /*background-color: blue;*/
  width: 50%;
  height: 40px;
  /*margin-top: 28px;*/
  margin: 28px auto 0px;
  border: 1px solid rgb(231,231,231);
  border-radius: 5px;
  font-size: 16px;
  text-align: center;
}
.search_form input{
  width: 80%;
  margin-top: 2px;
  height: 85%;
  /*background-color: aquamarine;*/
  border: none;
  outline: none;
  font-size: 14px;
}
.icon-iconfonticonfontsousuo1{
  /*background-color: red;*/
  font-size: 20px;
}
.icon-iconfonticonfontsousuo1:hover{
  color: #7c9aab;
  cursor: pointer;
}
.search_res_active{
  width: 50%;
  /*height: 350px;*/
  /*background-color: aquamarine;*/
  border: 1px solid rgb(231,231,231);
  background-color: rgba(255,255,255,1);
  margin: 0px auto;
  /*display: none;*/
  font-size: 12px;
  text-align: left;
  animation-name: active;
  animation-duration: 1s;
  animation-fill-mode: forwards;  /*注释会发现，在内容不能填满动画最后的高度时，高度会回弹到内容的高度*/
  overflow: hidden;
  z-index: 2;
}
.search_res_hidden{
  /*display: none;*/
  visibility: hidden;
  width: 50%;
  /*height: 350px;*/
  /*background-color: aquamarine;*/
  border: 1px solid rgb(231,231,231);
  background-color: rgba(255,255,255,1);
  margin: 0px auto;
  /*display: none;*/
  font-size: 14px;
  text-align: left;
  animation-name: hidden;
  animation-duration: 1s;
  animation-fill-mode: forwards;  /*注释会发现，在内容不能填满动画最后的高度时，高度会回弹到内容的高度*/
  overflow: hidden;
  z-index: 2;
}
.search_res_active ul , .search_res_hidden ul,
.search_hot_active ul , .search_hot_hidden ul{
  width: 100%;
  font-size: 16px;
  /*border: 1px solid black;*/
  position: relative;
  right: 40px;
  bottom: 15px;
  /*background-color: black;*/
}
.search_res_active li , .search_res_hidden li ,
.search_hot_active li , .search_hot_hidden li{
  width: 100%;
  padding-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
  cursor: pointer;
  /*border: 1px solid black;*/
  /*background-color: black;*/
  line-height: 30px;
}
.search_res_active li:hover , .search_res_hidden li:hover,
.search_hot_active li:hover , .search_hot_hidden li:hover{
  background-color: #7c9aab;
  color: #fff;
}
.search_sort{
  display: block;
  margin:5px 0 0 5px;
  font-size: 20px;
  /*background-color: black;*/
}
.search_sort span{
  font-size: 16px;
  margin-left: 8px;
  color: #999999;
}
.search_res_sort{
  /*margin-bottom: 30px;*/
  border-bottom:1px solid #e7e7e7;
}
.search_hot_active{
  width: 50%;
  /*height: 350px;*/
  background-color: aquamarine;
  border: 1px solid rgb(231,231,231);
  background-color: rgba(255,255,255,1);
  margin: 0px auto 3px auto;
  /*display: none;*/
  font-size: 12px;
  text-align: left;
  animation-name: hotActive;
  animation-duration: 1s;
  animation-fill-mode: forwards;  /*注释会发现，在内容不能填满动画最后的高度时，高度会回弹到内容的高度*/
  overflow: hidden;
  z-index: 1;
}
.search_hot_hidden{
  /*display: none;*/
  visibility: hidden;
  width: 50%;
  /*height: 350px;*/
  /*background-color: aquamarine;*/
  border: 1px solid rgb(231,231,231);
  background-color: rgba(255,255,255,1);
  margin: 0px auto;
  /*display: none;*/
  font-size: 14px;
  text-align: left;
  animation-name: hotHidden;
  animation-duration: 1s;
  animation-fill-mode: forwards;  /*注释会发现，在内容不能填满动画最后的高度时，高度会回弹到内容的高度*/
  overflow: hidden;
  z-index: 1;
}
@keyframes active {
  from{
    height: 0px;
  }
  to{
    height: 540px;
  }
}
@keyframes hidden {
  from{
    height: 540px;
  }
  to{
    height: 0px;
  }
}
@keyframes hotActive {
  from{
    height: 0px;
  }
  to{
    height: 210px;
  }
}
@keyframes hotHidden {
  from{
    height: 210px;
  }
  to{
    height: 0px;
  }
}
</style>