import styled from 'styled-components'
import { Link } from 'react-router-dom'

const NavIconLink = styled(Link)`
  height: calc(${props => props.theme.nav_height} / 2);

  .material-icons {
    font-size: 26px;
  }
`

export default NavIconLink
