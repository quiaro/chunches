import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../common/AuthService';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route render={routeProps => (
    isLoggedIn() ? (
      <Component {...routeProps} {...rest}/>
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: routeProps.location }
      }}/>
    )
  )}/>
)

export default PrivateRoute;
