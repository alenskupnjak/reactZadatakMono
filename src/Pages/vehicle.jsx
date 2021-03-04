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
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';


import { getProducerOptions , getModelOptions, headCell, initVechileValue} from '../Common/VehicleService';
import  VehicleForm from './VehicleForm'
import  UseTable from '../Components/UseTable'
import {store} from  '../Common/StoreVechile'
import InputCommon from '../Components/InputCommon';
import ConfirmDialog from '../Components/ConfirmDialog';
import CustomOpenDialog from '../Components/CustomOpenDialog';
import Notification from '../Components/Notification';



const useStyles = makeStyles((theme)=>({
   pageContent : {
     width:'80%',
     margin:'0 auto',
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

  // SET state
  const [filterFn, setFilterFn] = useState({ fn: (items) => { return items;}});
  const [openCustomDialog, setOpenCustomDialog] = useState(false);
  const [addOrUpdate, setAddOrUpdate] = useState('addFormValueToList');
  const [notify,setNotify] = useState({isOpen:false, msg:'', type:''});
  const [confirmDialog, setConfirmDialog] = useState({isOpen:false,title:'', subTitle:''});


  const {TblContainer, TblHeader, TblPagination, afterSortingAndFiltering} = UseTable(store.listVehicleGet, headCell, filterFn)


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
  


  // set functui filter
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
    setOpenCustomDialog(true)
    setAddOrUpdate('updateFormValue')

    // Display info on screen
    setNotify({isOpen:true, msg:'Edit Vechile', type:'info'});

    // find producer name
    const producer = findProducerVehicle(dataFormValue.modelAuto)
    dataFormValue.producer = producer

    // send data to form
    store.vechileFormValue= dataFormValue
  }

  // DELETE record
  const deleteVehicle= (id) => {
    setConfirmDialog({isOpen:false})
    // if(window.confirm('Are you sure to delete this record?')) {
      // Display info on screen
      setNotify({isOpen:true, msg:'Delete Vechile', type:'error'});
      store.listVehicleDelete(id)
    // }
  }


  return (
    <React.Fragment>
      <Paper className={classes.pageContent}>

          <Toolbar>   
            <InputCommon
              style={{width:'60%'}}
              label='Filter Model'
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
                onClick={() => { store.vechileFormValue = initVechileValue; setOpenCustomDialog(true)}}
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
                      onClick={() => {
                        setConfirmDialog({
                            isOpen:true, 
                            title:'Are you sure to delete this record?', 
                            subTitle:'You can not undo action',
                            onConfirm: () => {deleteVehicle(data.id)}
                        })
                      }}
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
          setAddOrUpdate={setAddOrUpdate}
          title="Model vehicle"
        >
        <VehicleForm
          setOpenCustomDialog={setOpenCustomDialog}
          addOrUpdate={addOrUpdate}
          setAddOrUpdate={setAddOrUpdate}
          setNotify={setNotify}
        >
        </VehicleForm>
      </CustomOpenDialog>
      <Notification
        notify={notify}
        setNotify={setNotify}
      >
      </Notification>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      >
      </ConfirmDialog>
    </React.Fragment>

  )
}

export default observer(Vehicle)

