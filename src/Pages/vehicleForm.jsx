import React, { useState } from 'react';
import { observer } from 'mobx-react';
import {
  Grid,
  TextField,
  makeStyles,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';

import { useForm, Form } from '../Components/UseForm';
import InputCommon from '../Common/InputCommon';

// Inicijalna crijednost forme
const initValue = {
  id: 0,
  modelAuto: '',
  email: '',
  mobile: '12345679998',
  city: 'Sesvete',
  motor: 'benzin',
  // make: "BMV",
  makeId: '1',
  sellDate: '2021-02-26T10:51:22.509Z',
  isLoan: false,
};

// ************************
// Style CSS
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '60%',
    },
    margin: theme.spacing(1),
    // '& .MuiInputBase-input' : {
    //     margin:'50px'
    // },
  },
  marginForm: {
    width: '80%',
    margin: 'auto',
  },
}));

//  ******************************************
// Glavna funkcija
function VehicleForm() {
  const classes = useStyles();

  //
  const { values, setValues, handleInputChange } = useForm(initValue);

  return (
    <Form>
      <Grid container>
        <Grid item xs={6}>

          <InputCommon
            className={classes.root}
            variant='outlined'
            label='Model auto'
            name='modelAuto'
            value={values.modelAuto}
            onChange={handleInputChange}>
          </InputCommon>
          <TextField
            className={classes.root}
            variant='outlined'
            label='Email'
            name='email'
            value={values.email}
            onChange={handleInputChange}
          ></TextField>
        </Grid>
        <Grid item xs={6}>
          <FormControl>
            <FormLabel>Motor</FormLabel>
            {/* row usmjerava horizontalno */}
            <RadioGroup row value={values.motor} name='motor' onChange={handleInputChange}>
              <FormControlLabel value='diesel' control={<Radio />} label='Diesel'></FormControlLabel>
              <FormControlLabel value='benzin' control={<Radio />} label='Benzin'></FormControlLabel>
              <FormControlLabel value='electic' control={<Radio />} label='Electic'></FormControlLabel>
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Form>
  );
}

export default VehicleForm;
// export default observer(VehicleForm)
