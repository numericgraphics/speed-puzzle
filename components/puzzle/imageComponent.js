import { memo } from 'react'
import { styled } from '@mui/material/styles'

export const ImageSliceComponent = memo(styled('div')(({
    index,
    url,
    theme
}) => {
    console.log('ImageSliceComponent - render', url)
    return {
        [theme.breakpoints.up('xs')]: {
            width: 320,
            height: 80,
            background: `url(${url}) 0 ${
                -80 * index
            }px no-repeat`
        },
        [theme.breakpoints.up('md')]: {
            width: 480,
            height: 120,
            background: `url(${url}) 0 ${
                -120 * index
            }px no-repeat`
        },
        [theme.breakpoints.up('lg')]: {
            width: 600,
            height: 150,
            background: `url(${url}) 0 ${
                -150 * index
            }px no-repeat`
        }
    }
}))
