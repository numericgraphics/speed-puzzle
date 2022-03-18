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
        setFade(true)
        setTimeout(() => {
            setFade(false)
        }, 2000)
    }, [])

    return (
        <Fade
            in={fade}
            addEndListener={(node, done) => {
                node.addEventListener('transitionend', () => {
                    !fade && dispatch({ type: PUZZLE_STATES.END_LOADING })
                    done()
                })
            }}
        >
            <div className={styles.container}>
                <h1>Loading</h1>
                <h3>{`Duration : ${state.timerValue && millisecondToMinutes(state.timerValue)}` }</h3>
                <h3>{`Moves : ${state.moves > 0 && state.moves}`}</h3>
                <h3>{`Complexity : ${state.complexity && state.complexity}`}</h3>
            </div>
        </Fade>

    )
}

export default memo(Loading)
