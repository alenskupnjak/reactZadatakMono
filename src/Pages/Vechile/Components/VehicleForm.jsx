import React from 'react';
import { observer } from 'mobx-react';
import {
  Grid,
  TextField,
  makeStyles,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';

import InputSelect from '../../../Components/InputSelect';
import InputCheckBox from '../../../Components/InputCheckBox';
import DatePicker from '../../../Components/DatePicker';
import CustomButton from '../../../Components/CustomButton';
import { store } from '../../../Common/StoreVechile';
import { storeProducers } from '../../../Common/StoreProducers';

//
// Style CSS
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1),
      // backgroundColor: '#faebd7'
    },
    margin: theme.spacing(1),
    '& .MuiButton-startIcon': {
      marginRight: '0px',
      marginLeft: '0px',
    },
  },
  marginForm: {
    width: '80%',
    margin: 'auto',
  },
}));

//
// Main funkcija
function VehicleForm(props) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={6}>
        <InputSelect
          label="Model"
          name="modelAuto"
          value={store.vechileFormValue.modelAuto}
          onChange={(e) => store.handleInputChange(e)}
          dataOptions={storeProducers.listModelGet}
          error={store.errors.modelAuto}
        ></InputSelect>

        <TextField
          className={classes.root}
          variant="outlined"
          label="Email"
          name="email"
          value={store.vechileFormValue.email}
          onChange={(e) => store.handleInputChange(e)}
          error={store.errors.email ? true : false}
          helperText={store.errors.email ? 'Invalid Email' : ''}
        ></TextField>

        <TextField
          className={classes.root}
          variant="outlined"
          label="Mobile"
          name="mobile"
          value={store.vechileFormValue.mobile}
          onChange={(e) => store.handleInputChange(e)}
          error={store.errors.mobile ? true : false}
          helperText={store.errors.mobile ? 'Invalid phone number' : ''}
        ></TextField>

        <TextField
          className={classes.root}
          variant="outlined"
          label="City"
          name="city"
          value={store.vechileFormValue.city}
          onChange={(e) => store.handleInputChange(e)}
        ></TextField>
      </Grid>
      <Grid item xs={6}>
        <FormControl>
          <FormLabel>Motor</FormLabel>
          <RadioGroup
            row
            value={store.vechileFormValue.motor}
            name="motor"
            onChange={(e) => store.handleInputChange(e)}
          >
            <FormControlLabel
              value="diesel"
              control={<Radio />}
              label="Diesel"
            ></FormControlLabel>
            <FormControlLabel
              value="benzin"
              control={<Radio />}
              label="Benzin"
            ></FormControlLabel>
            <FormControlLabel
              value="electric"
              control={<Radio />}
              label="Electric"
            ></FormControlLabel>
          </RadioGroup>
        </FormControl>

        <TextField
          className={classes.root}
          variant="outlined"
          label="Producer"
          name="producer"
          value={store.vechileFormValue.producer}
          disabled
        ></TextField>

        <InputCheckBox
          label="Loan for vechile"
          name="isLoan"
          onChange={(e) => store.handleInputChange(e)}
          value={store.vechileFormValue.isLoan}
        ></InputCheckBox>

        <DatePicker
          label="Sell"
          name="sellDate"
          onChange={(e) => store.handleInputChange(e)}
          value={store.vechileFormValue.sellDate}
        ></DatePicker>
        <div>
          <CustomButton
            onClick={(e) => store.handleSubmit(e)}
            // text="SUBMIT"
            text={
              store.addOrUpdate === 'addFormValueToList' ? 'SUBMIT' : 'UPDATE'
            }
            disabled={store.disableSubmitButton}
          ></CustomButton>
          <CustomButton
            text="RESET"
            color="default"
            onClick={(e) => store.resetForm(e)}
          ></CustomButton>
        </div>
      </Grid>
    </Grid>
  );
}

export default observer(VehicleForm);
