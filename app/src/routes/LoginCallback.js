import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { gql, graphql, compose } from 'react-apollo';
import {
  getAndStoreUserHashParameters,
  isLoggedIn,
  getAccessToken,
} from '../common/AuthService';
import ErrorHandler from '../common/ErrorHandler';
import CURRENT_USER from '../queries/user';

class Callback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  async componentDidMount() {
    await getAndStoreUserHashParameters();
    this.setState({ isLoggedIn: isLoggedIn() });
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;

    if (!data.loading && !data.user) {
      this.createUser();
    }
  }

  createUser = () => {
    const variables = {
      accessToken: getAccessToken(),
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
  mutation($accessToken: String!) {
    authenticateUser(accessToken: $accessToken) {
      id
      token
    }
  }
`;

export default compose(
  graphql(CURRENT_USER, { options: { fetchPolicy: 'network-only' } }),
  graphql(CREATE_USER_MUTATION, {
    name: 'createUser',
    options: props => ({
      refetchQueries: [
        {
          query: CURRENT_USER,
        },
      ],
    }),
  }),
  withRouter,
)(Callback);
