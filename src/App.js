import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { WarningAlert } from './Alert';
import { getEvents, extractLocations } from './api';
import logo from './MEETthin.png';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentLocation: 'all cities'
  };

  async componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ 
          events: events.slice(0, this.state.numberOfEvents),
          locations: extractLocations(events) });
      };
      if (!navigator.onLine) {
        this.setState({infoText: <p className="offline-alert">You are currently offline;<br/>results may be limited</p>});
        console.log("user offline");
      } else {
        this.setState({ infoText: ''});
      };
    });
  };

  componentWillUnmount(){
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    getEvents().then((events) => {
      let locationEvents = (location === 'all cities') ?
        events :
        events.filter((event) => event.location === location);
      locationEvents = locationEvents.slice(0, eventCount)
      const { numberOfEvents } = this.state;
      this.setState({
        events: locationEvents.slice(0, numberOfEvents),
        currentLocation: location
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
        <div className="Settings">
          <img height="60px" src={logo} alt="Logo" className="logo" />
          <WarningAlert text={this.state.infoText} />
          <CitySearch locations={locations} updateEvents={this.updateEvents} />
          <NumberOfEvents numberOfEvents={numberOfEvents} updateNumberOfEvents={this.updateNumberOfEvents} />
        </div>
        <EventList events={events} />
      </div>
    );
  }
};

export default App;
