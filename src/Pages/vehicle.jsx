import React, { useState } from 'react'
import { observer } from 'mobx-react';
import {
  makeStyles,
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from '@material-ui/core';


import { Search } from '@material-ui/icons';
import  VehicleForm from './VehicleForm'
import  UseTable from '../Components/UseTable'
import {store} from  '../Common/StoreVechile'
import InputCommon from '../Components/InputCommon';
import { getProducerOptions , getModelOptions} from '../Common/VehicleService';


const headCell = [
  {id:'modelAuto', label:'Model'},
  {id:'email', label:'Email', disabledSorting:true},
  {id:'mobile', label:'Mobile'},
  {id:'city', label:'City'},
  {id:'motor', label:'Motor'},
  {id:'producer', label:'Producer'}
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
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const {TblContainer, TblHeader, TblPagination, afterSortingAndFiltering} = UseTable(store.listVehicleGet, headCell,filterFn)


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

  // filtriranje
  const handleSearch = (e) => {    
    if (e.target.value === '') {
      setFilterFn({
        fn: (items) => {
            return items;
        }
      });
    } else {
      setFilterFn({
        fn: (items) => {
          return items.filter((data) =>
            data.model.toLowerCase().includes(e.target.value.toLowerCase())
          )
        }
      });
    }
  };


  return (
    <Paper className={classes.pageContent}>
      <VehicleForm></VehicleForm>
        <Toolbar>   
          <InputCommon
            style={{width:'60%'}}
            label='Filter'
            className={classes.searchInput}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start' >
                  <Search />
                </InputAdornment>
              ),
            }}
          >
            
          </InputCommon>
        </Toolbar>
      <TblContainer>
        <TblHeader></TblHeader>
        <TableBody>
        {
          afterSortingAndFiltering().map(data=> (
              <TableRow key={data.id}>
                {/* <TableCell> 
                  {
                    findModelVehicle(data.modelAuto)
                  }
                </TableCell>  */}
                <TableCell> {data.model}</TableCell> 
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

