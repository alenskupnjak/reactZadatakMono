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
import { EditOutlined, Search  } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

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
   },
   custom : {
     '& .MuiButton-startIcon': {
      marginRight: '0px',
      marginLeft: '0px'
    },
   }
}))


// 
function Vehicle() {
  const classes = useStyles();
  const [filterFn, setFilterFn] = useState({ fn: (items) => { return items;}});
  const [openCustomDialog, setOpenCustomDialog] = useState(false);
  const [addOrUpdate, setAddOrUpdate] = useState('addFormValueToList');



  const {TblContainer, TblHeader, TblPagination, afterSortingAndFiltering} = UseTable(store.listVehicleGet, headCell,filterFn)


  // for populating table
  const  findProducerVehicle = (dataModelAuto) => {
    const model = getModelOptions().find(data=>{
      return data.id === dataModelAuto
    })
    
    const prod = getProducerOptions().find(data=>{
        return data.id === model.producerId
    })
    return prod.producer
  }
  



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

  // for editing and adding
  const updateOrAddFunc = (dataFormValue) => {
    console.log(dataFormValue);
    setOpenCustomDialog(true)
    setAddOrUpdate('updateFormValue')

    const producer = findProducerVehicle(dataFormValue.modelAuto)
    console.log(producer);
    dataFormValue.producer = producer
    
    
    store.vechileFormValue= dataFormValue
    // console.log(e.target.value);
    
  }

  // DELETE record
  const deleteVehicle= (id) => {
      console.log(id);
  }


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
              ADD NEW MODEL
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
                  <TableCell> 

                    <Button
                      id={data.id}
                      className={classes.custom}
                      variant="contained"
                      style={{backgroundColor:'#2543C5', padding:'5px', marginRight: '0px'}}
                      onClick={() => updateOrAddFunc (data) }
                      startIcon={<EditIcon></EditIcon>}
                    >
                    </Button>
                    <Button
                      id={data.id}
                      className={classes.custom}
                      variant="outlined"
                      style={{backgroundColor:'red', padding:'5px', marginRight: '0px'}}
                      onClick={ () => deleteVehicle(data.id) }
                      startIcon={<DeleteOutlineIcon></DeleteOutlineIcon>}
                    >
                    </Button>
                  
                  
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
        <VehicleForm
          setOpenCustomDialog={setOpenCustomDialog}
          addOrUpdate={addOrUpdate}
        >
        </VehicleForm>
      </CustomOpenDialog>
    </React.Fragment>

  )
}

export default observer(Vehicle)

