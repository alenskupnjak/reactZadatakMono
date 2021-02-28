import React from 'react'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';


function InputCheckBox(props) {
  const { name, label, value, onChange} = props
  
  // Konverzija u format {value, name}
  const konvertirajPrikladnePodatke = (e) =>{
    const konverzija = {
      target:{
        value:'',
        name:''
      }
    }
    konverzija.target.value = e.target.checked
    konverzija.target.name = e.target.name
    onChange(konverzija)
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
              onChange={konvertirajPrikladnePodatke}
            >
            </Checkbox>
        }
      >
      </FormControlLabel>
    </FormControl>
  )
}

export default InputCheckBox
