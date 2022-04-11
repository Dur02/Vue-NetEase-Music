<template>
  <div class="mod-section">
    <div class="select-area">
      <h4>音乐类型</h4>
      <div style="margin-left: 30px">
        <span v-for="(value,key) in area">
          <span class="tag" :class="{'actice':key === tag.areaTag}" @click="changeTag(1,key)">
            {{value}}
          </span><span class="block">|</span>
        </span>
      </div>
      <h4>歌手类型</h4>
      <div style="margin-left: 30px">
        <span v-for="(value,key) in type">
          <span class="tag" :class="{'actice':key === tag.typeTag}" @click="changeTag(2,key)">
            {{value}}
          </span><span class="block">|</span>
        </span>
      </div>
      <h4>名字首字母</h4>
      <div style="margin-left: 30px">
        <span v-for="(value,key) in initial">
          <span class="tag" :class="{'actice':key === tag.initialTag}" @click="changeTag(3,key)">
            {{value}}
          </span><span class="block">|</span>
        </span>
      </div>
      <div class="mod_block">
        <div class="mod_playlist" v-for="item of dataSource" :key="item.id">
          <div class="mod_pic">
            <img :src="getUrl(item)" class="artist-pic" alt="加载失败" @click="toArtist(item.id)">
          </div>
          <div class="mod_name">
            <span class="artist-name" @click="toArtist(item.id)">{{item.name}}</span>
          </div>
        </div>
      </div>
      <div style="width: 100%;text-align: center">
        <el-button-group style="margin: 0 auto">
          <el-button type="primary" @click="addOffset(-30)" :disabled="this.offset === 0">上一页</el-button>
          <el-button type="primary" @click="addOffset(30)" :disabled="this.disabled">下一页</el-button>
        </el-button-group>
      </div>
    </div>
  </div>
</template>

<script>
import {artistList} from '@/plugin/axios'

export default {
  name: "home-artist",
  data(){
    return {
      area:{'-1':'全部','7':'华语','96':'欧美','8':'日本','16':'韩国','0':'其他'},
      type:{'-1':'全部','1':'男歌手','2':'女歌手','3':'乐队'},
      initial:{'-1':'全部','A':'A','B':'B','C':'C','D':'D','E':'E','F':'F','G':'G','H':'H','I':'I','J':'J', 'K':'K','L':'L','M':'M',
        'N':'N','O':'O','P':'P','Q':'Q','R':'R','S':'S','T':'T','U':'U','V':'V','W':'B','X':'X','Y':'Y','Z':'Z','0':'其他'},
      tag:{'areaTag':'-1','typeTag':'-1','initialTag':'-1'},
      offset:0,
      dataSource:[],
      disabled:false
    }
  },
  beforeMount() {
    artistList(this.tag.typeTag,this.tag.areaTag,this.tag.initialTag,30,this.offset)
      .then(res=> {
        console.log(res)
        this.dataSource = res.data.artists
        this.disabled = !res.data.more
      })
      .catch(err=>{
        console.log(err)
      })
  },
  methods:{
    toArtist(id){
      this.$router.push({path:'/Artist',query:{id:id}})
    },
    getUrl(item){
      // console.log(url)
      return item.img1v1Url + "?param=120y120"
    },
    changeTag(int,tag){
      switch (int){
        case 1:
          this.tag.areaTag = tag
          break
        case 2:
          this.tag.typeTag = tag
          break
        case 3:
          this.tag.initialTag = tag
          break
      }
      this.offset = 0
      artistList(this.tag.typeTag,this.tag.areaTag,this.tag.initialTag,30,this.offset)
          .then(res=> {
            this.dataSource = res.data.artists
            this.disabled = !res.data.more
          })
          .catch(err=>{
            console.log(err)
          })
    },
    addOffset(int){
      this.offset += int
      artistList(this.tag.typeTag,this.tag.areaTag,this.tag.initialTag,30,this.offset)
          .then(res=> {
            this.dataSource = res.data.artists
            this.disabled = !res.data.more
          })
          .catch(err=>{
            console.log(err)
          })
    }
  },
}
</script>

<style scoped>
h4{
  padding-left: 28px;
}
.mod-section{
  min-width: 1300px;
  background-image: linear-gradient(#f2f2f2,#fafafa);
  position: relative;
  bottom: 0.5em;
}
.select-area{
  width: 80%;
  margin: 0 auto;
  background-color: #fff;
}
.tag:hover{
  color: #296fc7;
  text-decoration: underline;
}
.actice{
  color: #296fc7;
}
.block{
  margin: 0 10px;
  color: #d8d8d8;
}
.mod_block{
  background-color: #fff;
  width: 100%;
  margin: 0 auto;
}
.mod_playlist{
  width: 15%;
  height: 100%;
  margin: 20px 30px;
  overflow: hidden;
  display: inline-grid;
}
.mod_pic{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.artist-pic{
  width: 100%;
  height: 100%;
  margin: 0 auto;
  transition: transform .75s;
  -webkit-transition: transform .75s;
  display: block;
}
.artist-pic:hover{
  transform: scale(1.1) translateZ(0);
  -webkit-transform: scale(1.1) translateZ(0);
}
.mod_name{
  margin: 10px auto;
}
.artist-name{
  width: 21%;
  margin: 20px auto;
  font-size: 15px;
}
.artist-name:hover{
  color: #296fc7;
}
</style>