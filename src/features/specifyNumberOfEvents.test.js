import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('When user hasn’t specified a number, 32 is the default number', ({ given, when, then }) => {
    let AppWrapper;

    given('that the user has not changed the number of events', () => { });

    when('the app is loaded', () => {
      AppWrapper = mount(<App />);
    });

    then('32 events are listed', () => {
      AppWrapper.update();
      expect((AppWrapper.find('.event-container')).length).toBeLessThanOrEqual(32);
    });
  });

  test('User can change the number of events they want to see', ({ given, when, then }) => {
    let AppWrapper;

    given('that events are loaded', () => {
      AppWrapper = mount(<App />);
    });

    when('a user selects a number of events to view', () => {
      AppWrapper.find('.number-input').simulate('change', { target: { value: 2 } });
    });

    then('the list of events displayed is no greater than that selected number', () => {
      expect((AppWrapper.find('.event-container')).length).toBeLessThanOrEqual(2);
    });
  });
});
