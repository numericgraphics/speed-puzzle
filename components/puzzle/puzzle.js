import React, { useEffect, useState, useCallback } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { TransitionGroup } from 'react-transition-group'
import { Box, Fade, Typography, useTheme } from '@mui/material'

import { ImageSliceComponent } from './imageComponent'
import { ArrayExtended, COUNTER_MESSAGES } from '../../utils'
import { useFetch, useSpeedPuzzle, useTimerWorker, useGameScore } from '../../hooks'
import { Loading } from '../loading'
import { PUZZLE_STATES } from '../../reducers/puzzleReducer'
import { Result } from '../result'
import { Init } from '../init'
import { useCountDown } from '../../hooks/useCountDown'
import { GAME_CONFIG } from '../../config'
import { CircularProgressWithLabel } from '../progress'

// to prevent long press event in mobile devices
// https://github.com/atlassian/react-beautiful-dnd/issues/415#issuecomment-683401424
// patch package solution : https://callstack.com/blog/say-goodbye-to-old-fashioned-forks-thanks-to-the-patch-package/

const gameInitialState = ({ complexity: undefined, timerValue: 0, moves: 0 })

export const Puzzle = () => {
    const { reducer } = useSpeedPuzzle()
    const { state, dispatch } = reducer
    const [data, setData] = useState({ items: [], url: '' })
    const [currentGame, setCurrentGame] = useState(gameInitialState)
    const [fade, setFade] = useState(false)
    const [response, loading] = useFetch(data.url)
    const theme = useTheme()
    const [postTimerMessages, updateTimerWorker, timerValue] = useTimerWorker()
    const [addScore, lastScore, resetScore, getGlobalScore] = useGameScore()
    const [progress, timeLeft, starCountDown, killCountDown] = useCountDown(GAME_CONFIG.QUESTION_DURATION)

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

    const getPuzzleSource = async () => {
        return await recursiveRandomArray(getItems(4))
    }

    const initGame = () => {
        resetScore()
        setCurrentGame(gameInitialState)
    }

    const runStep = useCallback(() => {
        switch (state.event) {
        case PUZZLE_STATES.RELOAD:
            initGame()
            dispatch({ type: PUZZLE_STATES.LOADING })
            break
        case PUZZLE_STATES.INIT:
            initGame()
            break
        case PUZZLE_STATES.LOADING:
            // TODO : "+ 1" because state.challenge is increase on loading
            if (state.challenges < GAME_CONFIG.NUMBER_OF_QUESTION + 1) {
                getPuzzleSource()
                    .then((items) => {
                        // by setting the state's url we trigger the useFetch(data.url)
                        setData({
                            url: `https://source.unsplash.com/600x600/?beach?sig={'${getRandomNumber()}`,
                            items
                        })
                    })
                    .catch((e) => console.log('getPuzzleSource - ERROR ', e))
            }
            break
        case PUZZLE_STATES.READY:
            setCurrentGame({
                ...gameInitialState,
                complexity: checkPuzzleComplexity(data.items)
            })
            // fade out animation
            setFade(true)
            // create new timer worker
            updateTimerWorker()
            // init timer
            postTimerMessages(COUNTER_MESSAGES.START)
            // init countDown
            starCountDown()
            break
        case PUZZLE_STATES.DONE:
            // fade in animation
            setFade(false)
            // kill timer worker
            postTimerMessages(COUNTER_MESSAGES.END)
            // kill countDown
            killCountDown()
            break
        case PUZZLE_STATES.END_LOADING:
            // TODO : "+ 1" because state.challenge is increase on loading
            if (state.challenges === GAME_CONFIG.NUMBER_OF_QUESTION + 1) {
                dispatch({ type: PUZZLE_STATES.END_GAME })
            } else {
                if (!loading) {
                    dispatch({ type: PUZZLE_STATES.READY })
                } else {
                    dispatch({ type: PUZZLE_STATES.LOADING })
                }
            }
            break
        case PUZZLE_STATES.MOVE:
            setCurrentGame({
                ...currentGame,
                moves: currentGame.moves + 1
            })
            if (state.ordered) {
                dispatch({ type: PUZZLE_STATES.DONE })
            }
            break
        case PUZZLE_STATES.END_GAME:
            console.log('END_GAME')
            break
        }
    }, [state])

    useEffect(() => {
        runStep()
    }, [state])

    useEffect(() => {
        if (timerValue !== 0) {
            addScore({
                moves: currentGame.moves,
                complexity: currentGame.complexity,
                timerValue
            })
        }
    }, [timerValue])

    useEffect(() => {
        if (timeLeft === 0) {
            dispatch({ type: PUZZLE_STATES.DONE })
        }
    }, [timeLeft])

    return (
        <Box
            sx={{
                pt: 3,
                pl: 5,
                pr: 5,
                pb: 3,
                height: '100vh',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
                flexDirection: 'column',
                gap: 4
            }}
        >
            {(() => {
                switch (state?.event) {
                case PUZZLE_STATES.INIT:
                    return <Init/>
                case PUZZLE_STATES.LOADING:
                    return <Loading score={lastScore()} />
                case PUZZLE_STATES.END_GAME:
                    return <Result score={getGlobalScore()} />
                default:
                    return <>
                        <Box sx={{
                            display: 'flex',
                            alignSelf: 'center',
                            flexGrow: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-end'
                        }}
                        >
                            <DragDropContext onDragEnd={onDragEnd}>
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
                                                                        dispatch({ type: PUZZLE_STATES.LOADING })
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
                                                                    <ImageSliceComponent index={item.index} theme={theme} url={response.url} />
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
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            alignSelf: 'flex-start',
                            flexGrow: 1,
                            gap: 3,
                            justifyContent: 'flex-start',
                            alignContent: 'center',
                            alignItems: 'flex-start'
                        }}
                        >
                            <CircularProgressWithLabel value={progress} timeLeft={timeLeft} />
                            <Typography variant="h1" component="h1" >
                                {state.challenges} / {GAME_CONFIG.NUMBER_OF_QUESTION}
                            </Typography>
                        </Box>
                    </>
                }
            })()}
        </Box>

    )
}
