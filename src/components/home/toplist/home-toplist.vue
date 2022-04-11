<template>
  <div class="mod_section">
    <div class="main">
      <sider :list="list" @childrenValue="getId"/>
      <content :list="list" :id="id"/>
    </div>
  </div>
</template>

<script>
import {songUrl, topList} from "@/plugin/axios";
import Sider from "@/components/home/toplist/sider";
import Content from "@/components/home/toplist/content";
export default {
  name: "home-toplist",
  components: {Content, Sider},
  data(){
    return{
      list:[],
      id:-1
    }
  },
  beforeMount() {
    topList()
    .then(res=>{
      this.list = res.data.list
      this.id = this.list[0].id
    })
  },
  methods:{
    getId(id){
      this.id = id
    },
  }
}
</script>

<style scoped>
.mod_section{
  min-width: 1300px;
  /*background-color: aquamarine;*/
}
.main{
  width: 80%;
  margin: 0 auto;
  /*background-color: red;*/
}
</style>