import React from 'react';
import { graphql, compose } from 'react-apollo';
import styled from 'styled-components';
import MessageItemRequestPending from './MessageItemRequestPending';
import MessageItemRequestAccepted from './MessageItemRequestAccepted';
import MessageItemRequestDenied from './MessageItemRequestDenied';
import MessageItemRequestTransfer from './MessageItemRequestTransfer';
import {
  ITEM_REQUESTS_PENDING,
  ITEM_REQUESTS_ACCEPTED,
  ITEM_REQUESTS_DENIED,
  ITEM_REQUESTS_TRANSFER,
} from '../queries/item_request';

const Styled = styled.div`margin: 30px;`;

const Messages = props => {
  const {
    loadingItemRequestsPending,
    loadingItemRequestsAccepted,
    loadingItemRequestsDenied,
    loadingItemRequestsTransfer,
    itemRequestsPending,
    itemRequestsAccepted,
    itemRequestsDenied,
    itemRequestsTransfer,
    refetchItemRequestsPending,
    refetchItemRequestsAccepted,
    refetchItemRequestsDenied,
    refetchItemRequestsTransfer,
    user,
  } = props;

  if (
    loadingItemRequestsPending ||
    loadingItemRequestsAccepted ||
    loadingItemRequestsDenied ||
    loadingItemRequestsTransfer
  )
    return null;

  const pending = itemRequestsPending.map(itemRequest =>
    <MessageItemRequestPending
      key={itemRequest.id}
      itemRequest={itemRequest}
      refetch={refetchItemRequestsPending}
    />,
  );

  const accepted = itemRequestsAccepted.map(itemRequest =>
    <MessageItemRequestAccepted
      key={itemRequest.id}
      itemRequest={itemRequest}
      refetch={refetchItemRequestsAccepted}
      user={user}
    />,
  );

  const denied = itemRequestsDenied.map(itemRequest =>
    <MessageItemRequestDenied
      key={itemRequest.id}
      itemRequest={itemRequest}
      refetch={refetchItemRequestsDenied}
    />,
  );

  const transfer = itemRequestsTransfer.map(itemRequest =>
    <MessageItemRequestTransfer
      key={itemRequest.id}
      itemRequest={itemRequest}
      refetchItemRequestsTransfer={refetchItemRequestsTransfer}
      user={user}
    />,
  );

  const defaultMessage = <p>There are no messages</p>;
  const itemRequests = [].concat(pending, accepted, denied, transfer);

  return (
    <Styled>
      {itemRequests.length > 0 ? itemRequests : defaultMessage}
    </Styled>
  );
};

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
  graphql(ITEM_REQUESTS_DENIED, {
    options: ({ user }) => ({
      variables: {
        uid: user.id,
      },
    }),
    props: ({ data: { loading, allItemRequests, refetch } }) => ({
      loadingItemRequestsDenied: loading,
      itemRequestsDenied: allItemRequests,
      refetchItemRequestsDenied: refetch,
    }),
  }),
  graphql(ITEM_REQUESTS_TRANSFER, {
    options: ({ user }) => ({
      variables: {
        uid: user.id,
      },
    }),
    props: ({ data: { loading, allItemRequests, refetch } }) => ({
      loadingItemRequestsTransfer: loading,
      itemRequestsTransfer: allItemRequests,
      refetchItemRequestsTransfer: refetch,
    }),
  }),
)(Messages);
