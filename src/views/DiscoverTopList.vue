<template>
  <navbar></navbar>
  <home-toplist/>
</template>

<script>
import homeToplist from "@/components/home/toplist/home-toplist"
import Navbar from "@/components/navbar/navbar";

export default {
  name: "DiscoverTopList",
  components:{Navbar, homeToplist}
}
</script>

<style scoped>

</style>