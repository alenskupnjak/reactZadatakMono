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
import {store} from  '../Common/StoreVechile'


const headCell = [
  {id:'modelAuto', naziv:'Model'},
  {id:'email', naziv:'Email'},
  {id:'mobile', naziv:'Mobile'},
  {id:'city', naziv:'City'},
  {id:'motor', naziv:'Motor'},
  {id:'producer', naziv:'Producer'}
]


const useStyles = makeStyles((theme)=>({
   pageContent : {
     width:'80%',
     margin:'50px auto',
  //  padding:theme.spacing(5)
   }
}))




// 
function Vehicle() {
  const classes = useStyles();
  const {TblContainer, TblHeader, TblPagination} = UseTable( store.listVehicleGet, headCell)



  return (
    <Paper className={classes.pageContent}>
      <VehicleForm></VehicleForm>
      <TblContainer>
        <TblHeader></TblHeader>
        <TableBody>
        {
          store.listVehicleGet.map(data=> (
              <TableRow key={data.id}>
                <TableCell> {data.modelAuto}</TableCell> 
                <TableCell> {data.email}</TableCell> 
                <TableCell> {data.mobile}</TableCell> 
                <TableCell> {data.city}</TableCell> 
                <TableCell> {data.motor}</TableCell> 
                <TableCell> {data.producer}</TableCell> 
                {/* <TableCell> {data.sellDate}</TableCell>  */}
              </TableRow>
          ))
        }
        </TableBody>
      </TblContainer>
      < TblPagination></TblPagination>
    </Paper>
  )
}

export default observer(Vehicle)

