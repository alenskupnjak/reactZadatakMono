import React from 'react';
import './App.css';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import Vehicle from './Pages/Vechile/Vehicle';
import Producers from './Pages/Producers/Producers';

const useStyles = makeStyles({
  bazaCSS: {
    width: '100%',
    // margin:'auto',
    height: '100vh',
    backgroundColor: '#3498db',
  },
});

const theme = createMuiTheme({
  palette: {
    // type: 'dark',
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
    borderRadius: '8px',
  },
  backgroundColor: '#faebd7',
});

function App(props) {
  const classes = useStyles();
  
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <div className={classes.bazaCSS}>
          <nav className="Navbar">
            <ul style={{ listStyle: 'none', margin: 'auto', padding: '0' }}>
              <li style={{ margin: '10px', display: 'inline-block' }}>
                <NavLink to="/vehicle">Vehicles</NavLink>
              </li>
              <li style={{ margin: '10px', display: 'inline-block' }}>
                <NavLink style={{ color: '#28A746' }} to="/producers">
                  Models
                </NavLink>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/producers" component={Producers} />
            <Route path="/vehicle" component={Vehicle} />
            <Redirect from="/" to="/vehicle"/>
            <Route component={Vehicle} />
          </Switch>
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
