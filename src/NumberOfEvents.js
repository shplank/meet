import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32
  };

  handleNumberChange = (event) => {
    const value = event.target.value;
    this.setState({ numberOfEvents: value });
    this.props.updateNumberOfEvents(event.target.value);
  };

  render() {
    const {numberOfEvents} = this.state;
    return (
      <span className="number-container">
        <label className="number-label">number of events:</label>
        <input
        type="number" 
        className="number-input"
        value={numberOfEvents}
        onChange={this.handleNumberChange} />
      </span>
    );
  }
};

export default NumberOfEvents;
