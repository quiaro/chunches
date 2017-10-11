import React from 'react';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import ItemRequestMessage from './ItemRequestMessage';
import CURRENT_USER from '../queries/user';

const Styled = styled.div`margin: 30px;`;

const itemRequestAccept = itemRequestId => {
  console.log('ACCEPTED: ', itemRequestId); // eslint-disable-line
};

const itemRequestReject = itemRequestId => {
  console.log('REJECTED: ', itemRequestId); // eslint-disable-line
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
        onAccept={itemRequestAccept}
        onReject={itemRequestReject}
      />,
    );

  return itemRequests.length > 0
    ? <Styled>
        {itemRequests}
      </Styled>
    : <p>There are no messages</p>;
};

export default graphql(CURRENT_USER)(Messages);
