<template>
  <navbar/>
  <DailySongs/>
</template>

<script>
import Navbar from "@/components/navbar/navbar";
import DailySongs from "@/components/home/recommend/personal/daily-songs";
export default {
  name: "Recommend_Song",
  components: {DailySongs, Navbar}
}
</script>

<style scoped>

</style>
