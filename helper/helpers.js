// 取得目前 viewport 的高度
export function getScreenTop() {
    let bodyTop = 0
    if (typeof window.pageYOffset != 'undefined') {
        bodyTop = window.pageYOffset
    } else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
        bodyTop = document.documentElement.scrollTop
    } else if (typeof document.body != 'undefined') {
        bodyTop = document.body.scrollTop
    }
    return bodyTop
}
