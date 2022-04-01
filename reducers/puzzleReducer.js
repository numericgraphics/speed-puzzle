export const PUZZLE_STATES = Object.freeze({
    INIT: 'init',
    READY: 'ready',
    LOADING: 'loading',
    END_LOADING: 'endLoading',
    DONE: 'done',
    UPDATE: 'update',
    END_GAME: 'endGame',
    MOVE: 'move'
})

export const InitialPuzzleState = {
    event: PUZZLE_STATES.INIT,
    imageUrl: '',
    timerValue: undefined,
    moves: 0,
    complexity: undefined,
    challenges: 0,
    ordered: false
}

export const PuzzleReducer = (state, action) => {
    switch (action.type) {
    case PUZZLE_STATES.INIT :
    case PUZZLE_STATES.UPDATE :
        return {
            ...state,
            event: action.type
        }
    case PUZZLE_STATES.END_GAME :
        return {
            ...state,
            event: action.type,
            challenges: 0
        }
    case PUZZLE_STATES.DONE :
        return {
            ...state,
            event: action.type,
            complexity: action.complexity,
            challenges: state.challenges + 1
        }
    case PUZZLE_STATES.READY :
        return {
            ...state,
            event: action.type,
            imageUrl: action.imageUrl,
            timerValue: undefined
        }
    case PUZZLE_STATES.LOADING :
        return {
            ...state,
            event: action.type,
            imageUrl: action.imageUrl,
            timerValue: action.timerValue
        }
    case PUZZLE_STATES.MOVE :
        return {
            ...state,
            event: action.type,
            moves: state.moves + 1,
            ordered: action.ordered
        }
    case PUZZLE_STATES.END_LOADING :
        return {
            ...state,
            event: action.type,
            moves: 0,
            complexity: undefined,
            ordered: false
        }
    }
}
