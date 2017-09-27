import React from 'react';
import { graphql } from 'react-apollo';
import { Switch } from 'react-router-dom';
import routes from './index';
import PrivateRoute from '../components/PrivateRoute';
import USER_QUERY from '../queries/user';

const App = props => {

  return props.data.loading
    ? <div>Loading</div>
    : <Switch>
        {routes.filter(route => !route.public)
               .map(route => <PrivateRoute key={`route-${route.name}`} {...route} data={props.data} />) }
      </Switch>;
};

export default graphql(USER_QUERY)(App);
