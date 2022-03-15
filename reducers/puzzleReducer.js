export const PUZZLE_STATES = Object.freeze({
    INIT: 'init',
    READY: 'ready',
    LOADING: 'loading',
    END_LOADING: 'endLoading',
    DONE: 'done',
    UPDATE: 'update'
})

export const InitialPuzzleState = {
    event: PUZZLE_STATES.INIT,
    imageUrl: '',
    timerValue: undefined
}

export const PuzzleReducer = (state, action) => {
    switch (action.type) {
        case PUZZLE_STATES.INIT :
        case PUZZLE_STATES.UPDATE :
        case PUZZLE_STATES.DONE :
            return {
                ...state,
                event: action.type,
                imageUrl: ''
            }
        case PUZZLE_STATES.READY :
            return {
                event: action.type,
                imageUrl: action.imageUrl,
                timerValue: undefined
            }
        case PUZZLE_STATES.LOADING :
            return {
                event: action.type,
                imageUrl: action.imageUrl,
                timerValue: action.timerValue
            }
    }
}
