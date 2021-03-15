import {
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
  Button,
} from '@material-ui/core';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import {store} from '../Common/StoreVechile'

const useStyle = makeStyles((theme) => ({
  dialogcustom: {
    padding: theme.spacing(2),
    '& .MuiButton-startIcon': {
      marginRight: '0px',
      marginLeft: '0px',
    },
    '& .MuiButton-root': {
      minWidth: '16px',
    },
  },
}));

//
const CustomOpenDialog = (props) => {
  const classes = useStyle();
  const {
    title,
    children,
    openCustomDialog,
    // setOpenCustomDialog,
    // setAddOrUpdate,
  } = props;
  

  return (
    <Dialog
      open={openCustomDialog}
      maxWidth="md"
      className={classes.dialogcustom}
    >
      <DialogTitle>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              // console.log('zatvorio',setOpenCustomDialog);
              store.setOpenCustomDialog(false);
              
              store.setAddOrUpdate('addFormValueToList');
            }}
            className={classes.root}
            startIcon={<CloseIcon></CloseIcon>}
          ></Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
};

export default CustomOpenDialog;
