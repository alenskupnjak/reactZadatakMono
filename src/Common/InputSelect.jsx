import React from 'react'
import {
  FormControl,
  MenuItem,
  InputLabel,
  Select
} from '@material-ui/core';

function InputSelect(props) {


  const {name, label, value, onChange, dataOptions } = props

  console.log(dataOptions);
  

  return (
   <FormControl
    outline="variant"
   >
     <InputLabel>{label}</InputLabel>
     <Select
      label={label}
      name={name}
      value={value}
      onChange={onChange}
     >
       {
         dataOptions.map(data => (
           <MenuItem key={data.id} value={data.id}>{data.title}</MenuItem>
         ))
       }
     </Select>
   </FormControl>
  )
}

export default InputSelect
