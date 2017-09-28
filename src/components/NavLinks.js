import React from 'react';
import { NavLink } from 'react-router-dom';
import NavLinks from './styled/NavLinks';
import { isLoggedIn } from '../common/AuthService';

export default () => (
  <NavLinks>
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
  </NavLinks>
)
