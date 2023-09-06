// https://stackoverflow.com/questions/65936222/next-js-syntaxerror-unexpected-token-export
// 在 import 某些套件時會出現「SyntaxError "Unexpected token 'export'"」錯誤，是因為這些套件是用 ES6 語法 import/export module，而 Next.js 預設配置的 babel-loader 只會去 transpile 「src 資料夾」，並不會去處理 「node_modules 資料夾」，但瀏覽器無法識別 ES6 的寫法，所以產生錯誤。
// The reason is that, by default, Next.js configs the babel-loader to only transpile the ES6 code in the src folder, any ES6 code imported from node_modules will directly go into final bundle without transpiling.
// 處理方式如下：
// https://github.com/martpie/next-transpile-modules#readme
const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')(['counterup2']) // pass the modules you would like to see transpiled

module.exports = withPlugins([withTM], {
    // 如果我們要使用第三方的圖片，並且想要用 <Image /> 優化圖片檔案，就要在 next.config.js 中設定 domain
    images: {
        domains: ['fakestoreapi.com'],
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        })
        return config
    },

    // Styles take time to load - Next.js
    // https://stackoverflow.com/questions/74242349/styles-take-time-to-load-next-js
    // 解決剛載入網頁時，只有 HTML 結構卻沒有 CSS 樣式的問題，須等短暫秒數才會渲染 CSS 的問題。
    compiler: {
        styledComponents: true,
    },
})
