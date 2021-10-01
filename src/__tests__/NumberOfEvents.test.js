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
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(32);
  });
});
