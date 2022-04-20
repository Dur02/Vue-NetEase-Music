import { createStore } from 'vuex'
import {getLoginStatus, personalFm, recommendSongs, songDetail, songUrl, userPlaylist} from "@/plugin/axios";

export default createStore({
  state: {
    activeLogin:false,
    songUrl:[],  //存放歌单或专辑中所有歌曲的url,数据为各歌曲的url地址，但不根据歌单排序，需要额外数据配合处理
    playing:-1,  //标记正在播放的歌曲id
    userPlaylist:[], //存放用户的播放列表，每个数据存储着歌曲的id和其他信息，因为按歌单排序使用可以配合songUrl进行歌曲的切换
    playerMode:0,  //播放模式，0为顺序，1为随机，2为单曲
    isPlay:false, //音乐是否播放
    drawerFlag:false, //drawer的绑定数据
    lyricFlag:false, //歌词详情页标志
    value:-1,
    isPersonalFm:false
  },
  mutations: {
    activeLogin (state) {
      state.activeLogin = true
    },
    activeHidden (state) {
      state.activeLogin = false
    },
    addSong(state,songUrl){  //不重复的把歌曲的地址加入，否则多次点击会导致同一歌曲的地址重复加入
      state.songUrl = state.songUrl.concat(songUrl)
      let temp = []
      for(let item1 of state.songUrl){  //循环数组对象的内容
        let flag = true;  //建立标记，判断数据是否重复，true为不重复
        for(let item2 of temp){  //循环新数组的内容
          if(item1.id === item2.id){ //让数组对象的内容与新数组的内容作比较，相同的话，改变标记为false
            flag = false;
          }
        }
        if(flag){ //判断是否重复
          temp.push(item1); //不重复的放入新数组。  新数组的内容会继续进行上边的循环。
        }
        state.songUrl = temp
      }
      // console.log(this.state.songUrl.length)
    },
    markSong(state,songId){
      state.playing = songId
      // console.log(state.playing)
    },
    changeSong(state,num){
      if (state.playing !== -1 && (state.playerMode === 0 || this.state.playerMode === 2) )
      {  //顺序播放或单曲循环
        let temp = state.userPlaylist.indexOf(state.userPlaylist.filter(element => element.id === state.playing)[0])
        if (temp === state.userPlaylist.length-1 && num === 1){  //如果播放的时列表最后一首，播放下一首时跳回第一首
          state.playing = state.userPlaylist[0].id
          // console.log("first")
        }else if (temp === 0 && num === -1){   //播放第一首时切换上一首将切换到列表最后一首
          state.playing = this.state.userPlaylist[state.userPlaylist.length-1].id
          // console.log("last")
        }else {
          state.playing = state.userPlaylist[temp+num].id
          // console.log(state.playing)
        }
      }
      else if (state.playing !== -1 && state.playerMode === 1)
      {   //随机播放
        if (state.userPlaylist.length !== 1) {
          let temp = -1
          while (temp === state.playing || temp === -1) {  //当随机到的歌曲未正在播放的歌曲，再次随机
            temp = state.userPlaylist[Math.floor(Math.random() * state.userPlaylist.length)].id
          }
          state.playing = temp
        }
      }
    },
    insertList(state,userPlaylist) {
      state.userPlaylist = userPlaylist
    },
    changePlayerMode(state,num){
      state.playerMode = num
    },
    playOrStop(state,boolean){
      state.isPlay = boolean
    },
    set_drawerFlag(state,boolean){
      state.drawerFlag = boolean
    },
    set_lyricFlag(state,boolean){
      state.lyricFlag = boolean
    },
    change_value(state,value){
      state.value = value
    },
    change_isPersonalFm(state,bool){
      state.isPersonalFm = bool
    },
    fmNextSong(state){  //处理私人Fm换歌
      // console.log(state.songUrl)
      personalFm()
        .then(res=>{
          console.log(res)
          let trackIds = ""
          trackIds += res.data.data.map((item)=>{
            return (item.id)
          })
          songDetail(trackIds)
            .then(res=>{
              // console.log(res)
              state.songs = res.data.songs
              songUrl(trackIds)
                .then(res=>{
                  state.songUrl = res.data.data
                  state.playing = state.songs[0].id
                })
                .catch(err=>{
                  console.log(err)
                })
            })
            .catch(err=>{
              console.log(err)
            })
        })
        .catch(err=>{
          console.log(err)
        })
    }
  },
  actions: {

  },
  modules: {

  }
})
