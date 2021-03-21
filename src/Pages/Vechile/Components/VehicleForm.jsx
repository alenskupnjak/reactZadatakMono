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
import { storeVehicle } from '../VehicleStore';
import { storeProducers } from '../../Producers/ProducersStore';

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
          value={storeVehicle.vechileFormValue.modelAuto}
          onChange={(e) => storeVehicle.handleInputChange(e)}
          dataOptions={storeProducers.listModelGet}
          error={storeVehicle.errors.modelAuto}
        ></InputSelect>

        <TextField
          className={classes.root}
          variant="outlined"
          label="Email"
          name="email"
          value={storeVehicle.vechileFormValue.email}
          onChange={(e) => storeVehicle.handleInputChange(e)}
          error={storeVehicle.errors.email ? true : false}
          helperText={storeVehicle.errors.email ? 'Invalid Email' : ''}
        ></TextField>

        <TextField
          className={classes.root}
          variant="outlined"
          label="Mobile"
          name="mobile"
          value={storeVehicle.vechileFormValue.mobile}
          onChange={(e) => storeVehicle.handleInputChange(e)}
          error={storeVehicle.errors.mobile ? true : false}
          helperText={storeVehicle.errors.mobile ? 'Invalid phone number' : ''}
        ></TextField>

        <TextField
          className={classes.root}
          variant="outlined"
          label="City"
          name="city"
          value={storeVehicle.vechileFormValue.city}
          onChange={(e) => storeVehicle.handleInputChange(e)}
        ></TextField>
      </Grid>
      <Grid item xs={6}>
        <FormControl>
          <FormLabel>Motor</FormLabel>
          <RadioGroup
            row
            value={storeVehicle.vechileFormValue.motor}
            name="motor"
            onChange={(e) => storeVehicle.handleInputChange(e)}
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
          value={storeVehicle.vechileFormValue.producer}
          disabled
        ></TextField>

        <InputCheckBox
          label="Loan for vechile"
          name="isLoan"
          onChange={(e) => storeVehicle.handleInputChange(e)}
          value={storeVehicle.vechileFormValue.isLoan}
        ></InputCheckBox>

        <DatePicker
          label="Sell"
          name="sellDate"
          onChange={(e) => storeVehicle.handleInputChange(e)}
          value={storeVehicle.vechileFormValue.sellDate}
        ></DatePicker>

        <div>
          <CustomButton
            onClick={(e) => storeVehicle.handleSubmit(e)}
            // text="SUBMIT"
            text={
              storeVehicle.addOrUpdate === 'addFormValueToList' ? 'SUBMIT' : 'UPDATE'
            }
            disabled={storeVehicle.disableSubmitButton}
          ></CustomButton>
          <CustomButton
            pokus="pokus"
            text="RESET"
            color="default"
            onClick={(e) => storeVehicle.resetForm(e)}
          ></CustomButton>
        </div>

      </Grid>
    </Grid>
  );
}

export default observer(VehicleForm);
