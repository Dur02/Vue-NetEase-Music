<template>
  <div class="login_area" v-show="$store.state.activeLogin">
    <div class="black_border">
      <p>登录<i class="iconfont icon-guanbi_o" @click="loginHidden"></i></p>
<!--      <button @click="change">切换</button>-->
    </div>
    <div v-if="How2 !== 3">
      <div class="login_fun">
        <div class="phoneInput">
          <input v-model="phone" type="text" name="phone" id="phone" placeholder="请输入手机号码">
        </div>
        <div v-if="How2 === 1">
          <div class="captchaInput">
            <input v-model="captcha" type="text" placeholder="请输入验证码" autocomplete="off">
          </div>
          <button class="getCaptcha" @click="getCaptcha" ref="captcha">获取验证码</button>
        </div>
        <div v-if="How2 === 2">
          <div class="passwordInput">
            <input v-model="password" type="password" placeholder="请输入密码" >
          </div>
        </div>
        <a href="javascript:(0)" @click="change" class="change" ref="choice" v-if="How2 === 1">密码登录</a>
        <a href="javascript:(0)" @click="change" class="change" ref="choice" v-if="How2 === 2">短信登录</a>
        <div class="login_btn" @click="login"><p>登录</p></div>
      </div>
      <div class="alert_inf" v-if="errorList.length > 0">
        <p class="alert_danger" role="alert" v-for="item in errorList">{{item}}</p>
<!--        {{errorList.join(';')}}-->
      </div>
    </div>
    <div v-if="How2 === 3" class="qrlogin_area">
      <img id="qrImg" :src="qrimg" alt="" @load="scanCheck">
      <p id="alert">请使用网易云音乐app扫码</p>
    </div>
    <div class="qrlogin_border">
      <p @click="qrWay" v-if="How2 !== 3">二维码登录</p>
      <p @click="qrWay" v-if="How2 === 3">手机登录</p>
    </div>
  </div>
</template>

<script>
import {getCaptcha,captchaLogin,passwordLogin,qrlogin} from "@/plugin/axios";

export default {
  name: "login",
  data() {
    return {
      phone:"",
      captcha:"",
      password:"",
      errorList:[],
      countdown:0,
      How2:1,
      key:"",
      qrimg:"",
      qrCheck:"",
      qrCheckCode:0,
      qrCookie:"",
      i:"",
    }
  },
  methods:{
    change (){
      if(this.How2 === 1){
        this.How2 =2
        this.errorList =[]
        // this.$refs.choice.
      }else{
        this.How2 = 1
        this.errorList =[]
      }
    },
    loginHidden () {
      this.$store.commit("activeHidden")
    },
    getCaptcha (){
      getCaptcha(this.phone)
          .then(res => {
            if(res.data.code !== 200){
              this.errorList = []
              this.errorList.push(res.data.message)
            }else{
              this.errorList = []
              this.errorList.push("验证码已发送")
            }
            console.log(res);
          })
          .catch(err => {
            console.log(err)
          })
    },
    validate () {
      this.errorList = []
      if(this.phone === ''){
        this.errorList.push('请输入手机号码');
      }else{
        // const regMobile = /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/
        const regMobile = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
        if (!regMobile.test(this.phone)) {
          this.errorList.push('请输入有效的手机号码');
        }else if(this.How2 === 1){
          if (this.captcha === '') {
            this.errorList.push('请输入验证码');
          } else {
            if (this.captcha.length < 4) {
              this.errorList.push('验证码长度不得少于4位');
            }
          }
        }else if(this.How2 === 2){
          if (this.password === '') {
            this.errorList.push('请输入密码');
          }
        }
      }
      return this.errorList.length <= 0;
    },
    login () {
      if(this.How2 === 1){
        if (this.validate()) {
         captchaLogin(this.phone,this.captcha)
             .then(res => {
                if(res.status !== 200){
                  this.errorList = []
                  this.errorList.push(res.data.message)
                }else if(res.status === 200){
                  location.reload()
                }
                console.log(res);
             })
             .catch(err => {
                this.errorList = []
                this.errorList.push("验证码错误")
             })
        }
      }
      if(this.How2 === 2){
        if (this.validate()) {
          passwordLogin(this.phone,this.password)
              .then(res => {
                if(res.data.code !== 200){
                  this.errorList = []
                  this.errorList.push(res.data.message)
                }else if (res.data.code === 200) {
                  location.reload()
                }
                console.log(res);
              })
              .catch(err => {
                console.log(err)
              })
        }
      }
    },
    qrWay (){
      if(this.How2!==3){
        this.How2 = 3
        this.errorList =[]
        qrlogin()
      }else{
        this.How2 = 1
        this.errorList =[]
      }
    }
  }
}
</script>

