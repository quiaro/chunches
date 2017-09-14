import React from 'react';
import { Redirect } from 'react-router-dom';
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'

const Logout = () => {
  // Remove the auth token and current user from storage
  localStorage.removeItem(GC_USER_ID)
  localStorage.removeItem(GC_AUTH_TOKEN)

  return <Redirect to='/login'/>
}

export default Logout;
