import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Observer } from 'mobx-react';
import  { store } from  '../Common/StoreVechile'

// 
export function useForm(validationForm) {
  // detect change in all inputs fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // save record to store validation
      store.setVechileValue(name,value)
  
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

