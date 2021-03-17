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

import { headCellProducer, } from '../../Common/VehicleService';
import ProducerForm from './Components/ProducerForm';
import UseTable from '../../Components/UseTable';
import ConfirmDialog from '../../Components/ConfirmDialog';
import CustomOpenDialog from '../../Components/CustomOpenDialog';
import Notification from '../../Components/Notification';

import { store } from '../../Common/StoreVechile';
import { storeProducers } from '../../Common/StoreProducers';
import { storeNotification } from '../../Common/StoreNotification';

// CSS
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
  tablehead: {
    '& .MuiTableCell-head': {
      backgroundColor: '#28A746',
      color: '#fff',
    },
  },
}));

//
function Producers() {
  const classes = useStyles();

  const {
    TblContainer,
    TblHeader,
    TblPagination,
    afterSortingAndFiltering,
  } = UseTable(storeProducers.listModelGet, headCellProducer, storeProducers);


  return (
    <React.Fragment>
      <Paper className={classes.pageContent}>
        <Toolbar>

          <TextField
            className={classes.searchInput}
            label="Filter Model"
            onChange={(e) => { storeProducers.handleSearch(e) }}
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
            style={{
              borderRadius: 30,
              backgroundColor: "#28A746",
              padding: "7px 12px",
              fontSize: "18px",
              color: '#fff'
            }}
            variant="contained"
            size="large"
            // color="default"
            onClick={() => {
              storeProducers.resetFormValue();
              storeProducers.setOpenCustomDialog(true);
            }}
            startIcon={<AddIcon></AddIcon>}
          >
            ADD NEW MODEL / PRODUCER
          </Button>
        </Toolbar>
        <TblContainer>
          <TblHeader css={classes.tablehead}></TblHeader>
          <TableBody>
            {
              afterSortingAndFiltering().map((data) => (
                <TableRow key={data.id}>
                  <TableCell>{data.model}</TableCell>
                  <TableCell>{data.producer}</TableCell>
                  <TableCell>
                    <Button
                      id={data.id}
                      className={classes.custom}
                      variant="contained"
                      style={{
                        backgroundColor: 'orange',
                        padding: '10px',
                        marginRight: '5px',
                      }}
                      onClick={() => {
                        storeProducers.setOpenCustomDialog(true);
                        storeProducers.setAddOrUpdate('updateFormValue');
                        storeNotification.setNotify({ isOpen: true, msg: 'Edit Producer', type: 'info' });
                        storeProducers.producerFormValue = data;
                        storeProducers.setDisableSubmitButton(false);
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
                        storeProducers.setConfirmDialog({
                          isOpen: true,
                          title: 'Are you sure to delete this record?',
                          subTitle: 'You can not undo action',
                          onConfirm: () => {
                            storeProducers.setConfirmDialog({ isOpen: false });
                            storeNotification.setNotify({ isOpen: true, msg: 'Delete Producer', type: 'error' });
                            store.listVehicleGet.forEach((dataVechile) => {
                              if (data.id === dataVechile.modelAuto) {
                                store.listVehicleDelete(dataVechile.id);
                              }
                            });
                            storeProducers.listModelDelete(data.id);
                            storeProducers.listProducerDelete(data.producer);
                          },
                        });
                      }}
                      startIcon={<DeleteOutlineIcon></DeleteOutlineIcon>}
                    ></Button>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </TblContainer>

        <TblPagination></TblPagination>
      </Paper>

      <CustomOpenDialog
        store={storeProducers}
        openCustomDialog={storeProducers.openCustomDialog}
        title="Model and Producer"
      >
        <ProducerForm></ProducerForm>
      </CustomOpenDialog>

      <Notification notify={storeNotification.notify.isOpen} store={storeNotification}></Notification>

      <ConfirmDialog
        dataDialog={storeProducers.confirmDialog.isOpen}
        store={storeProducers}
      ></ConfirmDialog>
    </React.Fragment>
  );
}

export default observer(Producers);
