import React, {Fragment, useEffect, useState, useContext} from "react"
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd"
import ImageSliceComponent from "./imageComponent"
import {ArrayExtended} from '../utils/array'
import {useFetch} from "../hooks/useFetch"
import Loading from './loading'
import PuzzleContext from "../providers/puzzleProvider"
import {PUZZLE_STATES} from "../reducers/puzzleReducer"

// to prevent long press event in mobile devices
// https://github.com/atlassian/react-beautiful-dnd/issues/415#issuecomment-683401424
// patch package solution : https://callstack.com/blog/say-goodbye-to-old-fashioned-forks-thanks-to-the-patch-package/

export const Puzzle = () => {
    const { reducer } = useContext(PuzzleContext)
    const { state, dispatch } = reducer
    const [data, setData] = useState({items: undefined, ordered: undefined, url: ''})
    const [response, loading] = useFetch(data.url)
    const checkPuzzleOrder = (array) => {
        const test = array.map((item) => {
            return item.index
        })
        return ArrayExtended.arrayEquals(test, [0, 1, 2, 3])
    }
    const onDragEnd = (result) => {
        if (!result.destination) {
            return
        }

        const items = ArrayExtended.reorder(
            data.items,
            result.source.index,
            result.destination.index
        )

        console.log("checkPuzzleOrder", checkPuzzleOrder(items))

        setData({
            ...data,
            items,
            ordered: checkPuzzleOrder(items)
        })

    }
    const getListStyle = (isDraggingOver) => ({
        background: isDraggingOver ? "green" : "red",
        margin: 8,
        width: 480
    })
    const getItems = (count) =>
        Array.from({ length: count }, (v, k) => k).map((k) => (
            {
                id: `item-${k}`,
                index: k,
                content: `item ${k}`
            }
        ))
    const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",
        ...draggableStyle
    })

    useEffect(() => {
        console.log('puzzle - init')
        setData((currentState) => ({
            ...currentState,
            url: 'https://source.unsplash.com/640x480/?beach'
        }))
        dispatch({ type: PUZZLE_STATES.LOADING})
    }, [dispatch])

    useEffect(() => {
        if (!loading) {
            setData({
                url: '',
                items: ArrayExtended.getRandomArray(getItems(4)),
                ordered: false,
            })
            dispatch({ type: PUZZLE_STATES.READY, imageUrl: response.url })

        }
    }, [response, loading, dispatch])

    useEffect(() => {
            console.log('ordered ?', data.ordered)
        if(data.ordered) {
            setData({
                ...data,
                items: undefined,
                url: 'https://source.unsplash.com/640x480/?beach'
            })
            dispatch({ type: PUZZLE_STATES.LOADING})
        }
    }, [data.ordered])

    return (
            <Fragment>
            {data.items !== undefined ?
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(droppableProvided, droppableSnapshot) => (
                            <div
                                ref={droppableProvided.innerRef}
                                style={getListStyle(data.ordered)}
                            >
                                {data.items.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(draggableProvided, draggableSnapshot) => (
                                            <ImageSliceComponent
                                                ref={draggableProvided.innerRef}
                                                {...draggableProvided.draggableProps}
                                                {...draggableProvided.dragHandleProps}
                                                style={getItemStyle(
                                                    draggableSnapshot.isDragging,
                                                    draggableProvided.draggableProps.style
                                                )}
                                                index={item.index}
                                            />
                                        )}
                                    </Draggable>
                                ))}
                                {droppableProvided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                : <Loading/>}
            </Fragment>
    )
}


