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

const useStyle = makeStyles((theme) => ({
  dialogcustom: {
    padding: theme.spacing(2),
    // top: theme.spacing(5),
    // backgroundColor: 'blue',
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
    setOpenCustomDialog,
    setAddOrUpdate,
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
              setOpenCustomDialog(false);
              setAddOrUpdate('addFormValueToList');
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
