import React, { Component } from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import NavButton from './styled/NavButton';
import NavLinks from './NavLinks';
import NavIconLink from './NavIconLink';
import { VIEW_NOTIFICATIONS, VIEW_PROFILE  } from '../common/constants';
import { login, logout, isLoggedIn } from '../common/AuthService';

const Styled = styled.div`
  position: relative;
  height: ${props => props.theme.nav_height};
  background-color: ${props => props.theme.navbar};
  z-index: ${props => props.theme.z_index_navbar};

  > div {
    display: inline-flex;
  }

  .notifications button.notifications,
  .profile button.profile {
    background-color: ${props => props.theme.nav_link_selected_background};
    i {
      color: ${props => props.theme.nav_link_selected_text};
    }
  }
`;

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarClass: '',
    };
    this.toggleView = this.toggleView.bind(this);
  }

  // Add, remove or update search query param "sidebar"
  toggleView(view, viewClass) {
    const { history } = this.props;

    // FIXME: URLSearchParams is not supported in Edge
    const searchQuery = new URLSearchParams(history.location.search);
    const currentView = searchQuery.get('sidebar');

    if (view === currentView) {
      searchQuery.delete('sidebar');
      this.setState({ 'sidebarClass': '' });
    } else {
      searchQuery.set('sidebar', view);
      this.setState({ 'sidebarClass': viewClass });
    }

    history.push({
      pathname: history.location.pathname,
      search: searchQuery.toString(),
    });
  }

  render() {
    const { sidebarClass } = this.state;

    return (
      <Styled className="flex justify-between nowrap shadow-2">
        <NavLinks />

        {isLoggedIn()
          ? <div className={sidebarClass}>
              <NavIconLink
                className="dib pa3 no-underline notifications"
                onClick={e => this.toggleView(VIEW_NOTIFICATIONS, 'notifications')}
              >
                <i className="material-icons">notifications</i>
              </NavIconLink>
              <NavIconLink
                className="dib pa3 no-underline profile"
                onClick={e => this.toggleView(VIEW_PROFILE, 'profile')}
              >
                <i className="material-icons">person</i>
              </NavIconLink>
              <NavButton
                className="ph3"
                onClick={() => logout(this.props.history)}
              >
                Salir
              </NavButton>
            </div>
          : <div>
              <NavButton className="ph3" onClick={() => login()}>
                Entrar
              </NavButton>
            </div>}
      </Styled>
    );
  }
}

export default withRouter(NavBar);
