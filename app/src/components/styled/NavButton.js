import styled from 'styled-components';

const NavButton = styled.button`
  background-color: transparent;
  border: 0 none;
  color: ${props => props.theme.nav_link_text};
  border-left: 1px solid ${props => props.theme.nav_link_text};
  cursor: pointer;
`

export default NavButton
