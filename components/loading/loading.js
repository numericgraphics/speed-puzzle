import React, { memo, useContext, useEffect, useState } from 'react'
import styles from '../../styles/loading.module.css'
import { Fade } from '@mui/material'
import PuzzleContext from '../../providers/puzzleProvider'
import { PUZZLE_STATES } from '../../reducers/puzzleReducer'
import { millisecondToMinutes } from '../../utils'

const Loading = (props) => {
    const [fade, setFade] = useState(false)
    const { reducer } = useContext(PuzzleContext)
    const { dispatch, state } = reducer

    useEffect(() => {
        console.log('Loading - useEffect', props)
        setFade(true)
        setTimeout(() => {
            setFade(false)
            dispatch({ type: PUZZLE_STATES.END_LOADING })
        }, 5000)
    }, [])

    return (
        <Fade
            in={fade}
            addEndListener={(node, done) => {
                node.addEventListener('transitionend', () => {
                    console.log('callback animation ended')
                    done()
                })
            }}
        >
            <div className={styles.container}>
                <div className={styles.subContainer}>
                    <h1>Loading</h1>
                    <h3>{state.timerValue && millisecondToMinutes(state.timerValue)}</h3>
                </div>
            </div>
        </Fade>

    )
}

export default memo(Loading)
