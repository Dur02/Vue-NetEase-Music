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
    const res = axios({
        url: `/search/suggest?keywords=${keywords}`,  //搜索建议
        method: 'get'
    })
    return res;
}

//热门搜索
export function searchHot (keywords) {
    const res = axios({
        url: '/search/hot',  //热门搜索
        method: 'get'
    })
    return res;
}

//获取验证码
export function getCaptcha (phone) {
    const res = axios({
        url: `/captcha/sent?phone=${phone}`,  //获取验证码
        method: 'get'
    })
    return res;
}

//验证码验证
export function verify (phone,captcha){
    const res = axios({
        url: `/captcha/verify?phone=${phone}&captcha=${captcha}`,  //检验验证码
        method: 'get'
    })
    return res
}

//验证码登录
export function captchaLogin (phone,captcha){
    const res = axios({
        url: `/login/cellphone?phone=${phone}&captcha=${captcha}&timerstamp=${Date.now()}`,  //检验验证码
        method: 'post'
    })
    return res
}

//密码登录
export function passwordLogin (phone,password){
    const res = axios({
        url: `/login/cellphone?phone=${phone}&password=${password}&timerstamp=${Date.now()}`,
        method: 'post'
    })
    return res
}

// 检查二维码状态
export async function checkStatus(key) {
    const res = await axios({
        url: `/login/qr/check?key=${key}&timerstamp=${Date.now()}`,
        withCredentials: true, //关键
    })
    // console.log(res)
    return res
}

//检查登录状态
export async function getLoginStatus() {
    const res = await axios({
        url: `/login/status?timerstamp=${Date.now()}`,
        withCredentials: true, //关键
    })
    // console.log(res)
    if (res.data.data.account !== null){
        // document.querySelector('#info').innerText = JSON.stringify(res.data.data.profile.nickname, null, 2)
    }
    return res
}

//二维码登录
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
        else if(statusRes.data.code === 802) {
            document.querySelector('#alert').innerText = '等待授权'
        }
        else if (statusRes.data.code === 803) {
            // 这一步会返回cookie
            clearInterval(timer)
            document.querySelector('#alert').innerText = '授权登录成功'
            // console.log(statusRes)
            await getLoginStatus()
            location.reload()
        }
    }, 3000)
}

//歌单推荐
export function personalized() {
    const res = axios({
        url: `/personalized?limit=8`,
        method: 'get'
    })
    return res
}

//获取轮播图数据
export function banner() {
    const res = axios({
        url: `/banner`,
        method: 'get'
    })
    return res
}

//获取最新专辑
export function newestAlbum() {
    const res = axios({
        url: `/album/newest`,
        method: 'get'
    })
    return res
}

//获取排行榜摘要
export function topListDetail() {
    const res = axios({
        url: `/toplist/detail`,
        method: 'get'
    })
    // console.log(res)
    return res
}

//搜索
export function search(keyword,type) {
    const res = axios({
        url: `/search?keywords=${keyword}&type=${type}`,
        method: 'get'
    })
    // console.log(res)
    return res
}

//获取歌单详情
export function playlistDetail(id){
    const res = axios({
        url: `/playlist/detail?id=${id}`,
        method: 'get'
    })
    // console.log(res)
    return res
}

//根据个单的tracksId查询出全部歌曲信息
export function  songDetail(ids){
    const res = axios({
        url: `/song/detail?ids=${ids}`,
        method: 'get'
    })
    return res
}

//获取歌单详情
export function album(id){
    const res = axios({
        url: `/album?id=${id}`,
        method: 'get'
    })
    return res
}

//获取歌手信息，包括热门歌曲和部分信息
export function artist(id){
    const res = axios({
        url: `/artists?id=${id}`,
        method: 'get'
    })
    return res
}

//获取歌手前50首歌
export function artistTop(id){
    const res = axios({
        url: `/artist/top/song?id=${id}`,
        method: 'get'
    })
    return res
}

//获取歌手描述
export function artistDesc(id){
    const res = axios({
        url: `/artist/desc?id=${id}`,
        method: 'get'
    })
    return res
}

//获取歌手详情
export function artistDetail(id){
    const res = axios({
        url: `/artist/detail?id=${id}`,
        method: 'get'
    })
    return res
}

//获取歌手专辑
export function artistAlbum(id){
    const res = axios({
        url: `/artist/album?id=${id}`,
        method: 'get'
    })
    return res
}


export default axios  /*记得导出*/
