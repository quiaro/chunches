import styled from 'styled-components';

const NavLinks = styled.div`

  a {
    display: inline-block;
    height: ${props => props.theme.nav_height};
    line-height: ${props => props.theme.nav_height};
    color: ${props => props.theme.nav_link_text};
  }

  a .logo {
    font-size: 38px;
    vertical-align: middle;
  }
`

export default NavLinks
