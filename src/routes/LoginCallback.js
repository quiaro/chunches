import { Component } from 'react';
import { withRouter } from 'react-router';
import {
  getAndStoreParameters,
  getIdToken,
  getEmail,
  getName,
} from '../utils/AuthService';
import ErrorHandler from '../utils/ErrorHandler';
import { gql, graphql } from 'react-apollo';

class Callback extends Component {
  componentDidMount() {
    getAndStoreParameters();
    this.createUser();
  }

  createUser = () => {
    const variables = {
      idToken: getIdToken(),
      email: getEmail(),
      name: getName(),
    };

    this.props
      .createUser({ variables })
      .then(response => {
        console.log('Response from create user', response);
        this.props.history.push('/');
      })
      .catch(e => {
        ErrorHandler(e);
        this.props.history.push('/');
      });
  };

  render() {
    return null;
  }
}

const createUser = gql`
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

const userQuery = gql`
  query {
    user {
      id
    }
  }
`;

export default graphql(createUser, { name: 'createUser' })(
  graphql(userQuery, { options: { fetchPolicy: 'network-only' } })(
    withRouter(Callback),
  ),
);
