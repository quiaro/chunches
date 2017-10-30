import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import Button from './styled/Button';
import { getLocaleAppointment } from '../common/utils';
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

class NotificationItemTransfer extends PureComponent {
  constructor(props) {
    super(props);
    this.fulfillItemRequest = this.fulfillItemRequest.bind(this);
  }

  fulfillItemRequest() {
    this.updateStatus('TRANSFER_FULFILLED');
  }

  getItemTransferNotification(user, itemRequest) {
    const { transfer } = itemRequest;
    const transferAppointment = getLocaleAppointment(transfer.date);
    const isOwner = user.id === itemRequest.owner.id;
    return isOwner
      ? `Give ${itemRequest.item.title} to ${itemRequest.requester
          .name} on ${transferAppointment}`
      : `Receive ${itemRequest.item.title} from ${itemRequest.owner
          .name} on ${transferAppointment}`;
  }

  updateStatus(status) {
    const {
      itemRequest,
      refetchItemRequestsConfirmed,
      updateItemRequestStatus,
    } = this.props;

    updateItemRequestStatus({
      variables: {
        id: itemRequest.id,
        status: status,
      },
    })
      .then(refetchItemRequestsConfirmed)
      .catch(e => ErrorHandler(e));
  }

  render() {
    const { itemRequest, user, className } = this.props;
    const message = this.getItemTransferNotification(user, itemRequest);
    const appointmentDateTime = Date.parse(itemRequest.transfer.date);
    const currentDateTime = Date.now();

    return (
      <Styled className={className}>
        <div>
          <span>
            {message}
          </span>
          <div className="actions">
            {currentDateTime > appointmentDateTime &&
              <Button onClick={this.fulfillItemRequest}>Done</Button>}
            <Button onClick={this.rescheduleTransfer}>Re-schedule</Button>
            <Button onClick={this.cancelItemRequest}>Cancel</Button>
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
})(NotificationItemTransfer);
