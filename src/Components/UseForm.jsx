import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Observer } from 'mobx-react';
import  {store} from  '../Stores/StoreVechile'

// 
export function useForm(validationForm) {
  // Prati promjenu vrijednossti u INPUT poljima
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    console.log(validationForm());

    // Validacija forme
      store.setVechileValue(name,value)
  
    // validiram formu
    validationForm()
  };
  return { handleInputChange };
}


// Style CSS
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
            // OPCIJA: autoComplete="off"
          <form className={classes.root}  >
            {props.children}
          </form>
        )
      }
    </Observer>
  )
}

