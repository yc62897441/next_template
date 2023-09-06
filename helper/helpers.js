// 計算 DOM 在網頁上高度位置的 function
export function findDomElementYPosition(target) {
    let obj = target
    let currentY = 0
    while (obj) {
        currentY += obj.offsetTop // HTMLElement.offsetTop對於屬性來說，它返回當前元素相對於其offsetParent元素的頂部內邊距的距離。
        if (obj.offsetParent) {
            obj = obj.offsetParent
        } else {
            return currentY
        }
    }
    return currentY
}

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
