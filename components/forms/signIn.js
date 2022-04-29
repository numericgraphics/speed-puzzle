import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Button, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useSignIn } from '../../hooks/useSignIn'
import { SIGN_IN_STATES } from '../../reducers/signInReducer'

const validationSchema = yup.object({
    username: yup
        .string('Enter your name')
        .min(4, 'Your name should be of minimum 4 characters length')
        .required('Your name is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required')
})

const CustomizedContainer = styled('div')`
  width: 100%;
`

const messages = Object.freeze({
    ready: 'You are in the top 10 scores, please register.',
    loading: 'We are proceeding with your registration',
    done: 'Thanks. You are registered like one of the best 10 score.',
    alreadyExists: 'Sorry, your name or email are already exist, please try something else !',
    error: 'A problem has occurred!'
})

export const SignIn = ({ score }) => {
    const [state, dispatch] = useSignIn()
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            values.score = score
            dispatch({ type: SIGN_IN_STATES.LOAD, user: values })
        }
    })

    useEffect(() => {
        console.log('SignIn state - type', state.type)
        console.log('SignIn state', messages[state.type])
    }, [state])

    return (
        <CustomizedContainer>
            <Typography variant="h3" sx={{ m: 1 }}>{messages[state.type]}</Typography>
            {(state.type === SIGN_IN_STATES.READY || state.type === SIGN_IN_STATES.ALREADY_EXISTS) &&
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        margin="normal"
                        fullWidth
                        size="normal"
                        id="username"
                        name="username"
                        label="Name"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username ? formik.errors.username : ' '}
                        inputProps={{
                            autoComplete: 'off'
                        }}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        size="normal"
                        id="email"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email ? formik.errors.email : ' '}
                        inputProps={{
                            autoComplete: 'off'
                        }}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        size="normal"
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password ? formik.errors.password : ' ' }
                    />
                    <Button
                        sx={{ mt: 6 }}
                        size="normal"
                        color="primary"
                        variant="contained"
                        type="submit"
                    >
                        Submit
                    </Button>
                </form>
            }

        </CustomizedContainer>
    )
}
