<template>
  <button class="login" @click="activeLogin" v-if="status === 0">
    登录
  </button>
  <img :src="avatarUrl" alt="" class="avatarImg" v-if="status === 1">
</template>

<script>
import {getLoginStatus} from "@/plugin/axios";
export default {
  name: "navbar_login",
  data (){
    return{
      status:0,
      avatarUrl:"",
    }
  },
  methods:{
    activeLogin () {
      this.$store.commit('activeLogin')
    },
  },
  beforeMount() {
    getLoginStatus()
        .then(res => {
          if (res.data.data.account !== null){
            this.status = 1
            this.avatarUrl = res.data.data.profile.avatarUrl
          }
          // console.log(this.status)
          // console.log(res)
        })
  }
}
</script>

<style scoped>
.login{
  font-size: 16px;
  text-align: center;
  background-color: #fff;
  height: 40px;
  width: 50%;
  margin: 28px auto;
  line-height: 40px;
  border-radius: 5px;
  border: 1px solid rgb(231,231,231);
}
.login:hover{
  background-color: #7c9aab;
  color: #fff;
  cursor: pointer;
}
.avatarImg{
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-top: 25px;
}
</style>