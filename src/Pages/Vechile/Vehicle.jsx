import React from 'react';
import { observer } from 'mobx-react';
import {
  makeStyles,
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Button,
  TextField
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import { headCellVechile, initVechileValue } from '../../Common/VehicleService';
import VehicleForm from './Components/VehicleForm';
import UseTable from '../../Components/UseTable';
import ConfirmDialog from '../../Components/ConfirmDialog';
import CustomOpenDialog from '../../Components/CustomOpenDialog';
import Notification from '../../Components/Notification';
import { store } from '../../Common/StoreVechile';
import { storeNotification } from '../../Common/StoreNotification';


//
const useStyles = makeStyles((theme) => ({
  pageContent: {
    width: '80%',
    margin: '0 auto',
  },
  newButton: {
    position: 'absolute',
    right: '10px',
  },
  searchInput: {
    width: '60%',
    backgroundColor: '#0000001a',
    '&:hover': {
      borderLeft: 'solid 5px #f83245',
    },
    '&:focus': {
      backgroundColor: 'yellow',
    },
    'input[type="text"]': {
      backgroundColor: 'yellow',
    },
  },
  custom: {
    '& .MuiButton-startIcon': {
      marginRight: '0px',
      marginLeft: '0px',
      color: '#fff',
    },
  },
}));

//
function Vehicle() {
  const classes = useStyles();
  const {
    afterSortingAndFiltering,
    TblHeader,
    TblContainer,
    TblPagination
  } = UseTable(store.listVehicleGet, headCellVechile,store);


  return (
    <React.Fragment>
      <Paper className={classes.pageContent}>
        <Toolbar>

          <TextField
            className={classes.searchInput}
            label="Filter Model"
            onChange={(e)=> {store.handleSearch(e)}}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          ></TextField>

          <Button
            className={classes.newButton}
            variant="contained"
            size="large"
            color="primary"
            onClick={() => {
              store.vechileFormValue = initVechileValue;
              store.setOpenCustomDialog(true);
            }}
            startIcon={<AddIcon></AddIcon>}
          >
            ADD NEW MODEL
          </Button>
        </Toolbar>
        <TblContainer>
          <TblHeader></TblHeader>
          <TableBody>
            {afterSortingAndFiltering().map((data) => (
              <TableRow key={data.id}>
                <TableCell> {data.model} </TableCell>
                <TableCell> {data.email} </TableCell>
                <TableCell> {data.mobile} </TableCell>
                <TableCell> {data.city} </TableCell>
                <TableCell> {data.motor} </TableCell>
                <TableCell> {data.producer} </TableCell>
                <TableCell>
                  <Button
                    id={data.id}
                    className={classes.custom}
                    variant="contained"
                    style={{
                      backgroundColor: '#2543C5',
                      padding: '10px',
                      marginRight: '5px',
                    }}
                    onClick={() => {
                      store.setOpenCustomDialog(true);
                      store.setAddOrUpdate('updateFormValue');
                      storeNotification.setNotify({ isOpen: true, msg: 'Edit Vechile', type: 'info' });
                      store.vechileFormValue = data;
                    }}
                    startIcon={<EditIcon></EditIcon>}
                  ></Button>
                  <Button
                    id={data.id}
                    className={classes.custom}
                    variant="outlined"
                    style={{
                      backgroundColor: '#f83245',
                      padding: '10px',
                      marginRight: '0px',
                    }}
                    onClick={() => {
                      store.setConfirmDialog({
                        isOpen: true,
                        title: 'Are you sure to delete this record?',
                        subTitle: 'You can not undo action',
                        onConfirm: () => {
                          store.setConfirmDialog({ isOpen: false });
                          storeNotification.setNotify({ isOpen: true, msg: 'Delete Vechile', type: 'error' });
                          store.listVehicleDelete(data.id);
                        },
                      });
                    }}
                    startIcon={<DeleteOutlineIcon></DeleteOutlineIcon>}
                  ></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination></TblPagination>
      </Paper>
      <CustomOpenDialog
        openCustomDialog={store.openCustomDialog}
        store={store}
        title="Model vehicle"
      >
        <VehicleForm
          store={store}
        ></VehicleForm>
      </CustomOpenDialog>
      <Notification notify={storeNotification.notify.isOpen} store={storeNotification}></Notification>
      <ConfirmDialog
        dataDialog={store.confirmDialog.isOpen}
        store={store}
      ></ConfirmDialog>
    </React.Fragment>
  );
}

export default observer(Vehicle);
