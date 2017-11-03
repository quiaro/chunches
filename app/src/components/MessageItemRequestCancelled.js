import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import Button from './styled/Button';
import ErrorHandler from '../common/ErrorHandler';
import { IMAGE_ENDPOINT } from '../common/constants';
import { UPDATE_ITEM_REQUEST_STATUS } from '../mutations/item_request';

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

class MessageItemRequestCancelled extends PureComponent {
  constructor(props) {
    super(props);
    this.completeItemRequestCancelled = this.completeItemRequestCancelled.bind(
      this,
    );
  }

  completeItemRequestCancelled() {
    const { itemRequest, refetch, updateItemRequestStatus } = this.props;
    updateItemRequestStatus({
      variables: {
        id: itemRequest.id,
        status: 'CANCEL_COMPLETE',
      },
    })
      .then(() => refetch())
      .catch(e => ErrorHandler(e));
  }

  render() {
    const { itemRequest, className } = this.props;
    const message = `Sorry, ${itemRequest.owner
      .name} is no longer offering the ${itemRequest.item.title}`;

    return (
      <Styled className={className}>
        <div>
          <span>
            {message}
          </span>
          <div className="actions">
            <Button onClick={this.completeItemRequestCancelled}>OK</Button>
          </div>
        </div>
        <img
          alt={itemRequest.item.title}
          src={`${IMAGE_ENDPOINT}/${itemRequest.item.image.secret}/90x`}
        />
      </Styled>
    );
  }
}

export default graphql(UPDATE_ITEM_REQUEST_STATUS, {
  name: 'updateItemRequestStatus',
})(MessageItemRequestCancelled);
