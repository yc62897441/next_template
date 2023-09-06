import Link from 'next/link'
import styles from '../styles/Home.module.css'

import Layout from '../components/Layout'

export default function Home() {
    return (
        <Layout>
            <div className={styles.container}>
                <h1>首頁</h1>
                <div>使用 CSS module 範例</div>
            </div>
        </Layout>
    )
}
