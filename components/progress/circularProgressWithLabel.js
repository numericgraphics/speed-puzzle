import * as React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

export const CircularProgressWithLabel = (
    { value }
) => {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" value={100} thickness={22} />
            <CircularProgress variant="determinate" value={value} thickness={22} sx={{
                position: 'absolute'
            }}
            color="error"
            />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
            </Box>
        </Box>
    )
}
