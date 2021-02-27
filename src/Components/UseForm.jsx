import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';

// 
export function useForm(initValue) {
  // setiramo pocetnu vrijednost forme
  const [values, setValues] = useState(initValue);

  // Prati promjenu vrijednossti u INPUT poljima
  const handleInputChange = (e) => {
    
    const { name, value } = e.target;
    console.log(name, value);
    setValues({
      // kopija trenutne vrijednosti
      ...values,
      // trenutna vrijednost koju mijenjamo
      [name]: value,
    });
  };

  return { values, setValues, handleInputChange };
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
    // OPCIJA: autoComplete="off"
    <form className={classes.root}  >
      {props.children}
    </form>
  )
}

