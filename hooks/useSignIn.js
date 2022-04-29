import { useEffect, useReducer } from 'react'
import { SIGN_IN_STATES, SignInReducer } from '../reducers/signInReducer'

const URL = '/api/signIn'

function useSignIn () {
    const [state, dispatch] = useReducer(SignInReducer, {
        type: SIGN_IN_STATES.READY,
        user: {}
    }, undefined)

    useEffect(() => {
        console.log('useEffect - useSignIn', state)
        async function addUser (user) {
            const { username, score, email, password } = user
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, score, email, password })
            }
            const response = await fetch(URL, requestOptions)

            if (response.status === 200) {
                dispatch({ type: SIGN_IN_STATES.DONE })
            } else if (response.status === 409) {
                dispatch({ type: SIGN_IN_STATES.ALREADY_EXISTS })
            } else {
                dispatch({ type: SIGN_IN_STATES.ERROR })
            }
        }

        switch (state.type) {
        case SIGN_IN_STATES.LOAD:
            addUser(state.user)
                .then()
                .catch()
        }
    }, [state])

    return [state, dispatch]
}

export { useSignIn }
