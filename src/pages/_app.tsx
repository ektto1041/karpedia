import NavigationBar from '@/components/NavigationBar';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
// import { SessionProvider } from "next-auth/react"
import Footer from '@/components/Footer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    // <SessionProvider>
    <>
      <Head>
        <title>Karpedia</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="naver-site-verification" content="583881dd6e1c6455ab1e938bd4797cc041751d5a" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavigationBar />
      <Component {...pageProps} />
      <Footer />
    {/* </SessionProvider> */}
    </>

  );
}
