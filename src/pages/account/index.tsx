import AccountScreen from "@/screens/account";
import Head from "next/head";

export default function Account() {
  return (
    <>
      <Head>
        <title>계정 관리</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="계정 관리 페이지입니다." />
      </Head>
      <AccountScreen />
    </>
  );
}