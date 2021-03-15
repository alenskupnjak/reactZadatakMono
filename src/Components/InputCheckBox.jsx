import React from 'react';
import { Checkbox, FormControl, FormControlLabel } from '@material-ui/core';

//
function InputCheckBox(props) {
  const { name, label, value, onChange } = props;

  // const convertData = (e) => {
  //   const convert = {
  //     target: {
  //       value: '',
  //       name: '',
  //     },
  //   };
  //   convert.target.value = e.target.checked;
  //   convert.target.name = e.target.name;
  //   onChange(convert);
  // };

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
            // onChange={convertData}
            onChange={(e) => {
              const convert = {
                target: {
                  value: e.target.checked,
                  name: e.target.name,
                },
              };
              // convert.target.value = e.target.checked;
              // convert.target.name = e.target.name;
              onChange(convert);
            }}
          ></Checkbox>
        }
      ></FormControlLabel>
    </FormControl>
  );
}

export default InputCheckBox;
