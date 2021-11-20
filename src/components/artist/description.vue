<template>
  <div class="mod_desc">
    <div class="mod_block">
      <h4>简介</h4>
      <div class="txt">
        <p>{{desc.briefDesc}}</p>
      </div>
    </div>

    <div class="mod_block" v-for="item of this.desc.introduction">
      <h4>{{item.ti}}</h4>
      <div class="txt">
        <p>{{item.txt}}</p>
      </div>
    </div>

  </div>

</template>

<script>
import {artistDesc} from "@/plugin/axios";

export default {
  name: "description",
  data(){
    return{
      desc:[]
    }
  },
  beforeMount() {
    artistDesc(this.$route.query.id)
    .then(res=>{
      console.log(res)
      this.desc = res.data
      console.log(this.desc)
    })
    .catch(err=>{
      console.log(err)
    })
  }
}
</script>

<style scoped>
.mod_desc{
  width: 80%;
  margin: 0 auto;
  /*border: 1px solid #d5d5d5;*/
}
.mod_block{
  margin: 40px auto;
}
.txt{
  /*text-indent: 2em;*/
  white-space: pre-wrap;
}
.txt p{
  font-size: 14px;
  color: #666666;
  word-break: break-all;
  line-height: 30px;
}
</style>