<style scoped>
.login_area{
  width: 530px;
  height: 375px;
  /*margin: 100px 0px 0px 700px;*/
  position: fixed;
  left: 35%;
  top: 25%;
  background-color: #fff;
  border: 1px solid #282828;
  /*border: 1px solid #000;*/
  box-shadow: 5px 5px 5px #888888;
  z-index: 9999;
}
.black_border{
  width: 100%;
  height: 40px;
  background-color: #282828;
  color: white;
  /*background-color: aqua;*/
  font-size: 14px;
  text-align: center;
}
.black_border p{
  margin: 0px 0px 0px 20px;
  padding-top: 5px;
  position: relative;
}
.black_border p i{
  /*background-color: white;*/
  /*margin-left: 100px;*/
  float: right;
  font-size: 16px;
}
.login_fun{
  text-align: center;
  position: relative;
  top: 40px;
  left: 160px;
}
.phoneInput,.passwordInput{
  /*background-color: aqua;*/
  border: 1px solid #282828;
  height: 30px;
  width: 220px;
  margin-bottom: 20px;
}
.captchaInput{
  border: 1px solid #282828;
  height: 30px;
  margin-bottom: 20px;
  width: 110px;
  position: absolute;
}
.phoneInput input,.passwordInput input{
  border: none;
  outline: none;
  height: 28px;
  width: 210px;
}
.captchaInput input{
  /*background-color: aqua;*/
  border: none;
  outline: none;
  height: 28px;
  width: 100px;
}
.getCaptcha{
  font-size: 14px;
  text-align: center;
  background-color: #fff;
  position: absolute;
  left: 123px;
  /*bottom: 10px;*/
  top: 22px;
  height: 35px;
  width: 100px;
  margin: 28px auto;
  line-height: 30px;
  border-radius: 5px;
  border: 1px solid #d7d7d7;
}
.login_btn{
  font-size: 14px;
  text-align: center;
  background-color: #fff;
  position: absolute;
  top: 100px;
  left: 54px;
  height: 35px;
  width: 100px;
  margin: 28px auto;
  line-height: 30px;
  border-radius: 5px;
  border: 1px solid #7c9aab;
}
.login_btn p{
  margin-top: 3px;
}
.getCaptcha:hover,.login_btn:hover{
  background-color: #7c9aab;
  color: #fff;
  cursor: pointer;
  /*border: none;*/
}
.alert_inf{
  position: absolute;
  /*background-color: #0077aa;*/
  width: 210px;
  top: 250px;
  left: 160px;
  /*bottom: 430px;*/
  font-size: 10px;
  color: #ff4500;
  text-align: center;
}
.change{
  position: absolute;
  top: 95px;
  right: 398px;
  font-size: 14px;
  color: #404040;
  text-decoration: none;
}
.change:hover{
  color: #7c9aab;
  text-decoration: underline;
}
.qrlogin_border{
  background-color: #e9e9e9;
  position: absolute;
  top: 335px;
  width: 100%;
  height: 40px;
  text-align: center;
}
.qrlogin_border p{
  /*color: white;*/
  font-size: 14px;
  cursor: pointer;
}
.qrlogin_border p:hover{
  color: #7c9aab;
  text-decoration: underline;
}
.qrlogin_area{
  text-align: center;
  margin-top: 50px;
}
#qrImg{

}
</style>