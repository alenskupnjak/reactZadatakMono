import React , {useState}from 'react';
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
// import store from  '../Stores/StoreVechile'
import {store, initVechileValue} from  '../Stores/StoreVechile'


console.log(initVechileValue);


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
  const [errors, setErrors] = useState({});
  const [disableSubmitButton, setDisableSubmitButton] = useState(true);


  // Validacija forme
  const validationForm = () => {
    const regexPhone =/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
    // Setiram grešku na nulu
    const tempError = {}
    tempError.modelAuto = store.vechileFormValue.modelAuto.length>0 ? '' : 'Invalid vehicle'
    tempError.email = (/@/).test(store.vechileFormValue.email)  ? '' : 'Invalid emali'
    tempError.mobile = regexPhone.test(store.vechileFormValue.mobile) ? '' : 'Invalid character'
    tempError.producerId = store.vechileFormValue.producerId !== '' ? '' : 'Select producer'

    // postavljam grešku
    setErrors({
      ...tempError
    })

    // ako je validacija svih polja TRUE, enable button SUBMIT
    if(Object.values(tempError).every((x) => x === '')) {
      setDisableSubmitButton(false)
    } else {
      setDisableSubmitButton(true)
    }

    // provjerava tempError, ako su svi ="", znavi nema greške, vraca TRUE
    return Object.values(tempError).every((x) => x === '');
  }

  //
  const { handleInputChange } = useForm(validationForm);


  // RESET forme
  function resetForm() {
    store.vechileFormValue = initVechileValue
    setDisableSubmitButton(true)
  }

  // SUBMIT FORME
  const handleSubmit = (e) => {
    e.preventDefault();
    // Provjeravamo upisana polja
    validationForm()

    //  Ako je FORMA ispravno popunjena spremamo u store
    if(validationForm()) {
      store.listVehiclePut(store.vechileFormValue)
      console.log(store.listVehicle);
    }
    console.log(errors);
  }


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
            error={errors.modelAuto}
            helperText="Model error"
          >
          </InputCommon>

          <TextField
            className={classes.root}
            variant="outlined"
            label="Email"
            name="email"
            value={store.vechileFormValue.email}
            onChange={handleInputChange}
            error={errors.email ? true :false }
            helperText={errors.email  ? 'Invalid Email' :''}
          >
          </TextField>

          <TextField
            className={classes.root}
            variant="outlined"
            label="Mobile"
            name="mobile"
            value={store.vechileFormValue.mobile}
            onChange={handleInputChange}
            error={errors.mobile ? true : false}
            helperText={errors.mobile  ? 'Min. 6 number' :''}
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
              <FormControlLabel value="electric" control={<Radio />} label="Electric"></FormControlLabel>
            </RadioGroup>
          </FormControl>

          <InputSelect
            label="Producer"
            name="producerId"
            value={store.vechileFormValue.producerId}
            onChange={handleInputChange}
            dataOptions ={getDataOptions()}
            error={errors.producerId}
          >
          </InputSelect>

            <InputCheckBox
              label="Loan for vechile"
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
                onClick={handleSubmit}
                text="SUBMIT"
                disabled= {disableSubmitButton}
              >
              </CustomButton>
              <CustomButton
                text="RESET"
                color="default"
                onClick={resetForm}
              >
              </CustomButton>
            </div>
        </Grid>
      </Grid>
    </Form>
  );
}

export default observer(VehicleForm)
