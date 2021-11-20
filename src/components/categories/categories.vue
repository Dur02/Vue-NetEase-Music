<template>
  <div class="categories_item">
    <p>{{title}}</p>
  </div>
</template>

<script>
export default {
  name: "categories",
  props:{
    title:String,
  }
}
</script>

<style scoped>
.categories_item{
  height: 50px;
  flex: 1;
  text-align: center;
  position: relative;
  z-index: 1;
}
.categories_item p{
  line-height: 25px;
  font-size: 15px;
}
.categories_item p:hover{
  color: #296fc7;
  cursor: pointer;
}
</style>