import React from 'react'
import {
  Button, makeStyles
} from '@material-ui/core';



// definicaija CSS
const useStyles = makeStyles(theme => ({
    root:{
      margin: theme.spacing(1)
    },
}))



function CustomButton(props) {
  const classes = useStyles();
  const {text, size, color, variant, onclick, ...ostalo} = props


  return (
    <Button
    variant={ variant || "contained"}
    size={size || "large"}
    color = { color || "primary"}
    onClick={onclick}
    className={classes.root}
      {...ostalo}
    >
      {text}
    </Button>
  )
}

export default CustomButton
