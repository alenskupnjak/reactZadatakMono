import React from 'react';
import { TextField } from '@material-ui/core';

//
function InputCommon(props) {
  const { name, label, value, onChange, error = null, helperText, ...other } = props;

  return (
    <TextField
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      {...other}
    ></TextField>
  );
}

export default InputCommon;
