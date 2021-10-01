import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import logo from './MEETthin.png';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentLocation: 'all'
  };

  async componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ 
          events: events.slice(0, this.state.numberOfEvents),
          locations: extractLocations(events) });
      };
    });
  };

  componentWillUnmount(){
    this.mounted = false;
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      const { numberOfEvents } = this.state;
      this.setState({
        events: locationEvents.slice(0, numberOfEvents)
      });
    });
  };

  updateNumberOfEvents = (eventCount) => {
    const { currentLocation } = this.state;
    this.setState({
      numberOfEvents: eventCount
    });
    this.updateEvents(currentLocation, eventCount);
  };

  render() {
    const { locations, events, numberOfEvents } = this.state;
    return (
      <div className="App">
        <img height="60px" src={logo} alt="Logo" className="logo" />
        <CitySearch locations={locations} updateEvents={this.updateEvents} />
        <NumberOfEvents numberOfEvents={numberOfEvents} updateNumberOfEvents={this.updateNumberOfEvents} />
        <EventList events={events} />
      </div>
    );
  }
};

export default App;
