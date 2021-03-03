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
import { getProducerOptions , getModelOptions} from '../Common/VehicleService';


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
  const {TblContainer, TblHeader, TblPagination,  afterSortingAndFiltering} = UseTable( store.listVehicleGet, headCell)


  // 
  const  findProducerVehicle = (dataModelAuto) => {
    const model = getModelOptions().find(data=>{
      return data.id === dataModelAuto
    })
    
    const prod = getProducerOptions().find(data=>{
        return data.id === model.producerId
    })
    
    return prod.producer
  }
  

  // 
  const findModelVehicle = (dataVeh) => {
      const modelVeh = getModelOptions().find(data => {
        return data.id === dataVeh
      })    
      return modelVeh.model
  };

  
  

  return (
    <Paper className={classes.pageContent}>
      <VehicleForm></VehicleForm>
      <TblContainer>
        <TblHeader></TblHeader>
        <TableBody>
        {
          afterSortingAndFiltering().map(data=> (
              <TableRow key={data.id}>
                <TableCell> 
                  {
                    findModelVehicle(data.modelAuto)
                  }
                </TableCell> 
                <TableCell> {data.email} </TableCell> 
                <TableCell> {data.mobile} </TableCell> 
                <TableCell> {data.city} </TableCell> 
                <TableCell> {data.motor} </TableCell> 
                <TableCell> 
                  {
                    findProducerVehicle(data.modelAuto)  
                  }
                </TableCell> 
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

