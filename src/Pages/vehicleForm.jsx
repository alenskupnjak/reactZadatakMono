import React ,{ useState }from 'react'
import { observer } from "mobx-react";
import {
  Grid,
  TextField,
  makeStyles,
} from '@material-ui/core';




// Inicijalna crijednost forme
const initValue= {
    id: 0,
    modelName: '',
    email: '',
    mobile: '12345679998',
    city: 'Sesvete',
    motor: 'diesel',
    // make: "BMV",
    makeId: '1',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: false,
  };

  // Stylin CSS
  const useStyles = makeStyles((theme)=>({
    root : {
    '& .MuiFormControl-root' : {
        width:'60%',
    },
    margin:theme.spacing(1)
    // '& .MuiInputBase-input' : {
    //     margin:'50px'
    // },

    },
    marginForm: {
      width:'80%',
      margin:'auto'
    }
 }))



// Glavna funkcija
function VehicleForm() {
  const classes = useStyles();
// setiramo pocetnu vrijednost forme
const [values, setValues] = useState(initValue)


  return (
    <form  className={classes.marginForm} >
      <Grid container >
        <Grid item xs={6}>
          <TextField
            className={classes.root}
            variant="outlined"
            label="Model Car"
            value={values.modelName}
          >
          </TextField>
          <TextField
            className={classes.root}
            variant="outlined"
            label="Email"
            value={values.email}
          >
          </TextField>
        </Grid>
        <Grid item xs={6}>

        </Grid>
      </Grid>
    </form>
  )
}

export default VehicleForm
// export default observer(VehicleForm)
