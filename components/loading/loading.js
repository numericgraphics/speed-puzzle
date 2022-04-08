import React, { Fragment, useEffect, useState } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { PUZZLE_STATES } from '../../reducers/puzzleReducer'
import { millisecondToSecond } from '../../utils'
import { useSpeedPuzzle } from '../../hooks'
import { bounceIn, bounceOut, spinColor, spinColorRevered } from '../../styles'

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
        <>
            <Box
                sx={[custom.box, { animation: open ? `${bounceIn} 0.8s` : `${bounceOut} 0.4s`, zIndex: 1 }]}
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
                    <Typography variant="h3">{`Your score : ${score.computedScore.toFixed(2)}`}</Typography>
                </Fragment>
                }
            </Box>
            <Box sx={{
                position: 'absolute',
                margin: 'auto',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                width: 100,
                height: 500,
                background: 'red',
                opacity: 0,
                animation: open ? `${spinColor} 0.7s forwards` : `${spinColorRevered} 0.5s forwards`
            }} />
        </>
    )
}
