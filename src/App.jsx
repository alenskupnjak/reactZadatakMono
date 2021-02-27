import React from 'react';
import './App.css';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core';


const useStyles = makeStyles({
  bazaCSS: {
    paddingLeft: '320px',
    width: '100%',
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
    borderRadius: '12px'
  },
});

function App() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <ThemeProvider theme = {theme}>
      <div className={classes.bazaCSS}>
        MONO xxccc
      </div>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
