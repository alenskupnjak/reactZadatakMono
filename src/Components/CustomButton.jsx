import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
}));

//
function CustomButton(props) {
  const classes = useStyles();
  const { text, size, color, variant, onclick, disabled, ...other } = props;

  return (
    <Button
      variant={variant || 'contained'}
      size={size || 'large'}
      color={color || 'primary'}
      onClick={onclick}
      disabled={disabled ? true : false}
      className={classes.root}
      {...other}
    >
      {text}
    </Button>
  );
}

export default CustomButton;
