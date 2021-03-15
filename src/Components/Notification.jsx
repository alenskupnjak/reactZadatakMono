import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const Notification = (props) => {
  const { notify, setNotify } = props;

  // const handleClose = () => {
  //   setNotify({ isOpen: false, msg: '', type: 'info' });
  // };

  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={() => {
        setNotify({ isOpen: false, msg: '', type: 'info' });
      }}
    >
      <Alert severity={notify.type} onClose={() => {
        setNotify({ isOpen: false, msg: '', type: 'info' });
      }}>
        {notify.msg}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
