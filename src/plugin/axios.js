import axios from "axios";
import qs from 'qs';

axios.defaults.withCredentials = true// 允许跨域设置，不然可能因为拿不到cookie而报错

axios.defaults.baseURL = 'http://localhost:3000/'   //这里的地址就是刚刚启起来的服务器地址

//请求拦截
axios.interceptors.request.use(
    config => {
        if (config.method === 'post' && !(config.data instanceof FormData)) {
            config.headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            config.data = qs.stringify(config.data, { arrayFormat: 'repeat' }) /*这里是，后端要求传数组的时候做的设置，以前出过错*/
        }
        return config
    }, error => {
        return Promise.reject(error)
    }
)

// 响应拦截
axios.interceptors.response.use(
    res => {
        /*可在这里根据返回的状态码做一些拦截操作*/
        return res
    }, err => {
        return Promise.reject(err)
        // return Promise.resolve(err)
    }
)

//搜索建议
export function searchAdvice (keywords) {
    const searchAdvice = axios({
        url: `/search/suggest?keywords=${keywords}`,  //搜索建议
        method: 'get'
    })
    return searchAdvice;
}

//热门搜索
export function searchHot (keywords) {
    const searchHot = axios({
        url: '/search/hot',  //热门搜索
        method: 'get'
    })
    return searchHot;
}

//获取验证码
export function getCaptcha (phone) {
    const getCaptcha = axios({
        url: `/captcha/sent?phone=${phone}`,  //获取验证码
        method: 'get'
    })
    return getCaptcha;
}

//验证码验证
export function verify (phone,captcha){
    const verify = axios({
        url: `/captcha/verify?phone=${phone}&captcha=${captcha}`,  //检验验证码
        method: 'get'
    })
    return verify
}

//验证码登录
export function captchaLogin (phone,captcha){
    const captchaLogin = axios({
        url: `/login/cellphone?phone=${phone}&captcha=${captcha}&timerstamp=${Date.now()}`,  //检验验证码
        method: 'post'
    })
    return captchaLogin
}

//密码登录
export function passwordLogin (phone,password){
    const passwordLogin = axios({
        url: `/login/cellphone?phone=${phone}&password=${password}&timerstamp=${Date.now()}`,
        method: 'post'
    })
    return passwordLogin
}

export async function checkStatus(key) {
    const res = await axios({
        url: `/login/qr/check?key=${key}&timerstamp=${Date.now()}`,
        withCredentials: true, //关键
    })
    // console.log(res)
    return res
}

export async function getLoginStatus() {
    const res = await axios({
        url: `/login/status?timerstamp=${Date.now()}`,
        withCredentials: true, //关键
    })
    console.log(res)
    if (res.data.data.account !== null){
        document.querySelector('#info').innerText = JSON.stringify(res.data.data.profile.nickname, null, 2)
    }
    return res
}

export async function qrlogin() {
    let timer
    await getLoginStatus()
    const res = await axios({
        url: `/login/qr/key?timerstamp=${Date.now()}`,
        withCredentials: true, //关键
    })
    const key = res.data.data.unikey
    const res2 = await axios({
        url: `/login/qr/create?key=${key}&qrimg=true&timerstamp=${Date.now()}`,
        withCredentials: true, //关键
    })
    document.querySelector('#qrImg').src = res2.data.data.qrimg

    timer = setInterval(async () => {
        const statusRes = await checkStatus(key)
        // const loginHidden = this.loginHidden
        console.log(statusRes)
        if (statusRes.data.code === 800) {
            document.querySelector('#alert').innerText = '验证码已过期,请重新获取'
            console.log(statusRes)
            clearInterval(timer)
        }
        else if(statusRes.data.code === 801) {
            document.querySelector('#alert').innerText = '请使用网易云音乐app扫码'
        }
        else if(statusRes.data.code === 802) {
            document.querySelector('#alert').innerText = '等待授权'
        }
        else if (statusRes.data.code === 803) {
            // 这一步会返回cookie
            clearInterval(timer)
            document.querySelector('#alert').innerText = '授权登录成功'
            console.log(statusRes)
            await getLoginStatus()
            location.reload()
        }
    }, 3000)
}

export default axios  /*记得导出*/
