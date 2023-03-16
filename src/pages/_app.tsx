import NavigationBar from '@/components/NavigationBar';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { SessionProvider } from "next-auth/react"
import Footer from '@/components/Footer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Head>
        <title>Karpedia</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavigationBar />
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
    
  );
}
