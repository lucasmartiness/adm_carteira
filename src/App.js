import React from 'react';
import {HashRouter as Router , Route,Switch } from 'react-router-dom'
import {routesConfig} from './Routes.js'
import store from './redux/root'

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
       <Router>
        <Switch>
          <Routes />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
