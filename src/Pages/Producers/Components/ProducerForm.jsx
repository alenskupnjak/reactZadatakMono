import React from 'react';
import { observer } from 'mobx-react';
import { Grid, TextField, makeStyles } from '@material-ui/core';

import CustomButton from '../../../Components/CustomButton';
import { storeProducers } from '../../../Common/StoreProducers';

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

  return (
    <Grid container>
      <Grid item xs={12}>
        <TextField
          className={classes.root}
          variant="outlined"
          label="Model"
          name="model"
          value={storeProducers.producerFormValue.model}
          onChange={(e) => storeProducers.handleInputChange(e)}
          error={storeProducers.errors.model ? true : false}
          helperText={
            storeProducers.errors.model ? storeProducers.errors.model : ''
          }
        ></TextField>

        <TextField
          className={classes.root}
          variant="outlined"
          label="Producer"
          name="producer"
          value={storeProducers.producerFormValue.producer}
          onChange={(e) => storeProducers.handleInputChange(e)}
          error={storeProducers.errors.producer ? true : false}
          helperText={
            storeProducers.errors.producer ? storeProducers.errors.producer : ''
          }
        ></TextField>

        <div>
          <CustomButton
            onClick={(e) => storeProducers.handleSubmit(e)}
            // text="SUBMIT"
            text={
              storeProducers.addOrUpdate === 'addFormValueToList'
                ? 'SUBMIT'
                : 'UPDATE'
            }
            disabled={storeProducers.disableSubmitButton}
          ></CustomButton>
          <CustomButton
            text="RESET"
            color="default"
            onClick={(e) => storeProducers.resetForm(e)}
          ></CustomButton>
        </div>
      </Grid>
    </Grid>
  );
}

export default observer(ProducerForm);
