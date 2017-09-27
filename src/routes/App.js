import React from 'react';
import { graphql } from 'react-apollo';
// import PrivateRoute from './PrivateRoute';
import USER_QUERY from '../queries/user';

const App = props => {
  const { user } = props.data;

  return props.data.loading
    ? <div>Loading</div>
    : <div>
        <span>Hello from the app</span>
      </div>;
};

export default graphql(USER_QUERY)(App);
