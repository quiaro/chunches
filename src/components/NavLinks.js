import React from 'react';
import { NavLink } from 'react-router-dom';

export default () => (
  <div className="__nav-links">
    <NavLink
      to="/offered"
      activeClassName="selected"
      className="pl4 pv3 pr3 no-underline black white"
    >
      Ofrecen
    </NavLink>
    <NavLink
      to="/owned"
      activeClassName="selected"
      className="pa3 no-underline black white"
    >
      Ofrezco
    </NavLink>
    <NavLink
      to="/network"
      activeClassName="selected"
      className="pa3 no-underline black white"
    >
      Contactos
    </NavLink>
  </div>
)
