<template>
  <navbar></navbar>
  <home-recommend></home-recommend>
</template>

<script>
import navbar from "@/components/navbar/navbar";
import Categories from "@/components/categories/categories";
import homeRecommend from "@/components/home/recommend/home-recommend"

export default {
  name: 'Home',
  data() {
    return {
      flag:'recommend'
    }
  },
  components: {
    navbar,
    Categories,
    homeRecommend,
  },
  methods: {
    setFlag(identify) {
      this.flag = identify
    }
  }
}
</script>
<style scoped>

</style>
