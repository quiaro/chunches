import React from 'react';
import { NavLink } from 'react-router-dom';
import NavLinks from './styled/NavLinks';

export default () => (
  <NavLinks>
    <NavLink
      to="/offered"
      activeClassName="selected"
      className="pl4 pr3 no-underline"
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
  </NavLinks>
)
