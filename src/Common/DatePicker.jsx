import React from 'react'

import { MuiPickersUtilsProvider , KeyboardDatePicker}   from '@material-ui/pickers'

// pick a date util library
// import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';


function DatePicker(props) {
  const { name, label, value, onChange} = props

  // Konverzija u format {value, name}
  const konvertirajPrikladnePodatke = (e) =>{
    const konverzija = {
      target:{
        value:'',
        name:''
      }
    }
    konverzija.target.value = e
    konverzija.target.name = name
    // console.log(konverzija);
    onChange(konverzija)
  }
  

  return (
    <MuiPickersUtilsProvider utils={ DateFnsUtils }>
      <KeyboardDatePicker
          margin="normal"
          variant="dialog"
          // id="date-picker-dialog"
          label={label}
          format="MM/dd/yyyy"
          value={value}
          name={name}
          onChange={konvertirajPrikladnePodatke }
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
    </MuiPickersUtilsProvider>
  )
}

export default DatePicker
