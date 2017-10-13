import React from 'react';
import { graphql, compose } from 'react-apollo';
import styled from 'styled-components';
import MessageItemRequest from './MessageItemRequest';
import ErrorHandler from '../common/ErrorHandler';
import { ITEM_REQUESTS_PENDING } from '../queries/item_request';
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
    itemRequestsPending,
    refetchItemRequestsPending,
    updateItemRequestStatus,
  } = props;

  if (loadingItemRequestsPending) return null;

  const itemRequests = itemRequestsPending.map(itemRequest =>
    <MessageItemRequest
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

  const defaultMessage = <p>There are no messages</p>;

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
  graphql(UPDATE_ITEM_REQUEST_STATUS, {
    name: 'updateItemRequestStatus',
  }),
)(Messages);
