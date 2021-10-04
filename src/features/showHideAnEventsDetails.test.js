import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import Event from '../Event';
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  test('An event element is collapsed by default', ({ given, and, when, then }) => {
    let AppWrapper;
    let EventWrapper;

    given('the app is loaded', () => {
      AppWrapper = mount(<App />);
    });

    and('events are loaded', () => {
      AppWrapper.update();
      const AppNumberOfEventsState = AppWrapper.state('numberOfEvents');
      expect(AppNumberOfEventsState).not.toEqual(undefined);
    });

    when('a user views a list of events', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event-container')).toHaveLength(mockData.length);
    });

    then('each event should display in collapsed form', () => {
      let event = mockData[0];
      EventWrapper = shallow(<Event event={event} />);
      const showDetails = EventWrapper.state('showDetails');
      expect(EventWrapper.state(showDetails)).toBe(undefined);
    });
  });

  test('User can expand an event to see its details', ({ given, and, when, then }) => {
    let AppWrapper;
    let EventWrapper;

    given('the app is loaded', () => {
      AppWrapper = mount(<App />);
    });

    and('events are displayed with details hidden', () => {
      let event = mockData[0];
      EventWrapper = shallow(<Event event={event} />);
      const showDetails = EventWrapper.state('showDetails');
      expect(EventWrapper.state(showDetails)).toBe(undefined);
    });

    when('a user clicks the show more button on a single event', () => {
      EventWrapper.find('.details-btn').simulate("click");
    });

    then('an expanded view of that event is displayed', () => {
      let event = mockData[0];
      EventWrapper = shallow(<Event event={event} />);
      expect(EventWrapper.find('.event-description')).toHaveLength(1);
    });
  });

  test('User can collapse an event to hide its details', ({ given, and, when, then }) => {
    let AppWrapper;
    let EventWrapper;

    given('the app is loaded', () => {
      AppWrapper = mount(<App />);
    });

    and('an expanded view of an event is displayed', () => {
      let event = mockData[0];
      EventWrapper = shallow(<Event event={event} />);
      expect(EventWrapper.find('.event-description')).toHaveLength(1);
    });

    when('a user clicks on a show less button in that view', () => {
      EventWrapper.find('.details-btn').simulate("click");
    });

    then('the display will revert to the previous list of collapsed events', () => {
      let event = mockData[0];
      EventWrapper = shallow(<Event event={event} />);
      const showDetails = EventWrapper.state('showDetails');
      expect(EventWrapper.state(showDetails)).toBe(undefined);
    });
  });
});
