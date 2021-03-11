import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Grid, TextField, makeStyles } from '@material-ui/core';

// import { useForm, Form } from '../../../Components/UseForm';
import CustomButton from '../../../Components/CustomButton';
import {
  getModelOptions,
  initProducerValue,
  getProducerOptions,
} from '../../../Common/VehicleService';
import { storeProducers } from '../../../Common/StoreProducers';
import {store } from  '../../../Common/StoreVechile'

//
// Style CSS
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
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
function ProducerForm(props) {
  const classes = useStyles();
  const { setOpenCustomDialog, addOrUpdate, setAddOrUpdate, setNotify } = props;

  // SET state
  const [errors, setErrors] = useState({});
  const [disableSubmitButton, setDisableSubmitButton] = useState(true);
  // const [notify,setNotify] = useState({isOpen:false, msg:'', type:''});

  // form validation
  const validationForm = () => {
    // SET error
    const tempError = {};
    tempError.model =
      storeProducers.producerFormValue.model !== '' ? '' : 'Model exist ';
    // tempError.email = (/@/).test( storeProducers.producerFormValue.email)  ? '' : 'Invalid emali'

    // define error
    setErrors({
      ...tempError,
    });

    console.log(tempError);

    // if validation all fields is TRUE, make enable button SUBMIT
    if (Object.values(tempError).every((x) => x === '')) {
      setDisableSubmitButton(false);
    } else {
      setDisableSubmitButton(true);
    }

    // check tempError, if all values ="" => NO error  =>  set validationForm=TRUE
    return Object.values(tempError).every((x) => x === '');
  };

  //
  const checkModel = () => {};

  // handle input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    console.log(storeProducers.producerFormValue);

    // console.log(e.target);
    // console.log(e.target.value);
    // console.log(e.target.name);

    // const { model, producerId } = e.target;
    // console.log(model, producerId);

    storeProducers.setProducerValue(name, value);

    // console.log(storeProducers.listProducerGet);

    // if (name ==='modelAuto') {
    //   const modelData = getModelOptions().find(data=> {
    //     return data.id === value
    //   })

    //   const dataVechileProducer = getProducerOptions().find(data=>{
    //     return data.id === modelData.producerId
    //   })
    //   storeProducers.setVechileValue('producer',dataVechileProducer.producer)
    //   storeProducers.setVechileValue('modelAuto',modelData.id)
    // } else {
    //   // save record to store validation
    //   storeProducers.setProducerValue(name,value)
    // }

    // validate form
    validationForm();
  };

  //
  // const { handleInputChange } = useForm(validationForm);

  //  if UPDATE => ENABLE submit button
  useEffect(() => {
    if (addOrUpdate === 'updateFormValue') setDisableSubmitButton(false);
  }, [addOrUpdate]);

  // RESET form
  function resetForm() {
    console.log('reset');
    storeProducers.setProducerValue('model', '');
    storeProducers.setProducerValue('producerId', '');

    // storeProducers.producerFormValue = initProducerValue
    console.log(storeProducers.producerFormValue);
    setDisableSubmitButton(true);
  }

  // SUBMIT form
  const handleSubmit = (e) => {
    e.preventDefault();

    // check input fields
    validationForm();

    //  IF FORM is valid  => save data in mobX
    if (validationForm()) {
      //  ADD or UPDATE
      if (addOrUpdate === 'addFormValueToList') {
        // Generate fake ID
        storeProducers.producerFormValue.id = generateModelId();

        const { model, producerId } = storeProducers.producerFormValue;
        console.log(model, producerId);

        console.log(storeProducers.producerFormValue);
        console.log(storeProducers.listProducerGet);

        // const modelSave = getModelOptions().find(data=>{
        //   return data.id ===   storeProducers.producerFormValue.modelAuto
        // })

        const dataProducer = {
          id: generateProducerId(),
          producer: producerId.toUpperCase(),
        };
        console.log(dataProducer);

        const dataModel = {
          id: generateModelId(),
          model: model,
          producerId: dataProducer.id,
        };
        console.log(dataModel);

        // prepare field for sorting
        // storeProducers.producerFormValue.model = modelSave.model

        // save record to listVehicle
        storeProducers.listProducerPut(dataProducer);
        storeProducers.listModelPut(dataModel);

        console.log(storeProducers.listModelGet);
        console.log(storeProducers.listProducerGet);

        // Display info on screen
        setNotify({ isOpen: true, msg: 'Add Vechile', type: 'success' });
      } else {
        // UPDATE UPDATE
        // *****************************************
        // storeProducers.listModelGet   ===  getModelOptions()
        // storeProducers.listProducerGet === getProducerOptions()
        // **************************************
        console.log(storeProducers.listModelGet);
        
        // find model producer to store in model record
        const modelProdOld = storeProducers.listModelGet.find((data) => {
          return data.id === storeProducers.producerFormValue.id;
        });

        console.log(modelProdOld);
        

        const dataVehicle = {
          id: modelProdOld.id,
          model:  storeProducers.producerFormValue.model,
          producerId:  storeProducers.producerFormValue.producerId,
          producer:  storeProducers.producerFormValue.producer,
        };
        storeProducers.listModelUpdate(dataVehicle);

        console.log(storeProducers.listModelGet);
        console.log(store.listVehicleGet);

        
        // Display info on screen
        setNotify({ isOpen: true, msg: 'Update Vechile', type: 'warning' });

        setAddOrUpdate('addFormValueToList');
      }
    }

    // close dialog
    setOpenCustomDialog(false);
  };

  // Generate fake ID
  const generateProducerId = () => {
    return 'p' + Date.now().toString();
  };

  // Generate fake ID for Producer
  const generateModelId = () => {
    return 'm' + Date.now().toString();
  };

  return (
    // <Form>
    <Grid container>
      <Grid item xs={12}>
        <TextField
          className={classes.root}
          variant='outlined'
          label='Model'
          name='model'
          value={storeProducers.producerFormValue.model}
          onChange={handleInputChange}
          // error={errors.model}
        ></TextField>

        <TextField
          className={classes.root}
          variant='outlined'
          label='Producer'
          name='producer'
          value={storeProducers.producerFormValue.producer}
          onChange={handleInputChange}
          // error={errors.producer}
        ></TextField>

        <div>
          <CustomButton
            onClick={handleSubmit}
            // text="SUBMIT"
            text={addOrUpdate === 'addFormValueToList' ? 'SUBMIT' : 'UPDATE'}
            disabled={disableSubmitButton}
          ></CustomButton>
          <CustomButton
            text='RESET'
            color='default'
            onClick={resetForm}
          ></CustomButton>
        </div>
      </Grid>
    </Grid>
    // </Form>
  );
}

export default observer(ProducerForm);
