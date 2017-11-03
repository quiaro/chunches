import React from 'react';
import { graphql } from 'react-apollo';
import { Switch } from 'react-router-dom';
import routes from './index';
import NavBarPrivate from '../components/NavBarPrivate';
import PrivateRoute from '../components/PrivateRoute';
import SideBar from '../components/SideBar';
import { getUserId } from '../common/AuthService';
import CURRENT_USER from '../queries/user';

const App = props => {
  const { loadingUser, user } = props;

  return loadingUser ? (
    <div>Loading</div>
  ) : (
    <div>
      <NavBarPrivate user={user} />
      <Switch>
        {routes
          .filter(route => !route.public)
          .map(route => (
            <PrivateRoute key={`route-${route.name}`} {...route} data={props} />
          ))}
      </Switch>
      <SideBar className="shadow-1" user={user} />
    </div>
  );
};

export default graphql(CURRENT_USER, {
  options: () => ({
    variables: {
      uid: getUserId(),
    },
  }),
  props: ({ data: { loading, User } }) => ({
    loadingUser: loading,
    user: User,
  }),
})(App);
