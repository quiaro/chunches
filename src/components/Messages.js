import React from 'react';
import { graphql, compose } from 'react-apollo';
import styled from 'styled-components';
import ItemRequestMessage from './ItemRequestMessage';
import ErrorHandler from '../common/ErrorHandler';
import CURRENT_USER from '../queries/user';
import { UPDATE_ITEM_REQUEST_STATUS } from '../mutations/item_request';

const Styled = styled.div`margin: 30px;`;

const updateItemRequest = (itemRequestId, status, props) => {
  props.updateItemRequestStatus({
    variables: {
      id: itemRequestId,
      status: status,
    },
  }).then(() => props.data.refetch())
  .catch(e => ErrorHandler(e));
};

const Messages = props => {
  const { loading, user } = props.data;
  if (loading) return null;

  const itemRequests = user.incomingRequests
    .filter(
      itemRequest =>
        itemRequest.status === 'PENDING' ||
        itemRequest.status === 'PENDING_ACK',
    )
    .map(itemRequest =>
      <ItemRequestMessage
        key={itemRequest.id}
        itemRequest={itemRequest}
        onAccept={() => updateItemRequest(itemRequest.id, 'ACCEPTED', props) }
        onReject={() => updateItemRequest(itemRequest.id, 'DENIED', props) }
      />,
    );

  return itemRequests.length > 0
    ? <Styled>
        {itemRequests}
      </Styled>
    : <p>There are no messages</p>;
};

export default compose(
  graphql(CURRENT_USER),
  graphql(UPDATE_ITEM_REQUEST_STATUS, {
    name: 'updateItemRequestStatus',
  }),
)(Messages);
