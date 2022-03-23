import '../styles/globals.css'
import React, { Fragment } from 'react'
import Head from 'next/head'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from '../themes'

function MyApp ({ Component, pageProps }) {
    return (
        <Fragment>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <title>Speed Puzzle</title>
            </Head>
            <CssBaseline />
            <style jsx global>{`
      body {
        background: rgb(255,255,255);
background: linear-gradient(248deg, rgba(255,255,255,1) 0%, rgba(255,251,225,1) 40%, rgba(255,220,0,0.4360337885154062) 100%)
      }
    `}</style>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </Fragment>
    )
}

export default MyApp
