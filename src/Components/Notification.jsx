import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const Notification = (props) => {
  const { notify, setNotify } = props;

  const handleClose = (event, reason) => {
    setNotify({ isOpen: false, msg: '', type: 'info' });
  };

  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={handleClose}
    >
      <Alert severity={notify.type} onClose={handleClose}>
        {notify.msg}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
