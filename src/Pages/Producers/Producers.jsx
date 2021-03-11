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


import { getProducerOptions , getModelOptions, headCellProducer, initProducerValue} from '../../Common/VehicleService';
import  ProducerForm from './Components/ProducerForm'
import  UseTable from '../../Components/UseTable'
// import {store} from  '../../Common/StoreVechile'
import {storeProducers} from  '../../Common/StoreProducers'
import InputCommon from '../../Components/InputCommon';
import ConfirmDialog from '../../Components/ConfirmDialog';
import CustomOpenDialog from '../../Components/CustomOpenDialog';
import Notification from '../../Components/Notification';


// 
const useStyles = makeStyles((theme)=>({
   pageContent : {
     width:'80%',
     margin:'0 auto',


    //  
    //  backgroundColor:'green',
  //  padding:theme.spacing(5)
   },
   newButton : {
     position:'absolute',
     right:'10px'
   },
   searchInput : {
      width:'60%',
      backgroundColor:'#0000001a',
      '&:hover': {
        borderLeft: 'solid 5px #f83245',
      },
      '&:focus': {
        backgroundColor:'yellow',
      },
      'input[type="text"]': { 
        backgroundColor:'yellow',
    } 
   },
   custom : {
     '& .MuiButton-startIcon': {
      marginRight: '0px',
      marginLeft: '0px',
      color:'#fff'
    },
   },
   tablehead: {
    '& .MuiTableCell-head': {
      backgroundColor:'orange',
      color:'blue'
    },
    '& .MuiTableHead-root': {
      backgroundColor:'orange'
    },
    '& .makeStyles-table-7 thead th': {
      color:'red',
      backgroundColor:' green'
    }
  },


}))


// 
function Producers() {
  const classes = useStyles();

  // SET state
  const [filterFn, setFilterFn] = useState({ fn: (items) => { return items;}});
  const [openCustomDialog, setOpenCustomDialog] = useState(false);
  const [addOrUpdate, setAddOrUpdate] = useState('addFormValueToList');
  const [notify,setNotify] = useState({isOpen:false, msg:'', type:''});
  const [confirmDialog, setConfirmDialog] = useState({isOpen:false,title:'', subTitle:''});


  const {TblContainer, TblHeader, TblPagination, afterSortingAndFiltering} = UseTable(storeProducers.listModelGet, headCellProducer, filterFn)


  // for populating table
  const  findProducerVehicle = (dataModelAuto) => {
    // console.log(dataModelAuto);
    // console.log(getModelOptions());
    // console.log(getProducerOptions());
    // console.log('list.modelget-',storeProducers.listModelGet);
    
    // const model = getModelOptions().find(data=>{
    //   return data.id === dataModelAuto
    // })

    // console.log(model);
    
    const prod = getProducerOptions().find(data=>{
        return data.id === dataModelAuto
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


  // editing and adding
  const updateOrAddFunc = (dataFormValue) => {
    console.log('Dataform value ',dataFormValue);
    console.log('storeProducers.producerFormValue ',storeProducers.producerFormValue);
    
    setOpenCustomDialog(true)
    setAddOrUpdate('updateFormValue')

    // Display info on screen
    setNotify({isOpen:true, msg:'Edit Producer', type:'info'});

    // find producer name
    // const producer = findProducerVehicle(dataFormValue.modelAuto)
    // dataFormValue.producer = producer

    // send data to form
    storeProducers.producerFormValue= dataFormValue
  }

  // DELETE record
  const deleteVehicle= (id) => {
    setConfirmDialog({isOpen:false})
    // if(window.confirm('Are you sure to delete this record?')) {
      // Display info on screen
      setNotify({isOpen:true, msg:'Delete Vechile', type:'error'});
      storeProducers.listModelDelete(id)
    // }
  }




  return (
    <React.Fragment>
      <Paper className={classes.pageContent}>

          <Toolbar>   
            <InputCommon
              label='Filter Model'
              className={classes.searchInput }
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
                color="default"
                onClick={() => { storeProducers.producerFormValue = initProducerValue; setOpenCustomDialog(true)}}
                startIcon={<AddIcon></AddIcon>}
            >
              ADD NEW PRODUCER
            </Button>
          </Toolbar>
        <TblContainer>
          <TblHeader className={classes.tablehead} ></TblHeader>
          <TableBody>
          {
            afterSortingAndFiltering().map(data=> (
                <TableRow key={data.id}>
                  <TableCell> {data.model}</TableCell> 
                  <TableCell> 
                    {
                      findProducerVehicle(data.producerId)  
                    }
                  </TableCell>
                  <TableCell> 

                    <Button
                      id={data.id}
                      className={classes.custom}
                      variant="contained"
                      style={{backgroundColor:'orange', padding:'10px', marginRight: '5px'}}
                      onClick={() => updateOrAddFunc (data) }
                      startIcon={<EditIcon></EditIcon>}
                    >
                    </Button>
                    <Button
                      id={data.id}
                      className={classes.custom}
                      variant="outlined"
                      style={{backgroundColor:'#f83245', padding:'10px', marginRight: '0px'}}
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
          title="Producers"
        >
        <ProducerForm
          setOpenCustomDialog={setOpenCustomDialog}
          addOrUpdate={addOrUpdate}
          setAddOrUpdate={setAddOrUpdate}
          setNotify={setNotify}
        >
        </ProducerForm>
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

export default observer(Producers)

