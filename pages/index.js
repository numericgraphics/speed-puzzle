import React from 'react'
// import styles from '../styles/Home.module.css'
import { Puzzle } from '../components'
import { PuzzleProvider } from '../providers'

export default function Home () {
    return (
        <>
            <PuzzleProvider>
                <Puzzle/>
            </PuzzleProvider>
        </>
    )
}
