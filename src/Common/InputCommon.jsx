import React from 'react'
import {
  TextField,
} from '@material-ui/core';

function InputCommon(props) {
  const {name, label, value, onChange, error=null, helperText} = props

  return (
    <TextField
    variant='outlined'
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    error={error ? true: false}
    helperText={error ? helperText : ""}
  ></TextField>
  )
}

export default InputCommon
