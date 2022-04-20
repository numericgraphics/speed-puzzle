import React from 'react'
import { FilledInput, FormControl, InputLabel, FormHelperText } from '@mui/material'
// import FormControl from '@material-ui/core/FormControl'
// import FilledInput from '@material-ui/core/FilledInput'
// import InputLabel from '@material-ui/core/InputLabel'
// import FormHelperText from '@material-ui/core/FormHelperText'

export default function TextFiledOwner () {
    const [name, setName] = React.useState('james')
    const handleChange = event => {
        setName(event.target.value)
    }
    return (
        <>
            <div>
                <FormControl>
                    <InputLabel htmlFor="input">Name</InputLabel>
                    <FilledInput id="input" value={name} onChange={handleChange} />
                    <FormHelperText>enter your name</FormHelperText>
                </FormControl>
            </div>
        </>
    )
}
