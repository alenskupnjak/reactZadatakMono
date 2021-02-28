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

import { useForm, Form } from '../Components/UseForm';
import InputCommon from '../Common/InputCommon';
import InputSelect from '../Common/InputSelect';
import InputCheckBox from '../Common/InputCheckBox';
import DatePicker from '../Common/DatePicker';
import CustomButton from '../Common/CustomButton';
import { getDataOptions } from '../Common/VehicleService';
import  store from  '../Stores/StoreVechile'




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
  const { handleInputChange } = useForm();

  return (
    <Form>
      <Grid container>
        <Grid item xs={6}>
          <InputCommon
            className={classes.root}
            variant="outlined"
            label="Model auto"
            name="modelAuto"
            value={store.vechileFormValue.modelAuto}
            onChange={handleInputChange}
          >
          </InputCommon>

          <TextField
            className={classes.root}
            variant="outlined"
            label="Email"
            name="email"
            value={store.vechileFormValue.email}
            onChange={handleInputChange}
          >
          </TextField>

          <TextField
            className={classes.root}
            variant="outlined"
            label="Mobile"
            name="mobile"
            value={store.vechileFormValue.mobile}
            onChange={handleInputChange}
          >
          </TextField>

          <TextField
            className={classes.root}
            variant="outlined"
            label="City"
            name="city"
            value={store.vechileFormValue.city}
            onChange={handleInputChange}
          >
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <FormControl>
            <FormLabel>Tip motora</FormLabel>
            {/* row usmjerava horizontalno */}
            <RadioGroup 
              row 
              value={store.vechileFormValue.motor}  
              name="motor" 
              onChange={handleInputChange}
            >
              <FormControlLabel value="diesel" control={<Radio />} label="Diesel"></FormControlLabel>
              <FormControlLabel value="benzin" control={<Radio />} label="Benzin"></FormControlLabel>
              <FormControlLabel value="electic" control={<Radio />} label="Electic"></FormControlLabel>
            </RadioGroup>
          </FormControl>

          <InputSelect
            label="Producer"
            name="producerId"
            value={store.vechileFormValue.producerId}
            onChange={handleInputChange}
            dataOptions ={getDataOptions()}
          >
          </InputSelect>

            <InputCheckBox
              label="Loan"
              name="isLoan"
              onChange={handleInputChange}
              value={store.vechileFormValue.isLoan}
            >
            </InputCheckBox>

            <DatePicker
              label="Sell"
              name="sellDate"
              onChange={handleInputChange}
              value={store.vechileFormValue.sellDate}
            >
            </DatePicker>
            <div>
              <CustomButton
                text="SUBMIT"
                type="submit"
                // style={{margin:'10px 10px 20px 20px'}}
              >
              </CustomButton>
              <CustomButton
                text="CANCEL"
                color="default" 
                // style={{margin:'10px 10px 20px 10px'}}
              >
              </CustomButton>
            </div>
        </Grid>
      </Grid>

    </Form>
  );
}

export default observer(VehicleForm)
