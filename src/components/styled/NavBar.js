import styled from 'styled-components';

const NavBar = styled.div`
  height: ${props => props.theme.nav_height};
  background-color: ${props => props.theme.nav_bar};

  > div {
    display: inline-flex;
  }
`

export default NavBar
