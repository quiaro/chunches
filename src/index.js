import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './containers/Home';
import App from './containers/App';
import Logout from './containers/Logout';
import Login from './containers/Login';

import './styles/index.css';

ReactDOM.render(
  <Router>
    <Switch>
      {/* All public routes are declared here. Any routes that don't match
        will be handled by the App component, which checks first if the
        user is authenticated or not. If not, it will prompt the user to
        login. */}
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route component={App} />
    </Switch>
  </Router>
  , document.getElementById('root')
)
