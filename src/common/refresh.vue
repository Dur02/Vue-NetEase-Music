<template>

</template>

<script>
export default {
  name: "refresh",
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$router.replace(from.path)
      // 跳到该路由页面后，再替换为from.path来源路径
    })
  }
}
</script>

<style scoped>

</style>
