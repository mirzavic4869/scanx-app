import '@/styles/index.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <>
      <Head>
        <title>ScanX</title>
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </>
  )
}
