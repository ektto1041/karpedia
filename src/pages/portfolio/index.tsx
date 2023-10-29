import PortfolioScreen from "@/screens/portfolio/Portfolio";
import Head from "next/head";

export default function Portfolio() {
  return (
    <>
      <Head>
        <title>포트폴리오</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="개발자 Karpo의 포트폴리오입니다." />
      </Head>
      <PortfolioScreen />
    </>
  );
};