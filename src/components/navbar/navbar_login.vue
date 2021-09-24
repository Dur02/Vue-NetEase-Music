<template>
  <button class="login" @click="activeLogin">
    登录
  </button>
</template>

<script>

export default {
  name: "navbar_login",
  methods:{
    activeLogin () {
      this.$store.commit('activeLogin')
    }
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
</style>