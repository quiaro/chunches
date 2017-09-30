import React, { Component } from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import NavButton from './styled/NavButton';
import NavLinks from './NavLinks';
import NavIconLink from './NavIconLink';
import Messages from './Messages';
import Profile from './Profile';
import { login, logout, isLoggedIn } from '../common/AuthService';

const Styled = styled.div`
  height: ${props => props.theme.nav_height};
  background-color: ${props => props.theme.nav_bar};

  > div {
    display: inline-flex;
  }
`;

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmenuOpen: false,
      submenuView: '',
    };
    this.toggleView = this.toggleView.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      // Update the state per the query string view parameter
      const searchQuery = new URLSearchParams(nextProps.location.search);
      const currentView = searchQuery.get('view');

      if (currentView === null) {
        // Close the submenu
        this.setState({
          isSubmenuOpen: false,
          submenuView: '',
        });
      } else {
        this.setState({
          isSubmenuOpen: true,
          submenuView: currentView,
        });
      }
    }
  }

  toggleView(view) {
    const { history } = this.props;

    // FIXME: URLSearchParams is not supported in Edge
    const searchQuery = new URLSearchParams(history.location.search);
    const currentView = searchQuery.get('view');

    if (view === currentView) {
      searchQuery.delete('view');
    } else {
      searchQuery.set('view', view);
    }

    history.push({
      pathname: history.location.pathname,
      search: searchQuery.toString(),
    });
  }

  render() {
    return (
      <Styled className="flex justify-between nowrap shadow-2">
        <NavLinks />

        {isLoggedIn()
          ? <div>
              <NavIconLink
                className="dib pa3 no-underline"
                onClick={e => this.toggleView('notifications')}
              >
                <i className="material-icons">notifications</i>
              </NavIconLink>
              <NavIconLink
                className="dib pa3 no-underline"
                onClick={e => this.toggleView('profile')}
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
