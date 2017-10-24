import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import Button from './styled/Button';
import Dialog from './Dialog';
import ScheduleTransfer from './ScheduleTransfer';
import { getLocaleAppointment } from '../common/utils';
import ErrorHandler from '../common/ErrorHandler';
import { IMAGE_ENDPOINT } from '../common/constants';
import { UPDATE_ITEM_TRANSFER } from '../mutations/item_transfer';

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

class MessageItemRequestTransfer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dialogActive: false,
    };
    this.closeDialog = this.closeDialog.bind(this);
    this.confirmItemTransfer = this.confirmItemTransfer.bind(this);
    this.rescheduleItemTransfer = this.rescheduleItemTransfer.bind(this);
    this.cancelItemTransfer = this.cancelItemTransfer.bind(this);
    this.onScheduleTransfer = this.onScheduleTransfer.bind(this);
  }

  cancelItemTransfer() {
    // TODO
    console.log('Cancel item transfer');
  }

  closeDialog() {
    this.setState({ dialogActive: false });
  }

  confirmItemTransfer() {
    const {
      itemRequest: { transfer },
      refetchItemRequestsTransfer,
      updateItemTransfer,
    } = this.props;

    updateItemTransfer({
      variables: {
        id: transfer.id,
        date: transfer.date,
        method: transfer.method,
        requesterApproved: true,
        ownerApproved: true,
      },
    })
      .then(() => refetchItemRequestsTransfer())
      .catch(e => ErrorHandler(e));
  }

  getItemTransferMessage(user, itemRequest) {
    const { transfer } = itemRequest;
    const transferAppointment = getLocaleAppointment(transfer.date);
    const isOwner = user.id === itemRequest.owner.id;
    return isOwner
      ? `${itemRequest.requester
          .name} would like to schedule the transfer of your ${itemRequest.item
          .title} for ${transferAppointment}`
      : `${itemRequest.owner.name} would like to schedule the
          transfer of the ${itemRequest.item.title} for ${transferAppointment}`;
  }

  onScheduleTransfer() {
    this.props.refetchItemRequestsTransfer();
    this.closeDialog();
  }

  rescheduleItemTransfer() {
    this.setState({ dialogActive: true });
  }

  render() {
    const { itemRequest, user, className } = this.props;
    const { dialogActive } = this.state;
    const message = this.getItemTransferMessage(user, itemRequest);

    return (
      <Styled className={className}>
        <div>
          <span>
            {message}
          </span>
          <div className="actions">
            <Button onClick={this.confirmItemTransfer}>Confirm</Button>
            <Button onClick={this.rescheduleItemTransfer}>Re-schedule</Button>
            <Button onClick={this.cancelItemTransfer}>Cancel</Button>
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

export default graphql(UPDATE_ITEM_TRANSFER, {
  name: 'updateItemTransfer',
})(MessageItemRequestTransfer);
