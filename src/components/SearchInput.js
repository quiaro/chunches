import React from 'react'

import '../styles/SearchInput.css';

export default () => (
  <div className="_search-input pv3">
    <i className="material-icons">search</i>
    <input type="text" className="db pa2 ba b--black-40 br-pill" placeholder="Buscar ..." />
  </div>
)
