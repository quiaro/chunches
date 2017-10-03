import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { gql, graphql, compose } from 'react-apollo';
import {
  getAndStoreUserHashParameters,
  isLoggedIn,
  getIdToken,
  getEmail,
  getName,
} from '../common/AuthService';
import ErrorHandler from '../common/ErrorHandler';
import USER_QUERY from '../queries/user';

class Callback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  async componentDidMount() {
    await getAndStoreUserHashParameters();
    this.setState({ isLoggedIn: isLoggedIn() })
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;

    if (!data.loading && !data.user) {
      this.createUser();
    }
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
      })
      .catch(e => ErrorHandler(e));
  };

  render() {
    const { isLoggedIn } = this.state;
    const { data: { user } } = this.props;

    if (isLoggedIn && user) {
      // Wait to redirect user to app until the user hash values from the auth
      // service have been stored in local cache and the user information has
      // been retrieved from the database
      return <Redirect to="/home" />;
    }
    return <div>Loading</div>;
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
  graphql(CREATE_USER_MUTATION, {
    name: 'createUser',
    options: props => ({
      refetchQueries: [
        {
          query: USER_QUERY,
        },
      ],
    }),
  }),
  withRouter,
)(Callback);
