import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const NavIconLink = styled(NavLink)`
  .material-icons {
    font-size: 26px;
    color: ${props => props.theme.nav_link_text};
  }

  &.active {
    background-color: ${props => props.theme.nav_link_selected_background};

    .material-icons {
      color: ${props => props.theme.nav_link_selected_text};
    }
  }
`

export default NavIconLink
