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

import ProducerForm from './Components/ProducerForm';
import UseTableNew from '../../Components/UseTableNew';
import ConfirmDialog from '../../Components/ConfirmDialog';
import CustomOpenDialog from '../../Components/CustomOpenDialog';
import Notification from '../../Components/Notification';
import { storeProducers } from './ProducersStore';
import { storeNotification } from '../../Stores/StoreNotification';

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

  return (
    <React.Fragment>
      <Paper className={classes.pageContent}>
        <Toolbar>
          <TextField
            className={classes.searchInput}
            label="Filter Model"
            name="filter"
            value={storeProducers.filterInputValue.toString()}
            onChange={(e) => {
              storeProducers.handleSearch(e);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Badge
                    color="secondary"
                    badgeContent={
                      storeProducers.filterInputValue === ''
                        ? 0
                        : storeProducers.storeUseTable.filterRecordLength
                    }
                  >
                    <Search />
                  </Badge>
                </InputAdornment>
              ),
            }}
          ></TextField>

          <Button
            className={classes.newButton}
            style={{
              borderRadius: 10,
              backgroundColor: '#28A746',
              padding: '8px 12px',
              fontSize: '16px',
              color: '#fff',
            }}
            variant="contained"
            startIcon={<AddIcon></AddIcon>}
            size="large"
            onClick={() => {
              storeProducers.resetFormValue();
              storeProducers.setOpenCustomDialog(true);
            }}
          >
            ADD MODEL
          </Button>
        </Toolbar>

        <UseTableNew
          store={storeProducers.storeUseTable}
          css={classes.tablehead}
        ></UseTableNew>
      </Paper>

      {/* Produce FORM */}
      <CustomOpenDialog
        store={storeProducers}
        openCustomDialog={storeProducers.openCustomDialog}
        title="Model"
      >
        <ProducerForm></ProducerForm>
      </CustomOpenDialog>

      {/* Notification */}
      <Notification
        notify={storeNotification.notify.isOpen}
        store={storeNotification}
      ></Notification>

      {/* CONFIRM DIALOG */}
      <ConfirmDialog
        dataDialog={storeProducers.confirmDialog.isOpen}
        store={storeProducers}
      ></ConfirmDialog>
    </React.Fragment>
  );
}

export default observer(Producers);
