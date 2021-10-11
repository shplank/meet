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
    if (value < 1) {
      this.setState({
        infoText: "Please select a number from 1 to 32",
      });
    } if (value > 32) {
      this.setState({
        infoText: "Please select a number from 1 to 32",
      });
    } else {
      this.setState({
        infoText: "",
      });
    }
  };

  render() {
    const {numberOfEvents} = this.state;
    return (
      <div className="number-container">
        <label className="number-label">number of events:</label>
        <input
          type="number" 
          className="number-input"
          value={numberOfEvents}
          onChange={this.handleNumberChange} />
        <ErrorAlert text={this.state.infoText} />
      </div>
    );
  }
};

export default NumberOfEvents;
