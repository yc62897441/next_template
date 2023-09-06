import { useEffect, useState } from 'react'
import styled from 'styled-components'

import Layout from '../components/Layout'

const MessageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 40px 0 0;

    div {
        font-family: 'Noto Sans TC';
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        color: #595757;
    }

    @media (min-width: 768px) {
        margin: 150px 0 0;

        div {
            font-weight: 500;
            font-size: 36px;
        }
    }
`

export default function Custom404() {
    const [second, setSecond] = useState(50)

    // 秒數歸 0 時導回首頁
    if (second <= 0) {
        window.location.replace('/')
    }

    useEffect(() => {
        // 倒數秒數
        setInterval(() => {
            if (second >= 0) {
                setSecond((n) => n - 1)
            }
        }, 1000)
    }, [])

    return (
        <Layout>
            <MessageWrapper>
                <div>您造訪的頁面不存在</div>
                <div>{second} 秒後導回首頁</div>
            </MessageWrapper>
        </Layout>
    )
}
