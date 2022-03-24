import React, { useEffect, useState } from 'react'
import { Box, Button, Typography, useTheme } from '@mui/material'

import { useSpeedPuzzle } from '../../hooks'
import { bounceIn, bounceOut } from '../../styles'
import { PUZZLE_STATES } from '../../reducers/puzzleReducer'

export const Init = (props) => {
    const [open, setOpen] = useState(true)
    const theme = useTheme()
    const { custom } = theme
    const { reducer } = useSpeedPuzzle()
    const { dispatch } = reducer
    const onClick = () => {
        setOpen(false)
    }

    useEffect(() => {

    }, [])

    return (
        <Box
            sx={[custom.box, { animation: open ? `${bounceIn} 1s forwards` : `${bounceOut} 0.5s forwards` }]}
            onAnimationEnd={() => {
                !open && dispatch({ type: PUZZLE_STATES.LOADING })
            }
            }
        >
            <Typography variant="h1" sx={{ mb: 4 }} >Speedy Puzzle</Typography>
            <Typography variant="h4">Put the elements back in order to reconstitute the picture. Take your time, make as few moves as possible...</Typography>
            <Button variant="contained" sx={{ mt: 6 }} onClick={onClick}>Go !</Button>
        </Box>

    )
}
