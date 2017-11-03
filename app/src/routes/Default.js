import React, { Component } from 'react';
import App from './App';
import { login, isLoggedIn } from '../common/AuthService';

class Default extends Component {

  componentDidMount() {
    // If not logged in, proceed to log in user
    if (!isLoggedIn()) login();
  }

  render() {
    return isLoggedIn() ? <App /> : null;
  }
}

export default Default;
