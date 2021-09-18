import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    eventNumber: 32
  };

  handleNumberChange = (event) => {
    const value = event.target.value;
    this.setState({ eventNumber: value });
  };

  render() {
    const {eventNumber} = this.state;
    return (
      <div className="number-container">
        <label className="events-number">Number of Events: </label>
        <input 
        type="number" 
        className="number-input"
        value={eventNumber}
        onChange={this.handleNumberChange} />
      </div>
    );
  }
};

export default NumberOfEvents;
