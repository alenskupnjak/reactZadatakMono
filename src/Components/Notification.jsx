import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const Notification = (props) => {
  const { notify, store } = props;

  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={3000}
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
