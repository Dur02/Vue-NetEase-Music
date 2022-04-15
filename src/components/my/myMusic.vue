<template>
  <div class="mod-section">
    <div class="mod-block">
      <not-login v-if="!loginOrNot"/>
      <sider v-if="loginOrNot" @childrenValue="getFun" :uid="uid"/>
      <Content :type="type" :id="id" v-if="loginOrNot"/>
    </div>
  </div>
</template>

<script>
import {getLoginStatus} from "@/plugin/axios";
import NotLogin from "@/components/login/notLogin";
import Sider from  "@/components/my/sider"
import Content from "@/components/my/content"

export default {
  name: "my",
  components: {NotLogin,Sider,Content},
  data(){
    return{
      loginOrNot:false,
      uid:-1,
      type:3,
      id:-1
    }
  },
  methods: {
    getFun(type,id) {
      // console.log(type,id)
      this.type = type
      this.id = id
    }
  },
  beforeMount() {
    getLoginStatus()
      .then(res=>{
        // console.log(res)
        if (res.data.data.account !== null){
          this.loginOrNot = true
          this.uid = res.data.data.account.id
        }
      })
      .catch(err=>{
        console.log(err)
      })
  },
}
</script>

<style scoped>
.mod-section{
  min-width: 1300px;
  /*background-image: linear-gradient(#f2f2f2,#fafafa);*/
  position: relative;
  bottom: 0.5em;
}
.mod-block{
  width: 80%;
  margin: 0 auto;
  background-color: #fff;
}
</style>
