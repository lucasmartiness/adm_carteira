import React from 'react';
import {HashRouter as Router , Route,Switch } from 'react-router-dom'
import {routesConfig} from './Routes.js'
import store from './redux/root'
import firebase from './firebase'
import Navbar from './component/Navbar'
// firebase.firestore().collection('carteira').add({title:"Carteira Mostrão"})

import {Grid} from '@material-ui/core'

const Routes = () =>
{
  return routesConfig.map( (route,key) => {
    return ( 
    <Route
      path={route.path}
      exact={route.exact}
      key={key}
      component={route.component}
    ></Route> )
  } )
}

function App(props) 
{

  return (
    <div className="App">

      <Grid container>
        <Router>
          <Switch>
            <Routes />
          </Switch>
        </Router>
      </Grid>
    </div>
  );
}

export default App;
