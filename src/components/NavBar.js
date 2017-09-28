import React, { Component } from 'react';
import { withRouter } from 'react-router';
import StyledNavBar from './styled/NavBar';
import NavIconLink from './styled/NavIconLink';
import NavLinks from './NavLinks';
import { login, logout, isLoggedIn } from '../common/AuthService';

class NavBar extends Component {
  render() {
    return (
      <StyledNavBar className="flex justify-between nowrap bg-dark-blue">
        <div className="logo">
          {/* TODO */}
          App Logo Here!
          {isLoggedIn() && <NavLinks />}
        </div>

        {isLoggedIn()
          ? (<div>
              <NavIconLink to="/messages" className="dib pa3 no-underline white">
                <i className="material-icons">notifications</i>
              </NavIconLink>
              <NavIconLink to="/profile" className="br4 dib ml2 mv3 mr4 no-underline bg-white mid-gray">
                <i className="material-icons">person</i>
              </NavIconLink>
              <button onClick={() => logout(this.props.history)}>
                Log out{' '}
              </button>
            </div>)
          : (<div>
              <button onClick={() => login()}>Log In</button>
            </div>)
          }
      </StyledNavBar>
    );
  }
}

export default withRouter(NavBar);
