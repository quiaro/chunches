import React, { Component } from 'react';
import styled from 'styled-components';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import TimePicker from 'react-times';
import Button from './styled/Button';
import 'react-dates/lib/css/_datepicker.css';
import '../styles/react_dates_overrides.css';
import 'react-times/css/classic/default.css';

const Styled = styled.div`
  min-width: 350px;

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
    };
  }
  render() {
    const { onCancel } = this.props;
    const confirmButton = <Button>Accept</Button>;

    return (
      <Styled>
        <h3>Schedule Pickup</h3>
        <div className="main">
          <SingleDatePicker
            date={this.state.date}
            showDefaultInputIcon={true}
            onDateChange={date => this.setState({ date })}
            focused={this.state.focused}
            onFocusChange={({ focused }) => this.setState({ focused })}
            numberOfMonths={1}
            daySize={40}
            required={true}
            displayFormat="MMM D"
          />
          <TimePicker
            theme="classic"
            timeMode="12"
          />
        </div>
        <div className="actions">
          {confirmButton}
          <Button onClick={onCancel}>Cancel</Button>
        </div>
      </Styled>
    );
  }
}

export default SchedulePickup;
