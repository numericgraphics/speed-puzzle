export const PUZZLE_STATES = Object.freeze({
    INIT: 'init',
    READY: 'ready',
    LOADING: 'loading',
    UPDATE: 'update'
})

export const InitialPuzzleState = {
    imageUrl: ''
}

export const PuzzleReducer = (state, action) => {
    console.log('PuzzleReducer state', state, ' action ', action)
    switch (action.type) {
        case PUZZLE_STATES.INIT :
        case PUZZLE_STATES.LOADING :
        case PUZZLE_STATES.UPDATE :
            return {
                imageUrl: ''
            }
        case PUZZLE_STATES.READY :
            return {
                imageUrl: action.imageUrl
            }
    }
}
