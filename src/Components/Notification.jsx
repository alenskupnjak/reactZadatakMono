import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core';

//  custom CSS
const useStyles = makeStyles((theme) => ({
  dialog: {
    width: '400px',
    top: theme.spacing(3),
    padding: theme.spacing(2),
  },
}));

const Notification = (props) => {
  const classes = useStyles();
  const { notify, store } = props;

  return (
    <Snackbar
      className={classes.dialog}
      open={notify.isOpen}
      autoHideDuration={2000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={() => {
        store.setNotify({ isOpen: false, msg: '', type: 'info' });
      }}
    >
      <Alert
        severity={notify.type}
        onClose={() => {
          store.setNotify({ isOpen: false, msg: '', type: 'info' });
        }}
      >
        {notify.msg}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
