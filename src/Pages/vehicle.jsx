import React from 'react'
import  VehicleForm from './VehicleForm'
import {
  makeStyles,
  Paper
} from '@material-ui/core';


const useStyles = makeStyles((theme)=>({
   pageContent : {
     width:'80%',
     margin:'50px auto',
    //  padding:theme.spacing(5)
   }
}))



function Vehicle() {
  const classes = useStyles();

  return (
    <Paper className={classes.pageContent}>
      <VehicleForm  >
      </VehicleForm>
    </Paper>
  )
}

export default Vehicle

