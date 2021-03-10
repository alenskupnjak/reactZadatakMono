import React , {useState, useEffect } from 'react';
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

import { useForm, Form } from '../../../Components/UseForm';
import InputSelect from '../../../Components/InputSelect';
import InputCheckBox from '../../../Components/InputCheckBox';
import DatePicker from '../../../Components/DatePicker';
import CustomButton from '../../../Components/CustomButton';
import { getModelOptions, initVechileValue} from '../../../Common/VehicleService';
import {store } from  '../../../Common/StoreVechile'
import {storeProducers } from  '../../../Common/StoreProducers'




// 
// Style CSS
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '60%',
    },
    margin: theme.spacing(1),
    '& .MuiButton-startIcon': {
      marginRight: '0px',
      marginLeft: '0px'
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
  const {setOpenCustomDialog, addOrUpdate,  setAddOrUpdate, setNotify} = props

  // SET state
  const [errors, setErrors] = useState({});
  const [disableSubmitButton, setDisableSubmitButton ] = useState(true);
  // const [notify,setNotify] = useState({isOpen:false, msg:'', type:''});

  
  
  // form validation
  const validationForm = () => {
    
    console.log(getModelOptions());
    console.log(storeProducers.listModelGet);

    // eslint-disable-next-line no-useless-escape
    const regexPhone =/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
    // SET error
    const tempError = {}
    tempError.modelAuto = store.vechileFormValue.modelAuto !== '' ? '' : 'Invalid model '
    tempError.email = (/@/).test(store.vechileFormValue.email)  ? '' : 'Invalid emali'
    tempError.mobile = regexPhone.test(store.vechileFormValue.mobile) ? '' : 'Invalid character'

    // define error
    setErrors({
      ...tempError
    })

    // if validation all fields is TRUE, make enable button SUBMIT
    if(Object.values(tempError).every((x) => x === '')) {
      setDisableSubmitButton(false)
    } else {
      setDisableSubmitButton(true)
    }

    // check tempError, if all values ="" => NO error  =>  set validationForm=TRUE
    return Object.values(tempError).every((x) => x === '');
  }

  //
  const { handleInputChange } = useForm(validationForm);


  //  if UPDATE => ENABLE submit button
  useEffect(() => {
    if (addOrUpdate === 'updateFormValue')
        setDisableSubmitButton(false)
    }, [addOrUpdate])



  // RESET form
  function resetForm() {
    store.vechileFormValue = initVechileValue
    setDisableSubmitButton(true)
  }


  // SUBMIT form
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // check input fields
    validationForm()

    //  IF FORM is valid  => save data in mobX
    if(validationForm()) {

      //  ADD or UPDATE
      if(addOrUpdate === 'addFormValueToList') {
        // Generate fake ID
        store.vechileFormValue.id = generateId()
  
        const modelSave = getModelOptions().find(data=>{
          return data.id ===  store.vechileFormValue.modelAuto
        })
  
        // prepare field for sorting
        store.vechileFormValue.model = modelSave.model
        
        // save record to listVehicle
        store.listVehiclePut(store.vechileFormValue)

        // Display info on screen
        setNotify({isOpen:true, msg:'Add Vechile', type:'success'});
      } else {
        // find model producer to store in model record
        const modelVeh = getModelOptions().find(data => {
          return data.id === store.vechileFormValue.modelAuto
        })  

        const dataVehicle = {
          id: store.vechileFormValue.id,
          modelAuto: store.vechileFormValue.modelAuto,
          model: modelVeh.model,
          email:store.vechileFormValue.email,
          mobile: store.vechileFormValue.mobile,
          city: store.vechileFormValue.city,
          motor:store.vechileFormValue.motor,
          sellDate: store.vechileFormValue.sellDate,
          isLoan: store.vechileFormValue.isLoan,
        };
        store.listVehicleUpdate(dataVehicle)
        // Display info on screen
        setNotify({isOpen:true, msg:'Update Vechile', type:'warning'});

        setAddOrUpdate('addFormValueToList')
      }
    }

    // close dialog
    setOpenCustomDialog(false)
  }


  // Generate fake ID
  const generateId = ()  => {
    return 'idx'+ Date.now().toString()
  }


  return (
    <Form>
      <Grid container>
        <Grid item xs={6}>
          <InputSelect
            label="Model"
            name="modelAuto"
            value={store.vechileFormValue.modelAuto}
            onChange={handleInputChange}
            // dataOptions ={getModelOptions()}  old solution
            dataOptions ={storeProducers.listModelGet}
            error={errors.modelAuto}
          >
          </InputSelect>

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
            helperText={errors.mobile  ? 'Invalid phone number' :''}
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
            <FormLabel>Motor</FormLabel>
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


          <TextField
            className={classes.root}
            variant="outlined"
            label="Producer"
            name="producer"
            value={store.vechileFormValue.producer}
            disabled
          >
          </TextField>

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
              // text="SUBMIT"
              text= { addOrUpdate === 'addFormValueToList' ? 'SUBMIT': 'UPDATE'}
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
