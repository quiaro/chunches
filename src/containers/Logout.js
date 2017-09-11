import React from 'react';
import { Redirect } from 'react-router-dom';
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'

class Logout extends React.Component {

  constructor(props) {
    super(props);

    // Remove the auth token and current user from storage and dispatch a logout
    // action which will set the isAuthenticated property in the state to false.
    // Then, the render method will redirect the user to the login page.
    localStorage.removeItem(GC_USER_ID)
    localStorage.removeItem(GC_AUTH_TOKEN)
  }

  render() {
    return <Redirect to='/login'/>
  }
}

export default Logout;
