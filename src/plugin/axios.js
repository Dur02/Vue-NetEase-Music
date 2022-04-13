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
    return axios({
        url: `/search/suggest?keywords=${keywords}&timerstamp=${Date.now()}`,  //搜索建议
        method: 'get'
    });
}

//热门搜索
export function searchHot () {
    return axios({
        url: `/search/hot`,  //热门搜索
        method: 'get'
    });
}

//获取验证码
export async function getCaptcha (phone) {
    return axios({
        url: `/captcha/sent?phone=${phone}`,  //获取验证码
        method: 'get'
    });
}

//验证码验证
export async function verify (phone,captcha){
    return axios({
        url: `/captcha/verify?phone=${phone}&captcha=${captcha}`,  //检验验证码
        method: 'get'
    })
}

//验证码登录
export async function captchaLogin (phone,captcha){
    return axios({
        url: `/login/cellphone?phone=${phone}&captcha=${captcha}&timerstamp=${Date.now()}`,  //检验验证码
        method: 'post'
    })
}

//密码登录
export async function passwordLogin (phone,password){
    return axios({
        url: `/login/cellphone?phone=${phone}&password=${password}&timerstamp=${Date.now()}`,
        method: 'post'
    })
}

// 检查二维码状态
export async function checkStatus(key) {
    // console.log(res)
    return await axios({
        url: `/login/qr/check?key=${key}&timerstamp=${Date.now()}`,
        withCredentials: true, //关键
    })
}

//检查登录状态
export async function getLoginStatus() {
    const res = await axios({
        url: `/login/status?timerstamp=${Date.now()}`,
        withCredentials: true, //关键
    })
    // console.log("sssss",res)
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
export async function personalized() {
    return axios({
        url: `/personalized?limit=8`,
        method: 'get'
    })
}

//获取轮播图数据
export async function banner() {
    return axios({
        url: `/banner`,
        method: 'get'
    })
}

//获取最新专辑
export async function newestAlbum() {
    return axios({
        url: `/album/newest`,
        method: 'get'
    })
}

//获取排行榜摘要
export async function topListDetail() {
    // console.log(res)
    return axios({
        url: `/toplist/detail`,
        method: 'get'
    })
}

//搜索
export async function search(keyword,type,limit,offset) {
    // console.log(limit)
    let res = axios({
        url: `/search?keywords=${keyword}&type=${type}&limit=${limit}&offset=${offset}&timerstamp=${Date.now()}`,
        method: 'get'
    })
    return res
}

//获取歌单详情
export async function playlistDetail(id){
    // console.log(res)
    return axios({
        url: `/playlist/detail?id=${id}`,
        method: 'get'
    })
}

//根据歌单的tracksId查询出全部歌曲信息,或者获取某一个歌曲的信息
export async function songDetail(ids){
    return axios({
        url: `/song/detail?ids=${ids}`,
        method: 'get'
    })
}

//获取专辑详情
export async function album(id){
    return axios({
        url: `/album?id=${id}`,
        method: 'get'
    })
}

//获取歌手信息，包括热门歌曲和部分信息
export async function artist(id){
    return axios({
        url: `/artists?id=${id}`,
        method: 'get'
    })
}

//获取歌手前50首歌
export async function artistTop(id){
    return axios({
        url: `/artist/top/song?id=${id}`,
        method: 'get'
    })
}

//获取歌手描述
export async function artistDesc(id){
    return axios({
        url: `/artist/desc?id=${id}`,
        method: 'get'
    })
}

//获取歌手详情
export async function artistDetail(id){
    return axios({
        url: `/artist/detail?id=${id}`,
        method: 'get'
    })
}

//获取歌手专辑
export async function artistAlbum(id,offset){
    return axios({
        url: `/artist/album?id=${id}&offset=${offset}`,
        method: 'get'
    })
}

//获取MV数据，不包括地址
export async function mvDetail(id){
    return axios({
        url: `/mv/detail?mvid=${id}`,
        method: 'get'
    })
}

//获取MV地址,可通过mvDetail获取分辨率列表，用参数r传入，默认1080p，暂时放置
export async function mvUrl(id){
    return axios({
        url: `/mv/url?id=${id}`,
        method: 'get'
    })
}

//传入type, 资源id可获得对应资源热门评论
export async function hotCommont(id,type,limit){
    return axios({
        url: `/comment/hot?id=${id}type=${type}`,
        method: 'get'
    })
}

//获取歌手的mv
export async function artistMv(id,offset){
    return axios({
        url: `/artist/mv?id=${id}&limit=20&offset=${offset}`,
        method: 'get'
    })
}

//根据音乐的id获取音乐url
export async function songUrl(id){
    return axios({
        url: `/song/url?id=${id}`,
        method: 'get'
    })
}

//获取歌词
export async function lyric(id){
    return axios({
        url: `/lyric?id=${id}`,
        method: 'get'
    })
}

//获取单曲评论
export async function songComment(id,offset){
        return axios({
            url: `/comment/music?id=${id}&offset=${offset}`,
            method: 'get'
        })
}

//获取歌单评论
export async function playlistComment(id,offset){
    return axios({
        url: `/comment/playlist?id=${id}&offset=${offset}`,
        method: 'get'
    })
}

//获取专辑评论
export async function albumComment(id,offset){
    return axios({
        url: `/comment/album?id=${id}&offset=${offset}`,
        method: 'get'
    })
}

//获取MV评论
export async function MVComment(id,offset){
    return axios({
        url: `/comment/mv?id=${id}&offset=${offset}`,
        method: 'get'
    })
}

//获取用户歌单
export async function userPlaylist(uid,limit,offset){
    return axios({
        url: `/user/playlist?uid=${uid}&limit=${limit}&offset=${offset}`,
        method: 'get'
    })
}

//获取歌手全部歌曲
export async function artistAllSongs(id,limit,offset){
    return axios({
        url: `/artist/songs?id=${id}&limit=${limit}&offset=${offset}`,
        method: 'get'
    })
}

//获取全部榜单
export async function topList(){
    return axios({
        url: `/toplist`,
        method: 'get'
    })
}

//获取全部歌单分类
export async function catlist(){
    return axios({
        url: `/playlist/catlist`,
        method: 'get'
    })
}

//获取全部歌单分类
export async function topPlaylist(order,cat,limit,offset){
    return axios({
        url: `/top/playlist?order=${order}&cat=${cat}&limit=${limit}&offset=${offset}`,
        method: 'get'
    })
}

//获取歌手
export async function artistList(type,area,initial,limit,offset){
    return axios({
        url: `/artist/list?type=${type}&area=${area}&initial=${initial}&limit=${limit}&offset=${offset}`,
        method: 'get'
    })
}

//获取全部新碟
export async function allAlbum(area,limit,offset){
    return axios({
        url: `/album/new?area=${area}&limit=${limit}&offset=${offset}`,
        method: 'get'
    })
}

//获取用户订阅的各种资源数量
export async function userSubCount(){
    return axios({
        url: `/user/subcount`,
        method: 'get'
    })
}


export default axios  /*记得导出*/
