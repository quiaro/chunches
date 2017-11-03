import React from 'react';
import { Redirect } from 'react-router-dom';
import NavBarPublic from '../components/NavBarPublic';
import { isLoggedIn } from '../common/AuthService';

const HomePublic = () => {
  return isLoggedIn()
    ? <Redirect to="/home" />
    : <div>
        <NavBarPublic />
        <main>
          <h1>Be kind, give away, help others.</h1>
        </main>
      </div>;
};

export default HomePublic;
