<template>
  <div class="login_area" v-show="$store.state.activeLogin">
    <div class="black_border">
      <p>登录<i class="iconfont icon-guanbi_o" @click="loginHidden"></i></p>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  methods:{
    loginHidden () {
      this.$store.commit("activeHidden")
    }
  }
}
</script>

<style scoped>
.login_area{
  width: 530px;
  height: 375px;
  margin: 100px 0px 0px 700px;
  position: fixed;
  /*background-color: aquamarine;*/
  border: 1px solid #282828;
  /*border: 1px solid #000;*/
  box-shadow: 5px 5px 5px #888888
}
.black_border{
  width: 100%;
  height: 40px;
  background-color: #282828;
  color: white;
  /*background-color: aqua;*/
  font-size: 14px;
  text-align: center;
}
.black_border p{
  margin: 0px;
  padding-top: 5px;
}
.black_border p i{
  /*background-color: white;*/
  /*margin-left: 100px;*/
  float: right;
  font-size: 16px;
}
</style>