import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { gql, graphql, compose } from 'react-apollo';
import {
  getAndStoreParameters,
  getIdToken,
  getEmail,
  getName,
} from '../common/AuthService';
import ErrorHandler from '../common/ErrorHandler';
import USER_QUERY from '../queries/user';

class Callback extends Component {
  componentDidMount() {
    getAndStoreParameters();
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    if (!data.loading && !data.user) {
      // Create user if current user cannot be retrieved from the DB
      this.createUser();
    }
  }

  createUser = () => {
    const variables = {
      idToken: getIdToken(),
      email: getEmail(),
      name: getName(),
    };

    this.props.createUser({ variables })
      .then(response => {
        console.log('Response from create user', response);
      })
      .catch(e => ErrorHandler(e));
  };

  render() {

    const { data: { loading } } = this.props;
    if (loading) {
      return <div>Loading</div>
    }
    return <Redirect to='/'/>;
  }
}

const CREATE_USER_MUTATION = gql`
  mutation($idToken: String!, $name: String!, $email: String!) {
    createUser(
      authProvider: { auth0: { idToken: $idToken } }
      name: $name
      email: $email
    ) {
      id
    }
  }
`;

export default compose(
  graphql(USER_QUERY, { options: { fetchPolicy: 'network-only' } }),
  graphql(CREATE_USER_MUTATION, { name: 'createUser' }),
  withRouter
)(Callback);
