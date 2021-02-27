import React from 'react';
import './App.css';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core';


import Vehicle from './Pages/Vehicle'





const useStyles = makeStyles({
  bazaCSS: {
    width: '100%',
    // margin:'auto',
    height: '100vh',
    backgroundColor: '#faebd7',
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      // MONO BOJA
      main: '#2543C5', 
      light: '#3c4479 ',
    },
    secondary: {
      main: '#f83245',
      light: '#3c4479',
    },
  },
  shape: {
    borderRadius: '8px'
  },
  backgroundColor: '#faebd7',
});

function App() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <ThemeProvider theme = {theme}>
      <div className={classes.bazaCSS}>
        <Vehicle></Vehicle>
      </div>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
