import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { isLoggedIn } from '../common/AuthService';

const Styled = styled.div`

  a {
    display: inline-block;
    height: ${props => props.theme.nav_height};
    line-height: ${props => props.theme.nav_height};
    color: ${props => props.theme.nav_link_text};

    &.selected {
      background-color: ${props => props.theme.nav_link_selected_background};
      color: ${props => props.theme.nav_link_selected_text};
    }

    .logo {
      font-size: 38px;
      vertical-align: middle;
    }
  }
`

export default () => (
  <Styled>
    <NavLink
      to="/home"
      className="dib ph4 no-underline white"
    >
      {/* TODO: replace with real logo icon */}
      <i className="material-icons logo">autorenew</i>
    </NavLink>

    { isLoggedIn() &&
      <div>
        <NavLink
          to="/offered"
          activeClassName="selected"
          className="ph3 no-underline"
        >
          Ofrecen
        </NavLink>
        <NavLink
          to="/owned"
          activeClassName="selected"
          className="ph3 no-underline"
        >
          Ofrezco
        </NavLink>
        <NavLink
          to="/network"
          activeClassName="selected"
          className="ph3 no-underline"
        >
          Contactos
        </NavLink>
      </div>
    }
  </Styled>
)
