import React from 'react'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';

// 
function InputCheckBox(props) {
  const { name, label, value, onChange} = props
  
  // convert to format (target:{value, name})
  const convertData = (e) =>{
    const convert = {
      target:{
        value:'',
        name:''
      }
    }
    convert.target.value = e.target.checked
    convert.target.name = e.target.name
    onChange(convert)
  }


  return (
    <FormControl>
      <FormControlLabel
        labelPlacement="start"
        label={label}
        control={
          <Checkbox
            color="primary"
            name={name}
            checked={value}
            onChange={convertData}
          >
          </Checkbox>
        }
      >
      </FormControlLabel>
    </FormControl>
  )
}

export default InputCheckBox
