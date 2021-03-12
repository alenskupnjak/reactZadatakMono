import React from 'react';
import './App.css';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Route, NavLink, Switch } from 'react-router-dom';

import Vehicle from './Pages/Vechile/Vehicle';
import Producers from './Pages/Producers/Producers';

const useStyles = makeStyles({
  bazaCSS: {
    width: '100%',
    // margin:'auto',
    height: '100vh',
    // backgroundColor: '#faebd7',
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

function App() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <div className={classes.bazaCSS}>
          <nav className="Navbar">
            <ul style={{ listStyle: 'none', margin: 'auto', padding: '0' }}>
              <li style={{ margin: '10px', display: 'inline-block' }}>
                <NavLink to="/vechile">Vechile</NavLink>
              </li>
              <li style={{ margin: '10px', display: 'inline-block' }}>
                <NavLink to="/producers">Producers</NavLink>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/producers" component={Producers} />
            <Route path="/vechile" component={Vehicle} />
            {/* <Route path="/courses/:courseId" component={Course} /> */}
            {/* <Route path='/courses' component={Courses} /> */}
            {/* <Redirect from='/all-courses' to='/courses' /> */}
            <Route component={Vehicle} />
          </Switch>
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;

// *****************************************
// storeProducers.listModelGet   ===  getModelOptions()
// storeProducers.listProducerGet === getProducerOptions()
// **************************************
