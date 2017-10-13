import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import styled from 'styled-components';
import Badge from './Badge';
import {
  ITEM_REQUESTS_PENDING,
  ITEM_REQUESTS_ACCEPTED,
} from '../queries/item_request';
import { UPDATE_ITEM_REQUEST_STATUS } from '../mutations/item_request';

const Styled = styled.button`
  position: relative;

  .material-icons {
    font-size: 26px;
    color: ${props => props.theme.nav_link_text};
  }
`;

class NavBarMessages extends Component {
  getItemRequestsNotViewed() {
    const { itemRequestsPending, itemRequestsAccepted } = this.props;

    const pendingNotViewed = itemRequestsPending.filter(
      itemRequest => itemRequest.status === 'PENDING',
    );
    const acceptedNotViewed = itemRequestsAccepted.filter(
      itemRequest => itemRequest.status === 'ACCEPTED',
    );

    return [].concat(pendingNotViewed, acceptedNotViewed);
  }

  componentWillReceiveProps(nextProps) {
    const {
      isOpen,
      loadingItemRequestsPending,
      loadingItemRequestsAccepted,
    } = nextProps;

    if (!loadingItemRequestsPending && !loadingItemRequestsAccepted && isOpen) {
      const itemRequestsNotViewed = this.getItemRequestsNotViewed();

      if (itemRequestsNotViewed.length > 0) {
        // Mark pending requests as read
        const updates = itemRequestsNotViewed.map(itemRequest =>
          this.props.updateItemRequestStatus({
            variables: {
              id: itemRequest.id,
              status: `${itemRequest.status}_ACK`,
            },
          }),
        );
        Promise.all(updates).then(values => {
          this.props.refetchItemRequestsPending();
          this.props.refetchItemRequestsAccepted();
        });
      }
    }
  }

  render() {
    const {
      loadingItemRequestsPending,
      loadingItemRequestsAccepted,
    } = this.props;

    if (loadingItemRequestsPending || loadingItemRequestsAccepted) return null;

    const { className, onClick } = this.props;
    const itemRequestsNotViewed = this.getItemRequestsNotViewed();

    return (
      <Styled className={className} onClick={onClick}>
        <Badge number={itemRequestsNotViewed.length} />
        <i className="material-icons">notifications</i>
      </Styled>
    );
  }
}

export default compose(
  graphql(ITEM_REQUESTS_PENDING, {
    options: ({ user }) => ({
      variables: {
        uid: user.id,
      },
    }),
    props: ({ data: { loading, allItemRequests, refetch } }) => ({
      loadingItemRequestsPending: loading,
      itemRequestsPending: allItemRequests,
      refetchItemRequestsPending: refetch,
    }),
  }),
  graphql(ITEM_REQUESTS_ACCEPTED, {
    options: ({ user }) => ({
      variables: {
        uid: user.id,
      },
    }),
    props: ({ data: { loading, allItemRequests, refetch } }) => ({
      loadingItemRequestsAccepted: loading,
      itemRequestsAccepted: allItemRequests,
      refetchItemRequestsAccepted: refetch,
    }),
  }),
  graphql(UPDATE_ITEM_REQUEST_STATUS, {
    name: 'updateItemRequestStatus',
  }),
)(NavBarMessages);
