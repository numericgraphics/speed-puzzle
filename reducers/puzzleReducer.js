export const PUZZLE_STATES = Object.freeze({
    INIT: 'init',
    READY: 'ready',
    LOADING: 'loading',
    END_LOADING: 'endLoading',
    DONE: 'done',
    UPDATE: 'update',
    END_GAME: 'endGame',
    MOVE: 'move',
    RELOAD: 'reload'
})

export const InitialPuzzleState = {
    event: PUZZLE_STATES.INIT,
    challenges: 0,
    ordered: false
}

export const PuzzleReducer = (state, action) => {
    switch (action.type) {
    case PUZZLE_STATES.RELOAD :
    case PUZZLE_STATES.INIT :
        return {
            event: action.type,
            challenges: 0,
            ordered: false
        }
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
            event: action.type
        }
    case PUZZLE_STATES.READY :
        return {
            ...state,
            event: action.type
        }
    case PUZZLE_STATES.LOADING :
        return {
            ...state,
            event: action.type,
            challenges: state.challenges + 1
        }
    case PUZZLE_STATES.MOVE :
        return {
            ...state,
            event: action.type,
            ordered: action.ordered
        }
    case PUZZLE_STATES.END_LOADING :
        return {
            ...state,
            event: action.type,
            ordered: false
        }
    }
}
