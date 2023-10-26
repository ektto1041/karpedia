import PortfolioScreen from '@/screens/portfolio/Portfolio'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Karpedia</title>
        <meta name='description' content='웹 개발 블로그 Karpedia 입니다.' />
      </Head>
      <PortfolioScreen />
    </>
  )
}
