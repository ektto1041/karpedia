import Head from 'next/head'
import { Inter } from '@next/font/google'
import HomeScreen from '@/screens'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <HomeScreen />
    </>
  )
}
