import React from 'react';
import { graphql, compose } from 'react-apollo';
import styled from 'styled-components';
import MessageItemRequestPending from './MessageItemRequestPending';
import MessageItemRequestAccepted from './MessageItemRequestAccepted';
import ErrorHandler from '../common/ErrorHandler';
import {
  ITEM_REQUESTS_PENDING,
  ITEM_REQUESTS_ACCEPTED,
} from '../queries/item_request';
import { UPDATE_ITEM_REQUEST_STATUS } from '../mutations/item_request';

const Styled = styled.div`margin: 30px;`;

const updateItemRequest = (
  itemRequestId,
  status,
  updateItemRequestStatus,
  refetch,
) => {
  updateItemRequestStatus({
    variables: {
      id: itemRequestId,
      status: status,
    },
  })
    .then(() => refetch())
    .catch(e => ErrorHandler(e));
};

const Messages = props => {
  const {
    loadingItemRequestsPending,
    loadingItemRequestsAccepted,
    itemRequestsPending,
    itemRequestsAccepted,
    refetchItemRequestsPending,
    refetchItemRequestsAccepted,
    updateItemRequestStatus,
  } = props;

  if (loadingItemRequestsPending || loadingItemRequestsAccepted) return null;

  const pending = itemRequestsPending.map(itemRequest =>
    <MessageItemRequestPending
      key={itemRequest.id}
      itemRequest={itemRequest}
      onAccept={() =>
        updateItemRequest(
          itemRequest.id,
          'ACCEPTED',
          updateItemRequestStatus,
          refetchItemRequestsPending,
        )}
      onReject={() =>
        updateItemRequest(
          itemRequest.id,
          'DENIED',
          updateItemRequestStatus,
          refetchItemRequestsPending,
        )}
    />,
  );

  const accepted = itemRequestsAccepted.map(itemRequest =>
    <MessageItemRequestAccepted
      key={itemRequest.id}
      itemRequest={itemRequest}
      onAccept={() =>
        updateItemRequest(
          itemRequest.id,
          'PROCESS',
          updateItemRequestStatus,
          refetchItemRequestsAccepted,
        )}
      onReject={() =>
        updateItemRequest(
          itemRequest.id,
          'CANCEL',
          updateItemRequestStatus,
          refetchItemRequestsAccepted,
        )}
    />,
  );

  const defaultMessage = <p>There are no messages</p>;
  const itemRequests = [].concat(pending, accepted);

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
  graphql(UPDATE_ITEM_REQUEST_STATUS, {
    name: 'updateItemRequestStatus',
  }),
)(Messages);
