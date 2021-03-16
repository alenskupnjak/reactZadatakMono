import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
// import { storeNotification } from '../Common/StoreNotification';

const Notification = (props) => {
  const { notify , store} = props;

  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={() => {
        store.setNotify({ isOpen: false, msg: '', type: 'info' });
      }}
    >
      <Alert severity={notify.type} onClose={() => {
        store.setNotify({ isOpen: false, msg: '', type: 'info' });
      }}>
        {notify.msg}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
