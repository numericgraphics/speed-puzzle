import '../styles/globals.css'
import React, {Fragment} from "react"
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
      <Fragment>
          <Head>
              <meta name="viewport" content="initial-scale=1, width=device-width" />
              <title>Puzzle</title>
          </Head>
        <Component {...pageProps} />
      </Fragment>
  )
}

export default MyApp
