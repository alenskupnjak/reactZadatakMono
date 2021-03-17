import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
  Button,
  DialogActions,
} from '@material-ui/core';

//  custom CSS
const useStyles = makeStyles((theme) => ({
  dialog: {
    position: 'absolute',
    top: theme.spacing(3),
    padding: theme.spacing(2),
  },
}));

const ConfirmDialog = (props) => {
  const classes = useStyles();
  const { dataDialog, store } = props;

  return (
    <Dialog
      open={dataDialog.isOpen ? dataDialog.isOpen : false}
      className={classes.dialog}
    >
      <DialogTitle></DialogTitle>
      <DialogContent>
        <Typography variant="h6">{dataDialog.title}</Typography>
        <Typography variant="caption">{dataDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center' }}>
        <Button
          text="NO"
          color="primary"
          variant="contained"
          onClick={() => store.setConfirmDialog({ isOpen: false })}
        >
          NO
        </Button>
        <Button
          text="YES"
          variant="contained"
          color="secondary"
          onClick={dataDialog.onConfirm}
        >
          YES
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
