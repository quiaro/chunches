import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'

const PrivateRoute = (props) => {
  const userId = localStorage.getItem(GC_USER_ID)
  const userToken = localStorage.getItem(GC_AUTH_TOKEN)
  const isAuthenticated = userId && userToken;

  const { component, path, ...rest} = props;
  return <Route path={path} render={ routeProps => (
    isAuthenticated ? (
      React.createElement(component, Object.assign({}, rest, routeProps))
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: routeProps.location }
      }}/>
    )
  )}/>
}

export default PrivateRoute;
