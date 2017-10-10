import React from 'react';
import styled from 'styled-components';

const NavBar = styled.div`
  position: relative;
  height: ${props => props.theme.nav_height};
  background-color: ${props => props.theme.navbar};
  z-index: ${props => props.theme.z_index_navbar};

  > div {
    display: inline-flex;
  }
`;

export default NavBar;
