import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Grid, TextField, makeStyles } from '@material-ui/core';

import { Form } from '../../../Components/UseForm';
import CustomButton from '../../../Components/CustomButton';
import { storeProducers } from '../../../Common/StoreProducers';
import { store } from '../../../Common/StoreVechile';

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

  // form validation
  const validationForm = () => {
    // SET error
    const tempError = {};
    tempError.model = storeProducers.producerFormValue.model.length > 2 ? '' : 'Minimum 3 character';
    tempError.producer = storeProducers.producerFormValue.producer.length > 0 ? '' : 'Minimum 1 character';

    // define error
    setErrors({
      ...tempError,
    });

    // if validation all fields is TRUE, make enable button SUBMIT
    if (Object.values(tempError).every((x) => x === '')) {
      setDisableSubmitButton(false);
    } else {
      setDisableSubmitButton(true);
    }

    // check tempError, if all values ="" => NO error  =>  set validationForm=TRUE
    return Object.values(tempError).every((x) => x === '');
  };

  // handle input
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    storeProducers.setProducerValue(name, value);

    // validate form
    validationForm();
  };

  //
  //  if UPDATE => ENABLE submit button
  useEffect(() => {
    if (addOrUpdate === 'updateFormValue') setDisableSubmitButton(false);
  }, [addOrUpdate]);

  //
  // RESET form
  function resetForm() {
    storeProducers.setProducerValue('model', '');
    storeProducers.setProducerValue('producer', '');
    setErrors({});
    setDisableSubmitButton(true);
  }

  //
  // find duplicate value => error UI
  const findDuplicateData = (array, cellName) => {
    const findDuplicate = array.find((data) => {
      if (data[cellName] === storeProducers.producerFormValue[cellName]) {
        return data;
      }
      return null;
    });

    if (findDuplicate) {
      setErrors({
        [cellName]: `Duplicate ${cellName} name`,
      });
      return true;
    }
  };

  //
  // SUBMIT form
  const handleSubmit = (e) => {
    e.preventDefault();

    // check input fields
    validationForm();

    //  IF FORM is valid  => save data in mobX
    if (validationForm()) {
      if (addOrUpdate === 'addFormValueToList') {
        //  ADD ADD ADD ADD ADD
        // if duplicate model => return
        if (findDuplicateData(storeProducers.listModelGet, 'model')) {
          return;
        }
        // if duplicate producer => return
        if (findDuplicateData(storeProducers.listProducerGet, 'producer')) {
          return;
        }

        // Generate fake ID
        storeProducers.producerFormValue.id = generateModelId();

        const { model, producer } = storeProducers.producerFormValue;

        // console.log(storeProducers.producerFormValue);
        // console.log(storeProducers.listProducerGet);

        const dataProducer = {
          id: generateProducerId(),
          producer: producer.toUpperCase(),
        };

        const dataModel = {
          id: generateModelId(),
          model: model,
          producerId: dataProducer.id,
          producer: producer.toUpperCase(),
        };

        // save record to listVehicle
        storeProducers.listProducerPut(dataProducer);
        storeProducers.listModelPut(dataModel);

        // console.log(storeProducers.listModelGet);
        // console.log(storeProducers.listProducerGet);

        // Display info on screen
        setNotify({ isOpen: true, msg: 'Add Vechile', type: 'success' });
      } else {
        // UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE
        // find model producer to store in model record
        const modelProdOld = storeProducers.listModelGet.find((data) => {
          return data.id === storeProducers.producerFormValue.id;
        });

        const dataVehicle = {
          id: modelProdOld.id,
          model: storeProducers.producerFormValue.model,
          producerId: storeProducers.producerFormValue.producerId,
          producer: storeProducers.producerFormValue.producer.toUpperCase(),
        };
        storeProducers.listModelUpdate(dataVehicle);

        // search list, UPDATE vechile list
        store.listVehicle.forEach((data) => {
          if (modelProdOld.model === data.model) {
            const dataVehicle = {
              id: data.id,
              modelAuto: data.modelAuto,
              model: storeProducers.producerFormValue.model,
              producer: storeProducers.producerFormValue.producer.toUpperCase(),
              email: data.email,
              mobile: data.mobile,
              city: data.city,
              motor: data.motor,
              sellDate: data.sellDate,
              isLoan: data.isLoan,
            };
            store.listVehicleUpdate(dataVehicle);
          }
        });

        console.table(storeProducers.listModelGet);
        console.table(store.listVehicleGet);

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
    <Form>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            className={classes.root}
            variant="outlined"
            label="Model"
            name="model"
            value={storeProducers.producerFormValue.model}
            onChange={handleInputChange}
            error={errors.model ? true : false}
            helperText={errors.model ? errors.model : ''}
          ></TextField>

          <TextField
            className={classes.root}
            variant="outlined"
            label="Producer"
            name="producer"
            value={storeProducers.producerFormValue.producer}
            onChange={handleInputChange}
            error={errors.producer ? true : false}
            helperText={errors.producer ? errors.producer : ''}
          ></TextField>

          <div>
            <CustomButton
              onClick={handleSubmit}
              // text="SUBMIT"
              text={addOrUpdate === 'addFormValueToList' ? 'SUBMIT' : 'UPDATE'}
              disabled={disableSubmitButton}
            ></CustomButton>
            <CustomButton
              text="RESET"
              color="default"
              onClick={resetForm}
            ></CustomButton>
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}

export default observer(ProducerForm);
