import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let numberFilter;
  beforeAll(() => {
    numberFilter = shallow(<NumberOfEvents />);
  });
  test('render the number of events field', () => {
    expect(numberFilter.find('.number-container')).toHaveLength(1);
  });
  test('number box renders with default value 32', () => {
    expect(numberFilter.find('.number-input')).toHaveLength(1);
    expect(numberFilter.state('value')).toBe(32);
  });
  

});
