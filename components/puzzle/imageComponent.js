import React, { forwardRef, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { useSpeedPuzzle } from '../../hooks'
import { useTheme } from '@mui/material'

// eslint-disable-next-line react/display-name
export const ImageSliceComponent = forwardRef((props, ref) => {
    const { reducer } = useSpeedPuzzle()
    const { state } = reducer
    const theme = useTheme()

    useEffect(() => {
        // console.log('ImageSliceComponent - init', props)
    }, [])

    const ItemImage = styled('div')(({
        index,
        theme
    }) => ({
        [theme.breakpoints.up('xs')]: {
            width: 320,
            height: 80,
            background: `url(${state.imageUrl}) 0 ${
                -80 * index
            }px no-repeat`
        },
        [theme.breakpoints.up('md')]: {
            width: 480,
            height: 120,
            background: `url(${state.imageUrl}) 0 ${
                -120 * index
            }px no-repeat`
        },
        [theme.breakpoints.up('lg')]: {
            width: 600,
            height: 150,
            background: `url(${state.imageUrl}) 0 ${
                -150 * index
            }px no-repeat`
        }
    }))

    return (
        <div
            ref={ref}
            {...props}
        >
            <ItemImage index={props?.index} theme={theme} />
        </div>
    )
})
