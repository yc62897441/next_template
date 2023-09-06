import React, { useState } from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

import '../styles/globals.css'

const GlobalStyle = createGlobalStyle`
/* 讓網頁平滑滾動 */
html {
  scroll-behavior: smooth;
}

body {
  overflow: ${({ isHideScrollbar }) => (isHideScrollbar ? 'hidden' : 'scroll')};
  overflow-x: hidden;
}
`

export default function App({ Component, pageProps }) {
    const [isHideScrollbar, setIsHideScrollbar] = useState(false)

    return (
        <>
            <GlobalStyle isHideScrollbar={isHideScrollbar} />
            {/* <ThemeProvider theme={theme}> */}
            <Component {...pageProps} setIsHideScrollbar={setIsHideScrollbar} />
            {/* </ThemeProvider> */}
        </>
    )
}
