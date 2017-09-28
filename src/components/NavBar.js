import React, { Component } from 'react';
import { withRouter } from 'react-router';
import StyledNavBar from './styled/NavBar';
import NavIconLink from './styled/NavIconLink';
import NavButton from './styled/NavButton';
import NavLinks from './NavLinks';
import { login, logout, isLoggedIn } from '../common/AuthService';

class NavBar extends Component {
  render() {
    return (
      <StyledNavBar className="flex justify-between nowrap shadow-2">

        <NavLinks />

        {isLoggedIn()
          ? <div>
              <NavIconLink
                to="/messages"
                className="dib pa3 no-underline white"
              >
                <i className="material-icons">notifications</i>
              </NavIconLink>
              <NavIconLink
                to="/profile"
                className="br4 dib ml2 mv3 mr4 no-underline bg-white mid-gray"
              >
                <i className="material-icons">person</i>
              </NavIconLink>
              <NavButton className="ph3" onClick={() => logout(this.props.history)}>
                Salir
              </NavButton>
            </div>
          : <div>
              <NavButton className="ph3" onClick={() => login()}>Entrar</NavButton>
            </div>}
      </StyledNavBar>
    );
  }
}

export default withRouter(NavBar);
