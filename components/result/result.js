import React, { useState } from 'react'
import { Box, Button, Typography, useTheme } from '@mui/material'

import { useSpeedPuzzle } from '../../hooks'
import { bounceIn, bounceOut, InDown } from '../../styles'
import { PUZZLE_STATES } from '../../reducers/puzzleReducer'

export const Result = (props) => {
    const [open, setOpen] = useState(true)
    const theme = useTheme()
    const { custom } = theme
    const { reducer } = useSpeedPuzzle()
    const { dispatch } = reducer
    const onClick = () => {
        setOpen(false)
    }

    return (
        <Box
            sx={[custom.box, { animation: open ? `${bounceIn} 1s forwards` : `${bounceOut} 0.5s forwards` }]}
            onAnimationEnd={() => {
                !open && dispatch({ type: PUZZLE_STATES.LOADING })
            }
            }
        >
            <Typography variant="h1">This is the end !</Typography>
            <Typography variant="h3">{'Score : ' }</Typography>
            <Button variant="contained" sx={{ mt: 6 }} onClick={onClick} >Do it again !</Button>
        </Box>

    )
}

/*
<Typography sx={{ animation: `${InDown} 1s cubic-bezier(1, -0.55, 0.265, 2.55)` }} variant="h1">Bravo !</Typography>
                <Typography sx={{ animation: `${InDown} 1.2s cubic-bezier(0.6, -0.55, 0.265, 2.55)` }} variant="h3">{`Duration : ${state.timerValue && millisecondToMinutes(state.timerValue)}` }</Typography>
                <Typography sx={{ animation: `${InDown} 1.3s cubic-bezier(0.5, -0.55, 0.265, 2.55)` }} variant="h3">{`Moves : ${state.moves > 0 && state.moves}` }</Typography>
                <Typography sx={{ animation: `${InDown} 1.4s cubic-bezier(0.4, -0.55, 0.265, 2.55)` }} variant="h3">{`Complexity : ${state.complexity && state.complexity}` }</Typography>
 */
