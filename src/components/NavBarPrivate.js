import React, { Component } from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import NavBar from './styled/NavBar';
import NavButton from './styled/NavButton';
import NavBarMessages from './NavBarMessages';
import NavLinks from './NavLinks';
import NavIconLink from './NavIconLink';
import { VIEW_NOTIFICATIONS, VIEW_PROFILE } from '../common/constants';
import { logout } from '../common/AuthService';

const SideBarLinks = styled.div`
  &.notifications button.notifications,
  &.profile button.profile {
    background-color: ${props => props.theme.nav_link_selected_background};
    i {
      color: ${props => props.theme.nav_link_selected_text};
    }
  }
`;

class NavBarPrivate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLinkClass: '',
    };
    this.toggleActiveLink = this.toggleActiveLink.bind(this);
  }

  componentDidMount() {
    // Set state per current query string in URL
    this.updateState();
  }

  updateState(view = null) {
    const qsView = this.getQueryStringView();
    const viewClass =
      view === qsView
        ? ''
        : view
          ? this.getActiveLinkClass(view)
          : this.getActiveLinkClass(qsView);
    this.setState({ activeLinkClass: viewClass });
  }

  updateQueryString(view) {
    const { history } = this.props;
    const qsView = this.getQueryStringView();
    const urlQuery = new URLSearchParams(history.location.search);

    if (view !== qsView) {
      urlQuery.set('sidebar', view);
    } else {
      urlQuery.delete('sidebar');
    }

    history.push({
      pathname: history.location.pathname,
      search: urlQuery.toString(),
    });
  }

  getQueryStringView() {
    const { history } = this.props;

    // FIXME: URLSearchParams is not supported in Edge
    const urlQuery = new URLSearchParams(history.location.search);
    const view = urlQuery.get('sidebar');
    return view;
  }

  getActiveLinkClass(view) {
    if (!view) return '';

    let viewClass = '';
    switch (view) {
      case VIEW_NOTIFICATIONS:
        viewClass = 'notifications';
        break;
      case VIEW_PROFILE:
        viewClass = 'profile';
        break;
      default:
        console.warn(
          `Sidebar view ${view} does not have a corresponding class`,
        );
    }
    return viewClass;
  }

  toggleActiveLink(view) {
    this.updateState(view);
    this.updateQueryString(view);
  }

  render() {
    const { activeLinkClass } = this.state;

    return (
      <NavBar className="flex justify-between nowrap shadow-2">
        <NavLinks />

        <SideBarLinks className={activeLinkClass}>
          <NavBarMessages
            className="dib pa3 no-underline notifications"
            onClick={() => this.toggleActiveLink(VIEW_NOTIFICATIONS)}
            isOpen={ activeLinkClass === VIEW_NOTIFICATIONS }
          />
          <NavIconLink
            className="dib pa3 no-underline profile"
            onClick={e => this.toggleActiveLink(VIEW_PROFILE)}
          >
            <i className="material-icons">person</i>
          </NavIconLink>
          <NavButton className="ph3" onClick={() => logout(this.props.history)}>
            Salir
          </NavButton>
        </SideBarLinks>
      </NavBar>
    );
  }
}

export default withRouter(NavBarPrivate);
