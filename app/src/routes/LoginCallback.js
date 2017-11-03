import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { gql, graphql, compose } from 'react-apollo';
import {
  getAccessToken,
  setUserSession,
  isLoggedIn,
} from '../common/AuthService';
import ErrorHandler from '../common/ErrorHandler';

class Callback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true, // Load data to verify if user is logged in or not
      isLoggedIn: false,
    };
  }

  componentWillMount() {
    getAccessToken()
      .then(accessToken => {
        this.props
          .authenticateUser({
            variables: {
              accessToken,
            },
          })
          .then(response => {
            const { id, token } = response.data.authenticateUser;
            setUserSession(id, token);
            this.setState({
              loading: false,
              isLoggedIn: isLoggedIn(),
            });
          });
      })
      .catch(e => ErrorHandler(e));
  }

  render() {
    const { loading, isLoggedIn } = this.state;

    if (loading) return <div>Loading</div>;
    if (isLoggedIn) return <Redirect to="/home" />;
    return <Redirect to="/" />;
  }
}

const AUTHENTICATE_USER = gql`
  mutation($accessToken: String!) {
    authenticateUser(accessToken: $accessToken) {
      id
      token
    }
  }
`;

export default compose(
  graphql(AUTHENTICATE_USER, { name: 'authenticateUser' }),
  withRouter,
)(Callback);
