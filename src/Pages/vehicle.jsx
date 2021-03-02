import React from 'react'
import { observer } from 'mobx-react';
import {
  makeStyles,
  Paper,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core';

import  VehicleForm from './VehicleForm'
import  UseTable from '../Components/UseTable'
import {store} from  '../Stores/StoreVechile'

const useStyles = makeStyles((theme)=>({
   pageContent : {
     width:'80%',
     margin:'50px auto',
    //  padding:theme.spacing(5)
   }
}))


const {TableContainer} =  UseTable()


console.log(store.listVehicleGet);


function Vehicle() {
  const classes = useStyles();

  return (
    <Paper className={classes.pageContent}>
      <VehicleForm  >
      </VehicleForm>
      <TableContainer>
        <TableBody>
        {
          store.listVehicleGet.map(data=> (
              <TableRow key={data.id}>
                <TableCell>
                  {data.city}
                </TableCell> 
              </TableRow>
          ))
        }
        </TableBody>
      </TableContainer>

    </Paper>
  )
}

export default observer(Vehicle)

