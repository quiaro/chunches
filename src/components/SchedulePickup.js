import React, { Component } from 'react';
import styled from 'styled-components';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import Button from './styled/Button';
import 'react-dates/lib/css/_datepicker.css';
import '../styles/react_dates_overrides.css';

const Styled = styled.div`
  h3 {
    margin: 1.2em 0;
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
