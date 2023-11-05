import Head from 'next/head'
import Image from 'next/image'
import { Inter, Agbalumo } from 'next/font/google'

import styles from '@/styles/Home.module.css'
import ParallaxComponent from '@/components/ParallaxComponent'
import ContainerForm from '@/components/ContainerForm'
const inter = Inter({ subsets: ['latin'] })



export default function Home() {
  return (
    <>
      <Head>
        <title>Lista de Presença</title>
        <meta name="description" content="Lista de Presença Online" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <ParallaxComponent />
        <ContainerForm />
      </main>
    </>
  )
}
