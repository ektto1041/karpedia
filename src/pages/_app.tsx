import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import Footer from '@/components/Footer';
import NavigationBar from '@/components/NavigationBar/NavigationBar';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Karpedia</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="naver-site-verification" content="583881dd6e1c6455ab1e938bd4797cc041751d5a" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavigationBar />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}
