import React from 'react';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import ItemRequestMessage from './ItemRequestMessage';
import CURRENT_USER from '../queries/user';

const Styled = styled.div`margin: 30px;`;

const itemRequestAccept = itemRequestId => {
  console.log('ACCEPTED: ', itemRequestId);  // eslint-disable-line
};

const itemRequestReject = itemRequestId => {
  console.log('REJECTED: ', itemRequestId);  // eslint-disable-line
};

const Messages = props => {
  if (props.data.loading) return null;

  const itemRequests = props.data.user.items
    .filter(item => item.requests.length > 0)
    .map(item => item.requests)
    .reduce((a, b) => a.concat(b), [])
    .map(itemRequest =>
      <ItemRequestMessage
        key={itemRequest.id}
        itemRequest={itemRequest}
        onAccept={itemRequestAccept}
        onReject={itemRequestReject}
      />,
    );

  return (
    <Styled>
      {itemRequests}
    </Styled>
  );
};

export default graphql(CURRENT_USER)(Messages);
