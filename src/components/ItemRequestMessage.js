import React from 'react';
import styled from 'styled-components';
import Button from './styled/Button';
import { IMAGE_ENDPOINT } from '../common/constants';

const Styled = styled.div`
  display: flex;

  > div {
    flex: 1;
    text-align: center;
  }

  .actions {
    padding-top: 6px;
  }
`;

const ItemRequestMessage = ({ itemRequest, onAccept, onReject, className }) => {
  const message = `${itemRequest.requester.name}
    would like your ${itemRequest.item.title}`;

  return (
    <Styled className={className}>
      <div>
        <span>
          {message}
        </span>
        <div className="actions">
          <Button onClick={() => onAccept(itemRequest.id)}>Accept</Button>
          <Button onClick={() => onReject(itemRequest.id)}>Reject</Button>
        </div>
      </div>
      <img
        alt={itemRequest.item.title}
        src={`${IMAGE_ENDPOINT}/${itemRequest.item.image.secret}/90x`}
      />
    </Styled>
  );
};

export default ItemRequestMessage;
