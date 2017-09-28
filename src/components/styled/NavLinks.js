import styled from 'styled-components';

const NavLinks = styled.div`

  > a {
    display: inline-block;
    height: ${props => props.theme.nav_height};
    line-height: ${props => props.theme.nav_height};
    text-align: center;
    color: ${props => props.theme.nav_link_text};
  }
`

export default NavLinks
