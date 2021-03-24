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
  Badge,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

import VehicleForm from './Components/VehicleForm';
import UseTable from '../../Components/UseTable';
import ConfirmDialog from '../../Components/ConfirmDialog';
import CustomOpenDialog from '../../Components/CustomOpenDialog';
import Notification from '../../Components/Notification';
import { storeVehicle } from './VehicleStore';
import { storeNotification } from '../../Stores/StoreNotification';
import {
  deleteListVehicleFromService,
  getListVehicleFromService,
} from '../../Common/VehicleService';

//
const useStyles = makeStyles((theme) => ({
  pageContent: {
    width: '80%',
    // height:'100vh',
    margin: '0 auto',
  },
  addButton: {
    position: 'absolute',
    right: '10px',
    // border:'none',
    '&.MuiButtonBase-root': {
      // color:'red',
      // border:'3px solid white',
      borderStyle: 'outset',
      cursor: 'default',
    },
    '&:hover': {
      backgroundColor: '#00000080',
      color: '#fff',
    },
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

  const { TblHeader, TblContainer, TblPagination } = UseTable(
    storeVehicle.listVehicleGet,
    storeVehicle.headCellVechileData,
    storeVehicle,
  );

  return (
    <React.Fragment>
      <Paper className={classes.pageContent}>
        <Toolbar>
          <TextField
            className={classes.searchInput}
            label="Filter Model"
            name="filter"
            value={storeVehicle.filterInputValue}
            onChange={(e) => {
              storeVehicle.handleSearch(e);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Badge
                    color="secondary"
                    badgeContent={
                      storeVehicle.filterInputValue === ''
                        ? 0
                        : storeVehicle.filterRecordLength.toString()
                    }
                  >
                    <Search />
                  </Badge>
                </InputAdornment>
              ),
            }}
          ></TextField>

          <Button
            className={classes.addButton}
            variant="contained"
            size="large"
            color="primary"
            startIcon={<AddIcon></AddIcon>}
            onClick={() => {
              storeVehicle.resetFormValue();
              storeVehicle.setOpenCustomDialog(true);
            }}
          >
            ADD VEHICLE
          </Button>
        </Toolbar>
        <TblContainer>
          <TblHeader></TblHeader>
          <TableBody>
            {storeVehicle.afterSortingAndFiltering().map((data) => (
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
                      storeVehicle.setOpenCustomDialog(true);
                      storeVehicle.setAddOrUpdate('updateFormValue');
                      storeNotification.setNotify({
                        isOpen: true,
                        msg: 'Edit Vehicle',
                        type: 'info',
                      });
                      storeVehicle.vehicleFormValue = data;
                      storeVehicle.setDisableSubmitButton(false);
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
                      storeVehicle.setConfirmDialog({
                        isOpen: true,
                        title: 'Are you sure to delete this Vehicle?',
                        subTitle: "You can't undo this operation.",
                        onConfirm: () => {
                          storeVehicle.setConfirmDialog({ isOpen: false });
                          storeNotification.setNotify({
                            isOpen: true,
                            msg: 'Delete Vehicle',
                            type: 'error',
                          });
                          // storeVehicle.listVehicleDelete(data.id);

                          //  FROM Backend  SERVICE
                          deleteListVehicleFromService(data.id);
                          storeVehicle.listVehicle = getListVehicleFromService();
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
        openCustomDialog={storeVehicle.openCustomDialog}
        store={storeVehicle}
        title="Vehicle"
      >
        <VehicleForm store={storeVehicle}></VehicleForm>
      </CustomOpenDialog>
      <Notification
        notify={storeNotification.notify.isOpen}
        store={storeNotification}
      ></Notification>
      <ConfirmDialog
        dataDialog={storeVehicle.confirmDialog.isOpen}
        store={storeVehicle}
      ></ConfirmDialog>
    </React.Fragment>
  );
}

export default observer(Vehicle);
