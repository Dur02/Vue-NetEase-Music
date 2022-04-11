<template>
  <div class="error-info">
    <img src="@/assets/needToLogin.png" alt="加载失败">
    <h2>该功能需要登录才能使用</h2>
    <el-button-group style="margin: 0 auto">
      <el-button type="primary" @click="seeOther" >看看其他</el-button>
      <el-button type="primary" @click="loginNow" >现在登录</el-button>
    </el-button-group>
  </div>
</template>

<script>
export default {
  name: "notLogin",
  methods:{
    seeOther(){
      this.$router.push('/Home')
    },
    loginNow(){
      this.$store.commit('activeLogin')
    }
  }
}
</script>

<style scoped>
.error-info{
  height: 500px;
  text-align: center;
  padding-top: 50px;
}
</style>