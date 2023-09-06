import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

function MyDocument() {
    return (
        <Html lang="zh-hant">
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <title>Next</title>

                <meta name="description" content="Next.js 樣板" />
                <meta name="keywords" content="關鍵字1,關鍵字2,關鍵字3" />

                {/* <link rel="shortcut icon" href="/public/images/favicon.ico" />
                <link rel="apple-touch-icon" href="/public/images/favicon.ico" /> */}
                <link rel="shortcut icon" href="/static/favicon.ico" />
                <link rel="apple-touch-icon" href="/static/favicon.ico" />

                {/* Google Fonts */}
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,400i,600,700|Raleway:300,400,400i,500,500i,700,800,900"
                />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Noto+Sans" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Noto+Sans+TC"
                />
                <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/times-new-roman" />
            </Head>

            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

// Styles take time to load - Next.js
// https://stackoverflow.com/questions/74242349/styles-take-time-to-load-next-js
// 解決剛載入網頁時，只有 HTML 結構卻沒有 CSS 樣式的問題，須等短暫秒數才會渲染 CSS 的問題。
MyDocument.getInitialProps = async (ctx) => {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
            })

        const initialProps = await Document.getInitialProps(ctx)
        return {
            ...initialProps,
            styles: [initialProps.styles, sheet.getStyleElement()],
        }
    } finally {
        sheet.seal()
    }
}

export default MyDocument
