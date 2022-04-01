import React, { Fragment, useEffect, useState } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { PUZZLE_STATES } from '../../reducers/puzzleReducer'
import { millisecondToSecond } from '../../utils'
import { useSpeedPuzzle } from '../../hooks'
import { bounceIn, bounceOut } from '../../styles'

export const Loading = (props) => {
    const [open, setOpen] = useState(true)
    const theme = useTheme()
    const { custom } = theme
    const { reducer } = useSpeedPuzzle()
    const { dispatch, state } = reducer

    useEffect(() => {
        setTimeout(() => {
            setOpen(false)
        }, 3000)
    }, [])

    return (
        <Box
            sx={[custom.box, { animation: open ? `${bounceIn} 0.8s` : `${bounceOut} 0.4s` }]}
            onAnimationEnd={() => {
                !open && dispatch({ type: PUZZLE_STATES.END_LOADING })
            }
            }
        >
            <Typography
                variant="h1"
                sx={{ mb: 4 }}
            >
                {state.timerValue ? 'Bravo !' : 'Loading'}
            </Typography>
            {state.timerValue &&
                <Fragment>
                    <Typography variant="h5">{`Duration : ${state.timerValue && millisecondToSecond(state.timerValue)}`}</Typography>
                    <Typography variant="h5">{`Moves : ${state.moves > 0 && state.moves}`}</Typography>
                    <Typography variant="h5">{`Complexity : ${state.complexity && state.complexity}`}</Typography>
                    <Typography variant="h5">{`Calcul 1 (moves > complexity): ${state.moves > state.complexity}`}</Typography>
                </Fragment>
            }
        </Box>

    )
}
