import React, { useEffect, useState } from 'react'
import { Button, Fade, Typography } from '@mui/material'

import styles from '../../styles/loading.module.css'
import { useSpeedPuzzle } from '../../hooks'
import { InDown } from '../../styles'

export const Result = (props) => {
    const [fade, setFade] = useState(false)
    const { reducer } = useSpeedPuzzle()
    const { dispatch } = reducer

    useEffect(() => {
        setFade(true)
    }, [])

    return (
        <Fade
            in={fade}
        >
            <div className={styles.container}>
                <Typography sx={{ animation: `${InDown} 1s cubic-bezier(1, -0.55, 0.265, 2.55)` }} variant="h1">This is the end !</Typography>
                <Typography sx={{ animation: `${InDown} 1.2s cubic-bezier(0.6, -0.55, 0.265, 2.55)` }} variant="h3">{'Score : ' }</Typography>
                <Button variant="contained">Do it again !</Button>
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
