import React from 'react'
import {
  TextField,
} from '@material-ui/core';

function InputCommon(props) {
  const {name, label, value, onChange} = props

  return (
    <TextField
    variant='outlined'
    label={label}
    name={name}
    value={value}
    onChange={onChange}
  ></TextField>
  )
}

export default InputCommon
