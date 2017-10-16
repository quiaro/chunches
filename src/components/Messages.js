import React from 'react';
import { graphql, compose } from 'react-apollo';
import styled from 'styled-components';
import MessageItemRequestPending from './MessageItemRequestPending';
import MessageItemRequestAccepted from './MessageItemRequestAccepted';
import MessageItemRequestDenied from './MessageItemRequestDenied';
import ErrorHandler from '../common/ErrorHandler';
import {
  ITEM_REQUESTS_PENDING,
  ITEM_REQUESTS_ACCEPTED,
  ITEM_REQUESTS_DENIED,
} from '../queries/item_request';

const Styled = styled.div`margin: 30px;`;

const Messages = props => {
  const {
    loadingItemRequestsPending,
    loadingItemRequestsAccepted,
    loadingItemRequestsDenied,
    itemRequestsPending,
    itemRequestsAccepted,
    itemRequestsDenied,
    refetchItemRequestsPending,
    refetchItemRequestsAccepted,
    refetchItemRequestsDenied,
  } = props;

  if (
    loadingItemRequestsPending ||
    loadingItemRequestsAccepted ||
    loadingItemRequestsDenied
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
    />,
  );

  const denied = itemRequestsDenied.map(itemRequest =>
    <MessageItemRequestDenied
      key={itemRequest.id}
      itemRequest={itemRequest}
      refetch={refetchItemRequestsDenied}
    />,
  );

  const defaultMessage = <p>There are no messages</p>;
  const itemRequests = [].concat(pending, accepted, denied);

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
)(Messages);
