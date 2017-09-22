import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../utils/AuthService';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={routeProps => (
    isLoggedIn() ? (
      <Component {...routeProps}/>
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: routeProps.location }
      }}/>
    )
  )}/>
)

export default PrivateRoute;
