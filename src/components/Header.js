import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import '../styles/Header.css';

class Header extends Component {
  render() {
    return (
      <div className="_header flex justify-between nowrap bg-dark-blue">
        <div className="tabs">
          <NavLink
            to="/de-otros"
            activeClassName="selected"
            className="pl4 pv3 pr3 no-underline black white"
          >
            Chunches de Otros
          </NavLink>
          <NavLink
            to="/mios"
            activeClassName="selected"
            className="pa3 no-underline black white"
          >
            Mis Chunches
          </NavLink>
          <NavLink
            to="/mi-red"
            activeClassName="selected"
            className="pa3 no-underline black white"
          >
            Mi Red
          </NavLink>
        </div>
        <div>
          <Link to="/mensajes" className="icon-link dib pa3 no-underline white">
            <i className="material-icons">notifications</i>
          </Link>
          <Link to="/perfil" className="icon-link br4 dib ml2 mv3 mr4 no-underline bg-white mid-gray">
            <i className="material-icons">person</i>
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
