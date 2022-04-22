import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Button, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'

const validationSchema = yup.object({
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

export const SignIn = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2))
        }
    })

    return (
        <CustomizedContainer>
            <form onSubmit={formik.handleSubmit}>
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
                    fullWidth
                    size="normal"
                    color="primary"
                    variant="contained"
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </CustomizedContainer>
    )
}
