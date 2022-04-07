import React, { Fragment, useEffect, useState } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { PUZZLE_STATES } from '../../reducers/puzzleReducer'
import { millisecondToSecond } from '../../utils'
import { useSpeedPuzzle } from '../../hooks'
import { bounceIn, bounceOut } from '../../styles'

export const Loading = (props) => {
    const { score } = props
    const [open, setOpen] = useState(true)
    const theme = useTheme()
    const { custom } = theme
    const { reducer } = useSpeedPuzzle()
    const { dispatch } = reducer

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
                {score ? 'Bravo !' : 'Loading'}
            </Typography>
            {score &&
                <Fragment>
                    <Typography variant="h6">{`Duration : ${score.timerValue && millisecondToSecond(score.timerValue)}`}</Typography>
                    <Typography variant="h6">{`Moves : ${score.moves > 0 && score.moves}`}</Typography>
                    <Typography variant="h6">{`Complexity : ${score.complexity && score.complexity}`}</Typography>
                    <Typography variant="h3">{`Your score : ${score.computedScore}`}</Typography>
                </Fragment>
            }
        </Box>

    )
}
