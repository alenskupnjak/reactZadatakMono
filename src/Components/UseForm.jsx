import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Observer } from 'mobx-react';
import  { store } from  '../Common/StoreVechile'
import { getProducerOptions , getModelOptions} from '../Common/VehicleService';
import {storeProducers} from  '../Common/StoreProducers'

// 
export function useForm(validationForm) {
  // detect change in all inputs fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value);
    
    
    if (name ==='modelAuto') {
      const modelData = storeProducers.listModelGet.find(data=> {
        return data.id === value
      })

      console.log(modelData);
      console.log(getModelOptions());
      console.log('list.modelget-',storeProducers.listModelGet);


      console.log(getProducerOptions());
      console.log('list.modelget-',storeProducers.listProducerGet);
      
      const dataVechileProducer = storeProducers.listProducerGet.find(data=>{
        return data.id === modelData.producerId
      })

      console.log(dataVechileProducer);
      
      store.setVechileValue('producer',dataVechileProducer.producer)
      store.setVechileValue('modelAuto',modelData.id)
    } else {
      // save record to store validation
      store.setVechileValue(name,value)
    }
  
    // validate form
    validationForm()
  };
  return { handleInputChange };
}


// Style Form CSS
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1),
      backgroundColor: '#eee',
    },
  },
}));


// 
export function Form(props) {
  const classes = useStyles();
  return (
    <Observer>
      {
        ()=>(
            // option: autoComplete="off"
          <form className={classes.root}  >
            {props.children}
          </form>
        )
      }
    </Observer>
  )
}

