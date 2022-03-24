import { styled } from '@mui/material/styles'

export const ImageSliceComponent = styled('div')(({
    index,
    state,
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
