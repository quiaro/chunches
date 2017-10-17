import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import Button from './styled/Button';
import Dialog from './Dialog';
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

class MessageItemRequestAccepted extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      dialogActive: false
    }
    this.closeDialog = this.closeDialog.bind(this);
    this.processItemRequest = this.processItemRequest.bind(this);
    this.cancelItemRequest = this.cancelItemRequest.bind(this);
  }

  closeDialog() {
    this.setState({ dialogActive: false });
  }

  processItemRequest() {
    this.setState({ dialogActive: true });
    // const newStatus = 'PROCESS';
    // this.updateStatus(newStatus);
  }

  cancelItemRequest() {
    const newStatus = 'CANCEL';
    this.updateStatus(newStatus);
  }

  updateStatus(status) {
    const { itemRequest, refetch, updateItemRequestStatus } = this.props;
    updateItemRequestStatus({
      variables: {
        id: itemRequest.id,
        status: status,
      },
    }).then(() => refetch())
      .catch(e => ErrorHandler(e));
  }

  render() {
    const { itemRequest, className } = this.props;
    const { dialogActive } = this.state;
    const message = `${itemRequest.owner.name} has accepted to give you their ${itemRequest.item.title}`;

    return (
      <Styled className={className}>
        <div>
          <span>
            {message}
          </span>
          <div className="actions">
            <Button onClick={ this.processItemRequest }>Schedule pickup</Button>
            <Button onClick={ this.cancelItemRequest }>Cancel</Button>
          </div>
        </div>
        <img
          alt={itemRequest.item.title}
          src={`${IMAGE_ENDPOINT}/${itemRequest.item.image.secret}/90x`}
        />
        { dialogActive &&
          <Dialog onClose={this.closeDialog}>
            <span>I am the date overlay</span>
          </Dialog>
        }
      </Styled>
    );
  }
}

export default graphql(UPDATE_ITEM_REQUEST_STATUS, {
  name: 'updateItemRequestStatus',
})(MessageItemRequestAccepted);
