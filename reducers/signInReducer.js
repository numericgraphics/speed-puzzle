export const SIGN_IN_STATES = Object.freeze({
    READY: 'ready',
    LOAD: 'load',
    LOADING: 'loading',
    DONE: 'done',
    ALREADY_EXISTS: 'alreadyExists',
    ERROR: 'ERROR'
})

export const SignInReducer = (state, action) => {
    switch (action.type) {
    case SIGN_IN_STATES.READY :
    case SIGN_IN_STATES.DONE :
    case SIGN_IN_STATES.ALREADY_EXISTS :
    case SIGN_IN_STATES.ERROR :
        return {
            type: action.type,
            user: {}
        }
    case SIGN_IN_STATES.LOADING :
        return {
            type: action.type
        }
    case SIGN_IN_STATES.LOAD :
        return {
            type: action.type,
            user: action.user
        }
    }
}
