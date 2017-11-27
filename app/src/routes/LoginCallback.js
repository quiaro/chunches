import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { gql, graphql } from 'react-apollo';
import {
  getIDToken,
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
    getIDToken()
      .then(idToken => {
        this.props
          .authenticateUser({
            variables: {
              idToken,
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
  mutation authenticateUser($idToken: String!) {
    authenticateUser(idToken: $idToken) {
      id
      token
    }
  }
`;

export default graphql(AUTHENTICATE_USER, { name: 'authenticateUser' })(
  Callback,
);
