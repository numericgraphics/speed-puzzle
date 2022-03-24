import React, { useState } from 'react'
import { Box, Button, Typography, useTheme } from '@mui/material'

import { useSpeedPuzzle } from '../../hooks'
import { bounceIn, bounceOut } from '../../styles'
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
