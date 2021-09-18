import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });
  test('render the number of events field', () => {
    expect(NumberOfEventsWrapper.find('.number-container')).toHaveLength(1);
  });
  test('number box renders with default value 32', () => {
    expect(NumberOfEventsWrapper.find('.number-input')).toHaveLength(1); 
    expect(NumberOfEventsWrapper.state('eventNumber')).toBe(32);
  });
  test('change state when text input changes', () => {
    NumberOfEventsWrapper.setState({
      eventNumber: '32'
    });
    const eventObject = { target: { value: '20' }};
    NumberOfEventsWrapper.find('.number-input').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('eventNumber')).toBe('20');
  });
});
