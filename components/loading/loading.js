import React, { useEffect, useState } from 'react'
import { Fade, keyframes, Typography } from '@mui/material'

import styles from '../../styles/loading.module.css'
import { PUZZLE_STATES } from '../../reducers/puzzleReducer'
import { millisecondToMinutes } from '../../utils'
import { useSpeedPuzzle } from '../../hooks'

const InDown = keyframes`
  from {
    transform: translate3d(0, -100%, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }`

export const Loading = (props) => {
    const [fade, setFade] = useState(false)
    const { reducer } = useSpeedPuzzle()
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
                <Typography sx={{ animation: `${InDown} 1s cubic-bezier(1, -0.55, 0.265, 2.55)` }} variant="h1">Bravo !</Typography>
                <Typography sx={{ animation: `${InDown} 1.2s cubic-bezier(0.6, -0.55, 0.265, 2.55)` }} variant="h3">{`Duration : ${state.timerValue && millisecondToMinutes(state.timerValue)}` }</Typography>
                <Typography sx={{ animation: `${InDown} 1.3s cubic-bezier(0.5, -0.55, 0.265, 2.55)` }} variant="h3">{`Moves : ${state.moves > 0 && state.moves}` }</Typography>
                <Typography sx={{ animation: `${InDown} 1.4s cubic-bezier(0.4, -0.55, 0.265, 2.55)` }} variant="h3">{`Complexity : ${state.complexity && state.complexity}` }</Typography>
            </div>
        </Fade>

    )
}

/*
<Typography sx={{ animation: `${InDown} 1s cubic-bezier(1, -0.55, 0.265, 2.55)` }} variant="h1">Bravo !</Typography>
                <Typography sx={{ animation: `${InDown} 1.2s cubic-bezier(0.6, -0.55, 0.265, 2.55)` }} variant="h3">{`Duration : ${state.timerValue && millisecondToMinutes(state.timerValue)}` }</Typography>
                <Typography sx={{ animation: `${InDown} 1.3s cubic-bezier(0.5, -0.55, 0.265, 2.55)` }} variant="h3">{`Moves : ${state.moves > 0 && state.moves}` }</Typography>
                <Typography sx={{ animation: `${InDown} 1.4s cubic-bezier(0.4, -0.55, 0.265, 2.55)` }} variant="h3">{`Complexity : ${state.complexity && state.complexity}` }</Typography>
 */
