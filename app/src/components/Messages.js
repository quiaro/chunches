import React from 'react';
import { graphql, compose } from 'react-apollo';
import styled from 'styled-components';
import MessageItemRequestPending from './MessageItemRequestPending';
import MessageItemRequestAccepted from './MessageItemRequestAccepted';
import MessageItemRequestDenied from './MessageItemRequestDenied';
import MessageItemRequestCancelled from './MessageItemRequestCancelled';
import MessageItemRequestTransfer from './MessageItemRequestTransfer';
import { getUserId } from '../common/AuthService';
import {
  ITEM_REQUESTS_PENDING,
  ITEM_REQUESTS_ACCEPTED,
  ITEM_REQUESTS_DENIED,
  ITEM_REQUESTS_CANCELLED,
  ITEM_REQUESTS_TRANSFER,
} from '../queries/item_request';

const Styled = styled.div`margin: 30px;`;

const Messages = props => {
  const {
    loadingItemRequestsPending,
    loadingItemRequestsAccepted,
    loadingItemRequestsDenied,
    loadingItemRequestsCancelled,
    loadingItemRequestsTransfer,
    itemRequestsPending,
    itemRequestsAccepted,
    itemRequestsDenied,
    itemRequestsCancelled,
    itemRequestsTransfer,
    refetchItemRequestsPending,
    refetchItemRequestsAccepted,
    refetchItemRequestsDenied,
    refetchItemRequestsCancelled,
    refetchItemRequestsTransfer,
    user,
  } = props;

  if (
    loadingItemRequestsPending ||
    loadingItemRequestsAccepted ||
    loadingItemRequestsDenied ||
    loadingItemRequestsCancelled ||
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

  const cancelled = itemRequestsCancelled.map(itemRequest =>
    <MessageItemRequestCancelled
      key={itemRequest.id}
      itemRequest={itemRequest}
      refetch={refetchItemRequestsCancelled}
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
  const itemRequests = [].concat(pending, accepted, denied, cancelled, transfer);

  return (
    <Styled>
      {itemRequests.length > 0 ? itemRequests : defaultMessage}
    </Styled>
  );
};

export default compose(
  graphql(ITEM_REQUESTS_PENDING, {
    options: () => ({
      variables: {
        uid: getUserId(),
      },
    }),
    props: ({ data: { loading, allItemRequests, refetch } }) => ({
      loadingItemRequestsPending: loading,
      itemRequestsPending: allItemRequests,
      refetchItemRequestsPending: refetch,
    }),
  }),
  graphql(ITEM_REQUESTS_ACCEPTED, {
    options: () => ({
      variables: {
        uid: getUserId(),
      },
    }),
    props: ({ data: { loading, allItemRequests, refetch } }) => ({
      loadingItemRequestsAccepted: loading,
      itemRequestsAccepted: allItemRequests,
      refetchItemRequestsAccepted: refetch,
    }),
  }),
  graphql(ITEM_REQUESTS_DENIED, {
    options: () => ({
      variables: {
        uid: getUserId(),
      },
    }),
    props: ({ data: { loading, allItemRequests, refetch } }) => ({
      loadingItemRequestsDenied: loading,
      itemRequestsDenied: allItemRequests,
      refetchItemRequestsDenied: refetch,
    }),
  }),
  graphql(ITEM_REQUESTS_CANCELLED, {
    options: () => ({
      variables: {
        uid: getUserId(),
      },
    }),
    props: ({ data: { loading, allItemRequests, refetch } }) => ({
      loadingItemRequestsCancelled: loading,
      itemRequestsCancelled: allItemRequests,
      refetchItemRequestsCancelled: refetch,
    }),
  }),
  graphql(ITEM_REQUESTS_TRANSFER, {
    options: () => ({
      variables: {
        uid: getUserId(),
      },
    }),
    props: ({ data: { loading, allItemRequests, refetch } }) => ({
      loadingItemRequestsTransfer: loading,
      itemRequestsTransfer: allItemRequests,
      refetchItemRequestsTransfer: refetch,
    }),
  }),
)(Messages);
