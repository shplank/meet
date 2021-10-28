import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import EventGenre from "./EventGenre";
import { WarningAlert } from './Alert';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import logo from './MEETthin.png';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentLocation: 'all cities',
    showWelcomeScreen: undefined,
    metricsBtnText: 'show metrics',
    dataVisibility: 'display-none'
  };

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ 
            events: events.slice(0, this.state.numberOfEvents),
            locations: extractLocations(events) });
        };
      });
    }
  }

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

  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location)=>{
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift().split('-').shift()
      return {city, number};
    })
    return data;
  };

  showHideMetrics () {
    if (this.state.dataVisibility === 'display-none') {
      this.setState({
        metricsBtnText: 'hide metrics',
        dataVisibility: 'data-vis-wrapper'
      });
    } else {
      this.setState({
        metricsBtnText: 'show metrics',
        dataVisibility: 'display-none'
      });
    }
  };

  render() {
    const { locations, events, numberOfEvents, showWelcomeScreen, dataVisibility } = this.state;
    if (showWelcomeScreen === undefined) 
    return <div className="App" />
    return (
      <div className="App">
        <div className="Settings">
          <div className="logo">
            <img width="100px" height="45px" src={logo} alt="Logo" />
            { !navigator.onLine ? (<WarningAlert text='You are offline, results may be limited' />) : (<WarningAlert text=' ' />)}
          </div>
          <CitySearch locations={locations} updateEvents={this.updateEvents} />
          <NumberOfEvents numberOfEvents={numberOfEvents} updateNumberOfEvents={this.updateNumberOfEvents} />
          <button className="metrics-btn" onClick={() => {this.showHideMetrics()}}>{this.state.metricsBtnText}</button>
        </div>
        <div className="results">
          <div className={dataVisibility}>
            <EventGenre events={events} />
            <p className="data-description">breakdown of events by topic</p>
            <hr/>
            <ResponsiveContainer height={500}>
              <ScatterChart width={280} height={480} margin={{ top: 20, right: 20, bottom: 10, left: 40 }}>
                <CartesianGrid />
                <XAxis type="number" dataKey="number" name="number of events" allowDecimals={false} />
                <YAxis type="category" dataKey="city" name="city" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter data={this.getData()} fill="#696969" />
              </ScatterChart>
            </ResponsiveContainer>
            <p className="data-description">number of events in each city</p>
          </div>
          <EventList events={events} />
        </div>
        <WelcomeScreen showWelcomeScreen={showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
};

export default App;
