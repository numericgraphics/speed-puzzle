import React, { Fragment, useEffect, useState, useRef } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { TransitionGroup } from 'react-transition-group'

import { ImageSliceComponent } from './imageComponent'
import { ArrayExtended, COUNTER_MESSAGES } from '../../utils'
import { useFetch, useSpeedPuzzle } from '../../hooks'
import { Loading } from '../loading'
import { PUZZLE_STATES } from '../../reducers/puzzleReducer'
import { Fade, useTheme } from '@mui/material'
import { Result } from '../result'
import { Init } from '../init'

// to prevent long press event in mobile devices
// https://github.com/atlassian/react-beautiful-dnd/issues/415#issuecomment-683401424
// patch package solution : https://callstack.com/blog/say-goodbye-to-old-fashioned-forks-thanks-to-the-patch-package/

export const Puzzle = () => {
    const { reducer } = useSpeedPuzzle()
    const { state, dispatch } = reducer
    const [data, setData] = useState({ items: [], url: '' })
    const [game, setGame] = useState({ complexity: undefined, timerValue: 0 })
    const [fade, setFade] = useState(false)
    const [response, loading] = useFetch(data.url)
    const workerRef = useRef()
    const theme = useTheme()

    const checkPuzzleOrder = (array) => {
        const test = array.map((item) => {
            return item.index
        })
        return ArrayExtended.arrayEquals(test, [0, 1, 2, 3])
    }

    const checkPuzzleComplexity = (array) => {
        const test = array.map((item) => {
            return item.index
        })
        return ArrayExtended.getArrayNumberComplexity(test)
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
            items
        })

        dispatch({ type: PUZZLE_STATES.MOVE, ordered: checkPuzzleOrder(items) })
    }

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
        filter: isDragging ? 'drop-shadow(0 0 0.25rem crimson)' : 'none',
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
                    setGame({
                        ...game,
                        timerValue: event.data.timerValue
                    })
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
        return await recursiveRandomArray(getItems(4))
    }

    useEffect(() => {
        switch (state.event) {
        case PUZZLE_STATES.INIT:
            // dispatch({ type: PUZZLE_STATES.LOADING })
            break
        case PUZZLE_STATES.LOADING:
            getPuzzleSource()
                .then((items) => {
                    // by setting the state's url we trigger the useFetch(data.url)
                    setData({
                        url: `https://source.unsplash.com/600x600/?beach?sig={'${getRandomNumber()}`,
                        items
                    })
                    setGame({
                        ...game,
                        complexity: checkPuzzleComplexity(items),
                        timerValue: 0
                    })
                })
                .catch((e) => console.log('getPuzzleSource - ERROR ', e))
            break
        case PUZZLE_STATES.READY:
            // fade out animation
            setFade(true)
            // create new timer worker
            updateWorker()
            // init timer
            postTimerMessages(COUNTER_MESSAGES.START)
            break
        case PUZZLE_STATES.DONE:
            // fade in animation
            setFade(false)
            // kill timer worker
            postTimerMessages(COUNTER_MESSAGES.END)
            break
        case PUZZLE_STATES.END_LOADING:
            if (!loading) {
                dispatch({ type: PUZZLE_STATES.READY, imageUrl: response.url })
            } else {
                dispatch({ type: PUZZLE_STATES.LOADING })
            }
            break
        case PUZZLE_STATES.MOVE:
            if (state.ordered) {
                dispatch({ type: PUZZLE_STATES.DONE, complexity: game.complexity })
                if (state.challenges === 2) {
                    dispatch({ type: PUZZLE_STATES.END_GAME })
                }
            }
            break
        case PUZZLE_STATES.END_GAME:
            console.log('END_GAME')
            break
        }
    }, [state, dispatch])

    return (
        <Fragment>

            {(() => {
                switch (state?.event) {
                case PUZZLE_STATES.INIT:
                    return <Init/>
                case PUZZLE_STATES.LOADING:
                    return <Loading/>
                case PUZZLE_STATES.END_GAME:
                    return <Result/>
                default:
                    return <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(droppableProvided, droppableSnapshot) => (
                                <div
                                    ref={droppableProvided.innerRef}
                                >
                                    <TransitionGroup>
                                        {data.items.map((item, index) => (

                                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                                {(draggableProvided, draggableSnapshot) => (
                                                    <Fade
                                                        key={item} timeout={fade ? 500 * index : 1000}
                                                        in={fade}
                                                        onExited={() => {
                                                            if (!fade) {
                                                                dispatch({ type: PUZZLE_STATES.LOADING, timerValue: game.timerValue })
                                                            }
                                                        }}
                                                    >
                                                        <div
                                                            ref={draggableProvided.innerRef}
                                                            {...draggableProvided.draggableProps}
                                                            {...draggableProvided.dragHandleProps}
                                                            style={getItemStyle(
                                                                draggableSnapshot.isDragging,
                                                                draggableProvided.draggableProps.style
                                                            )}
                                                        >
                                                            <ImageSliceComponent index={item.index} theme={theme} state={state} />
                                                        </div>
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
                }
            })()}

        </Fragment>
    )
}
