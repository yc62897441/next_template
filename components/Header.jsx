import { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'

import { getScreenTop } from '../helper/helpers.js'

const HeaderWrapper = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 0 20px;
    background-color: #fefefe;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    z-index: 9998;

    @media (min-width: 768px) {
        justify-content: space-around;
        height: 55px;
        padding: 5px 0;
    }

    @media (min-width: 1600px) {
        height: 60px;
        padding: 10px 0;

        ${({ isHeaderShrink }) =>
            isHeaderShrink &&
            css`
                height: 55px;
                padding: 5px 0;
                transition: all 0.4s;
            `}
    }
`

const LogoContainer = styled.div`
    width: 41.42px;
    height: 25px;

    img {
        width: 100%;
        height: 100%;
    }

    @media (min-width: 768px) {
        width: 49.66px;
        height: 30px;

        img {
            width: 49.66px;
            height: 30px;
        }
    }

    @media (min-width: 1600px) {
        width: 74.15px;
        height: 45px;

        img {
            width: 74.15px;
            height: 45px;
        }

        ${({ isHeaderShrink }) =>
            isHeaderShrink &&
            css`
                width: 49.66px;
                height: 30px;
                transition: all 0.4s;

                img {
                    width: 49.66px;
                    height: 30px;
                }
            `}
    }
`

// 三條槓的外層容器
const BurgerContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;

    div {
        transition: all 0.4s;
    }

    /* 三條槓<-->叉叉 互相轉換 */
    ${({ isLinksBarDropdown }) =>
        isLinksBarDropdown &&
        css`
            div:nth-child(1) {
                position: absolute;
                transform: rotate(45deg);
            }
            div:nth-child(2) {
                position: absolute;
                transform: rotate(-45deg);
            }
            div:nth-child(3) {
                position: absolute;
                z-index: -9999;
                opacity: 0;
            }
        `}

    @media (min-width: 768px) {
        position: absolute;
        z-index: -9999;
        opacity: 0;
    }
`
const BurgerBar = styled.div`
    display: block;
    width: 20px;
    height: 2px;
    margin: 2px 0;
    background-color: #444444;
`

// 連結選單最外層
const LinksBarWrapper = styled.div`
    position: absolute;
    top: 100%;
    left: 0px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: #fefefe;
    z-index: -9999;
    opacity: 0;
    transform: scale(1, 0);
    transform-origin: top;
    transition: opacity 0.4s;

    /* 手機版按三條槓後顯示 LinksBarWrapper */
    ${({ isLinksBarDropdown }) =>
        isLinksBarDropdown &&
        css`
            z-index: 1;
            opacity: 1;
            transform: scale(1, 1);
        `}

    @media (min-width: 768px) {
        position: relative;
        top: 0;
        flex-direction: row;
        justify-content: flex-end;
        align-items: flex-end;
        width: 100%;
        max-width: 800px;
        height: 100%;
        padding-bottom: 5px;
        z-index: 1;
        opacity: 1;
        transform: scale(1, 1);
    }

    @media (min-width: 1600px) {
        padding-bottom: 0px;

        ${({ isHeaderShrink }) =>
            isHeaderShrink &&
            css`
                padding-bottom: 5px;
            `}
    }
`

const LinksGroupContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    width: 100%;
    padding: 6px 20px;
    background-color: #eeeeee;

    color: #444444;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;

    white-space: nowrap;
    cursor: pointer;

    > div:nth-child(1) {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        line-height: 23px;

        /* arrow_default 切換 arrow_active */
        ${({ active }) =>
            active &&
            css`
                color: #004da0;
            `}
    }

    @media (min-width: 768px) {
        width: auto;
        margin: 0 20px;
        background-color: #fefefe;
        padding: 0;

        :hover {
            color: #004da0;

            :after {
                position: absolute;
                top: 100%;
                content: '';
                display: block;
                width: 100%;
                height: 16px;
                background-color: #fefefe;
            }

            div:nth-child(2) {
                z-index: 1;
                opacity: 1;
                transform: scale(1, 1);
                border-top: 5px solid #004da0;
            }
        }
    }

    @media (min-width: 1200px) {
        margin: 0 30px;
    }
`

const LinksGroup = styled.div`
    position: absolute;
    top: calc(24px + 8px);
    left: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    background-color: #fefefe;
    transform: scale(1, 0);
    transform-origin: top;
    transition: transform 0.4s;

    a {
        width: 100%;
        padding: 6px 20px;
        border-bottom: 1px solid #fefefe;
        background-color: rgba(0, 77, 160, 0.1);
        color: #444444;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 23px;
        text-decoration: none;
        cursor: pointer;

        :hover {
            text-decoration: underline;
        }
    }

    /* 顯示細項連結列表 */
    ${({ show }) =>
        show &&
        css`
            position: relative;
            top: 8px;
            left: -20px;
            transform: scale(1, 1);
            width: calc(100% + 40px);
            background-color: #fefefe;
            z-index: 999;
            opacity: 1;
        `}

    @media (min-width: 768px) {
        position: absolute;
        top: calc(24px + 9px);
        width: auto;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

        a {
            padding: 6px 20px;
            background-color: #fefefe;

            :hover {
                text-decoration: none;
                background-color: rgba(0, 77, 160, 0.1);
            }
        }
    }
`

const Mask = styled.div`
    position: fixed;
    top: 50px;
    left: 0;
    display: none;
    width: 100vw;
    height: 100vh;
    background-color: #444444;
    opacity: 0.3;

    ${({ show }) =>
        show &&
        css`
            display: block;
        `}

    @media (min-width: 768px) {
        display: none;
    }
`

const data = [
    // 專案內部1
    {
        name: '專案內部1',
        url: '/inner',
        subLinks: [
            { name: 'A頁面', url: '/a' },
            { name: 'A頁面', url: '/b' },
        ],
    },
    // 專案內部2
    {
        name: '專案內部2',
        url: '/inner',
        subLinks: [
            { name: 'A頁面', url: '/a' },
            { name: 'A頁面', url: '/b' },
        ],
    },
    // 對外連結
    {
        name: 'Next.js 教學網',
        url: 'https://nextjs.tw/learn/foundations/about-nextjs',
        subLinks: [{ name: 'Next.js 教學網', url: '', target: '_blank' }],
    },
]

export default function Header() {
    const [isLinksBarDropdown, setIdLinksBarDropdown] = useState(false)
    const [show, setShow] = useState(null)
    const [isHeaderShrink, setIsHeaderShrink] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            // 如果銀幕切換到電腦版的尺寸(>=768px)，則把手機版時會展開的 LinksGroupContainer 都縮合起來
            if (window.innerWidth >= 768) {
                setShow(null)
                setIdLinksBarDropdown(false)
            }
        }
        const handleScroll = () => {
            // 畫面往下 scroll 超過 100px 時，把 Header 的高度變小
            const scrollPx = getScreenTop()
            if (scrollPx > 110) {
                setIsHeaderShrink(true)
            } else {
                setIsHeaderShrink(false)
            }
        }
        window.addEventListener('resize', handleResize)
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    // 手機版時，控制 LinksGroup 展開與縮合
    function handleShow(targetNo) {
        if (targetNo === show || window.innerWidth >= 768) {
            setShow(null)
        } else {
            setShow(targetNo)
        }
    }

    return (
        <HeaderWrapper isHeaderShrink={isHeaderShrink}>
            {/* LOGO */}
            <LogoContainer isHeaderShrink={isHeaderShrink}>
                <Link href={'/'}>
                    <Image
                        src="/images/next logo.png" // Route of the image file
                        width={46.4} // Desired size with correct aspect ratio
                        height={28} // Desired size with correct aspect ratio
                        sizes="(max-width: 768px) 46.4px, (max-width: 1600px) 55.63px, 79.1px"
                        alt="Logo"
                    />
                </Link>
            </LogoContainer>

            {/* 三條槓按鈕 */}
            <BurgerContainer
                onClick={() => {
                    setIdLinksBarDropdown((n) => !n)
                }}
                isLinksBarDropdown={isLinksBarDropdown}
            >
                <BurgerBar />
                <BurgerBar />
                <BurgerBar />
            </BurgerContainer>

            <LinksBarWrapper
                isLinksBarDropdown={isLinksBarDropdown}
                isHeaderShrink={isHeaderShrink}
            >
                {data.length > 0 &&
                    data.map((datum, index) => (
                        <LinksGroupContainer
                            key={'LinksGroupContainer' + index}
                            onClick={() => handleShow(index + 1)}
                            active={index + 1 === show}
                        >
                            <div>{datum.name}</div>
                            <LinksGroup show={index + 1 === show}>
                                {datum.subLinks.length > 0 &&
                                    datum.subLinks.map((subLink, subIndex) => (
                                        <Link
                                            key={'LinksGroup' + index + 'Link' + subIndex}
                                            href={datum.url + subLink.url}
                                            target={subLink.target}
                                        >
                                            {subLink.name}
                                        </Link>
                                    ))}
                            </LinksGroup>
                        </LinksGroupContainer>
                    ))}
            </LinksBarWrapper>

            {/* 手機版選單開啟時，遮罩 */}
            <Mask show={isLinksBarDropdown} />
        </HeaderWrapper>
    )
}
