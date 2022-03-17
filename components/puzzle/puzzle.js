import React, { Fragment, useEffect, useState, useContext, useRef } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { TransitionGroup } from 'react-transition-group'
import ImageSliceComponent from './imageComponent'
import { ArrayExtended, millisecondToMinutes, COUNTER_MESSAGES } from '../../utils'
import { useFetch } from '../../hooks/useFetch'
import Loading from '../loading/loading'
import PuzzleContext from '../../providers/puzzleProvider'
import { PUZZLE_STATES } from '../../reducers/puzzleReducer'
import { Fade } from '@mui/material'

// to prevent long press event in mobile devices
// https://github.com/atlassian/react-beautiful-dnd/issues/415#issuecomment-683401424
// patch package solution : https://callstack.com/blog/say-goodbye-to-old-fashioned-forks-thanks-to-the-patch-package/

export const Puzzle = () => {
    const { reducer } = useContext(PuzzleContext)
    const { state, dispatch } = reducer
    const [data, setData] = useState({ items: undefined, ordered: undefined, url: '' })
    const [fade, setFade] = useState(false)
    const [response, loading] = useFetch(data.url)
    const workerRef = useRef()

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

        setData({
            ...data,
            items,
            ordered: checkPuzzleOrder(items)
        })
    }

    const getListStyle = (isDraggingOver) => ({
        background: 'white',
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
        userSelect: 'none',
        ...draggableStyle
    })

    const getRandomNumber = () => {
        return (Math.floor(Math.random() * 10))
    }

    const recursiveRandomArray = async (items) => {
        const randomArray = ArrayExtended.getRandomArray(items)
        if (checkPuzzleOrder(randomArray)) {
            return await recursiveRandomArray(items)
        }
        return randomArray
    }

    const updateWorker = () => {
        if (typeof (Worker) !== 'undefined') {
            workerRef.current = new Worker(new URL('../../workers/worker.js', import.meta.url))
            workerRef.current.onmessage = (event) => {
                if (event.data.event === COUNTER_MESSAGES.END) {
                    console.log('END - timerValue', millisecondToMinutes(event.data.timerValue))
                    dispatch({ type: PUZZLE_STATES.LOADING, timerValue: event.data.timerValue })
                    workerRef.current.terminate()
                }
            }
        } else {
            console.log('TIMER WORKER ISSUE - browser doesnt support')
        }
    }

    const postTimerMessages = (event) => {
        workerRef.current.postMessage({ event })
    }

    const getPuzzleSource = async () => {
        const items = await recursiveRandomArray(getItems(4))
        setData({
            url: `https://source.unsplash.com/640x480/?beach?sig={'${getRandomNumber()}`,
            items,
            ordered: false
        })
        updateWorker()
    }

    useEffect(() => {
        switch (state.event) {
        case PUZZLE_STATES.INIT:
            dispatch({ type: PUZZLE_STATES.LOADING })
            break
        case PUZZLE_STATES.LOADING:
            setData(currentState => ({
                ...currentState,
                items: undefined,
                url: ''
            }))
            getPuzzleSource()
                .then(() => console.log('getPuzzleSource done !'))
                .catch((e) => console.log('getPuzzleSource - ERROR ', e))
            break
        case PUZZLE_STATES.READY:
            setFade(true)
            postTimerMessages(COUNTER_MESSAGES.START)
            break
        case PUZZLE_STATES.DONE:
            postTimerMessages(COUNTER_MESSAGES.END)
            break
        }
    }, [state, dispatch])

    useEffect(() => {
        if (!loading) {
            dispatch({ type: PUZZLE_STATES.READY, imageUrl: response.url })
        }
    }, [loading, response, dispatch])

    useEffect(() => {
        setFade(false)
        if (data.ordered) {
            setTimeout(() => {
                dispatch({ type: PUZZLE_STATES.DONE })
            }, 1000)
        }
    }, [data.ordered, dispatch])

    return (
        <Fragment>
            {state?.event === PUZZLE_STATES.READY
                ? <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(droppableProvided, droppableSnapshot) => (
                            <div
                                ref={droppableProvided.innerRef}
                                style={getListStyle(data.ordered)}
                            >
                                <TransitionGroup>
                                    {data.items.map((item, index) => (

                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(draggableProvided, draggableSnapshot) => (
                                                <Fade
                                                    key={item} timeout={500 * index}
                                                    in={fade}
                                                >
                                                    <ImageSliceComponent
                                                        ref={draggableProvided.innerRef}
                                                        {...draggableProvided.draggableProps}
                                                        {...draggableProvided.dragHandleProps}
                                                        // style={getItemStyle(
                                                        //     draggableSnapshot.isDragging,
                                                        //     draggableProvided.draggableProps.style
                                                        // )}
                                                        index={item.index}
                                                    />
                                                </Fade>
                                            )}
                                        </Draggable>

                                    ))}
                                </TransitionGroup>
                                {droppableProvided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                : <Loading/>}
        </Fragment>
    )
}
