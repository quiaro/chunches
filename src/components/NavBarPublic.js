import React, { Component } from 'react';
import NavLinks from './NavLinks';
import NavBar from './styled/NavBar';
import NavButton from './styled/NavButton';
import { login } from '../common/AuthService';

const NavBarPublic = () =>
  <NavBar className="flex justify-between nowrap shadow-2">
    <NavLinks />
    <div>
      <NavButton className="ph3" onClick={() => login()}>
        Entrar
      </NavButton>
    </div>
  </NavBar>;

export default NavBarPublic;
