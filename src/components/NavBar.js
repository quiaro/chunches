import React, { Component } from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import NavIconLink from './styled/NavIconLink';
import NavButton from './styled/NavButton';
import NavLinks from './NavLinks';
import { login, logout, isLoggedIn } from '../common/AuthService';

const Styled = styled.div`
  height: ${props => props.theme.nav_height};
  background-color: ${props => props.theme.nav_bar};

  > div {
    display: inline-flex;
  }
`

class NavBar extends Component {
  render() {
    return (
      <Styled className="flex justify-between nowrap shadow-2">

        <NavLinks />

        {isLoggedIn()
          ? <div>
              <NavIconLink
                to="/messages"
                className="dib pa3 no-underline"
              >
                <i className="material-icons">notifications</i>
              </NavIconLink>
              <NavIconLink
                to="/profile"
                className="dib pa3 no-underline mid-gray"
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
      </Styled>
    );
  }
}

export default withRouter(NavBar);
