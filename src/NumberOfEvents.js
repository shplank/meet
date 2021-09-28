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
      <div className="number-container">
        <input 
        placeholder="number of events"
        type="number" 
        className="number-input"
        value={numberOfEvents}
        onChange={this.handleNumberChange} />
      </div>
    );
  }
};

export default NumberOfEvents;
