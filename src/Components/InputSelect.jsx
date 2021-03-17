import React from 'react';
import {
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  FormHelperText,
} from '@material-ui/core';

//
function InputSelect(props) {
  const { name, label, value, onChange, dataOptions, error = null } = props;

  return (
    <div>
      <FormControl outline="variant">
        <InputLabel>{label}</InputLabel>
        <Select
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          error={error ? true : false}
        >
          <MenuItem value="">None</MenuItem>
          {
            dataOptions.map((data) => (
              <MenuItem 
                key={data.id} 
                value={data.id} 
                producer={data.producerId}
              >
                {data.model}
              </MenuItem>
            ))
          }
        </Select>
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </div>
  );
}

export default InputSelect;
