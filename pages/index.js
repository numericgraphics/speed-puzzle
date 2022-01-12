import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Puzzle} from "../components/puzzle"
import {PuzzleProvider} from "../providers/puzzleProvider"
import React from "react"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Speed Puzzle</title>
        <meta name="description" content="my puzzle" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <PuzzleProvider>
      <Puzzle/>
        </PuzzleProvider>
    </div>
  )
}
