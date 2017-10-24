import React, { PureComponent } from 'react';
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

class NotificationItemTransfer extends PureComponent {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    // TODO
    console.log('Click handler for NotificationItemTransfer');
  }

  render() {
    const { itemRequest, className } = this.props;
    const message = `Notification: transfer appointment for ${itemRequest.item
      .title}`;

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
