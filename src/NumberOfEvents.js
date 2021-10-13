import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32
  };

  handleNumberChange = (event) => {
    const value = event.target.value;
    this.setState({ numberOfEvents: value });
    this.props.updateNumberOfEvents(event.target.value);
    if (value < 1 || value > 32) {
      this.setState({
        infoText: 'Select a number from 1 to 32',
      });
    } else {
      this.setState({
        infoText: '',
      });
    }
  };

  render() {
    const {numberOfEvents} = this.state;
    return (
      <div className="events">
        <div className="alert-space">
          <ErrorAlert text={this.state.infoText} />
        </div>
        <br />
        <div className="number-container">
          <label className="number-label" for="number">number of events:</label>
          <input
            type="number"
            id="number"
            className="number-input"
            value={numberOfEvents}
            onChange={this.handleNumberChange} />
        </div>
      </div>
    );
  }
};

export default NumberOfEvents;
