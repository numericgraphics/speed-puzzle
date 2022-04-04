import React, { useEffect, createContext, useReducer } from 'react'
import { InitialPuzzleState, PuzzleReducer, PUZZLE_STATES } from '../reducers/puzzleReducer'
import { Game } from '../services'

export const PuzzleContext = createContext(undefined)

export function PuzzleProvider ({ children }) {
    const [state, dispatch] = useReducer(PuzzleReducer, InitialPuzzleState)
    const reducer = { dispatch, state, PUZZLE_STATES }
    useEffect(() => { }, [])

    return (
        <PuzzleContext.Provider value={{ reducer, game: Game }}>
            {children}
        </PuzzleContext.Provider>
    )
}
