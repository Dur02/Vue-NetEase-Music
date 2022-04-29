<template>
  <div class="sider" @click="">
    <h4>云音乐特色榜</h4>
    <div v-for="item of list.slice(0,4)"
         style="height: 60px;margin-bottom: 16px;display: flex"
         :class="{'active':item.id === id}"
         @click="itemClick(item.id)"
    >
      <img :src="getImg(item)" alt="加载失败">
      <div class="special">
        <p class="title">{{item.name}}</p>
        <p class="frequency">{{item.updateFrequency}}</p>
      </div>
    </div>
    <h4>全球媒体榜</h4>
    <div v-for="item of list.slice(4,list.length)"
         style="height: 60px;margin-bottom: 16px;display: flex"
         :class="{'active':item.id === id}"
         @click="itemClick(item.id)"
    >
      <img :src="getImg(item)" alt="加载失败">
      <div class="special">
        <p class="title">{{item.name}}</p>
        <p class="frequency">{{item.updateFrequency}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sider",
  props:{
    list:Array
  },
  data(){
    return{
      id:-1
    }
  },
  methods:{
    getImg(item){
      return item.coverImgUrl + "?param=60y60"
    },
    itemClick(id){
      this.id = id
      this.$emit('childrenValue',this.id)
    }
  },
  watch:{
    list: function (newVal,oldVal){
      this.id = this.list[0].id
    }
  }
}
</script>

<style scoped>
.sider{
  float: left;
  padding-left: 14px;
  width: 18%;
  background-color: #f6f6f6;
}
.special{
  display: inline-block;
  /*background-color: #296fc7;*/
  height: 60px;
  /*width: 70%;*/
  flex: 2;
  font-size: 14px;
  /*margin-bottom: 16px;*/
}
.title , .frequency{
  margin: 5px 0 0 8px;
  overflow: hidden;
}
.frequency{
  color: #6d6d6d;
}
.active{
  background-color:#e6e6e6;
  /*height: 60px;*/
}
</style>
