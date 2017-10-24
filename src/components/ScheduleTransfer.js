import React, { Component } from 'react';
import { gql, graphql, compose } from 'react-apollo';
import styled from 'styled-components';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import TimePicker from 'react-times';
import Button from './styled/Button';
import { getTime } from '../common/utils';
import ErrorHandler from '../common/ErrorHandler';
import 'react-dates/lib/css/_datepicker.css';
import '../styles/react_dates_overrides.css';
import 'react-times/css/classic/default.css';
import { ITEM_REQUESTS_ACCEPTED } from '../queries/item_request';
import { UPDATE_ITEM_TRANSFER } from '../mutations/item_transfer';

const Styled = styled.div`
  min-width: 380px;

  h3 {
    margin: 1.2em 0;
  }
  .main {
    display: flex;
    justify-content: space-around;

    > .time_picker_container {
      width: 58%;
    }
  }
  .actions {
    padding: 25px 10px 0;
  }
`;

class ScheduleTransfer extends Component {
  constructor(props) {
    super(props);

    const { itemRequest: { transfer } } = props;
    const transferDate = transfer ? new Date(transfer.date) : null;

    this.state = {
      focused: false,
      date: transferDate ? moment(transferDate.toLocaleDateString()) : null,
      time: transferDate
        ? transferDate.toLocaleTimeString('en-US', { hour12: false })
        : '10:00',
    };
    this.scheduleTransfer = this.scheduleTransfer.bind(this);
  }

  scheduleTransfer() {
    const {
      itemRequest,
      onSchedule,
      createItemTransfer,
      updateItemTransfer,
      user,
    } = this.props;
    const { date, time } = this.state;
    const { hour, minute } = getTime(time);

    // Set time on Moment instance
    date.hour(hour);
    date.minute(minute);

    const variables = {
      date: date.toISOString(),
      method: 'PICKUP',
      requesterApproved: user.id === itemRequest.requester.id,
      ownerApproved: user.id === itemRequest.owner.id,
    };

    if (!itemRequest.transfer) {
      variables.itemRequestId = itemRequest.id;
      createItemTransfer({ variables })
        .then(onSchedule)
        .catch(e => ErrorHandler(e));
    } else {
      variables.id = itemRequest.transfer.id;
      updateItemTransfer({ variables })
        .then(onSchedule)
        .catch(e => ErrorHandler(e));
    }
  }

  render() {
    const { onCancel } = this.props;

    return (
      <Styled>
        <h3>Schedule Pickup</h3>
        <div className="main">
          <SingleDatePicker
            date={this.state.date}
            showDefaultInputIcon={true}
            focused={this.state.focused}
            numberOfMonths={1}
            daySize={40}
            required={true}
            displayFormat="MMM D"
            onDateChange={date => this.setState({ date })}
            onFocusChange={({ focused }) => this.setState({ focused })}
          />
          <TimePicker
            time={this.state.time}
            timeMode={24}
            theme="classic"
            onTimeChange={time => this.setState({ time })}
          />
        </div>
        <div className="actions">
          <Button onClick={this.scheduleTransfer}>Schedule</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </div>
      </Styled>
    );
  }
}

const CREATE_ITEM_TRANSFER = gql`
  mutation createItemTransfer(
    $itemRequestId: ID!
    $date: DateTime!
    $method: TransferOption
    $requesterApproved: Boolean!
    $ownerApproved: Boolean!
  ) {
    createItemTransfer(
      requestId: $itemRequestId
      date: $date
      method: $method
      requesterApproved: $requesterApproved
      ownerApproved: $ownerApproved
    ) {
      id
    }
    updateItemRequest(id: $itemRequestId, status: TRANSFER) {
      id
    }
  }
`;

export default compose(
  graphql(CREATE_ITEM_TRANSFER, {
    name: 'createItemTransfer',
    options: ({ user }) => ({
      refetchQueries: [
        {
          query: ITEM_REQUESTS_ACCEPTED,
          variables: {
            uid: user.id,
          },
        },
      ],
    }),
  }),
  graphql(UPDATE_ITEM_TRANSFER, {
    name: 'updateItemTransfer',
  }),
)(ScheduleTransfer);
