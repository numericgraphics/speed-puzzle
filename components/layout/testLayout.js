import React, { useEffect } from 'react'
import { Box, Container, Typography } from '@mui/material'

export const TestLayout = (props) => {
    useEffect(() => {
        console.log('TestLayout', props)
    }, [])
    return (
        <Container
            sx={{
                pt: 3,
                pl: 5,
                pr: 5,
                pb: 3,
                display: 'flex',
                flexWrap: 'wrap',
                height: '100vh',
                backgroundColor: 'pink'
            }}
        >
            <Box sx={{ p: 2, backgroundColor: 'green', alignSelf: 'flex-start' }} >
                <Typography variant="h2" component="h1" gutterBottom>
                    Header
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    {'Pin a footer to the bottom of the viewport.'}
                    {'The footer will move as the main element of the page grows.'}
                </Typography>
                <Typography variant="body1">Header placeholder.</Typography>
            </Box>

            <Box sx={{ backgroundColor: 'blue', alignSelf: 'center' }} >
                <Typography variant="h2" component="h1" gutterBottom>
                    Body
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    {'Pin a footer to the bottom of the viewport.'}
                    {'The footer will move as the main element of the page grows.'}
                </Typography>
                <Typography variant="body1">Header placeholder.</Typography>
            </Box>

            <Box sx={{ backgroundColor: 'orange', alignSelf: 'flex-end' }} >
                <Typography variant="h2" component="h1" gutterBottom>
                    Sticky footer
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    {'Pin a footer to the bottom of the viewport.'}
                    {'The footer will move as the main element of the page grows.'}
                </Typography>
                <Typography variant="body1">Sticky footer placeholder.</Typography>
            </Box>

        </Container>
    )
}
