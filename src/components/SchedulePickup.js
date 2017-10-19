import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import styled from 'styled-components';
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

class SchedulePickup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      focused: false,
      time: '18:00',
    };
    this.scheduleTransfer = this.scheduleTransfer.bind(this);
  }

  scheduleTransfer() {
    const { itemRequest, onSchedule, createItemTransfer } = this.props;
    const { date, time } = this.state;
    const { hour, minute } = getTime(time);

    // Set time on Moment instance
    date.hour(hour);
    date.minute(minute);

    const variables = {
      itemRequestId: itemRequest.id,
      date: date.toISOString(),
    };

    createItemTransfer({ variables })
      .then(onSchedule)
      .catch(e => ErrorHandler(e));
  }

  render() {
    const { itemRequest, onCancel } = this.props;
    const buttonText = !itemRequest.transfer ? 'Schedule' : 'Accept';

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
            theme="classic"
            onTimeChange={time => this.setState({ time })}
          />
        </div>
        <div className="actions">
          <Button onClick={this.scheduleTransfer}>
            {buttonText}
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </div>
      </Styled>
    );
  }
}

const CREATE_ITEM_TRANSFER = gql`
  mutation createItemTransfer($itemRequestId: ID!, $date: DateTime!) {
    createItemTransfer(
      requestId: $itemRequestId
      date: $date
      method: PICKUP
      requesterApproved: true
      ownerApproved: false
    ) {
      id
    }
  }
`;

export default graphql(CREATE_ITEM_TRANSFER, {
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
})(SchedulePickup);
