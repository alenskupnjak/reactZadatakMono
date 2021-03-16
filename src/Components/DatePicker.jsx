import React from 'react';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

//
function DatePicker(props) {
  const { name, label, value, onChange } = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        margin="normal"
        variant="dialog"
        label={label}
        format="MM/dd/yyyy"
        value={value}
        name={name}
        onChange={(e) => {
          const conversion = {
            target: {
              value: e,
              name: name,
            },
          };
          onChange(conversion);
        }}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  );
}

export default DatePicker;
