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
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </Fragment>
    )
}

export default MyApp
