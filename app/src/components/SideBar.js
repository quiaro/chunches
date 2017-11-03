import React, { Component } from 'react';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import styled from 'styled-components';
import Notifications from './Notifications';
import Messages from './Messages';
import Profile from './Profile';
import {
  VIEW_MESSAGES,
  VIEW_NOTIFICATIONS,
  VIEW_PROFILE,
} from '../common/constants';

const Styled = styled.div`
  position: absolute;
  right: 0;
  top: ${props => props.theme.nav_height};
  height: calc(100vh - ${props => props.theme.nav_height});
  background-color: ${props => props.theme.sidebar_background};
  width: ${props => props.theme.sidebar_width};
  transition: right 0.3s ease-in;

  &.hidden {
    right: -${props => props.theme.sidebar_width};
  }
`;

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      view: null,
    };
  }

  componentDidMount() {
    this.updateState(this.props.location.search);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      // Update the state per the query string view parameter
      this.updateState(nextProps.location.search);
    }
  }

  updateState(queryString) {
    const searchQuery = new URLSearchParams(queryString);
    const currentView = searchQuery.get('sidebar');

    if (currentView === null) {
      // Sidebar is closed
      this.setState({
        isVisible: false,
        view: null,
      });
    } else {
      this.setState({
        isVisible: true,
        view: currentView,
      });
    }
  }

  render() {
    const { view } = this.state;
    const { className, user } = this.props;
    const classes = classNames(className, {
      hidden: !this.state.isVisible,
    });

    return (
      <Styled className={classes}>
        {view === VIEW_NOTIFICATIONS && <Notifications user={user} />}
        {view === VIEW_MESSAGES && <Messages user={user} />}
        {view === VIEW_PROFILE && <Profile user={user} />}
      </Styled>
    );
  }
}

export default withRouter(SideBar);
