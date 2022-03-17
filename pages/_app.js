import '../styles/globals.css'
import React, { Fragment } from 'react'
import Head from 'next/head'
import { ThemeProvider } from '@mui/material'
import { theme } from '../themes'

function MyApp ({ Component, pageProps }) {
    return (
        <Fragment>
            <Head>
                <title>Speed Puzzle</title>
            </Head>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </Fragment>
    )
}

export default MyApp
