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
  Button
} from '@material-ui/core';
import { Search  } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';

import { getProducerOptions , getModelOptions, headCell} from '../Common/VehicleService';
import  VehicleForm from './VehicleForm'
import  UseTable from '../Components/UseTable'
import {store} from  '../Common/StoreVechile'
import InputCommon from '../Components/InputCommon';
import CustomOpenDialog from '../Components/CustomOpenDialog';



const useStyles = makeStyles((theme)=>({
   pageContent : {
     width:'80%',
     margin:'50px auto',
  //  padding:theme.spacing(5)
   },
   newButton : {
     position:'absolute',
     right:'10px'
   }
}))


// 
function Vehicle() {
  const classes = useStyles();
  const [filterFn, setFilterFn] = useState({ fn: (items) => { return items;}});
  const [openCustomDialog, setOpenCustomDialog] = useState(false);



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
    <React.Fragment>
      <Paper className={classes.pageContent}>

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
            <Button
                className={classes.newButton}
                variant="contained"
                size="large"
                color="primary"
                onClick={() => {setOpenCustomDialog(true)}}
                startIcon={<AddIcon></AddIcon>}
            >
              ADD NEW
            </Button>
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
      <CustomOpenDialog
        openCustomDialog = {openCustomDialog}
        setOpenCustomDialog = {setOpenCustomDialog}
        title="Model vehicle"
      >
        <VehicleForm></VehicleForm>
      </CustomOpenDialog>
    </React.Fragment>

  )
}

export default observer(Vehicle)

