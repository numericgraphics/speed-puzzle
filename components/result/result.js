import React, { useEffect, useState } from 'react'
import { Box, Button, Typography, useTheme } from '@mui/material'

import { useSpeedPuzzle } from '../../hooks'
import { bounceIn, bounceOut } from '../../styles'
import { PUZZLE_STATES } from '../../reducers/puzzleReducer'
import { useCheckUserScore } from '../../hooks/useCheckUserScore'
import { SignIn } from '../forms/signIn'

export const Result = (props) => {
    const { score } = props
    const [open, setOpen] = useState(undefined)
    const theme = useTheme()
    const { custom } = theme
    const { reducer } = useSpeedPuzzle()
    const { dispatch } = reducer
    const [scored] = useCheckUserScore(score)
    // const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (scored.value !== undefined) {
            setOpen(true)
        }
    }, [scored])

    const onClick = () => {
        setOpen(false)
    }
    // TODO - fix display issue between transition and data handling (loading, scored...)
    return (
        <Box
            sx={[custom.box, { animation: open ? `${bounceIn} 1s forwards` : `${bounceOut} 0.5s forwards` }]}
            onAnimationEnd={() => {
                !open && dispatch({ type: PUZZLE_STATES.RELOAD })
            }
            }
        >
            { scored?.value
                ? <>
                    <Typography variant="h1">Great Score !</Typography>
                    <Typography variant="h3" sx={{ m: 1 }}>{`Score : ${score.toFixed(3)}`}</Typography>
                    <SignIn score={score}/>
                </>
                : <>
                    <Typography variant="h1">This is the end !</Typography>
                    <Typography variant="h3" sx={{ m: 1 }}>{`Score : ${score.toFixed(3)}`}</Typography>
                    <Button variant="contained" sx={{ mt: 6 }} onClick={onClick}>Do it again !</Button>
                </>
            }
        </Box>

    )
}
