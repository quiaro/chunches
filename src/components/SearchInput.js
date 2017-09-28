import React from 'react'
import StyledSearchInput from './styled/SearchInput';

export default () => (
  <StyledSearchInput className="pv3">
    <i className="material-icons">search</i>
    <input type="text" className="db pa2 ba b--black-40 br-pill" placeholder="Buscar ..." />
  </StyledSearchInput>
)
