import React from 'react'
import { Dialog, DialogContent, DialogTitle, makeStyles, Typography, Button, DialogActions } from '@material-ui/core'


//  custom CSS
const useStyles = makeStyles(theme => ({
  dialog:{
    position:'absolute',
    top: theme.spacing(3),
    padding: theme.spacing(2)
  },
}))



const ConfirmDialog = (props) => {
  const classes = useStyles();
  const {confirmDialog, setConfirmDialog} = props

  return (
    <Dialog open={confirmDialog.isOpen} className={classes.dialog} >
      <DialogTitle>

      </DialogTitle>
      <DialogContent>
          <Typography variant="h6">
              {confirmDialog.title}
          </Typography>
          <Typography variant="caption" >
              {confirmDialog.subTitle}
          </Typography>
      </DialogContent>
      <DialogActions style={{justifyContent:'center'}}>
        <Button 
          text="NO"
          color="primary"
          variant="contained"
          onClick={()=> setConfirmDialog({...confirmDialog, isOpen:false})}
        >
          NO
        </Button>
        <Button 
          text="YES"
          variant="contained"
          color="secondary"
          onClick={confirmDialog.onConfirm}
        >
          YES
        </Button>
      </DialogActions>
      
    </Dialog>
  )
}

export default ConfirmDialog
