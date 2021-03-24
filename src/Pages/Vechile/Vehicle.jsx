import React from 'react';
import { observer } from 'mobx-react';
import {
  makeStyles,
  Paper,
  Toolbar,
  InputAdornment,
  Button,
  TextField,
  Badge,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';

import VehicleForm from './Components/VehicleForm';
import UseTableNew from '../../Components/UseTableNew';
import ConfirmDialog from '../../Components/ConfirmDialog';
import CustomOpenDialog from '../../Components/CustomOpenDialog';
import Notification from '../../Components/Notification';
import { storeVehicle } from './VehicleStore';
import { storeNotification } from '../../Stores/StoreNotification';

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
                        : storeVehicle.filterRecordLength
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

        <UseTableNew store={storeVehicle}></UseTableNew>
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
