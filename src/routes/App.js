import React from 'react';
import { graphql } from 'react-apollo';
import { Switch } from 'react-router-dom';
import routes from './index';
import NavBarPrivate from '../components/NavBarPrivate';
import PrivateRoute from '../components/PrivateRoute';
import CURRENT_USER from '../queries/user';

const App = props => {
  return props.data.loading
    ? <div>Loading</div>
    : <div>
        <NavBarPrivate />
        <Switch>
          {routes
            .filter(route => !route.public)
            .map(route =>
              <PrivateRoute
                key={`route-${route.name}`}
                {...route}
                data={props.data}
              />,
            )}
        </Switch>
      </div>;
};

export default graphql(CURRENT_USER)(App);
