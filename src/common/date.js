export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
        }
    }
    return fmt
}

export function padLeftZero(str) {
    return ('00' + str).substr(str.length)
}

export function numberFix(num) {
    return num / 10000 >= 1
        ? (num / 10000).toFixed(2) + "w"
        : num / 1000 >= 1
            ? (num / 1000).toFixed(2) + "k"
            : num;
}

export function formatZero(num, len) {
    if (String(num).length > len) return num
    return (Array(len).join(0) + num).slice(-len)
}

export function formatTime(time) {
    // 取整
    time = ~~time
    let formatTime
    if (time < 10) {
        formatTime = '00:0' + time
    } else if (time < 60) {
        formatTime = '00:' + time
    } else {
        var m = ~~parseInt((time % (1000 * 60 * 60)) / (1000 * 60))
        if (m < 10) {
            m = '0' + m
        }
        var s = ~~parseInt((time % (1000 * 60)) / 1000)
        if (s < 10) {
            s = '0' + s
        }
        formatTime = m + ':' + s
    }
    return formatTime
}

export function formatSecondTime(interval) {
    interval = interval | 0
    const m = (interval / 60) | 0 // 获取 分数
    const s = interval % 60 //获取 秒数
    //补零返回
    return `${formatZero(m, 2)}:${formatZero(s, 2)}`
}
