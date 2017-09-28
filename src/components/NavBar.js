import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import NavLinks from './NavLinks';
import { login, logout, isLoggedIn } from '../common/AuthService';

import '../styles/NavBar.css';

class NavBar extends Component {
  render() {
    return (
      <div className="_header flex justify-between nowrap bg-dark-blue">
        <div className="logo">
          {/* TODO */}
          App Logo Here!
          {isLoggedIn() && <NavLinks />}
        </div>

        {isLoggedIn()
          ? (<div>
              <Link to="/messages" className="icon-link dib pa3 no-underline white">
                <i className="material-icons">notifications</i>
              </Link>
              <Link
                to="/profile"
                className="icon-link br4 dib ml2 mv3 mr4 no-underline bg-white mid-gray"
              >
                <i className="material-icons">person</i>
              </Link>
              <button onClick={() => logout(this.props.history)}>
                Log out{' '}
              </button>
            </div>)
          : (<div>
              <button onClick={() => login()}>Log In</button>
            </div>)
          }
      </div>
    );
  }
}

export default withRouter(NavBar);
