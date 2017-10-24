import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import Button from './styled/Button';
import Dialog from './Dialog';
import ScheduleTransfer from './ScheduleTransfer';
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
      dialogActive: false,
    };
    this.cancelItemRequest = this.cancelItemRequest.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.scheduleItemTransfer = this.scheduleItemTransfer.bind(this);
    this.onScheduleTransfer = this.onScheduleTransfer.bind(this);
  }

  cancelItemRequest() {
    this.updateStatus('CANCEL');
  }

  closeDialog() {
    this.setState({ dialogActive: false });
  }

  scheduleItemTransfer() {
    this.setState({ dialogActive: true });
  }

  onScheduleTransfer() {
    // Refetch item requests after creation of the item transfer
    this.props.refetch();
    this.closeDialog();
  }

  updateStatus(status) {
    const { itemRequest, refetch, updateItemRequestStatus } = this.props;
    updateItemRequestStatus({
      variables: {
        id: itemRequest.id,
        status: status,
      },
    })
      .then(() => refetch())
      .catch(e => ErrorHandler(e));
  }

  render() {
    const { itemRequest, className, user } = this.props;
    const { dialogActive } = this.state;
    const message = `${itemRequest.owner
      .name} has accepted to give you their ${itemRequest.item.title}`;

    return (
      <Styled className={className}>
        <div>
          <span>
            {message}
          </span>
          <div className="actions">
            <Button onClick={this.scheduleItemTransfer}>Schedule pickup</Button>
            <Button onClick={this.cancelItemRequest}>Cancel</Button>
          </div>
        </div>
        <img
          alt={itemRequest.item.title}
          src={`${IMAGE_ENDPOINT}/${itemRequest.item.image.secret}/90x`}
        />
        {dialogActive &&
          <Dialog onClose={this.closeDialog}>
            <ScheduleTransfer
              itemRequest={itemRequest}
              onCancel={this.closeDialog}
              onSchedule={this.onScheduleTransfer}
              user={user}
            />
          </Dialog>}
      </Styled>
    );
  }
}

export default graphql(UPDATE_ITEM_REQUEST_STATUS, {
  name: 'updateItemRequestStatus',
})(MessageItemRequestAccepted);
