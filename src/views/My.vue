<template>
  <navbar/>
  <my-music/>
</template>

<script>
import myMusic from '@/components/my/myMusic'
import Navbar from "@/components/navbar/navbar";
export default {
  name: "My",
  components:{Navbar, myMusic}
}
</script>

<style scoped>

</style>