import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import styled from 'styled-components';
import Badge from './Badge';
import { ITEM_REQUESTS_PENDING } from '../queries/item_request';
import { UPDATE_ITEM_REQUEST_STATUS } from '../mutations/item_request';

const Styled = styled.button`
  position: relative;

  .material-icons {
    font-size: 26px;
    color: ${props => props.theme.nav_link_text};
  }
`;

class NavBarMessages extends Component {
  getItemRequestsNotViewed(itemRequests) {
    return itemRequests.filter(itemRequest => itemRequest.status === 'PENDING');
  }

  componentWillReceiveProps(nextProps) {
    const {
      isOpen,
      loadingItemRequestsPending,
      itemRequestsPending,
    } = nextProps;

    if (!loadingItemRequestsPending && isOpen) {
      const itemRequestsNotViewed = this.getItemRequestsNotViewed(
        itemRequestsPending,
      );

      if (itemRequestsNotViewed.length > 0) {
        // Mark pending requests as read
        const updates = itemRequestsNotViewed.map(itemRequest =>
          this.props.updateItemRequestStatus({
            variables: {
              id: itemRequest.id,
              status: 'PENDING_ACK',
            },
          }),
        );
        Promise.all(updates).then(values => {
          this.props.refetchItemRequestsPending();
        });
      }
    }
  }

  render() {
    const { loadingItemRequestsPending, itemRequestsPending } = this.props;

    if (loadingItemRequestsPending) return null;

    const { className, onClick } = this.props;
    const itemRequestsNotViewed = this.getItemRequestsNotViewed(
      itemRequestsPending,
    );

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
  graphql(UPDATE_ITEM_REQUEST_STATUS, {
    name: 'updateItemRequestStatus',
  }),
)(NavBarMessages);
