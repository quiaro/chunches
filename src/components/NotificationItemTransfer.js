import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Button from './styled/Button';
import { getLocaleAppointment } from '../common/utils';
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

class NotificationItemTransfer extends PureComponent {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    // TODO
    console.log('Click handler for NotificationItemTransfer');
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

  render() {
    const { itemRequest, user, className } = this.props;
    const message = this.getItemTransferNotification(user, itemRequest);

    return (
      <Styled className={className}>
        <div>
          <span>
            {message}
          </span>
          <div className="actions">
            <Button onClick={this.clickHandler}>OK</Button>
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

export default NotificationItemTransfer;
