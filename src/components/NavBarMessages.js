import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import styled from 'styled-components';
import Badge from './Badge';
import CURRENT_USER from '../queries/user';
import { UPDATE_ITEM_REQUEST_STATUS } from '../mutations/item_request';

const Styled = styled.button`
  position: relative;

  .material-icons {
    font-size: 26px;
    color: ${props => props.theme.nav_link_text};
  }
`;

class NavBarMessages extends Component {
  getPendingItemRequests(itemRequests) {
    return itemRequests.filter(itemRequest => itemRequest.status === 'PENDING')
  }

  componentWillReceiveProps(nextProps) {
    const { loading, user } = nextProps.data;

    if (!loading && user && nextProps.isOpen) {
      const pendingItemRequests = this.getPendingItemRequests(
        user.incomingRequests,
      );
      if (pendingItemRequests.length > 0) {
        // Mark pending requests as read
        const updates = user.incomingRequests.map(itemRequest =>
          this.props.updateItemRequestStatus({
            variables: {
              id: itemRequest.id,
              status: 'PENDING_ACK',
            },
          }),
        );
        Promise.all(updates).then(values => {
          // Refetch current user
          this.props.data.refetch();
        });
      }
    }
  }

  render() {
    const { loading, user } = this.props.data;

    if (loading) return null;

    const { className, onClick } = this.props;
    const pendingItemRequests = this.getPendingItemRequests(
      user.incomingRequests,
    );

    return (
      <Styled className={className} onClick={onClick}>
        <Badge number={pendingItemRequests.length} />
        <i className="material-icons">notifications</i>
      </Styled>
    );
  }
}

export default compose(
  graphql(CURRENT_USER),
  graphql(UPDATE_ITEM_REQUEST_STATUS, {
    name: 'updateItemRequestStatus',
  }),
)(NavBarMessages);
