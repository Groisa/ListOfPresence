import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useLayoutEffect, useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {

  const [loade, setLoade] = useState<boolean>(false)
  useLayoutEffect(() => {
    setTimeout(() => {
      setLoade(true)
    }, 50)
  }, [])
  return (
    <>
      {
        loade && <Component {...pageProps} />
      }
    </>
  )
}
