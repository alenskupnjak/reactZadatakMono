import React from 'react';
// import React, { useEffect } from 'react';
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

// import { useForm, Form } from '../../../Components/UseForm';
import InputSelect from '../../../Components/InputSelect';
import InputCheckBox from '../../../Components/InputCheckBox';
import DatePicker from '../../../Components/DatePicker';
import CustomButton from '../../../Components/CustomButton';
import { initVechileValue } from '../../../Common/VehicleService';
import { store } from '../../../Common/StoreVechile';
import { storeProducers } from '../../../Common/StoreProducers';
import { storeNotification } from '../../../Common/StoreNotification';

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
  // const { addOrUpdate, setAddOrUpdate, setNotify } = props;
  // const { setNotify } = props;

  // SET state
  // const [errors, setErrors] = useXXState({});
  // const [disableSubmitButton, setDisableSubmitButton] = useXXState(true);

  // form validation
  const validationForm = () => {
    // console.table(storeProducers.listModelGet);
    // console.table(storeProducers.listProducerGet);

    // eslint-disable-next-line no-useless-escape
    const regexPhone = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
    // SET error
    const tempError = {};
    tempError.modelAuto =
      store.vechileFormValue.modelAuto !== '' ? '' : 'Invalid model ';
    tempError.email = /@/.test(store.vechileFormValue.email)
      ? ''
      : 'Invalid emali';
    tempError.mobile = regexPhone.test(store.vechileFormValue.mobile)
      ? ''
      : 'Invalid character';

    // define error
    store.setErrors({
      ...tempError,
    });

    // if validation all fields is TRUE, make enable button SUBMIT
    if (Object.values(tempError).every((x) => x === '')) {
      store.setDisableSubmitButton(false);
    } else {
      store.setDisableSubmitButton(true);
    }

    // check tempError, if all values ="" => NO error  =>  set validationForm=TRUE
    return Object.values(tempError).every((x) => x === '');
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'modelAuto') {
      const modelData = storeProducers.listModelGet.find((data) => {
        return data.id === value;
      });

      // console.log('list.modelget-',storeProducers.listModelGet);
      // console.log('list.modelget-',storeProducers.listProducerGet);

      const dataVechileProducer = storeProducers.listProducerGet.find(
        (data) => {
          return data.id === modelData.producerId;
        }
      );

      store.setVechileValue('producer', dataVechileProducer.producer);
      store.setVechileValue('modelAuto', modelData.id);
    } else {
      // save record to store validation
      store.setVechileValue(name, value);
    }

    // validate form
    validationForm();
  };

  
  
  
  
  //
  // const { handleInputChange } = useForm(validationForm);




  // //  if UPDATE => ENABLE submit button
  // useEffect(() => {
  //   if (store.addOrUpdate === 'updateFormValue') setDisableSubmitButton(false);
  // }, [store.addOrUpdateaddOrUpdate]);

  // RESET form
  function resetForm() {
    store.vechileFormValue = initVechileValue;
    store.setDisableSubmitButton(true);
  }



  // SUBMIT form
  const handleSubmit = (e) => {
    e.preventDefault();

    // check input fields
    validationForm();

    //  IF FORM is valid  => save data in mobX
    if (validationForm()) {
      //  ADD or UPDATE
      if (store.addOrUpdate === 'addFormValueToList') {
        // Generate fake ID
        store.vechileFormValue.id = generateId();

        const modelSave = storeProducers.listModelGet.find((data) => {
          return data.id === store.vechileFormValue.modelAuto;
        });

        // prepare field for sorting
        store.vechileFormValue.model = modelSave.model;

        // save record to listVehicle
        store.listVehiclePut(store.vechileFormValue);

        // Display info on screen
        storeNotification.setNotify({ isOpen: true, msg: 'Add Vechile', type: 'success' });
      } else {
        // UPDATE
        // find model producer to store in model record
        const modelVeh = storeProducers.listModelGet.find((data) => {
          return data.id === store.vechileFormValue.modelAuto;
        });

        const dataVehicle = {
          id: store.vechileFormValue.id,
          modelAuto: store.vechileFormValue.modelAuto,
          model: modelVeh.model,
          producer: store.vechileFormValue.producer,
          email: store.vechileFormValue.email,
          mobile: store.vechileFormValue.mobile.toString(),
          city: store.vechileFormValue.city,
          motor: store.vechileFormValue.motor,
          sellDate: store.vechileFormValue.sellDate,
          isLoan: store.vechileFormValue.isLoan,
        };
        store.listVehicleUpdate(dataVehicle);
        // Display info on screen
        storeNotification.setNotify({ isOpen: true, msg: 'Update Vechile', type: 'warning' });

        store.setAddOrUpdate('addFormValueToList');
      }
    }

    // close dialog
    store.setOpenCustomDialog(false);
  };




  

  // Generate fake ID
  const generateId = () => {
    return 'idx' + Date.now().toString();
  };

  return (
    // <Form>
      <Grid container className={classes.root}>
        <Grid item xs={6}>
          <InputSelect
            label="Model"
            name="modelAuto"
            value={store.vechileFormValue.modelAuto}
            onChange={handleInputChange}
            dataOptions={storeProducers.listModelGet}
            error={store.errors.modelAuto}
          ></InputSelect>

          <TextField
            className={classes.root}
            variant="outlined"
            label="Email"
            name="email"
            value={store.vechileFormValue.email}
            onChange={handleInputChange}
            error={store.errors.email ? true : false}
            helperText={store.errors.email ? 'Invalid Email' : ''}
          ></TextField>

          <TextField
            className={classes.root}
            variant="outlined"
            label="Mobile"
            name="mobile"
            value={store.vechileFormValue.mobile}
            onChange={handleInputChange}
            error={store.errors.mobile ? true : false}
            helperText={store.errors.mobile ? 'Invalid phone number' : ''}
          ></TextField>

          <TextField
            className={classes.root}
            variant="outlined"
            label="City"
            name="city"
            value={store.vechileFormValue.city}
            onChange={handleInputChange}
          ></TextField>
        </Grid>
        <Grid item xs={6}>
          <FormControl>
            <FormLabel>Motor</FormLabel>
            <RadioGroup
              row
              value={store.vechileFormValue.motor}
              name="motor"
              onChange={handleInputChange}
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
            onChange={handleInputChange}
            value={store.vechileFormValue.isLoan}
          ></InputCheckBox>

          <DatePicker
            label="Sell"
            name="sellDate"
            onChange={handleInputChange}
            value={store.vechileFormValue.sellDate}
          ></DatePicker>
          <div>
            <CustomButton
              onClick={handleSubmit}
              // text="SUBMIT"
              text={store.addOrUpdate === 'addFormValueToList' ? 'SUBMIT' : 'UPDATE'}
              disabled={store.disableSubmitButton}
            ></CustomButton>
            <CustomButton
              text="RESET"
              color="default"
              onClick={resetForm}
            ></CustomButton>
          </div>
        </Grid>
      </Grid>
    // </Form>
  );
}

export default observer(VehicleForm);
