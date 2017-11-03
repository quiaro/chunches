import React from 'react';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import NotificationItemTransfer from './NotificationItemTransfer';
import { ITEM_REQUESTS_CONFIRMED } from '../queries/item_request';

const Styled = styled.div`margin: 30px;`;

const Notifications = props => {
  const {
    loadingItemRequestsConfirmed,
    itemRequestsConfirmed,
    refetchItemRequestsConfirmed,
    user,
  } = props;

  if (loadingItemRequestsConfirmed) return null;

  const notifications = itemRequestsConfirmed.map(itemRequest =>
    <NotificationItemTransfer
      key={itemRequest.id}
      itemRequest={itemRequest}
      refetchItemRequestsConfirmed={refetchItemRequestsConfirmed}
      user={user}
    />,
  );

  const defaultMessage = <p>There are no notifications</p>;

  return (
    <Styled>
      {notifications.length > 0 ? notifications : defaultMessage}
    </Styled>
  );
};

export default graphql(ITEM_REQUESTS_CONFIRMED, {
  options: ({ user }) => ({
    variables: {
      uid: user.id,
    },
  }),
  props: ({ data: { loading, allItemRequests, refetch } }) => ({
    loadingItemRequestsConfirmed: loading,
    itemRequestsConfirmed: allItemRequests,
    refetchItemRequestsConfirmed: refetch,
  }),
})(Notifications);
