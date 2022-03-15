import React, {useState, useEffect, useRef, forwardRef, useContext} from 'react'
import PuzzleContext from "../providers/puzzleProvider"

const ImageSliceComponent = (props, ref) => {
    const { reducer } = useContext(PuzzleContext)
    const { state } = reducer

    // useEffect(()=>{
    //     console.log('ImageSliceComponent - state', state)
    // }, [state])

    const getItemImage = (index) => ({
        width: 480,
        height: 120,
        background: `url(${state.imageUrl}) 0 ${
            -120 * index
        }px no-repeat`
    })

    return(
                <div
                    ref={ref}
                    {...props}
                >
                    <div style={getItemImage(props.index)} />
                </div>
    )
}

export default forwardRef(ImageSliceComponent)

