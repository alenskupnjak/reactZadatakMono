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
  TextField,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

// import { headCellVechile, initVechileValue } from '../../Common/VehicleService';
import VehicleForm from './Components/VehicleForm';
import UseTable from '../../Components/UseTable';
import ConfirmDialog from '../../Components/ConfirmDialog';
import CustomOpenDialog from '../../Components/CustomOpenDialog';
import Notification from '../../Components/Notification';
import { store } from '../Vechile/StoreVechile';
import { storeNotification } from '../../Stores/StoreNotification';

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
  // const storeUseTable = new UseTableSort()

  const { TblHeader, TblContainer, TblPagination } = UseTable(
    store.listVehicleGet,
    store.headCellVechileData,
    store.storeUseTable
  );

  return (
    <React.Fragment>
      <Paper className={classes.pageContent}>
        <Toolbar>
          <TextField
            className={classes.searchInput}
            label="Filter Model"
            onChange={(e) => {
              store.handleSearch(e);
            }}
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
              store.vechileFormValue = store.getinitVechileValue;
              store.setOpenCustomDialog(true);
            }}
            startIcon={<AddIcon></AddIcon>}
          >
            ADD VEHICLE
          </Button>
        </Toolbar>
        <TblContainer>
          <TblHeader></TblHeader>
          <TableBody>
            {store.afterSortingAndFiltering().map((data) => (
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
                      storeNotification.setNotify({
                        isOpen: true,
                        msg: 'Edit Vehicle',
                        type: 'info',
                      });
                      store.vechileFormValue = data;
                      store.setDisableSubmitButton(false);
                    }}
                    startIcon={<ListIcon></ListIcon>}
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
                        title: 'Are you sure to delete this Vehicle?',
                        subTitle: "You can't undo this operation.",
                        onConfirm: () => {
                          store.setConfirmDialog({ isOpen: false });
                          storeNotification.setNotify({
                            isOpen: true,
                            msg: 'Delete Vehicle',
                            type: 'error',
                          });
                          store.listVehicleDelete(data.id);
                        },
                      });
                    }}
                    startIcon={
                      <DeleteForeverOutlinedIcon></DeleteForeverOutlinedIcon>
                    }
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
        title="Vehicle"
      >
        <VehicleForm store={store}></VehicleForm>
      </CustomOpenDialog>
      <Notification
        notify={storeNotification.notify.isOpen}
        store={storeNotification}
      ></Notification>
      <ConfirmDialog
        dataDialog={store.confirmDialog.isOpen}
        store={store}
      ></ConfirmDialog>
    </React.Fragment>
  );
}

export default observer(Vehicle);
