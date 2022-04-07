import React, { useEffect } from 'react'
import { Typography } from '@mui/material'

export const TestLayout2 = (props) => {
    useEffect(() => {
        console.log('TestLayout', props)
    }, [])
    return (
        <div

            // justifyContent="center"
            style={{
                height: '100vh',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <div
                style={{
                    alignSelf: 'flex-start'
                }}>
                <Typography variant="h2" component="h1" >
                    Header
                </Typography>
                <Typography variant="h5" component="h2" >
                    {'Pin a footer to the bottom of the viewport.'}
                    {'The footer will move as the main element of the page grows.'}
                </Typography>
                <Typography variant="body1">Header placeholder.</Typography>
            </div>

            <div>
                <Typography variant="h2" component="h1" >
                    Body
                </Typography>
                <Typography variant="h5" component="h2" >
                    {'Pin a footer to the bottom of the viewport.'}
                    {'The footer will move as the main element of the page grows.'}
                </Typography>
                <Typography variant="body1">Header placeholder.</Typography>
            </div>

            <div style={{
                alignSelf: 'flex-end'
            }}>
                <Typography variant="h2" component="h1" >
                    Sticky footer
                </Typography>
                <Typography variant="h5" component="h2" >
                    {'Pin a footer to the bottom of the viewport.'}
                    {'The footer will move as the main element of the page grows.'}
                </Typography>
                <Typography variant="body1">Sticky footer placeholder.</Typography>
            </div>

        </div>
    )
}
